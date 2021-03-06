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
      this.id = _generateId();
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

class ToDo extends Array {
  constructor(title) {
    super();
    this.title = title;
  }

  length() {
    return 0;
  }
}

module.exports = {
  Item,
  ToDo,
};
