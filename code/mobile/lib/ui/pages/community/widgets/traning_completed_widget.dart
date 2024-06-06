import 'package:flutter/material.dart';

class TrainingCompletedWidget extends StatelessWidget {
  final Map<String, dynamic> training;

  TrainingCompletedWidget({Key? key, required this.training}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(training['nomeUsuario']),
      ),
    );
  }
}