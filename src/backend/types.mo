module {

  public type RideStatus = {
    #searching;
    #em_rota;
    #em_andamento;
    #concluida;
    #cancelada;
  };

  public type Ride = {
    id : Nat;
    clientName : Text;
    origin : Text;
    destination : Text;
    status : RideStatus;
    distanceKm : Float;
    durationMinutes : Float;
    fare : Float;
    timestamp : Int;
  };

  public type Driver = {
    id : Nat;
    name : Text;
    rating : Float;
    totalRides : Nat;
    var isOnline : Bool;
    vehicle : Text;
    var earnings : Float;
  };

  public type DriverPublic = {
    id : Nat;
    name : Text;
    rating : Float;
    totalRides : Nat;
    isOnline : Bool;
    vehicle : Text;
    earnings : Float;
  };

  public type User = {
    id : Nat;
    name : Text;
    email : Text;
    registrationDate : Int;
    totalRides : Nat;
    totalSpent : Float;
  };

  public type Features = {
    scheduledRides : Bool;
    shareRoute : Bool;
    multipleDestinations : Bool;
    showPriceBeforeAccept : Bool;
  };

  public type Settings = {
    var baseFare : Float;
    var perKm : Float;
    var perMinute : Float;
    var serviceFeePercent : Float;
    var minimumFare : Float;
    var searchRadiusKm : Float;
    var acceptTimeoutSeconds : Nat;
    var cancellationFee : Float;
    var features : Features;
  };

  public type SettingsPublic = {
    baseFare : Float;
    perKm : Float;
    perMinute : Float;
    serviceFeePercent : Float;
    minimumFare : Float;
    searchRadiusKm : Float;
    acceptTimeoutSeconds : Nat;
    cancellationFee : Float;
    features : Features;
  };

  public type DashboardStats = {
    ridesToday : Nat;
    onlineDrivers : Nat;
    totalUsers : Nat;
    revenueToday : Float;
  };

};
