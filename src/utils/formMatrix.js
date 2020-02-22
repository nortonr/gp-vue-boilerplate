export default {
  getOption (matrix, value) {
    return (matrix.options || []).find(option => option.value === (value || matrix.model.value));
  },

  getSubMatrix (matrix, value) {
    return (this.getOption(matrix, value) || { matrix: null }).matrix || { model: null };
  },

  updateByQuery (matrix, query) {
    const keys = Object.keys(query);
    for (let i = 0; i < keys.length; i++) {
      if (matrix.model && matrix.model.name === keys[Number(i)]) {
        matrix.model.value = query[keys[Number(i)]] || matrix.model.value;
        delete query[keys[Number(i)]];
        this.updateByQuery(this.getSubMatrix(matrix, matrix.model.value), query);
      }
    }
    return matrix;
  },

  getByDepth (matrix, depth) {
    if (depth > 0) {
      depth--;
      return this.getByDepth(this.getSubMatrix(matrix), depth);
    }
    return matrix;
  },

  getInputs (matrix) {
    const options = this.getOption(matrix);
    if (options.matrix) {
      return this.getInputs(options.matrix) || options.inputs;
    }
    return options.inputs;
  },

  getValues (matrix, query = {}) {
    if (matrix.model) {
      query[String(matrix.model.name)] = matrix.model.value;
      return this.getValues(this.getSubMatrix(matrix), query);
    }
    return query;
  }
};
