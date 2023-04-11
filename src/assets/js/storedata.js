import {
  btnclear,
  stack,
  btnchecked,
  btnunchecked,
  ptodo,
  btndarg,
  btntrash,
  divunchecked,
  divchecked,
  input,
  entericon,
} from './dom-elements.js';
import iscompleted from './update-status.js';

const istoredlist = () => localStorage.getItem('storedtodo');
const storelists = (lists) => {
  lists = lists.map((list, i) => ({ ...list, index: i }));
  localStorage.setItem('storedtodo', JSON.stringify(lists));
};

const addtostorage = (value) => {
  const id = `tdl${Date.now()}`;
  const list = {
    index: 0,
    desc: value,
    completed: false,
    id,
  };
  let lists = [];
  if (istoredlist()) {
    lists = JSON.parse(istoredlist());
    list.index = lists.length;
  }
  lists = [...lists, list];
  storelists(lists);
  return id;
};
const removelist = (id) => {
  if (istoredlist()) {
    let lists = JSON.parse(istoredlist());
    lists = lists.filter((list) => list.id !== id);
    storelists(lists);
  }
};

const listenremove = (event) => {
  const parent = event.srcElement.parentElement;
  parent.remove();
  removelist(parent.id);
};

const updatelist = (id, value) => {
  if (value === '') {
    removelist(id);
    document.getElementById(id).remove();
    return;
  }
  if (istoredlist()) {
    const lists = JSON.parse(istoredlist());
    lists.map((list) => {
      if (list.id === id) {
        list.desc = value;
      }
      return list;
    });
    storelists(lists);
  }
};

const parblur = (event) => {
  const value = event.target.textContent ?? '';
  const { id } = event.target.parentElement;
  updatelist(id, value);
};
const parkeyevent = (event) => {
  const value = event.target.textContent ?? '';
  const parent = event.target.parentElement;
  const { id } = parent;
  if (event.key === 'Enter') {
    input.value = '';
    input.focus();
    updatelist(id, value);
  }
  if (value === '' && event.key === 'Backspace') {
    input.value = '';
    input.focus();
    parent.remove();
    removelist(id);
  }
};
const updatestatus = (id) => {
  if (istoredlist()) {
    let lists = JSON.parse(istoredlist());
    lists = lists.map((list) => {
      if (list.id === id) {
        list.completed = iscompleted(list.completed);
      }
      return list;
    });
    storelists(lists);
  }
};
const showcheckbox = (event) => {
  const parent = event.target.parentElement;
  parent.classList.toggle('show-unchecked');
  parent.classList.toggle('show-checked');
  updatestatus(parent.id);
};

const addlist = () => {
  const value = input.value ?? '';
  if (value) {
    const p = ptodo();
    p.textContent = value;
    p.addEventListener('keydown', parkeyevent);
    p.addEventListener('blur', parkeyevent);
    const trash = btntrash();
    trash.addEventListener('click', listenremove);
    const unchecked = btnunchecked();
    const checked = btnchecked();
    checked.addEventListener('click', showcheckbox);
    unchecked.addEventListener('click', showcheckbox);
    const id = addtostorage(value);
    const div = divunchecked();
    const drag = btndarg();
    div.id = id;
    div.append(checked, unchecked, p, trash, drag);
    stack.insertBefore(div, btnclear);
  }
  input.value = '';
  input.focus();
};

const getenterkey = () => {
  addlist();
};

const getkeycode = (event) => {
  if (event.key === 'Enter') {
    addlist();
  }
};

const createlist = () => {
  const lists = JSON.parse(istoredlist());
  lists.forEach((list) => {
    const p = ptodo();
    p.addEventListener('keydown', parkeyevent);
    p.addEventListener('blur', parblur);
    p.textContent = list.desc;
    const trash = btntrash();
    trash.addEventListener('mousedown', listenremove);
    const unchecked = btnunchecked();
    const checked = btnchecked();
    checked.addEventListener('click', showcheckbox);
    unchecked.addEventListener('click', showcheckbox);
    const drag = btndarg();
    if (list.completed) {
      const div = divchecked();
      div.id = list.id;
      div.append(checked, unchecked, p, trash, drag);
      stack.insertBefore(div, btnclear);
    } else {
      const div = divunchecked();
      div.id = list.id;
      div.append(checked, unchecked, p, trash, drag);
      stack.insertBefore(div, btnclear);
    }
  });
};

export const listeninput = () => {
  input.addEventListener('keydown', getkeycode);
  entericon.addEventListener('click', getenterkey);
};

const clearcompleted = () => {
  if (istoredlist()) {
    let lists = JSON.parse(istoredlist());
    lists = lists.filter((list) => {
      if (list.completed) {
        const element = document.getElementById(list.id);
        element.remove();
      }
      return iscompleted(list.completed);
    });
    storelists(lists);
  }
};

export const getlists = () => {
  if (istoredlist()) {
    createlist();
  }
  btnclear.addEventListener('click', clearcompleted);
};
