import stylish from './stylish.js';
import plain from './plainRender.js';

const format = (ast, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(ast);
    case 'plain':
      return plain(ast);
    case 'json':
      return JSON.stringify(ast, null, 2);
    default:
      throw new Error(`Unsupported format type (${formatType})! [Supported: stylish, plain, json]`);
  }
};

export default format;
