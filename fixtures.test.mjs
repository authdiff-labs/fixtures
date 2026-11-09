import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { CHANGE_KINDS, compareAuthorization, summarizeChanges } from '../auth-tree-core/index.mjs';

const manifest = JSON.parse(await readFile(new URL('./manifest.json', import.meta.url)));

for (const { file, expected } of manifest.cases) {
  test(file + ' matches its documented delta', async () => {
    const { before, after } = JSON.parse(await readFile(new URL('./' + file, import.meta.url)));
    const changes = compareAuthorization(before, after);
    assert.deepEqual(changes.map(({ kind, path }) => ({ kind, path })), expected);
    const summary = summarizeChanges(changes);
    assert.equal(summary.total, expected.length);
  });
}

test('every documented case covers a known change kind', () => {
  const covered = new Set(manifest.cases.flatMap(({ expected }) => expected.map(({ kind }) => kind)));
  for (const kind of CHANGE_KINDS) {
    assert.ok(covered.has(kind), 'no fixture covers ' + kind);
  }
});

test('the testnet capture is documented for backend replay', async () => {
  const capture = JSON.parse(await readFile(new URL('./testnet-approve.json', import.meta.url)));
  assert.equal(capture.network, 'testnet');
  assert.equal(capture.before.auth.length, 1);
  assert.equal(capture.after.auth.length, 1);
  assert.equal(capture.changes.length, 1);
  assert.equal(capture.changes[0].before.decimal, '100');
  assert.equal(capture.changes[0].after.decimal, '250');
});
