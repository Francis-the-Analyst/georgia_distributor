import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const validator = fileURLToPath(new URL('../scripts/validate-data.mjs', import.meta.url));

test('validator accepts the ten approved public distributor targets', async () => {
  const { stdout } = await run(process.execPath, [validator]);

  assert.match(stdout, /Validated: 10 distributor accounts/);
});
