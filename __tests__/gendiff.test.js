import path from 'path';
import fs from 'fs';
import { cwd } from 'process';
import genDiff from '../src/index.js';

const plainResult = fs
  .readFileSync(path.resolve(cwd(), '__tests__/__fixtures__', 'plain.diff'), 'utf8');
const recurciveResult = fs
  .readFileSync(path.resolve(cwd(), '__tests__/__fixtures__', 'recurciveResult.diff'), 'utf8');
const jsonResult = fs
  .readFileSync(path.resolve(cwd(), '__tests__/__fixtures__', 'json.diff'), 'utf8');

// const plainResult = fs
//   .readFileSync(path.resolve(__dirname, './__fixtures__/plain.diff'), 'utf8');
// const recurciveResult = fs
//   .readFileSync(path.resolve(__dirname, './__fixtures__/recurciveResult.diff'), 'utf8');
// const jsonResult = fs
//   .readFileSync(path.resolve(__dirname, './__fixtures__/json.diff'), 'utf8');

test('genDiff JSON plain', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(plainResult);
});

test('genDiff YML plain', () => {
  expect(genDiff('file1.yml', 'file2.yml', 'plain')).toEqual(plainResult);
});

test('genDiff JSON nested', () => {
  expect(genDiff('file1.json', 'file2.json', 'stylish')).toEqual(recurciveResult);
});

test('genDiff YML nested', () => {
  expect(genDiff('file1.yml', 'file2.yml', 'stylish')).toEqual(recurciveResult);
});

test('genDiff JSON json', () => {
  expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(jsonResult);
});

test('genDiff YML json', () => {
  expect(genDiff('file1.yml', 'file2.yml', 'json')).toEqual(jsonResult);
});
