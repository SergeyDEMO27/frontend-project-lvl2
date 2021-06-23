import _ from 'lodash';

const getNodeName = (node, ancestor) => {
  if (ancestor === '') {
    return `${node.name}`;
  }
  return `${ancestor}.${node.name}`;
};

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (diff, ancestor = '') => {
  const result = diff
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      switch (node.type) {
        case 'removed':
          return `Property '${getNodeName(node, ancestor)}' was removed`;
        case 'changed':
          return `Property '${getNodeName(node, ancestor)}' was updated. From ${getValue(node.valueBefore)} to ${getValue(node.valueAfter)}`;
        case 'added':
          return `Property '${getNodeName(node, ancestor)}' was added with value: ${getValue(node.value)}`;
        case 'nested':
          return formatPlain(node.children, getNodeName(node, ancestor));
        default:
          throw new Error('Unknown node status');
      }
    });
  return result.join('\n');
};

export default formatPlain;
