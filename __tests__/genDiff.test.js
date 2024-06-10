import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readContent = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const yaml1 = getFixturePath('filepath1.yml');
const yaml2 = getFixturePath('filepath2.yml');
const json1 = getFixturePath('filepath1.json');
const json2 = getFixturePath('filepath2.json');
const expectedPath = readContent('expectedPath.txt');
const expectedPlain = readContent('expectedPlain.txt');
const expectedJson = readContent('expectedJson.txt');

test.each([
  [yaml1, yaml2, 'stylish', expectedPath],
  [json1, json2, 'stylish', expectedPath],
  [json1, yaml2, 'plain', expectedPlain],
  [json1, json2, 'json', expectedJson],
])('difference %s and %s', (file1, file2, format, expected) => {
  expect(genDiff(file1, file2, format)).toEqual(expected);
});
