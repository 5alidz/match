import match from '../src/index';

test('uses default value when no match', () => {
  expect(match(NaN)(['_', () => 'not a number'], [1, () => 'one'], [2, () => 'two'], [3, () => 'three'])).toBe(
    'not a number'
  );
  expect(match(-0)(['_', () => 'Minus Zero'], [0, () => 'one'], [1, () => 'two'], [2, () => 'three'])).toBe(
    'Minus Zero'
  );
});

test('matches boolean', () => {
  expect(
    match(true)(['_', () => 'this is ignored'], [false, () => 'this is ignored too'], [true, () => 'should match this'])
  ).toBe('should match this');

  expect(
    match(false)(['_', () => 'hello world'], [false, () => 'should match this'], [true, () => 'this is ignored'])
  ).toBe('should match this');
});

test('matches number', () => {
  expect(match(1)(['_', () => 'None'], [1, () => 'one'], [2, () => 'two'], [3, () => 'three'])).toBe('one');
  expect(match(2)(['_', () => 'None'], [1, () => 'one'], [2, () => 'two'], [3, () => 'three'])).toBe('two');
  expect(match(3)(['_', () => 'None'], [1, () => 'one'], [2, () => 'two'], [3, () => 'three'])).toBe('three');
  expect(
    match(-0)(['_', () => 'None'], [0, () => 'zero'], [1, () => 'one'], [2, () => 'two'], [-0, () => 'Minus Zero'])
  ).toBe('Minus Zero');
});

test('matches string', () => {
  expect(match('one')(['_', () => 0], ['one', () => 1], ['two', () => 2], ['three', () => 3])).toBe(1);
  expect(match('')(['_', () => false], ['', () => true], ['two', () => false], ['three', () => false])).toBe(true);
});
