import 'package:flutter/material.dart';
import 'package:mobile/services/community_service.dart';
import 'package:mobile/services/workouts_complete_service.dart';
import 'package:mobile/ui/pages/community/widgets/community_ranking_widget.dart';
import 'package:mobile/ui/pages/community/widgets/member_widget.dart';
import 'package:mobile/ui/pages/community/widgets/traning_completed_widget.dart';
import 'package:provider/provider.dart';

class CommunityPage extends StatefulWidget {
  final int communityId;

  CommunityPage({Key? key, required this.communityId}) : super(key: key);

  @override
  _CommunityPageState createState() => _CommunityPageState();
}

class _CommunityPageState extends State<CommunityPage> {
  late Future<bool> _isAdmin;
  late Future<Map<String, dynamic>> _membros;
  late Future<List<dynamic>> _treinosRealizados;

  @override
  void initState() {
    super.initState();
    final communityService =
        Provider.of<CommunityService>(context, listen: false);
    _isAdmin = communityService.verificarAdmin(widget.communityId);

    _membros = communityService.getMembros(widget.communityId);
    
    
    _treinosRealizados =
        Provider.of<WorkoutCompleteService>(context, listen: false)
            .getTreinoRealizadoNaComunidade(widget.communityId.toString());
  }
  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Detalhes da Comunidade"),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () => _shareCommunity(),
          ),
          IconButton(
            icon: const Icon(Icons.bar_chart),
            onPressed: () => _showRankingModal(context),
          ),
          FutureBuilder<bool>(
            future: _isAdmin,
            builder: (context, snapshot) {
              if (snapshot.hasData && snapshot.data!) {
                return Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.edit),
                      onPressed: () => _editCommunity(context),
                    ),
                    IconButton(
                      icon: const Icon(Icons.delete),
                      onPressed: () => _deleteCommunity(context),
                    ),
                  ],
                );
              }
              return Container();
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text("Membros",
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            ),
          FutureBuilder<Map<String, dynamic>>(
              future: _membros,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const CircularProgressIndicator();
                } else if (snapshot.hasError) {
                  return const Text('Erro ao carregar membros');
                } else {
                  return Container(
                    height: 100,
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: snapshot.data!.length,
                      itemBuilder: (context, index) {
                        return MemberWidget(member: snapshot.data![index]);
                      },
                    ),
                  );
                }
              },
            ),
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text("Treinos Realizados",
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            ),
            FutureBuilder<List<dynamic>>(
              future: _treinosRealizados,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const CircularProgressIndicator();
                } else if (snapshot.hasError) {
                  return const Text('Erro ao carregar treinos realizados');
                } else {
                  return ListView.builder(
                    physics:
                        const NeverScrollableScrollPhysics(), // Important for nested scrolling
                    shrinkWrap: true,
                    itemCount: snapshot.data!.length,
                    itemBuilder: (context, index) {
                      return TrainingCompletedWidget(
                          training: snapshot.data![index]);
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

  void _shareCommunity() {
    // Implement sharing logic
  }

  void _showRankingModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return FutureBuilder<List<dynamic>>(
          future: Provider.of<CommunityService>(context, listen: false)
              .calcularPontosMembrosComunidade(widget.communityId),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const CircularProgressIndicator();
            } else if (snapshot.hasError) {
              return const Text('Erro ao carregar ranking');
            } else if (snapshot.data!.isEmpty) {
              return const Text('Nenhum ranking disponível');
            } else {
              return ListView.builder(
                itemCount: snapshot.data!.length,
                itemBuilder: (context, index) {
                  return CommunityRankingWidget(ranking: snapshot.data![index]);
                },
              );
            }
          },
        );
      },
    );
  }

  void _deleteCommunity(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Confirmar Deleção'),
          content: const Text('Tem certeza que deseja deletar esta comunidade?'),
          actions: <Widget>[
            TextButton(
              child: const Text('Cancelar'),
              onPressed: () => Navigator.of(context).pop(),
            ),
            TextButton(
              child: const Text('Deletar'),
              onPressed: () {
                _confirmDelete(context);
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  void _confirmDelete(BuildContext context) {
    final communityService =
        Provider.of<CommunityService>(context, listen: false);
    communityService.deleteComunidade(widget.communityId).then((_) {
      ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Comunidade deletada com sucesso!")));
      Navigator.of(context).pop(); // Optionally pop current page if necessary
    }).catchError((error) {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Erro ao deletar comunidade: $error")));
    });
  }

  void _editCommunity(BuildContext context) {
    TextEditingController nomeController =
        TextEditingController(text: "Nome da Comunidade");
    TextEditingController descricaoController =
        TextEditingController(text: "Descrição da Comunidade");
    TextEditingController dataInicioController =
        TextEditingController(text: "Data de Início");
    TextEditingController dataFimController =
        TextEditingController(text: "Data de Fim");

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text("Editar Comunidade"),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                TextField(
                    controller: nomeController,
                    decoration:
                        const InputDecoration(hintText: "Nome da Comunidade")),
                TextField(
                    controller: descricaoController,
                    decoration: const InputDecoration(hintText: "Descrição")),
                TextField(
                    controller: dataInicioController,
                    decoration: const InputDecoration(hintText: "Data de Início")),
                TextField(
                    controller: dataFimController,
                    decoration: const InputDecoration(hintText: "Data de Fim")),
              ],
            ),
          ),
          actions: [
            TextButton(
              child: const Text('Cancelar'),
              onPressed: () => Navigator.of(context).pop(),
            ),
            TextButton(
              child: const Text('Salvar'),
              onPressed: () {
                _updateCommunityDetails(
                    context,
                    nomeController.text,
                    descricaoController.text,
                    dataInicioController.text,
                    dataFimController.text);
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  void _updateCommunityDetails(BuildContext context, String nome,
      String descricao, String dataInicio, String dataFim) {
    final communityService =
        Provider.of<CommunityService>(context, listen: false);
    Map<String, dynamic> data = {
      'nome': nome,
      'descricao': descricao,
      'dataDeInicio': dataInicio,
      'dataDeFim': dataFim
    };

    communityService.editComunidade(widget.communityId, data).then((response) {
      ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Comunidade atualizada com sucesso!")));
    }).catchError((error) {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Erro ao atualizar comunidade: $error")));
    });
  }
}
