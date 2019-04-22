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

  async createAppData() {
    await this.getApiData()
      .then(data => {
        const planets = data.results;
        let newData = this.createPlanets(planets);
        console.log(data);
        return Promise.all(
          newData.map(async (planet, i) => {
            if (planet.residentsUrl.length) {
              await Promise.all(
                planet.residentsUrl.map(async residentUrl => {
                  let residentDataRaw = await this.getSwapiData(residentUrl);
                  let residentData = this.createResident(residentDataRaw);
                  newData[i].residentsData.push(residentData);
                })
              );
            }
            return planet;
          })
        );
      })
      .then(data => {
        data.map((planet, i) => {
          let residents = planet.residentsData;
          if (residents.length) {
            residents.forEach(async (resident, n) => {
              if (resident.speciesUrl.length) {
                let speciesDataRaw = await this.getSwapiData(
                  resident.speciesUrl
                );
                let speciesData = this.createSpecies(speciesDataRaw);
                data[i].residentsData[n].speciesData.push(speciesData);
              }
            });
          }
        });
        console.log(data);
        return data;
      });
  }

  async render() {
    this.state.data = await this.createAppData();
    console.log(this.state.data);
    this.host.innerHTML = this.planets.render();
  }
}

export default App;
