import { module, test } from 'qunit';
import { setupTest } from 'frontend-mu-cl-resources-bug-repro/tests/helpers';

module('Unit | Route | application', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:application');
    assert.ok(route);
  });
});
