import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import findDiff from './findDiff.js';
import parse from './parsers.js';
import formater from './formatters/index.js';

const readFile = (fileName) => fs.readFileSync(path.resolve(cwd(), fileName), 'utf-8');
const getFileExtention = (fileName) => path.extname(fileName);

export default (fileOne, fileTwo, format = 'stylish') => {
  const fileOneContent = readFile(fileOne);
  const fileTwoContent = readFile(fileTwo);
  const [, fileOneFormat] = getFileExtention(fileOne).split('.');
  const [, fileTwoFormat] = getFileExtention(fileTwo).split('.');
  const fileOneData = parse(fileOneContent, fileOneFormat);
  const fileTwoData = parse(fileTwoContent, fileTwoFormat);
  const diff = findDiff(fileOneData, fileTwoData);
  return formater(diff, format);
};
