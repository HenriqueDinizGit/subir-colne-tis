// import 'package:flutter/material.dart';
// import 'package:mobile/services/exercice_serie_service.dart';
// import 'package:mobile/ui/pages/exercice/widgets/serie_exercice_widget.dart';
// import 'package:provider/provider.dart';

// class ExercicioByIdPage extends StatefulWidget {
//   final int exercicioId;

//   ExercicioByIdPage({Key? key, required this.exercicioId}) : super(key: key);

//   @override
//   _ExercicioByIdPageState createState() => _ExercicioByIdPageState();
// }

// class _ExercicioByIdPageState extends State<ExercicioByIdPage> {
//   late Future<List<dynamic>> _series;

//   @override
//   void initState() {
//     super.initState();
//     _series = Provider.of<ExerciceSerieService>(context, listen: false).getSeriesExercicios(widget.exercicioId);
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('Detalhes do Exercício'),
//         actions: [
//           IconButton(
//             icon: Icon(Icons.add),
//             onPressed: () {
//               // Logic to add new serie exercice
//             },
//           ),
//         ],
//       ),
//       body: FutureBuilder<List<dynamic>>(
//         future: _series,
//         builder: (context, snapshot) {
//           if (snapshot.connectionState == ConnectionState.waiting) {
//             return Center(child: CircularProgressIndicator());
//           } else if (snapshot.hasError) {
//             return Center(child: Text("Erro ao carregar séries de exercícios"));
//           } else if (snapshot.data!.isEmpty) {
//             return Center(child: Text("Nenhuma série encontrada"));
//           } else {
//             return ListView.builder(
//               itemCount: snapshot.data!.length,
//               itemBuilder: (context, index) {
//                 return SerieExerciceWidget(serie: snapshot.data![index]);
//               },
//             );
//           }
//         },
//       ),
//     );
//   }
// }
