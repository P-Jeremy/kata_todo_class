function _generateId() {
  const alphabetChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const alphaNumChar = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  id += alphabetChar[Math.floor(Math.random() * alphabetChar.length)];
  for (let index = 0; index < 7; index += 1) {
    id += alphaNumChar[Math.floor(Math.random() * alphaNumChar.length)];
  }
  return id;
}

function _isParameterAnInstanceOfClassOrAString(classToCheck, param) {
  return (typeof param === 'string' || (param instanceof classToCheck));
}

class Item {
  constructor(item) {
    if (_isParameterAnInstanceOfClassOrAString(Item, item)) {
      this.content = item.content || item;
      this.checked = item.checked || false;
      this.id = item.id || _generateId();
    } else {
      throw new Error('Item must be created with a non empty string');
    }
  }

  toggle(...args) {
    if (args.length) {
      this.checked = Boolean(args[0]);
      return this.checked;
    }
    this.checked = !this.checked;
    return this.checked;
  }

  toString() {
    return this.content;
  }
}

function _isData(data) {
  return data && data.length;
}

function _pushItemInTodo(todo, data) {
  for (let index = 0; index < data.length; index += 1) {
    if (typeof data[index] === 'string' || data[index] instanceof Item) {
      todo.push(new Item(data[index]));
    }
  }
}

class ToDo extends Array {
  constructor(title, data) {
    super();
    if (typeof title === 'string') {
      this.title = title;
    } else {
      this.title = '';
    }
    if (_isData(data)) {
      _pushItemInTodo(this, data);
    }
  }

  add(newElement) {
    if (_isParameterAnInstanceOfClassOrAString(Item, newElement)) {
      const item = new Item(newElement);
      _pushItemInTodo(this, [item]);
      return item;
    }
    throw new Error('ToDo can be filled only with `string`s or `Item`s');
  }
}

module.exports = {
  Item,
  ToDo,
};
