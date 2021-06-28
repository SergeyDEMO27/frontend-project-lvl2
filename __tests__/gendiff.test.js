import path from 'path';
import fs from 'fs';
import { cwd } from 'process';
import genDiff from '../src/index.js';

const getFixturePath = (fileName) => path.resolve(cwd(), '__tests__/__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf8');

describe('genDiff', () => {
  const stylishDiff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const plainDiff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  const jsonDiff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  const stylishResult = readFile('stylishResult.diff');
  const plainResult = readFile('plainResult.diff');
  const jsonResult = readFile('jsonResult.diff');
  test.each([
    [stylishResult, stylishDiff],
    [plainResult, plainDiff],
    [jsonResult, jsonDiff],
  ])('compare two JSON and yaml files', (a, expected) => {
    expect(a).toBe(expected);
  });
});
