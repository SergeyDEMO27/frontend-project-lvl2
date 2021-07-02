import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import { cwd } from 'process';
import genDiff from '../src/index.js';

const getFixturePath = (fileName) => path.resolve(cwd(), '__tests__/__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf8');
const fileFormats = ['json', 'yml'];
const resultFormats = ['stylish', 'plain', 'json'];
const fixtures = {};

beforeAll(() => {
  resultFormats.forEach((format) => {
    _.set(fixtures, format, readFile(`result_${format}.txt`));
  });
});

test.each(fileFormats)('compare two JSON and yaml files', (format) => {
  const file1Path = getFixturePath(`file1.${format}`);
  const file2Path = getFixturePath(`file2.${format}`);

  expect(genDiff(file1Path, file2Path)).toBe(fixtures.stylish);
  expect(genDiff(file1Path, file2Path, 'plain')).toBe(fixtures.plain);
  expect(genDiff(file1Path, file2Path, 'json')).toBe(fixtures.json);
});
