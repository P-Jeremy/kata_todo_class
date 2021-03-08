class Item {
  constructor(item) {
    if (item && _isParameterAnItemObjectOrAString(item)) {
      this.content = item.content || item;
      this.checked = item.checked || false;
      if (_isParamString(item)) {
        this.id = _generateId();
      } else {
        this.id = item.checked ? _generateId() : item.id;
      }
    } else {
      throw new Error('Item must be created with a non empty string');
    }
  }

  toggle(...args) {
    if (_isDataDefined(args)) {
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
  constructor(title, data) {
    super();
    if (typeof title === 'string') {
      this.title = title;
    } else {
      this.title = '';
    }
    if (_isDataDefined(data)) {
      _pushItemsFromArrayInTodo(this, data);
    }
  }

  add(newElement) {
    if (newElement && _isParameterAnItemObjectOrAString(newElement)) {
      const item = new Item(newElement);
      _pushItemsFromArrayInTodo(this, [item]);
      return item;
    }
    throw new Error('ToDo can be filled only with `string`s or `Item`s');
  }

  remove(param) {
    if (param && _isParameterAnItemObjectOrAString(param)) {
      if (_isParamString(param)) {
        return _removeItemFromTodo(this, param);
      }
      return _removeItemFromTodo(this, param.id);
    }
    return false;
  }

  toJSON() {
    return {
      title: this.title,
      items: [...this],
    };
  }

  concat(...args) {
    const newTodo = Array.prototype.concat.call(this, ...args);
    return new ToDo('', newTodo);
  }

  fill(...args) {
    if (!_isParameterAnItemObjectOrAString(args[0])) {
      args[0] = undefined;
    }
    if (_isParamString(args[0])) {
      args[0] = new Item(args[0]);
    }

    return Array.prototype.fill.call(this, ...args);
  }
}

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

function _isParameterAnItemObjectOrAString(param) {
  return (param instanceof Item || typeof param === 'string');
}

function _isDataDefined(data) {
  return data && data.length;
}

function _pushItemsFromArrayInTodo(todo, data) {
  for (let index = 0; index < data.length; index += 1) {
    if (_isParamString(data[index])) {
      todo.push(new Item(data[index]));
    }
    if (_isParamItem(data[index])) {
      if ((data[index].checked)) {
        todo.push(new Item(data[index]));
      }
      todo.push(data[index]);
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

function _isParamString(param) {
  return typeof param === 'string';
}

function _isParamItem(param) {
  return param instanceof Item;
}

module.exports = {
  Item,
  ToDo,
};
