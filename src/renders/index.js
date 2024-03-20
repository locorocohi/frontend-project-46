import jsonRender from './jsonRender';

const dataType = {
  json: jsonRender
};

export default (data, type) => dataType[type](data);