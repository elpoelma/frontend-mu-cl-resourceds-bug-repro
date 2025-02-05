import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type Store from 'ember-data/store';
import Agendaitem from 'frontend-mu-cl-resources-bug-repro/models/agendaitem';

export default class ApplicationRoute extends Route {
  @service declare store: Store;
  async model() {
    return this.store.query<Agendaitem>('agendaitem', { sort: 'title' });
  }
}
