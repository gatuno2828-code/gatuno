import Types "../types";
import List "mo:core/List";
import Time "mo:core/Time";

module {

  public func calcFare(km : Float, minutes : Float) : Float {
    5.0 + (km * 2.5) + (minutes * 0.5);
  };

  public func seedRides(rides : List.List<Types.Ride>) {
    let now = Time.now();
    let day : Int = 86_400_000_000_000;

    let mockRides : [Types.Ride] = [
      { id = 1; clientName = "João Silva"; origin = "Av. Paulista, 1000"; destination = "Rua Oscar Freire, 500"; status = #concluida; distanceKm = 3.2; durationMinutes = 12.0; fare = calcFare(3.2, 12.0); timestamp = now - (day / 24 * 2) },
      { id = 2; clientName = "Maria Santos"; origin = "Rua Augusta, 200"; destination = "Av. Brigadeiro Faria Lima, 3000"; status = #concluida; distanceKm = 5.8; durationMinutes = 22.0; fare = calcFare(5.8, 22.0); timestamp = now - (day / 24 * 3) },
      { id = 3; clientName = "Carlos Oliveira"; origin = "Pinheiros, Rua dos Pinheiros"; destination = "Vila Madalena, Rua Harmonia"; status = #em_andamento; distanceKm = 2.1; durationMinutes = 9.0; fare = calcFare(2.1, 9.0); timestamp = now - (day / 24) },
      { id = 4; clientName = "Ana Pereira"; origin = "Moema, Av. Ibirapuera"; destination = "Brooklin, Rua Funchal"; status = #concluida; distanceKm = 4.5; durationMinutes = 18.0; fare = calcFare(4.5, 18.0); timestamp = now - day },
      { id = 5; clientName = "Pedro Costa"; origin = "Tatuapé, Rua Melo"; destination = "Penha, Av. Celso Garcia"; status = #cancelada; distanceKm = 6.3; durationMinutes = 25.0; fare = calcFare(6.3, 25.0); timestamp = now - day * 2 },
      { id = 6; clientName = "Fernanda Lima"; origin = "Lapa, Rua Guaicurus"; destination = "Barra Funda, Av. Marquês de São Vicente"; status = #concluida; distanceKm = 3.7; durationMinutes = 14.0; fare = calcFare(3.7, 14.0); timestamp = now - (day / 24 * 5) },
      { id = 7; clientName = "Ricardo Souza"; origin = "Consolação, Rua da Consolação"; destination = "Higienópolis, Av. Higienópolis"; status = #searching; distanceKm = 1.9; durationMinutes = 8.0; fare = calcFare(1.9, 8.0); timestamp = now - (day / 24 / 2) },
      { id = 8; clientName = "Juliana Mendes"; origin = "Itaim Bibi, Av. Presidente Juscelino"; destination = "Jardins, Rua Haddock Lobo"; status = #concluida; distanceKm = 2.8; durationMinutes = 11.0; fare = calcFare(2.8, 11.0); timestamp = now - day * 3 },
      { id = 9; clientName = "Marcos Alves"; origin = "Santo André, Av. Industrial"; destination = "São Bernardo, Rua Jurubatuba"; status = #concluida; distanceKm = 8.4; durationMinutes = 31.0; fare = calcFare(8.4, 31.0); timestamp = now - day * 4 },
      { id = 10; clientName = "Patrícia Rodrigues"; origin = "Morumbi, Av. Giovanni Gronchi"; destination = "Campo Belo, Rua Cap. Antônio Rosa"; status = #concluida; distanceKm = 5.1; durationMinutes = 20.0; fare = calcFare(5.1, 20.0); timestamp = now - (day / 24 * 4) },
      { id = 11; clientName = "Bruno Ferreira"; origin = "Liberdade, Rua da Liberdade"; destination = "Bela Vista, Av. Paulista"; status = #em_rota; distanceKm = 2.3; durationMinutes = 10.0; fare = calcFare(2.3, 10.0); timestamp = now - (day / 24 / 3) },
      { id = 12; clientName = "Camila Nascimento"; origin = "Santana, Av. Braz Leme"; destination = "Carandiru, Av. Cruzeiro do Sul"; status = #concluida; distanceKm = 3.0; durationMinutes = 13.0; fare = calcFare(3.0, 13.0); timestamp = now - day * 5 },
      { id = 13; clientName = "Thiago Barbosa"; origin = "Perdizes, Rua Turiassu"; destination = "Pompéia, Rua Pompéia"; status = #concluida; distanceKm = 1.5; durationMinutes = 7.0; fare = calcFare(1.5, 7.0); timestamp = now - (day / 24 * 6) },
      { id = 14; clientName = "Luciana Carvalho"; origin = "Ipiranga, Av. Nazaré"; destination = "Sacomã, Rua Vergueiro"; status = #cancelada; distanceKm = 4.2; durationMinutes = 16.0; fare = calcFare(4.2, 16.0); timestamp = now - day * 6 },
      { id = 15; clientName = "Rafael Gomes"; origin = "Tucuruvi, Av. Tucuruvi"; destination = "Horto Florestal, Rua Gustavo Sobral"; status = #concluida; distanceKm = 7.0; durationMinutes = 27.0; fare = calcFare(7.0, 27.0); timestamp = now - day * 2 },
      { id = 16; clientName = "Amanda Martins"; origin = "Mooca, Rua da Mooca"; destination = "Belém, Av. Celso Garcia"; status = #searching; distanceKm = 3.5; durationMinutes = 14.0; fare = calcFare(3.5, 14.0); timestamp = now - (day / 24 / 4) },
    ];

    for (ride in mockRides.vals()) {
      rides.add(ride);
    };
  };

  public func getAll(rides : List.List<Types.Ride>) : [Types.Ride] {
    rides.toArray();
  };

  public func statsToday(rides : List.List<Types.Ride>) : (Nat, Float) {
    let now = Time.now();
    let dayNs : Int = 86_400_000_000_000;
    var count = 0;
    var revenue = 0.0;
    rides.forEach(func(r) {
      if (r.timestamp >= now - dayNs) {
        count += 1;
        if (r.status == #concluida) {
          revenue += r.fare;
        };
      };
    });
    (count, revenue);
  };

};
