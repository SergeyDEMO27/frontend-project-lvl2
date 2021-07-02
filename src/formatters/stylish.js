import _ from 'lodash';

const makeTabs = (level) => ('    '.repeat(level));

const stringify = (value, level = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lines = _.keys(value).map((node) => `${makeTabs(level)}    ${node}: ${stringify(value[node], level + 1)}`);
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${makeTabs(level)}}`;
};

const stylishFormater = (diff, level = 0) => {
  const tabs = makeTabs(level);
  const getStrings = (val) => stringify(val, level + 1);
  const lines = diff.map((node) => {
    const buildLine = (char, value) => `${tabs}  ${char} ${node.name}: ${getStrings(value)}`;
    switch (node.type) {
      case 'changed':
        return `${tabs}  - ${node.name}: ${getStrings(node.value1)}\n ${tabs} + ${node.name}: ${getStrings(node.value2)}`;
      case 'unchanged':
        return buildLine(' ', node.value);
      case 'added':
        return buildLine('+', node.value);
      case 'removed':
        return buildLine('-', node.value);
      case 'nested':
        return `${tabs}    ${node.name}: ${stylishFormater(node.children, level + 1)}`;
      default:
        throw new Error(`${node.type} is wrong type`);
    }
  });
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${tabs}}`;
};

export default stylishFormater;
