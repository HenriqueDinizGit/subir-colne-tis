import 'package:flutter/material.dart';
import 'package:mobile/services/workout_service.dart';
import 'package:mobile/ui/pages/workouts/widgets/workout_widget.dart';
import 'package:provider/provider.dart';


class WorkoutsPage extends StatelessWidget {
  void _showAddDialog(BuildContext context) {
    final TextEditingController nomeController = TextEditingController();

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Adicionar Novo Treino'),
          content: TextField(
            controller: nomeController,
            decoration: const InputDecoration(hintText: "Nome do Treino"),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancelar'),
            ),
            TextButton(
              onPressed: () {
                if (nomeController.text.isNotEmpty) {
                  _createTreino(context, nomeController.text);
                } else {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text("O nome do treino não pode ser vazio!"))
                  );
                }
              },
              child: const Text('Salvar'),
            ),
          ],
        );
      },
    );
  }

  void _createTreino(BuildContext context, String nome) {
    final treinoService = Provider.of<WorkoutService>(context, listen: false);
    treinoService.createTreino({'nome': nome}).then((response) {
      Navigator.pop(context);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Treino criado com sucesso!"))
      );
    }).catchError((error) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Erro ao criar treino: $error"))
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Workouts'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () => _showAddDialog(context),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text('Meus Treinos', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            ),
            FutureBuilder<List<dynamic>>(
              future: Provider.of<WorkoutService>(context, listen: false).getTreinos(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const CircularProgressIndicator();
                } else if (snapshot.hasError) {
                  return Text('Erro: ${snapshot.error}');
                } else if (snapshot.data!.isEmpty) {
                  return const Text('Nenhum treino disponível');
                } else {
                  return ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: snapshot.data!.length,
                    itemBuilder: (context, index) {
                      return WorkoutWidget(treino: snapshot.data![index]);
                    },
                  );
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
