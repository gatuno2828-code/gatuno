import Types "../types";
import SettingsLib "../lib/settings";

mixin (settings : Types.Settings) {

  public query func getSettings() : async Types.SettingsPublic {
    SettingsLib.toPublic(settings);
  };

  public func updateSettings(update : Types.SettingsPublic) : async () {
    SettingsLib.applyUpdate(settings, update);
  };

};
