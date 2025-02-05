import Model, { attr, belongsTo, type AsyncBelongsTo } from '@ember-data/model';
import type { Type } from '@warp-drive/core-types/symbols';

export default class Agendaitem extends Model {
  declare [Type]: 'agendaitem';

  @attr()
  declare title?: string;

  @belongsTo<Agendaitem>('agendaitem', { inverse: null, async: true })
  declare previousItem?: AsyncBelongsTo<Agendaitem>;
}
