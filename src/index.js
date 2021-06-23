import fs from 'fs';
import path from 'path';
import findDiff from './findDiff.js';
import render from './formatters/index.js';
import parse from './parsers.js';

const readFile = (file) => fs.readFileSync(path.resolve(process.cwd(), './__tests__/__fixtures__', file), 'utf-8');
const getExt = (file) => path.extname(file);

export default (fileOne, fileTwo, format = 'stylish') => {
  const dataOne = readFile(fileOne);
  const dataTwo = readFile(fileTwo);
  const extOne = getExt(fileOne);
  const extTwo = getExt(fileTwo);
  const fileOneParsed = parse(dataOne, extOne);
  const fileTwoParsed = parse(dataTwo, extTwo);
  const diff = findDiff(fileOneParsed, fileTwoParsed);
  return render(diff, format);
};
