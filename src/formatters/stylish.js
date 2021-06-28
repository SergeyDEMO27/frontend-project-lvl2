import _ from 'lodash';

const makeTabs = (spaces) => ('    '.repeat(spaces));

const makeString = (value, spaces = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lines = _.keys(value).map((node) => `${makeTabs(spaces)}    ${node}: ${makeString(value[node], spaces + 1)}`);
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${makeTabs(spaces)}}`;
};

const buildTreeFormat = (diff, spaces = 0) => {
  const lines = diff.map((node) => {
    const buildLine = (char, value) => `${makeTabs(spaces)}  ${char} ${node.name}: ${makeString(value, spaces + 1)}`;
    switch (node.type) {
      case 'changed':
        return `${makeTabs(spaces)}  - ${node.name}: ${makeString(node.value1, spaces + 1)}\n ${makeTabs(spaces)} + ${node.name}: ${makeString(node.value2, spaces + 1)}`;
      case 'unchanged':
        return buildLine(' ', node.value);
      case 'added':
        return buildLine('+', node.value);
      case 'removed':
        return buildLine('-', node.value);
      case 'nested':
        return `${makeTabs(spaces)}    ${node.name}: ${buildTreeFormat(node.children, spaces + 1)}`;
      default:
        throw new Error(`${node.type} is wrong type`);
    }
  });
  const innerValue = lines.join('\n');
  return `{\n${innerValue}\n${makeTabs(spaces)}}`;
};

export default buildTreeFormat;
