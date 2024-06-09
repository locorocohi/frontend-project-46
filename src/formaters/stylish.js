import _ from 'lodash';

const stringify = (value, currentDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indent = '    '.repeat(depth);
    const bracketIndent = '    '.repeat(depth - 1);
    const lines = Object.entries(currentValue).map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, currentDepth);
};

const createIdent = (depth) => ' '.repeat(depth * 4 - 2);

const stylish = (diff) => {
  const iter = (currentNode, depth) => {
    const indent = createIdent(depth);
    const bracketIndent = '    '.repeat(depth - 1);
    const lines = currentNode.map((node) => {
      const [key, type] = [node.key, node.type];

      switch (type) {
        case 'added':
          return `${indent}+ ${key}: ${stringify(node.value, depth + 1)}`;
        case 'removed':
          return `${indent}- ${key}: ${stringify(node.value, depth + 1)}`;
        case 'unchanged':
          return `${indent}  ${key}: ${stringify(node.value, depth + 1)}`;
        case 'updated':
          return [
            `${indent}- ${key}: ${stringify(node.data1, depth + 1)}`,
            `${indent}+ ${key}: ${stringify(node.data2, depth + 1)}`,
          ].join('\n');
        case 'nested':
          return `${indent}  ${key}: ${iter(node.children, depth + 1)}`;
        default:
          throw new Error(`Unsupported node type (${type})!`);
      }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(diff, 1);
};

export default stylish;
