import plain from './plain.js';
import stylish from './stylish.js';

const formatter = (format) => {
  switch (format) {
    case 'plain':
      return plain;
    case 'json':
      return JSON.stringify;
    default:
      return stylish;
  }
};

export default (diff, format) => {
  const currentFormatter = formatter(format);
  return currentFormatter(diff);
};
