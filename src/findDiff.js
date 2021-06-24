import _ from 'lodash';

const findDiff = (dataOne, dataTwo) => {
  const generalKeys = _.union(_.keys(dataOne), _.keys(dataTwo));
  const result = generalKeys.map((node) => {
    if (!_.has(dataOne, node)) {
      return { name: node, type: 'added', value: dataTwo[node] };
    }
    if (!_.has(dataTwo, node)) {
      return { name: node, type: 'removed', value: dataOne[node] };
    }
    if (_.isObject(dataOne[node]) && _.isObject(dataTwo[node])) {
      return { name: node, type: 'nested', children: findDiff(dataOne[node], dataTwo[node]) };
    }
    if ((typeof dataOne[node] !== typeof dataTwo[node])
      || (dataOne[node] !== dataTwo[node])) {
      return {
        name: node,
        type: 'changed',
        valueBefore: dataOne[node],
        valueAfter: dataTwo[node],
      };
    }
    return { name: node, type: 'unchanged', value: dataOne[node] };
  });
  return _.sortBy(result, 'name');
};

export default findDiff;
