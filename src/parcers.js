import yamlParce from 'js-yaml';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';


const getExtension = (file) => _.trim(path.extname(file), '.');
const getData = (file) => fs.readFileSync(path.resolve(file), 'utf-8');

export default (file) => {
  const data = getData(file);
  const extension = getExtension(file);
  switch (extension) {
      case 'json':
        return JSON.parse(data);
      case 'yml':
        return yamlParce.safeLoad(data);
  }
};