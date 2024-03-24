import jsonRender from './jsonRender.js';
import diffRender from './diffRender.js'
import plainRender from './plainRender.js'

const dataType = {
  diff: diffRender,
  json: jsonRender,
  plain: plainRender
};


export default (data, type) => dataType[type](data);