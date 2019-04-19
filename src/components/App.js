import { Planets } from './Planets';
import { getPlanets } from './utils/api';

class App {
  constructor(host) {
    this.host = host;
    this.planets = new Planets();
  }
  render() {
    console.log(getPlanets());
    this.host.innerHTML = this.planets.render();
  }
}

export default App;
