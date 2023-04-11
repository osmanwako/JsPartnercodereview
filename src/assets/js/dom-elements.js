export const btnclear = document.getElementById('cleartodolist');
export const stack = document.getElementById('todolistid');
export const input = document.getElementById('todo-input');
export const entericon = document.getElementById('enterkey-icon');

export const divunchecked = () => {
  const div = document.createElement('div');
  div.className = 'row show-unchecked';
  return div;
};

export const divchecked = () => {
  const div = document.createElement('div');
  div.className = 'row show-checked';
  return div;
};

export const btnchecked = () => {
  const btn = document.createElement('button');
  btn.className = 'row-button button-checked btn-checkbox';
  btn.innerHTML = '&#10004;';
  btn.name = 'checked';
  return btn;
};

export const btnunchecked = () => {
  const btn = document.createElement('button');
  btn.className = 'row-button button-unchecked btn-checkbox';
  btn.innerHTML = '&#9744;';
  btn.name = 'unchecked';
  return btn;
};

export const ptodo = () => {
  const par = document.createElement('p');
  par.className = 'row-par par-todo';
  par.setAttribute('contenteditable', 'true');
  return par;
};

export const btntrash = () => {
  const btn = document.createElement('button');
  btn.className = 'row-button button-trash material-icons';
  btn.innerHTML = '&#xe872;';
  btn.name = 'buttontrash';
  return btn;
};

export const btndarg = () => {
  const btn = document.createElement('button');
  btn.className = 'row-button button-drag material-icons';
  btn.innerHTML = '&#8942;';
  btn.name = 'buttondrag';
  return btn;
};
