export default class FormMatrix {
  constructor (data, query) {
    this.data = data;
    this.updateByQuery(query);
  }

  updateByQuery (query) {
    const q = { ...query };
    updateTreeByQuery(this.data.matrix, q);
    updateListByQuery(this.getInputs(), q);
    updateListByQuery(this.getCriteria(), q);
  }

  getSubmatrixByDepth (depth) {
    return getByDepth(this.data.matrix, depth);
  }

  getInputs () {
    return mapList(getEntry(this.data.matrix, 'inputs'), this.data.legend.inputs);
  }

  getCriteria () {
    return mapList(getEntry(this.data.matrix, 'criteria'), this.data.legend.criteria);
  }

  getValues () {
    return Object.assign(
      getTreeValues(this.data.matrix),
      getListValues(this.getInputs()),
      getListValues(this.getCriteria())
    );
  }
};

function updateTreeByQuery (matrix, query) {
  const keys = Object.keys(query);
  if (matrix.model && keys.includes(matrix.model.name)) {
    matrix.model.value = query[matrix.model.name] || matrix.model.value;
    delete query[matrix.model.name];
    updateTreeByQuery(getSubMatrix(matrix, matrix.model.value), query);
  }
}

function updateListByQuery (inputs, query) {
  const keys = Object.keys(query);
  inputs.forEach((input) => {
    if (keys.includes(input.model.name)) {
      input.model.value = input.model.type(query[String(input.model.name)]);
    }
  });
}

function getByDepth (matrix, depth) {
  if (depth > 0) {
    depth--;
    return getByDepth(getSubMatrix(matrix), depth);
  }
  return matrix;
}

function getEntry (matrix, key) {
  const options = getOption(matrix);
  if (options.matrix) {
    return getEntry(options.matrix, key) || options[String(key)];
  }
  return options[String(key)];
}

function mapList (list, legend) {
  return list.map((input) => {
    if (typeof input === 'string' || input instanceof String) {
      return legend.find(item => item.model.name === input);
    }
    return input;
  }).filter(n => n);
}

function getTreeValues (matrix, query = {}) {
  if (matrix.model) {
    query[String(matrix.model.name)] = matrix.model.value;
    return getTreeValues(getSubMatrix(matrix), query);
  }
  return query;
}

function getListValues (list) {
  return list.reduce((result, input) => {
    result[String(input.model.name)] = input.model.value;
    return result;
  }, {});
}

function getSubMatrix (matrix, value) {
  return (getOption(matrix, value) || { matrix: null }).matrix || { model: null };
}

function getOption (matrix, value) {
  return (matrix.options || []).find(option => option.value === (value || matrix.model.value));
}
