import Types "../types";
import List "mo:core/List";

module {

  public func seedUsers(users : List.List<Types.User>) {
    let day : Int = 86_400_000_000_000;
    let base : Int = 1_700_000_000_000_000_000;

    let mockUsers : [Types.User] = [
      { id = 1; name = "João Silva"; email = "joao.silva@email.com"; registrationDate = base - day * 120; totalRides = 47; totalSpent = 890.50 },
      { id = 2; name = "Maria Santos"; email = "maria.santos@email.com"; registrationDate = base - day * 95; totalRides = 33; totalSpent = 612.30 },
      { id = 3; name = "Carlos Oliveira"; email = "carlos.oliveira@email.com"; registrationDate = base - day * 200; totalRides = 82; totalSpent = 1_540.75 },
      { id = 4; name = "Ana Pereira"; email = "ana.pereira@email.com"; registrationDate = base - day * 60; totalRides = 21; totalSpent = 390.20 },
      { id = 5; name = "Pedro Costa"; email = "pedro.costa@email.com"; registrationDate = base - day * 300; totalRides = 115; totalSpent = 2_180.90 },
      { id = 6; name = "Fernanda Lima"; email = "fernanda.lima@email.com"; registrationDate = base - day * 45; totalRides = 18; totalSpent = 325.60 },
      { id = 7; name = "Ricardo Souza"; email = "ricardo.souza@email.com"; registrationDate = base - day * 180; totalRides = 64; totalSpent = 1_210.40 },
      { id = 8; name = "Juliana Mendes"; email = "juliana.mendes@email.com"; registrationDate = base - day * 30; totalRides = 12; totalSpent = 220.80 },
      { id = 9; name = "Marcos Alves"; email = "marcos.alves@email.com"; registrationDate = base - day * 250; totalRides = 98; totalSpent = 1_875.15 },
      { id = 10; name = "Patrícia Rodrigues"; email = "patricia.rodrigues@email.com"; registrationDate = base - day * 15; totalRides = 7; totalSpent = 130.50 },
    ];

    for (user in mockUsers.vals()) {
      users.add(user);
    };
  };

  public func getAll(users : List.List<Types.User>) : [Types.User] {
    users.toArray();
  };

};
