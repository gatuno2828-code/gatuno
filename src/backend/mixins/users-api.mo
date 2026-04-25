import Types "../types";
import UsersLib "../lib/users";
import List "mo:core/List";

mixin (users : List.List<Types.User>) {

  public query func getUsers() : async [Types.User] {
    UsersLib.getAll(users);
  };

};
