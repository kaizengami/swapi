import './Planets.scss';
//import api from './utils/api';

class Planets {
  constructor() {
    this.host = document.createElement('div');
    this.host.classList.add('planets');
  }

  planetHtml(data) {
    const { name, residentsData } = data;
    let residents = '';
    if (residentsData != undefined) {
      residents =
        '<div class="residents">' +
        residentsData.map(resident => this.residentHtml(resident)).join('') +
        '</div>';
    }

    return `<div class="planet">
              <div class="title">${name}</div>
              ${residents}
            </div>`;
  }

  residentHtml(data) {
    const { name, gender, speciesData } = data;
    return `<div class="resident">
              <div class="resident-name">${name}</div>
              <div class="resident-gender">${gender}</div>
            </div>
            ${this.speciesHtml(speciesData)}`;
  }

  speciesHtml(data) {
    const species = data[0];
    if (species != undefined) {
      const { name, classification, language } = species;
      return `<div class="species">
                <div class="species-name">name: <span>${name}</span></div>
                <div class="species-classification">classification: <span>${classification}</span></div>
                <div class="species-language">language: <span>${language}</span></div>
              </div>`;
    } else return '';
  }

  render(data) {
    console.log(data);
    let planets =
      '<div class="planets">' +
      data.map(planet => this.planetHtml(planet)).join('') +
      '</div>';
    return (this.host.innerHTML = planets);
  }
}

export default Planets;
