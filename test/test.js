import { getCurrentUser, saveUser, loadLeaderboard } from '../src/components/app.js';

test('Save a user', () => {
  const e = { preventDefault: () => {} };
  const res = saveUser(e);
  expect(res).toBeDefined();
  expect(typeof res).toBe('boolean');
  expect(res).toBe(true);
});

test('Currentuser', () => {
  const user = getCurrentUser();
  expect(user).toBe('null');
});

test('Load leaderboard', async () => {
  const res = await loadLeaderboard();

  expect(typeof res).toBe('object');
  expect(res[0]).toBeDefined();
  expect(res[0].user).toBeDefined();
  expect(res[0].score).toBeDefined();
  expect(typeof res[0].user).toBe('string');
  expect(typeof res[0].score).toBe('number');
});