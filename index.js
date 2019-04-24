let planetsDataFinal = [];

function getData() {
  fetch("https://swapi.co/api/planets/")
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.results.forEach(planet => {
        addObjProperty(planet, "residentsData", []);
      });
      console.log(data);
      planetsDataFinal = data.results;
      return data;
    })
    .then(data => {
      const planetsRaw = data.results;
      let planetsWithResidents = createResidentsData(planetsRaw);
      return planetsWithResidents;
    })
    .then(planetsWithResidents => {
      planetsDataFinal.forEach((planet, i) => {
        Array.prototype.push.apply(
          planet.residentsData,
          planetsWithResidents[i]
        );
      });
      console.log(planetsDataFinal);
      return planetsWithResidents;
    })
    .then(planetsWithResidentsAndSpecies => {
      console.log(planetsWithResidentsAndSpecies);
    })
    .catch(err => console.log("Fetch Error :", err));
}

function createResidentsData(planets) {
  return Promise.all(
    planets.map((planet, i) => {
      let residentsUrl = planet.residents;
      return Promise.all(
        residentsUrl.map(url =>
          fetch(url)
            .then(response => response.json())
            .then(data => {
              //planet.residentsData.push(data);
              //console.log(planet);
              return data;
            })
            .catch(err => console.log("Fetch Error :", err))
        )
      );
    })
  );
}

function createSpeciesData(planets) {}

function addObjProperty(obj, key, value) {
  Object.defineProperty(obj, key, {
    value: value,
    writable: true,
    enumerable: true,
    configurable: true
  });
  return obj;
}

function mapResidentsData(planets) {
  return new Promise(function(resolve, reject) {});
}

getData();
