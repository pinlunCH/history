'use strict';
const test = require('tape');

test('Rename real source folder', (assert) => {
  const filenames = ['cee.css', 'jay.js', 'tee.txt'];
  const futureFilenames = ['changed.css', 'renamed.js', 'temp.txt'];
  const sourceFolder = './plugins/rename/test/fixtures/renameable';
  const module = require('../lib/rename');

  module.renamePaths(sourceFolder, filenames, futureFilenames)
    .then((success) => {
      assert.equal(success, true, 'No errors');
      assert.end();
    })
    .catch((error) => {
      assert.fail(`Rename failed ${error}`);
      assert.end();
    });
});

test('Restore real source folder', (assert) => {
  const filenames = ['changed.css', 'renamed.js', 'temp.txt'];
  const futureFilenames = ['cee.css', 'jay.js', 'tee.txt'];
  const sourceFolder = './plugins/rename/test/fixtures/renameable';
  const module = require('../lib/rename');

  module.renamePaths(sourceFolder, filenames, futureFilenames)
    .then((success) => {
      assert.equal(success, true, 'No errors');
      assert.end();
    })
    .catch((error) => {
      assert.fail(`Rename failed ${error}`);
      assert.end();
    });
});

test('Caught fake source folder', (assert) => {
  const filenames = ['cee.css', 'jay.js', 'tee.txt'];
  const futureFilenames = ['changed.css', 'renamed.js', 'temp.txt'];
  const sourceFolder = './plugins/rename/test/fixtures/FAKE';
  const module = require('../lib/rename');

  module.renamePaths(sourceFolder, filenames, futureFilenames)
    .then(() => {
      assert.fail('Code incorrectly found a fake folder');
      assert.end();
    })
    .catch(() => {
      assert.pass('Fake folder not found');
      assert.end();
    });
});

test('Caught fake filenames', (assert) => {
  const filenames = ['FAKEcee.css', 'FAKEjay.js', 'FAKEtee.txt'];
  const futureFilenames = ['changed.css', 'renamed.js', 'temp.txt'];
  const sourceFolder = './plugins/rename/test/fixtures/renameable';
  const module = require('../lib/rename');

  module.renamePaths(sourceFolder, filenames, futureFilenames)
    .then(() => {
      assert.fail('Code incorrectly found a fake filename');
      assert.end();
    })
    .catch(() => {
      assert.pass('Fake filename not found');
      assert.end();
    });
});
