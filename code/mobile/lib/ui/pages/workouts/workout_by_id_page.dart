import 'package:flutter/material.dart';
import 'package:mobile/services/exercice_service.dart';
import 'package:mobile/services/workout_service.dart';
import 'package:mobile/ui/pages/workouts/widgets/exercice_widget.dart';
import 'package:provider/provider.dart';

class WorkoutByIdPage extends StatefulWidget {
  final int workoutId;

  WorkoutByIdPage({Key? key, required this.workoutId}) : super(key: key);

  @override
  _WorkoutByIdPageState createState() => _WorkoutByIdPageState();
}

class _WorkoutByIdPageState extends State<WorkoutByIdPage> {
  late Future<List<dynamic>> _exercicios;
  late Future<Map<String, dynamic>> _treino;
  String _workoutName = "Carregando..."; // Temporário até o nome ser carregado

  @override
  void initState() {
    super.initState();
    _exercicios = Provider.of<ExerciceService>(context, listen: false)
        .getExercicios(widget.workoutId);
    _treino = Provider.of<WorkoutService>(context, listen: false)
        .getTreinoById(widget.workoutId);
    // Simular a obtenção do nome do workout
    // _workoutName = "Workout #${_treino["nome"]!}"; // Isto deve ser substituído pela chamada real ao serviço para obter detalhes do workout
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_workoutName),
        actions: [
          IconButton(
            icon: const Icon(Icons.copy),
            onPressed: () => _copyWorkout(context),
          ),
        ],
      ),
      body: FutureBuilder<List<dynamic>>(
        future: _exercicios,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return const Center(child: Text('Erro ao carregar exercícios'));
          } else if (snapshot.data!.isEmpty) {
            return const Center(child: Text('Nenhum exercício disponível'));
          } else {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                return ExerciceWidget(exercicio: snapshot.data![index]);
              },
            );
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () {
          // Navegar para a página de adicionar novo exercício
        },
      ),
    );
  }

  void _copyWorkout(BuildContext context) {
    final treinoService = Provider.of<WorkoutService>(context, listen: false);
    treinoService.copyTreino(widget.workoutId).then((result) {
      ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Workout copiado com sucesso!')));
    }).catchError((error) {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Falha ao copiar workout: $error')));
    });
  }
}
