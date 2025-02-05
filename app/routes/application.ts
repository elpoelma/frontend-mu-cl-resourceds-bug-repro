import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type Store from 'ember-data/store';

export default class ApplicationRoute extends Route {
  @service declare store: Store;
  async model() {
    return this.store.query('agendaitem', { sort: 'title' });
  }
}
