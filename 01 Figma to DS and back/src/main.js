import './tokens/tokens.css';
import './base.css';
import { Portfolio } from './pages/portfolio.js';
import { initNavigation } from './components/navigation/navigation.js';

document.querySelector('#app').innerHTML = Portfolio();
initNavigation();
