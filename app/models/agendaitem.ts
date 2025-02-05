import Model, { attr, belongsTo, type AsyncBelongsTo } from '@ember-data/model';
import type { Type } from '@warp-drive/core-types/symbols';

export default class Agendaitem extends Model {
  declare [Type]: 'agendaitem';

  @attr('string')
  declare uri?: string;
  @attr('string')
  declare title?: string;

  @attr('number')
  declare position: number;

  @belongsTo<Agendaitem>('agendaitem', { inverse: null, async: true })
  declare previousItem?: AsyncBelongsTo<Agendaitem>;
}
