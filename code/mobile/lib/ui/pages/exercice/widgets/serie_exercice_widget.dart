// import 'package:flutter/material.dart';
// import 'package:mobile/services/exercice_serie_service.dart';
// import 'package:provider/provider.dart';
// import 'serie_exercice_service.dart';

// class SerieExerciceWidget extends StatelessWidget {
//   final Map<String, dynamic> serie;

//   SerieExerciceWidget({Key? key, required this.serie}) : super(key: key);

//   @override
//   Widget build(BuildContext context) {
//     return Card(
//       child: ListTile(
//         title: Text('Peso: ${serie['peso']} kg, Repetições: ${serie['repeticoes']}'),
//         trailing: Row(
//           mainAxisSize: MainAxisSize.min,
//           children: <Widget>[
//             IconButton(
//               icon: Icon(Icons.edit),
//               onPressed: () {
//                 // Logic to edit series
//               },
//             ),
//             IconButton(
//               icon: Icon(Icons.delete),
//               onPressed: () => _confirmDelete(context, serie['id']),
//             ),
//           ],
//         ),
//       ),
//     );
//   }

//   void _confirmDelete(BuildContext context, int id) {
//     showDialog(
//       context: context,
//       builder: (BuildContext context) {
//         return AlertDialog(
//           title: Text('Confirmar'),
//           content: Text('Tem certeza que deseja deletar esta série de exercício?'),
//           actions: <Widget>[
//             TextButton(
//               child: Text('Cancelar'),
//               onPressed: () => Navigator.of(context).pop(),
//             ),
//             TextButton(
//               child: Text('Deletar'),
//               onPressed: () {
//                 _deleteSerie(context, id);
//               },
//             ),
//           ],
//         );
//       },
//     );
//   }

//   void _deleteSerie(BuildContext context, int id) {
//     final service = Provider.of<ExerciceSerieService>(context, listen: false);
//     service.deleteSerieExercicio(id).then((_) {
//       Navigator.of(context).pop();
//       ScaffoldMessenger.of(context).showSnackBar(
//         SnackBar(content: Text("Série deletada com sucesso!"))
//       );
//     }).catchError((error) {
//       Navigator.of(context).pop();
//       ScaffoldMessenger.of(context).showSnackBar(
//         SnackBar(content: Text("Erro ao deletar série: $error"))
//       );
//     });
//   }
// }
