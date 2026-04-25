import Types "types";
import List "mo:core/List";
import RidesLib "lib/rides";
import DriversLib "lib/drivers";
import UsersLib "lib/users";
import SettingsLib "lib/settings";
import RidesApi "mixins/rides-api";
import DriversApi "mixins/drivers-api";
import UsersApi "mixins/users-api";
import SettingsApi "mixins/settings-api";
import DashboardApi "mixins/dashboard-api";

actor {

  let rides : List.List<Types.Ride> = List.empty();
  let drivers : List.List<Types.Driver> = List.empty();
  let users : List.List<Types.User> = List.empty();
  let settings : Types.Settings = SettingsLib.defaultSettings();

  // Seed mock data on first run
  do {
    RidesLib.seedRides(rides);
    DriversLib.seedDrivers(drivers);
    UsersLib.seedUsers(users);
  };

  include RidesApi(rides);
  include DriversApi(drivers);
  include UsersApi(users);
  include SettingsApi(settings);
  include DashboardApi(rides, drivers, users);

};
