import { Planets, PlanetModel, ResidentModel, SpeciesModel } from './Planets';
import { getPlanets } from './utils/api';

class App {
  constructor(host) {
    this.state = {
      data: null
    };
    this.host = host;
    this.planets = new Planets();
  }

  async getApiData() {
    const dataRaw = await getPlanets();
    return dataRaw;
  }

  createPlanets(data) {
    return data.map(planet => {
      return new PlanetModel(planet);
    });
  }

  createResident(data) {
    return new ResidentModel(data);
  }

  createSpecies(data) {
    return new SpeciesModel(data);
  }

  async getSwapiData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      let data = await response.json();
      return data;
    } catch (err) {
      return err;
    }
  }

  async createResidentsData(planets) {
    return Promise.all(
      planets.map(async (planet, i) => {
        if (planet.residentsUrl.length) {
          await Promise.all(
            planet.residentsUrl.map(async residentUrl => {
              let residentDataRaw = await this.getSwapiData(residentUrl);
              let residentData = this.createResident(residentDataRaw);
              planets[i].residentsData.push(residentData);
            })
          );
        }
        return planet;
      })
    );
  }

  async createSpeciesData(planets) {
    return Promise.all(
      planets.map(async (planet, i) => {
        let residents = planet.residentsData;
        if (residents.length) {
          await Promise.all(
            residents.map(async (resident, n) => {
              if (resident.speciesUrl.length) {
                let speciesDataRaw = await this.getSwapiData(
                  resident.speciesUrl
                );
                let speciesData = this.createSpecies(speciesDataRaw);
                planets[i].residentsData[n].speciesData.push(speciesData);
              }
            })
          );
        }
        return planet;
      })
    );
  }

  async createAppData() {
    try {
      const data = await this.getApiData();
      console.log(data);
      const planetsRaw = data.results;
      let planets = this.createPlanets(planetsRaw);
      const planetsWithResidents = await this.createResidentsData(planets);
      const planetsWithResidentsAndSpecies = await this.createSpeciesData(
        planetsWithResidents
      );
      return planetsWithResidentsAndSpecies;
    } catch (err) {
      return err;
    }
  }

  async render() {
    this.state.data = await this.createAppData();
    this.host.innerHTML = this.planets.render(this.state.data);
  }
}

export default App;
