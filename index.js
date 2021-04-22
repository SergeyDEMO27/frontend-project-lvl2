import _ from 'lodash';
import parse from './src/parcers.js';

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
  }, []);
  return `{\n${result.join('\n')}\n}`;
};

const genDiff = (fileOne, fileTwo) => {
  const fileOneParced = parse(fileOne);
  const fileTwoParced = parse(fileTwo);

  return createDiff(fileOneParced, fileTwoParced);
};

export default genDiff;
