import './assets/css/style.css';
import { getlists, listeninput } from './assets/js/storedata.js';

const start = () => {
  listeninput();
  getlists();
};
start();
