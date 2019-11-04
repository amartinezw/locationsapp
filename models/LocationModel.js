class LocationModel {
  constructor(id: Number,rack: String, block: String, level: String, side: String, mapped_string: String, variations: Array<Object>) {
    this.id = id;
    this.rack = rack;
    this.block = block;
    this.level = level;
    this.side = side;
    this.mapped_string = mapped_string;
    this.variations = variations;
  }

  static mapFromLocationServiceResponse(locationServiceResponse: Object): LocationModel {
    const variations = [];

    locationServiceResponse.data.forEach((variation) => {
      variations.push(variation);
    });


    return new this(
      locationServiceResponse.warehouselocation_id, 
      locationServiceResponse.rack, 
      locationServiceResponse.block,
      locationServiceResponse.level,
      locationServiceResponse.side,
      locationServiceResponse.mapped_string,
      variations,
    );
  }

  static mapFromJson(jsonData: Object): LocationModel {
    const variations = [];
    jsonData.variations.forEach((variation) => {
      variations.push(variation);
    });
    return new this(
      jsonData.id,
      jsonData.rack,
      jsonData.block, 
      jsonData.level,
      jsonData.side,
      jsonData.mapped_string,
      variations
    );
  }
}

export default LocationModel;