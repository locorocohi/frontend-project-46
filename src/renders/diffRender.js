import _ from 'lodash';

const tab = num => ' '.repeat(num * 2);

const stringify = (data, level) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const inner = keys.map((item) => {
    if (!_.isObject(item)) {
      return `${tab(level + 2)}${item}: ${stringify(data[item])}`;
    }
    level += 1;
    return `${tab(level + 2)}${item}: ${stringify(item, level)}`;
  });
  return _.flattenDeep(['{', inner, `${tab(level + 1)}}`]).join('\n');
};

const render = (item, depth = 1) => {
  const {
    type, key, beforeValue, afterValue, children, value,
  } = item;
  switch (type) {
    case 'object':
      return [`${tab(depth)}  ${key}: {`,
        ...children.map(node => render(node, depth + 1)),
        `${tab(depth + 1)}}`];
    case 'unchanged':
      return `${tab(depth)}    ${key}: ${stringify(value, depth)}`;
    case 'changed':
      return [`${tab(depth + 1)}- ${key}: ${stringify(beforeValue, depth)}`,
        `${tab(depth + 1)}+ ${key}: ${stringify(afterValue, depth)}`];
    case 'deleted':
      return `${tab(depth + 1)}- ${key}: ${stringify(value, depth)}`;
    case 'added':
      return `${tab(depth + 1)}+ ${key}: ${stringify(value, depth)}`;
    default:
      throw new Error('Type error');
  }
}; // function render

export default ast => _.flattenDeep(['{', ast.map(item => render(item)), '}']).join('\n');