import path from 'path';
import fs from 'fs';
import { cwd } from 'process';
import genDiff from '../src/index.js';

const getResultFile = (fileName) => fs
  .readFileSync(path.resolve(cwd(), '__tests__/__fixtures__', fileName), 'utf8');

describe('genDiff', () => {
  const stylishDiff = genDiff('file1.json', 'file2.json', 'stylish');
  const plainDiff = genDiff('file1.json', 'file2.json', 'plain');
  const jsonDiff = genDiff('file1.json', 'file2.json', 'json');
  const stylishResult = getResultFile('stylishResult.diff');
  const plainResult = getResultFile('plainResult.diff');
  const jsonResult = getResultFile('jsonResult.diff');
  test.each([
    [stylishResult, stylishDiff],
    [plainResult, plainDiff],
    [jsonResult, jsonDiff],
  ])('compare two JSON and yaml files', (a, expected) => {
    expect(a).toBe(expected);
  });
});
