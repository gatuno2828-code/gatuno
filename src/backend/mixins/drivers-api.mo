import Types "../types";
import DriversLib "../lib/drivers";
import List "mo:core/List";

mixin (drivers : List.List<Types.Driver>) {

  public query func getDrivers() : async [Types.DriverPublic] {
    DriversLib.getAll(drivers);
  };

  public func toggleDriverOnline(id : Nat) : async Bool {
    DriversLib.toggleOnline(drivers, id);
  };

};
