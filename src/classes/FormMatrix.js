export default class FormMatrix {
  constructor (data, query) {
    this.data = data;
    this.updateByQuery(query);
  }

  updateByQuery (query) {
    const q = { ...query };
    updateTreeByQuery(this.data.matrix, q);
    updateListByQuery(flatInputs(this.getInputs()), q);
    updateListByQuery(this.getCriteria(), q);
  }

  getSubmatrixByDepth (depth) {
    return getByDepth(this.data.matrix, depth);
  }

  getInputs () {
    return mapGroups(getEntry(this.data.matrix, 'inputs'), this.data.legend.inputs);
  }

  getCriteria () {
    return mapList(getEntry(this.data.matrix, 'criteria'), this.data.legend.criteria);
  }

  getValues () {
    return Object.assign(
      getTreeValues(this.data.matrix),
      getListValues(flatInputs(this.getInputs())),
      getListValues(this.getCriteria())
    );
  }
};

function flatInputs (groups) {
  const list = groups.reduce((result, group) => {
    return result.concat(group.list);
  }, []);
  return uniqueObjectList(list);
}

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
  return list.map((item) => {
    let config = item.config;
    if (typeof config === 'string' || config instanceof String) {
      config = legend.find(item => item.model.name === config);
    }
    return Object.assign({ class: item.class }, config);
  });
}

function mapGroups (groups, legend) {
  return groups.reduce((result, group) => {
    if (typeof group !== 'string' && !(group instanceof String)) {
      result.push({ class: group.class, list: mapList(group.list, legend) });
    }
    return result;
  }, []);
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

function uniqueObjectList (list) {
  return [
    ...new Map(list.map(item => [
      item.model.name, item
    ])).values()
  ];
}
