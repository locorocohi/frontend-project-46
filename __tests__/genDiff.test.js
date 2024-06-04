import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = '__tests__/';

describe('It works', () => {
  test('tree', () => {
    const before = `${path}filepath1.json`;
    const after = `${path}filepath2.json`;
    const content = fs.readFileSync(`${__dirname}/expectedPath.txt`, 'utf-8').trim();
    expect(genDiff(before, after)).toEqual(content);
  });
  test('plain', () => {
    const before = `${path}filepath1.json`;
    const after = `${path}filepath2.json`;
    const content = fs.readFileSync(`${__dirname}/expectedPlain.txt`, 'utf-8').trim();
    expect(genDiff(before, after, 'plain')).toEqual(content);
  });
  test('jsonOutput', () => {
    const before = `${path}filepath1.json`;
    const after = `${path}filepath2.json`;
    const content = fs.readFileSync(`${__dirname}/expectedJson.txt`, 'utf-8').trim();
    expect(genDiff(before, after, 'json')).toEqual(content);
  });
});
