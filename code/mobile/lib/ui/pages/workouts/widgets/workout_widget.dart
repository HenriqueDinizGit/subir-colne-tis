import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/services/workout_service.dart';
import 'package:provider/provider.dart';

class WorkoutWidget extends  StatelessWidget {
  final Map<String, dynamic> treino;

  WorkoutWidget({Key? key, required this.treino}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(treino['nome']),
      subtitle: const Text('Detalhes do treino...'),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: () => _showEditModal(context, treino),
          ),
          IconButton(
            icon: const Icon(Icons.delete),
            onPressed: () => _confirmDelete(context, treino['id']),
          ),
        ],
      ),
      onTap: () {
        context.go("/workouts/${treino['id']}");
      },
    );
  }

  void _showEditModal(BuildContext context, Map<String, dynamic> treino) {
    TextEditingController nameController = TextEditingController(text: treino['nome']);
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Editar Treino'),
          content: TextField(
            controller: nameController,
            decoration: const InputDecoration(labelText: "Nome do Treino"),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancelar'),
            ),
            TextButton(
              onPressed: () {
                _updateTreino(context, treino['id'], nameController.text);
              },
              child: const Text('Salvar'),
            ),
          ],
        );
      },
    );
  }

  void _updateTreino(BuildContext context, int id, String newName) {
    final treinoService = Provider.of<WorkoutService>(context, listen: false);
    treinoService.updateTreino(id, {'nome': newName}).then((response) {
      Navigator.pop(context);
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Sucesso'),
          content: const Text('Treino atualizado com sucesso!'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('OK'),
            )
          ],
        ),
      );
    }).catchError((error) {
      Navigator.pop(context);
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Erro'),
          content: Text('Erro ao atualizar treino: $error'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('OK'),
            )
          ],
        ),
      );
    });
  }

  void _confirmDelete(BuildContext context, int id) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Confirmar'),
          content: const Text('Tem certeza que deseja deletar este treino?'),
          actions: [
            TextButton(
              child: const Text('Cancelar'),
              onPressed: () => Navigator.pop(context),
            ),
            TextButton(
              child: const Text('Deletar'),
              onPressed: () {
                _deleteTreino(context, id);
                Navigator.pop(context);
              },
            ),
          ],
        );
      },
    );
  }

  void _deleteTreino(BuildContext context, int id) {
    final treinoService = Provider.of<WorkoutService>(context, listen: false);
    treinoService.deleteTreino(id).then((_) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Treino deletado com sucesso!")));
    }).catchError((error) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Erro ao deletar treino: $error")));
    });
  }
}