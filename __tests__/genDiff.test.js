import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = '__fixtures__/';

const expectedPath = fs.readFileSync(`${__dirname}/../__fixtures__/expectedPath.txt`, 'utf-8').trim();
const expectedPlain = fs.readFileSync(`${__dirname}/../__fixtures__/expectedPlain.txt`, 'utf-8').trim();
const expectedJson = fs.readFileSync(`${__dirname}/../__fixtures__/expectedJson.txt`, 'utf-8').trim();

const testFormats = ['json', 'yml'];
describe('It works', () => {
  test.each(testFormats)('%s', (format) => {
    const before = `${path}filepath1.${format}`;
    const after = `${path}filepath2.${format}`;
    expect(genDiff(before, after)).toEqual(expectedPath);
    expect(genDiff(before, after, 'stylish')).toEqual(expectedPath);
    expect(genDiff(before, after, 'plain')).toEqual(expectedPlain);
    expect(genDiff(before, after, 'json')).toEqual(expectedJson);
  });
});
