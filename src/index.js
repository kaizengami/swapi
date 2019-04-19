import './normalize.css';
import './index.scss';

import App from './components/App';

const host = document.getElementById('main');

const app = new App(host);

app.render();
