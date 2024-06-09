import _ from 'lodash';

const stringifyToPlain = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const plain = (diff) => {
  const iter = (curNode, prevPath) => {
    const lines = curNode.map((node) => {
      const [key, type] = [node.key, node.type];
      const curPath = [...prevPath, key];
      const baseLine = `Property '${curPath.join('.')}' was ${type}`;
      switch (type) {
        case 'added':
          return `${baseLine} with value: ${stringifyToPlain(node.value)}`;
        case 'removed':
          return `${baseLine}`;
        case 'unchanged':
          return null;
        case 'updated':
          return `${baseLine}. From ${stringifyToPlain(node.data1)} to ${stringifyToPlain(node.data2)}`;
        case 'nested':
          return iter(node.children, curPath);
        default:
          throw new Error(`Unsupported node type (${type})!`);
      }
    });

    return lines.filter((line) => line !== '' && line !== null).join('\n');
  };

  return iter(diff, '');
};

export default plain;
