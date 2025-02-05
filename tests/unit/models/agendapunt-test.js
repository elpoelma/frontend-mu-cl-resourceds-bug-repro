import { setupTest } from 'frontend-mu-cl-resources-bug-repro/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | agendapunt', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('agendapunt', {});
    assert.ok(model, 'model exists');
  });
});
