import './Planets.scss';
//import api from './utils/api';

class Planets {
  constructor() {
    this.host = document.createElement('div');
    this.host.classList.add('planets');
  }

  render() {
    return (this.host.innerHTML = `<div class="planets">
                                    <div class="planet">
                                      <div class="title">planet title</div>
                                    </div>
                                  </div>`);
  }
}

export default Planets;
