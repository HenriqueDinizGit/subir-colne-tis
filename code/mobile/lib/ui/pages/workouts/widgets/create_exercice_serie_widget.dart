import 'package:flutter/material.dart';
import 'package:mobile/services/exercice_serie_service.dart';
import 'package:mobile/services/exercice_service.dart';
import 'package:provider/provider.dart';

class CreateExerciseAndSeriesWidget extends StatefulWidget {
  final int workoutId;

  CreateExerciseAndSeriesWidget({Key? key, required this.workoutId})
      : super(key: key);

  @override
  _CreateExerciseAndSeriesWidgetState createState() =>
      _CreateExerciseAndSeriesWidgetState();
}

class _CreateExerciseAndSeriesWidgetState
    extends State<CreateExerciseAndSeriesWidget> {
  final _nomeController = TextEditingController();
  final _grupoMuscularController = TextEditingController();
  final _pesoController = TextEditingController();
  final _repeticoesController = TextEditingController();
  late int _currentStep = 0;
  late int _newExerciseId;

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(_currentStep == 0 ? 'Criar Exercício' : 'Adicionar Séries'),
      content: SingleChildScrollView(
        child: ListBody(
          children: <Widget>[
            if (_currentStep == 0) ...[
              TextField(
                controller: _nomeController,
                decoration: InputDecoration(hintText: "Nome do exercício"),
              ),
              TextField(
                controller: _grupoMuscularController,
                decoration: InputDecoration(hintText: "Grupo muscular"),
              ),
            ] else ...[
              TextField(
                controller: _pesoController,
                decoration: InputDecoration(hintText: "Peso"),
              ),
              TextField(
                controller: _repeticoesController,
                decoration: InputDecoration(hintText: "Repetições"),
              ),
            ],
          ],
        ),
      ),
      actions: <Widget>[
        TextButton(
          child: Text('Cancelar'),
          onPressed: () => Navigator.of(context).pop(),
        ),
        TextButton(
          child: Text(_currentStep == 0 ? 'Próximo' : 'Salvar'),
          onPressed: () {
            if (_currentStep == 0) {
              _createExercise(context);
            } else {
              _addSeriesToExercise(context);
            }
          },
        ),
      ],
    );
  }

  void _createExercise(BuildContext context) {
    final exerciseService =
        Provider.of<ExerciceService>(context, listen: false);
    Map<String, dynamic> exerciseData = {
      'nome': _nomeController.text,
      'grupoMuscular': _grupoMuscularController.text,
      'treinoId': widget.workoutId,
    };
    exerciseService.createExercicio(exerciseData).then((response) {
      // Assumindo que o ID está no campo 'id' da resposta e que ele é um int
      // Se o ID não for um int diretamente, você pode precisar fazer uma conversão usando int.parse()
      int exerciseId = response['id'];
      setState(() {
        _newExerciseId = exerciseId;
        _currentStep++;
      });
    }).catchError((error) {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erro ao criar exercício: $error')));
    });
  }

  void _addSeriesToExercise(BuildContext context) {
    final serieExerciseService =
        Provider.of<ExerciceSerieService>(context, listen: false);
    Map<String, dynamic> serieData = {
      'peso': _pesoController.text,
      'repeticoes': _repeticoesController.text,
      'exercicioId': _newExerciseId,
    };
    serieExerciseService.createSerieExercicio(serieData).then((_) {
      Navigator.of(context).pop();
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Série adicionada com sucesso!')));
    }).catchError((error) {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erro ao adicionar série: $error')));
    });
  }
}
