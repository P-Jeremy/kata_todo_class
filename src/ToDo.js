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
      if (typeof item === 'string') {
        this.id = _generateId();
      } else {
        this.id = item.checked ? _generateId() : item.id;
      }
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

function _getIndexFromArray(array, id) {
  let itemIndex;
  array.some((element, index) => {
    if (element.id === id) {
      itemIndex = index;
    }
  });

  return itemIndex;
}

function _isIndexANumber(index) {
  return typeof index === 'number';
}

function _removeItemFromTodo(array, id) {
  const itemIndex = _getIndexFromArray(array, id);
  if (_isIndexANumber(itemIndex)) {
    array.splice(itemIndex, 1);
    return true;
  }

  return false;
}

function _isIdAString(id) {
  return typeof id === 'string';
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

  remove(element) {
    if (_isParameterAnInstanceOfClassOrAString(Item, element)) {
      if (_isIdAString(element)) {
        return _removeItemFromTodo(this, element);
      }
      return _removeItemFromTodo(this, element.id);
    }
    return false;
  }

  toJSON() {
    return {
      title: this.title,
      items: [...this],
    };
  }
}

module.exports = {
  Item,
  ToDo,
};
