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
      return planetsDataFinal;
    })
    .then(planetsDataFinal => {
      //console.log(planetsDataFinal);
      planetsDataFinal.forEach(planet => {
        planet.residentsData.forEach(resident => {
          if (resident != undefined) {
            addObjProperty(resident, "speciesData", []);
          }
        });
      });
      return planetsDataFinal;
    })
    .then(planetsDataFinal => {
      let planetsWithResidentsAndSpecies = createSpeciesData(planetsDataFinal);
      return planetsWithResidentsAndSpecies;
    })
    .then(planetsWithResidentsAndSpecies => {
      console.log(planetsDataFinal);
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

function createSpeciesData(planets) {
  return Promise.all(
    planets.map((planet, i) => {
      let residents = planet.residentsData;
      return Promise.all(
        residents.map((resident, n) => {
          let url = resident.species[0];
          if (url != undefined) {
            fetch(url)
              .then(response => response.json())
              .then(data => {
                planetsDataFinal[i].residentsData[n].speciesData.push(data);
                return data;
              })
              .catch(err => console.log("Fetch Error :", err));
          }
        })
      );
    })
  );
}

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
