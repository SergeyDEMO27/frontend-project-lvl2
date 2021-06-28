import _ from 'lodash';

const findDiff = (dataOne, dataTwo) => {
  const keys = _.union(_.keys(dataOne), _.keys(dataTwo));
  const sortedKeys = _.orderBy(keys);
  const result = sortedKeys.map((node) => {
    if (!_.has(dataOne, node)) {
      return { name: node, type: 'added', value: dataTwo[node] };
    }
    if (!_.has(dataTwo, node)) {
      return { name: node, type: 'removed', value: dataOne[node] };
    }
    if (_.isPlainObject(dataOne[node]) && _.isPlainObject(dataTwo[node])) {
      return { name: node, type: 'nested', children: findDiff(dataOne[node], dataTwo[node]) };
    }
    if (!_.isEqual(dataOne[node], dataTwo[node])) {
      return {
        name: node,
        type: 'changed',
        value1: dataOne[node],
        value2: dataTwo[node],
      };
    }
    return { name: node, type: 'unchanged', value: dataOne[node] };
  });
  return result;
};

export default findDiff;
