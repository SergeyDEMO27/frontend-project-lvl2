import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const createDiff = (fileOne, fileTwo) => {
  const allFileKeys = [...Object.keys(fileOne), ...Object.keys(fileTwo)];
  const uniqueFileKeys = allFileKeys.reduce((acc, key) => {
    if (!acc.includes(key)) {
      acc.push(key);
    }
    return acc;
  }, []);
  const result = uniqueFileKeys.reduce((acc, key) => {
    if (!_.has(fileOne, key)) {
      acc.push([`  + ${key}: ${fileTwo[key]}`]);
      return acc;
    } if (!_.has(fileTwo, key)) {
      acc.push([`  - ${key}: ${fileOne[key]}`]);
      return acc;
    } if (_.has(fileOne, key) && _.has(fileTwo, key) && fileOne[key] === fileTwo[key]) {
      acc.push([`    ${key}: ${fileOne[key]}`]);
      return acc;
    }
    acc.push([`  - ${key}: ${fileOne[key]}`], [`  + ${key}: ${fileTwo[key]}`]);
    return acc;
  }, [['{']]);
  result.push(['}']);
  return result.join('\n');
};

const genDiff = (fileOne, fileTwo) => {
  const fileOneData = fs.readFileSync(path.resolve(fileOne), 'utf-8');
  const fileTwoData = fs.readFileSync(path.resolve(fileTwo), 'utf-8');

  const fileOneParce = JSON.parse(fileOneData);
  const fileTwoParce = JSON.parse(fileTwoData);

  return createDiff(fileOneParce, fileTwoParce);
};

export default genDiff;
