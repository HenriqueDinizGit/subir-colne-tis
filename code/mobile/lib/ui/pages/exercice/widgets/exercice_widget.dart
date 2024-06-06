// import 'package:flutter/material.dart';
// import 'package:mobile/services/exercice_service.dart';
// import 'package:provider/provider.dart';
// import 'exercice_service.dart';

// class ExerciceWidget extends StatelessWidget {
//   final Map<String, dynamic> exercicio;

//   ExerciceWidget({Key? key, required this.exercicio}) : super(key: key);

//   @override
//   Widget build(BuildContext context) {
//     return Card(
//       child: ListTile(
//         title: Text(exercicio['nome']),
//         trailing: Row(
//           mainAxisSize: MainAxisSize.min,
//           children: [
//             IconButton(
//               icon: Icon(Icons.edit),
//               onPressed: () => _showEditDialog(context, exercicio),
//             ),
//             IconButton(
//               icon: Icon(Icons.delete),
//               onPressed: () => _confirmDelete(context, exercicio['id']),
//             ),
//           ],
//         ),
//         onTap: () => Navigator.pushNamed(context, '/exerciceByIdPage', arguments: exercicio['id']),
//       ),
//     );
//   }

//   void _showEditDialog(BuildContext context, Map<String, dynamic> exercicio) {
//     TextEditingController nameController = TextEditingController(text: exercicio['nome']);
    
//     showDialog(
//       context: context,
//       barrierDismissible: true,
//       builder: (BuildContext context) {
//         return AlertDialog(
//           title: Text('Editar Exercício'),
//           content: TextField(
//             controller: nameController,
//             decoration: InputDecoration(hintText: "Nome do Exercício"),
//           ),
//           actions: <Widget>[
//             IconButton(
//               icon: Icon(Icons.close),
//               onPressed: () => Navigator.of(context).pop(),
//             ),
//             TextButton(
//               child: Text('Salvar'),
//               onPressed: () {
//                 _updateExercicio(context, exercicio['id'], nameController.text);
//               },
//             ),
//           ],
//         );
//       },
//     );
//   }

//   void _updateExercicio(BuildContext context, int id, String newName) {
//     final exerciceService = Provider.of<ExerciceService>(context, listen: false);
//     Map<String, dynamic> data = {'nome': newName};
//     exerciceService.updateExercicio(id, data).then((updatedExercicio) {
//       Navigator.of(context).pop();
//       ScaffoldMessenger.of(context).showSnackBar(
//         SnackBar(content: Text("Exercício atualizado com sucesso!"))
//       );
//     }).catchError((error) {
//       ScaffoldMessenger.of(context).showSnackBar(
//         SnackBar(content: Text("Erro ao atualizar exercício: $error"))
//       );
//     });
//   }

//   void _confirmDelete(BuildContext context, int id) {
//     showDialog(
//       context: context,
//       builder: (BuildContext context) {
//         return AlertDialog(
//           title: Text('Confirmar'),
//           content: Text('Tem certeza que deseja deletar este exercício?'),
//           actions: <Widget>[
//             TextButton(
//               child: Text('Cancelar'),
//               onPressed: () => Navigator.of(context).pop(),
//             ),
//             TextButton(
//               child: Text('Deletar'),
//               onPressed: () {
//                 _deleteExercicio(context, id);
//               },
//             ),
//           ],
//         );
//       },
//     );
//   }

//   void _deleteExercicio(BuildContext context, int id) {
//     final exerciceService = Provider.of<ExerciceService>(context, listen: false);
//     exerciceService.deleteExercicio(id).then((message) {
//       Navigator.of(context).pop();
//       ScaffoldMessenger.of(context).showSnackBar(
//         SnackBar(content: Text("Exercício deletado com sucesso!"))
//       );
//     }).catchError((error) {
//       Navigator.of(context).pop();
//       ScaffoldMessenger.of(context).showSnackBar(
//         SnackBar(content: Text("Erro ao deletar exercício: $error"))
//       );
//     });
//   }
// }
