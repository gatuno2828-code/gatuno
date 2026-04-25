import Types "../types";
import RidesLib "../lib/rides";
import List "mo:core/List";

mixin (rides : List.List<Types.Ride>) {

  public query func getRides() : async [Types.Ride] {
    RidesLib.getAll(rides);
  };

};
