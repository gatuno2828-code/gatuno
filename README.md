import 'package:flutter/material.dart';
import 'home.dart';

void main() {
  runApp(GatunoApp());
}

class GatunoApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Gatuno',
      home: HomePage(),
    );
  }
}



import 'package:flutter/material.dart';
import 'pedido.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Gatuno 🚀")),
      body: Center(
        child: ElevatedButton(
          child: Text("Pedir Corrida"),
          onPressed: () {
            Navigator.push(context,
              MaterialPageRoute(builder: (_) => PedidoPage()));
          },
        ),
      ),
    );
  }
}


import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class PedidoPage extends StatefulWidget {
  @override
  _PedidoPageState createState() => _PedidoPageState();
}

class _PedidoPageState extends State<PedidoPage> {
  final origem = TextEditingController();
  final destino = TextEditingController();

  criarCorrida() async {
    await FirebaseFirestore.instance.collection('rides').add({
      'origem': origem.text,
      'destino': destino.text,
      'status': 'searching'
    });

    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Nova Corrida")),
      body: Column(
        children: [
          TextField(controller: origem, decoration: InputDecoration(hintText: "Origem")),
          TextField(controller: destino, decoration: InputDecoration(hintText: "Destino")),
          ElevatedButton(onPressed: criarCorrida, child: Text("Confirmar"))
        ],
      ),
    );
  }
}


import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class DriverHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Gatuno Motorista")),
      body: StreamBuilder(
        stream: FirebaseFirestore.instance
            .collection('rides')
            .where('status', isEqualTo: 'searching')
            .snapshots(),
        builder: (context, snapshot) {

          if (!snapshot.hasData) return CircularProgressIndicator();

          var rides = snapshot.data!.docs;

          return ListView.builder(
            itemCount: rides.length,
            itemBuilder: (context, i) {
              var ride = rides[i];

              return ListTile(
                title: Text(ride['origem']),
                subtitle: Text(ride['destino']),
                trailing: ElevatedButton(
                  child: Text("Aceitar"),
                  onPressed: () async {
                    await FirebaseFirestore.instance
                        .collection('rides')
                        .doc(ride.id)
                        .update({
                      'status': 'in_progress'
                    });
                  },
                ),
              );
            },
          );
        },
      ),
    );
  }
}


{
  "origem": "Casa",
  "destino": "Centro",
  "status": "searching"
}



FirebaseFirestore.instance
  .collection('drivers')
  .doc(driverId)
  .update({
    'lat': lat,
    'lng': lng
});


double calcularPreco(double km) {
  return 5 + (km * 2.5);
}

<img width="1683" height="935" alt="1000162192" src="https://github.com/user-attachments/assets/9919a567-bb0a-49bb-84ef-cfd9d806a7e7" />
<img width="1080" height="732" alt="1000162062" src="https://github.com/user-attachments/assets/44ff4404-0bf2-4fbf-bfc1-70df25f59ec8" />
<img width="1536" height="1024" alt="1000162190" src="https://github.com/user-attachments/assets/a4a15311-d5fc-4de2-83f2-a8395317cace" />
<img width="1536" height="1024" alt="1000162189" src="https://github.com/user-attachments/assets/688b9763-69ba-4b18-b8a2-aa80e9ee7d30" />
criar aplicativo 
