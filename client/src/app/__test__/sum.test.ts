import { expect, test } from 'vitest';

const sum = (a: number, b: number) => {
  return a + b;
};

test('first', () => {
  expect(sum(1, 2)).toBe(3);
});
