import YAML from 'yaml';

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return YAML.parse(data);
    default:
      throw new Error(`unexpected format ${format}`);
  }
};

export default parse;
