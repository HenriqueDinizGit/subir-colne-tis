import 'package:flutter/material.dart';
import 'package:mobile/services/exercice_serie_service.dart';
import 'package:provider/provider.dart';
// Supondo que você tenha um serviço para lidar com séries de exercícios

class ExerciceWidget extends StatefulWidget {
  final Map<String, dynamic> exercicio;

  ExerciceWidget({Key? key, required this.exercicio}) : super(key: key);

  @override
  _ExerciceWidgetState createState() => _ExerciceWidgetState();
}

class _ExerciceWidgetState extends State<ExerciceWidget> {
  late List<dynamic> series;

  @override
  void initState() {
    super.initState();
    // Inicializar a lista de séries; este é um exemplo de chamada de serviço para buscar séries
    series = widget.exercicio['series'] ?? [];
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.all(8.0),
      child: Column(
        children: [
          ListTile(
            title: Text(widget.exercicio['nome']),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                IconButton(
                  icon: Icon(Icons.edit),
                  onPressed: () => _showEditDialog(context),
                ),
                IconButton(
                  icon: Icon(Icons.delete),
                  onPressed: () => _confirmDelete(context),
                ),
              ],
            ),
          ),
          ListView.builder(
            shrinkWrap: true,
            itemCount: series.length,
            itemBuilder: (context, index) {
              var serie = series[index];
              return ListTile(
                title: Text("Peso: ${serie['peso']} kg, Repetições: ${serie['repeticoes']}"),
              );
            },
          ),
          Align(
            alignment: Alignment.bottomRight,
            child: TextButton(
              child: Text("Adicionar Série"),
              onPressed: () => _addSerie(context),
            ),
          )
        ],
      ),
    );
  }

  void _showEditDialog(BuildContext context) {
    TextEditingController controller = TextEditingController(text: widget.exercicio['nome']);
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Editar Exercício'),
          content: TextField(
            controller: controller,
            decoration: InputDecoration(labelText: "Nome do Exercício"),
          ),
          actions: [
            TextButton(
              child: Text('Cancelar'),
              onPressed: () => Navigator.of(context).pop(),
            ),
            TextButton(
              child: Text('Salvar'),
              onPressed: () {
                // Adicione a lógica para atualizar o exercício aqui
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  void _confirmDelete(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Confirmar Deleção'),
          content: Text('Tem certeza que deseja deletar este exercício?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text('Cancelar'),
            ),
            TextButton(
              onPressed: () {
                // Adicione a lógica para deletar o exercício aqui
                Navigator.of(context).pop();
              },
              child: Text('Deletar'),
            ),
          ],
        );
      },
    );
  }


  void _addSerie(BuildContext context) {
  TextEditingController pesoController = TextEditingController();
  TextEditingController repeticoesController = TextEditingController();

  showDialog(
    context: context,
    builder: (context) {
      return AlertDialog(
        title: Text('Adicionar Nova Série'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: pesoController,
              decoration: InputDecoration(labelText: "Peso (kg)"),
              keyboardType: TextInputType.numberWithOptions(decimal: true),
            ),
            TextField(
              controller: repeticoesController,
              decoration: InputDecoration(labelText: "Repetições"),
              keyboardType: TextInputType.number,
            ),
          ],
        ),
        actions: [
          TextButton(
            child: Text('Cancelar'),
            onPressed: () => Navigator.of(context).pop(),
          ),
          TextButton(
            child: Text('Salvar'),
            onPressed: () {
              _saveSerie(context, pesoController.text, repeticoesController.text);
              Navigator.of(context).pop();
            },
          ),
        ],
      );
    },
  );
}

void _saveSerie(BuildContext context, String peso, String repeticoes) {
  final serieExerciseService = Provider.of<ExerciceSerieService>(context, listen: false);
  Map<String, dynamic> serieData = {
    'peso': peso,
    'repeticoes': repeticoes,
    'exercicioId': widget.exercicio['id'],
  };

  serieExerciseService.createSerieExercicio(serieData).then((_) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text("Série adicionada com sucesso!"))
    );
    // Update the local state to refresh the list
    setState(() {
      series.add({'peso': peso, 'repeticoes': repeticoes}); // This is a simple way to update the UI locally
    });
  }).catchError((error) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text("Erro ao adicionar série: $error"))
    );
  });
}

}
