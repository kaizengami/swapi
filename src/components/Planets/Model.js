class Planet {
  constructor(data) {
    this.name = data.name;
    this.residentsUrl = data.residents;
    this.residentsData = [];
  }
}

class Resident {
  constructor(data) {
    this.name = data.name;
    this.gender = data.gender;
    this.speciesUrl = data.species;
    this.speciesData = [];
  }
}

class Species {
  constructor(data) {
    this.name = data.name;
    this.classification = data.classification;
    this.language = data.language;
  }
}

export {
  Planet as PlanetModel,
  Resident as ResidentModel,
  Species as SpeciesModel
};
