import fs from 'fs';
import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = '__tests__/__fixtures__/';

describe('It works', () => {
  test('tree', () => {
    const before = `${path}filepath1.json`;
    const after = `${path}filepath2.json`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expectedPath.txt`, 'utf-8').trim();
    expect(genDiff(before, after)).toEqual(content);
  });
  test('plain', () => {
    const before = `${path}filepath1.json`;
    const after = `${path}filepath2.json`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expectedPlain.txt`, 'utf-8').trim();
    expect(genDiff(before, after, 'plain')).toEqual(content);
  });
  test('jsonOutput', () => {
    const before = `${path}filepath1.json`;
    const after = `${path}filepath2.json`;
    const content = fs.readFileSync(`${__dirname}/__fixtures__/expectedJson.txt`, 'utf-8').trim();
    expect(genDiff(before, after, 'json')).toEqual(content);
  });
});