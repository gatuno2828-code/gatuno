import Types "../types";
import RidesLib "../lib/rides";
import DriversLib "../lib/drivers";
import List "mo:core/List";

mixin (rides : List.List<Types.Ride>, drivers : List.List<Types.Driver>, users : List.List<Types.User>) {

  public query func getDashboardStats() : async Types.DashboardStats {
    let (ridesToday, revenueToday) = RidesLib.statsToday(rides);
    let onlineDrivers = DriversLib.countOnline(drivers);
    let totalUsers = users.size();
    { ridesToday; onlineDrivers; totalUsers; revenueToday };
  };

};
