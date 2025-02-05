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

  addNew = async () => {
    const items = this.model;
    const count = items.length;
    const newItem: Agendaitem = this.store.createRecord<Agendaitem>(
      'agendaitem',
      {
        title: `test${count}`,
        previousItem: items.at(-1),
      },
    );
    await newItem.save();
    await this.router.refresh();
  };

  clearAll = async () => {
    const items = this.model;
    await Promise.all(items.map((item) => item.destroyRecord()));
    await this.router.refresh();
  };

  deleteItem = async (item: Agendaitem) => {
    const items = this.model;
    const index = items.indexOf(item);
    if (index === -1) {
      throw new Error(`Could not find ${item.id} in list of items`);
    }
    const previousItem = await item.previousItem;
    const nextItem = items.at(index + 1);
    await item.destroyRecord();
    if (nextItem) {
      nextItem.set('previousItem', previousItem);
      await nextItem.save();
    }
    await this.router.refresh();
  };
}
