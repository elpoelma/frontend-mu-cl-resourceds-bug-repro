import Controller from '@ember/controller';
import type Route from '@ember/routing/route';
import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import type Store from 'ember-data/store';
import Agendaitem from 'frontend-mu-cl-resources-bug-repro/models/agendaitem';
import type ApplicationRoute from 'frontend-mu-cl-resources-bug-repro/routes/application';
type ModelFor<R extends Route> = Awaited<ReturnType<R['model']>>;

export default class ApplicationController extends Controller {
  @service declare store: Store;
  @service declare router: RouterService;
  declare model: ModelFor<ApplicationRoute>;
  get swapDisabled() {
    return this.model.length < 2;
  }
  addNew = async () => {
    const items = await this.store.query<Agendaitem>('agendaitem', {
      sort: 'title',
    });
    const count = items.length;
    const newItem: Agendaitem = this.store.createRecord<Agendaitem>(
      'agendaitem',
      {
        title: `test${count}`,
        previousItem: items[items.length - 1],
      },
    );
    await newItem.save();
    await this.router.refresh();
  };
  clearAll = async () => {
    const items = await this.store.findAll<Agendaitem>('agendaitem');
    for (const item of items.slice()) {
      await item.destroyRecord();
    }
    await this.router.refresh();
  };

  swap = async () => {
    const items = await this.store.query<Agendaitem>('agendaitem', {
      sort: 'title',
    });
    const lastItem = items[items.length - 1];
    const secondLastItem = items[items.length - 2];
    if (lastItem && secondLastItem) {
      secondLastItem.previousItem = lastItem;
      await secondLastItem.save();

      lastItem.previousItem = secondLastItem;
      await lastItem.save();
    }
  };
  deleteSecondToLast = async () => {
    const items = await this.store.query<Agendaitem>('agendaitem', {
      sort: 'title',
    });
    const secondLastItem = items[items.length - 2];
    const lastItem = items[items.length - 2];
    if (secondLastItem && lastItem) {
      lastItem.previousItem = null;
      await lastItem.save();
      await secondLastItem.destroyRecord();
    }
  };
}
