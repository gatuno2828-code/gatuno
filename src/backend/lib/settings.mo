import Types "../types";

module {

  public func defaultSettings() : Types.Settings {
    {
      var baseFare = 5.0;
      var perKm = 2.5;
      var perMinute = 0.5;
      var serviceFeePercent = 20.0;
      var minimumFare = 8.0;
      var searchRadiusKm = 5.0;
      var acceptTimeoutSeconds = 30;
      var cancellationFee = 5.0;
      var features = {
        scheduledRides = false;
        shareRoute = true;
        multipleDestinations = false;
        showPriceBeforeAccept = true;
      };
    };
  };

  public func toPublic(s : Types.Settings) : Types.SettingsPublic {
    {
      baseFare = s.baseFare;
      perKm = s.perKm;
      perMinute = s.perMinute;
      serviceFeePercent = s.serviceFeePercent;
      minimumFare = s.minimumFare;
      searchRadiusKm = s.searchRadiusKm;
      acceptTimeoutSeconds = s.acceptTimeoutSeconds;
      cancellationFee = s.cancellationFee;
      features = s.features;
    };
  };

  public func applyUpdate(s : Types.Settings, update : Types.SettingsPublic) {
    s.baseFare := update.baseFare;
    s.perKm := update.perKm;
    s.perMinute := update.perMinute;
    s.serviceFeePercent := update.serviceFeePercent;
    s.minimumFare := update.minimumFare;
    s.searchRadiusKm := update.searchRadiusKm;
    s.acceptTimeoutSeconds := update.acceptTimeoutSeconds;
    s.cancellationFee := update.cancellationFee;
    s.features := update.features;
  };

};
