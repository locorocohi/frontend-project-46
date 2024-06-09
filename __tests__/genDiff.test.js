import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path = '__fixtures__/';

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readContent = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const expectedPath = readContent('expectedPath.txt');
const expectedPlain = readContent('expectedPlain.txt');
const expectedJson = readContent('expectedJson.txt');

const testFormats = ['json', 'yml'];
describe('It works', () => {
  test.each(testFormats)('%s', (format) => {
    const first = `${path}filepath1.${format}`;
    const second = `${path}filepath2.${format}`;
    expect(genDiff(first, second)).toEqual(expectedPath);
    expect(genDiff(first, second, 'stylish')).toEqual(expectedPath);
    expect(genDiff(first, second, 'plain')).toEqual(expectedPlain);
    expect(genDiff(first, second, 'json')).toEqual(expectedJson);
  });
});
