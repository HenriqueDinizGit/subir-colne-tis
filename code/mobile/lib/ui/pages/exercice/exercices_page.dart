// import 'package:flutter/material.dart';
// import 'package:go_router/go_router.dart';
// import 'package:mobile/services/exercice_service.dart';
// import 'package:mobile/ui/pages/exercice/widgets/exercice_widget.dart';
// import 'package:provider/provider.dart';

// class ExercicePage extends StatefulWidget {
//   ExercicePage({Key? key}) : super(key: key);

//   @override
//   _ExercicePageState createState() => _ExercicePageState();
// }

// class _ExercicePageState extends State<ExercicePage> {
//   late ExerciceService _exerciceService;
//   late Future<List<dynamic>> _exercicios;

//   @override
//   void initState() {
//     super.initState();
//     final _exerciceService =
//         Provider.of<ExerciceService>(context, listen: false);
//     // _exercicios = _exerciceService.getExercicios();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Exercícios'),
//         actions: [
//           IconButton(
//               icon: const Icon(Icons.add),
//               onPressed: () => context.go('/newExercice')
//               // onPressed: () => Navigator.pushNamed(context, '/newExercice'),
//               ),
//         ],
//       ),
//       body: FutureBuilder<List<dynamic>>(
//         future: _exercicios,
//         builder: (context, snapshot) {
//           if (snapshot.connectionState == ConnectionState.waiting) {
//             return const Center(child: CircularProgressIndicator());
//           } else if (snapshot.hasError) {
//             return const Center(child: Text("Erro ao carregar exercícios"));
//           } else if (snapshot.data!.isEmpty) {
//             return const Center(child: Text("Nenhum exercício encontrado"));
//           } else {
//             return ListView.builder(
//               itemCount: snapshot.data!.length,
//               itemBuilder: (context, index) {
//                 return ExerciceWidget(
//                   exercicio: snapshot.data![index],
//                 );
//               },
//             );
//           }
//         },
//       ),
//     );
//   }

//   void _showEditDialog(BuildContext context, Map<String, dynamic> exercicio) {
//     TextEditingController nameController =
//         TextEditingController(text: exercicio['nome']);

//     showDialog(
//       context: context,
//       barrierDismissible: true,
//       builder: (BuildContext context) {
//         return AlertDialog(
//           title: Text('Novo Exercício'),
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
//                 try {} catch (e) {
//                   Navigator.of(context).pop();
//                   ScaffoldMessenger.of(context).showSnackBar(
//                       SnackBar(content: Text("Erro ao deletar série: $e")));
//                 }
//               },
//             ),
//           ],
//         );
//       },
//     );
//   }
// }
