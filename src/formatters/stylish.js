import _ from 'lodash';

const makeTabs = (level) => ('    '.repeat(level));

const stringify = (value, spaces = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lines = _.keys(value).map((node) => `${makeTabs(spaces)}    ${node}: ${stringify(value[node], spaces + 1)}`);
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${makeTabs(spaces)}}`;
};

const stylishFormater = (diff, spaces = 0) => {
  const tabs = makeTabs(spaces);
  const getStrings = (val) => stringify(val, spaces + 1);
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
        return `${tabs}    ${node.name}: ${stylishFormater(node.children, spaces + 1)}`;
      default:
        throw new Error(`${node.type} is wrong type`);
    }
  });
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${tabs}}`;
};

export default stylishFormater;
