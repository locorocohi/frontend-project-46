import _ from 'lodash';

const getAst = (data1, data2) => {
  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const allKeysSorted = _.sortBy(allKeys);

  return allKeysSorted.map((key) => {
    if (!_.has(data1, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        type: 'removed',
        value: data1[key],
      };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return {
        key,
        type: 'unchanged',
        value: data1[key],
      };
    }
    if (!_.isPlainObject(data1[key]) || !_.isPlainObject(data2[key])) {
      return {
        key,
        type: 'updated',
        data1: data1[key],
        data2: data2[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        type: 'nested',
        children: getAst(data1[key], data2[key]),
      };
    }
    throw new Error('Unexpected error when constructing abstract syntax tree (AST)');
  });
};

export default getAst;
