import jsonRender from './jsonRender.js';
import diffRender from './diffRender.js'

const dataType = {
  diff: diffRender,
  json: jsonRender
};

export default (data, type) => dataType[type](data);