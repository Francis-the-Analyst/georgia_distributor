import { buildAppData } from './lib/build-app-data.mjs';

const app = await buildAppData();
const expected = { distributors: 10, projects: 12, developments: 26, competition: 10 };

for (const [key, count] of Object.entries(expected)) {
  if (app[key].length !== count) {
    throw new Error(`Expected ${count} ${key}, received ${app[key].length}`);
  }
}

console.log(`Validated: ${expected.distributors} distributor accounts, ${expected.projects} project actors, ${expected.developments} developments, ${expected.competition} competitor groups`);
