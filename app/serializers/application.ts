import type { Snapshot } from '@ember-data/legacy-compat/legacy-network-handler/snapshot';
import JSONAPISerializer from '@ember-data/serializer/json-api';
export default class ApplicationSerializer extends JSONAPISerializer {
  serializeAttribute(
    snapshot: Snapshot,
    json: object,
    key: string,
    attributes: object,
  ) {
    if (key !== 'uri')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      super.serializeAttribute(snapshot, json, key, attributes);
  }
}
