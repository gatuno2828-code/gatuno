import Types "../types";
import List "mo:core/List";

module {

  public func seedDrivers(drivers : List.List<Types.Driver>) {
    let mockDrivers : [Types.Driver] = [
      { id = 1; name = "Antônio Reis"; rating = 4.9; totalRides = 312; var isOnline = true; vehicle = "Honda Civic Preto 2022"; var earnings = 8_450.75 },
      { id = 2; name = "Fábio Cardoso"; rating = 4.7; totalRides = 198; var isOnline = true; vehicle = "Toyota Corolla Prata 2021"; var earnings = 5_230.40 },
      { id = 3; name = "Gustavo Lima"; rating = 4.8; totalRides = 457; var isOnline = false; vehicle = "Volkswagen Gol Branco 2020"; var earnings = 11_890.60 },
      { id = 4; name = "Henrique Batista"; rating = 4.6; totalRides = 143; var isOnline = true; vehicle = "Chevrolet Onix Vermelho 2023"; var earnings = 3_780.20 },
      { id = 5; name = "Igor Santos"; rating = 4.5; totalRides = 89; var isOnline = false; vehicle = "Ford Ka Azul 2019"; var earnings = 2_150.90 },
      { id = 6; name = "Jorge Freitas"; rating = 4.9; totalRides = 521; var isOnline = true; vehicle = "Hyundai HB20 Cinza 2022"; var earnings = 14_320.15 },
      { id = 7; name = "Kleber Moraes"; rating = 4.7; totalRides = 267; var isOnline = true; vehicle = "Nissan March Branco 2021"; var earnings = 7_090.80 },
      { id = 8; name = "Leonardo Pinto"; rating = 4.4; totalRides = 76; var isOnline = false; vehicle = "Renault Kwid Verde 2020"; var earnings = 1_820.35 },
    ];

    for (driver in mockDrivers.vals()) {
      drivers.add(driver);
    };
  };

  public func toPublic(d : Types.Driver) : Types.DriverPublic {
    {
      id = d.id;
      name = d.name;
      rating = d.rating;
      totalRides = d.totalRides;
      isOnline = d.isOnline;
      vehicle = d.vehicle;
      earnings = d.earnings;
    };
  };

  public func getAll(drivers : List.List<Types.Driver>) : [Types.DriverPublic] {
    drivers.map<Types.Driver, Types.DriverPublic>(toPublic).toArray();
  };

  public func toggleOnline(drivers : List.List<Types.Driver>, id : Nat) : Bool {
    var found = false;
    drivers.mapInPlace(func(d) {
      if (d.id == id) {
        found := true;
        d.isOnline := not d.isOnline;
        d;
      } else { d };
    });
    found;
  };

  public func countOnline(drivers : List.List<Types.Driver>) : Nat {
    var count = 0;
    drivers.forEach(func(d) {
      if (d.isOnline) { count += 1 };
    });
    count;
  };

};
