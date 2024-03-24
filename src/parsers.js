import YAML from 'yaml'

const dataType = {
  '.json': JSON.parse,
  '.yaml': YAML.parse,
  '.yml': YAML.parse,
};

export default (data, type) => dataType[type](data);