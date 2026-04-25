import 'package:location/location.dart';
import 'package:geoflutterfire2/geoflutterfire2.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../firebase_config.dart';

class LocationService {
  final Location _location = Location();
  final GeoFlutterFire _geoFlutterFire = GeoFlutterFire();
  final FirebaseFirestore _firestore = FirebaseConfig.firestore;

  Stream<LocationData>? _locationStream;

  Future<bool> requestPermission() async {
    bool serviceEnabled = await _location.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await _location.requestService();
      if (!serviceEnabled) return false;
    }

    PermissionStatus permissionGranted = await _location.hasPermission();
    if (permissionGranted == PermissionStatus.denied) {
      permissionGranted = await _location.requestPermission();
      if (permissionGranted != PermissionStatus.granted) {
        return false;
      }
    }

    return true;
  }

  Future<LocationData?> getCurrentLocation() async {
    try {
      return await _location.getLocation();
    } catch (e) {
      print('Erro ao obter localização: $e');
      return null;
    }
  }

  Stream<LocationData> getLocationStream() {
    return _location.onLocationChanged;
  }

  Future<void> startTrackingRide(String rideId, String driverId) async {
    try {
      _locationStream = getLocationStream();
      
      _locationStream?.listen((LocationData location) async {
        final geoFirePoint = _geoFlutterFire.point(
          latitude: location.latitude ?? 0,
          longitude: location.longitude ?? 0,
        );

        await _firestore.collection('rides').doc(rideId).update({
          'driverLat': location.latitude,
          'driverLng': location.longitude,
          'driverLocation': geoFirePoint.data,
          'lastLocationUpdate': FieldValue.serverTimestamp(),
        });

        // Update driver profile location
        await _firestore
            .collection('drivers')
            .doc(driverId)
            .update({
          'latitude': location.latitude,
          'longitude': location.longitude,
          'lastLocationUpdate': FieldValue.serverTimestamp(),
        });
      });
    } catch (e) {
      print('Erro ao rastrear corrida: $e');
    }
  }

  void stopTracking() {
    _locationStream = null;
  }

  Future<List<DocumentSnapshot>> findNearbyDrivers({
    required double centerLat,
    required double centerLng,
    required double radiusKm,
  }) async {
    try {
      final center = _geoFlutterFire.point(
        latitude: centerLat,
        longitude: centerLng,
      );

      final query = _firestore.collection('drivers').where('isOnline', isEqualTo: true);
      
      final snapshots = await query.get();
      
      final nearbyDrivers = snapshots.docs.where((doc) {
        final lat = doc['latitude'] as double?;
        final lng = doc['longitude'] as double?;
        
        if (lat == null || lng == null) return false;
        
        final distance = _calculateDistance(centerLat, centerLng, lat, lng);
        return distance <= radiusKm;
      }).toList();

      return nearbyDrivers;
    } catch (e) {
      print('Erro ao encontrar motoristas próximos: $e');
      return [];
    }
  }

  double _calculateDistance(double lat1, double lng1, double lat2, double lng2) {
    const double earthRadiusKm = 6371;

    double dLat = _degreesToRadians(lat2 - lat1);
    double dLng = _degreesToRadians(lng2 - lng1);

    double a = (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
        (Math.cos(_degreesToRadians(lat1)) *
            Math.cos(_degreesToRadians(lat2)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2));

    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
  }

  double _degreesToRadians(double degrees) {
    return degrees * (3.141592653589793 / 180);
  }
}