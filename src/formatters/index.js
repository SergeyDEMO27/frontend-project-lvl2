import plain from './plain.js';
import stylish from './stylish.js';

export default (diffTree, format) => {
  switch (format) {
    case 'plain':
      return plain(diffTree);
    case 'json':
      return JSON.stringify(diffTree);
    default:
      return stylish(diffTree);
  }
};
