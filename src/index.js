import fs from 'fs';
import path from 'path';
import getAst from './getAst.js';
import render from './formaters/index.js';
import getParsedObject from './parsers.js';

const genDiff = (path1, path2, type = 'stylish') => {
  const data1 = fs.readFileSync(`${path1.toString().trim()}`, 'utf8');
  const data2 = fs.readFileSync(`${path2.toString().trim()}`, 'utf8');

  const firstExtension = path.extname(path1).slice(1);
  const secondExtension = path.extname(path2).slice(1);

  const firstObjectData = getParsedObject(data1, firstExtension);
  const secondObjectData = getParsedObject(data2, secondExtension);

  const ast = getAst(firstObjectData, secondObjectData);

  return render(ast, type);
};

export default genDiff;
