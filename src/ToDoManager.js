const { ToDo } = require('./ToDo');

module.exports = class TodoManager extends ToDo {
  static from(data) {
    const todo = new ToDo('', data);
    return todo;
  }
};
