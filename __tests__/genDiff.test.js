import fs from 'fs';
import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = '__tests__/__fixtures__/';

describe('It works', () => {
  test('json', () => {
    const before = `${path}file1.json`;
    const after = `${path}file2.json`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`, 'utf-8').trim();
    expect(genDiff(before, after)).toEqual(content);
  });
  test('yaml', () => {
    const before = `${path}file1.yaml`;
    const after = `${path}file2.yaml`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expected.txt`, 'utf-8').trim();
    expect(genDiff(before, after)).toEqual(content);
  });
  test('tree', () => {
    const before = `${path}filepath1.json`;
    const after = `${path}filepath2.json`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expectedPath.txt`, 'utf-8').trim();
    expect(genDiff(before, after)).toEqual(content);
  });
});