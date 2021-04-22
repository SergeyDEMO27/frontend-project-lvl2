import path from 'path';
import genDiff from '../index.js';


const fileOneJson = path.resolve(__dirname, `./__fixtures__/fileOne.json`);
const fileTwoJson = path.resolve(__dirname, `./__fixtures__/fileTwo.json`);
const fileOneYml = path.resolve(__dirname, './__fixtures__/fileOne.yml');
const fileTwoYml = path.resolve(__dirname, './__fixtures__/fileTwo.yml');


test('test difference between two yml files', () => {
  const expectedDifference = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  expect(genDiff(fileOneYml, fileTwoYml)).toEqual(expectedDifference);
});


test('test difference between two json files', () => {
  const expectedDifference = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}`;
  expect(genDiff(fileOneJson, fileTwoJson)).toEqual(expectedDifference);
});