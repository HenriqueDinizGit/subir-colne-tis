import 'package:flutter/material.dart';
import 'package:mobile/services/community_service.dart';
import 'package:mobile/ui/pages/community/widgets/community_widget.dart';
import 'package:provider/provider.dart';


class CommunitiesPage extends StatefulWidget {
  @override
  _CommunityPageState createState() => _CommunityPageState();
}

class _CommunityPageState extends State<CommunitiesPage> {
  late  Future<Map<String, dynamic>>  _comunidades;

  @override
  void initState() {
    super.initState();
    _comunidades = Provider.of<CommunityService>(context, listen: false).getComunidadesDoUsuario();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Minhas Comunidades"),
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: _comunidades,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return CircularProgressIndicator();
          } else if (snapshot.hasError) {
            return Text("Erro ao carregar comunidades: ${snapshot.error}");
          } else if (snapshot.data!.isEmpty) {
            return Text("Nenhuma comunidade encontrada");
          } else {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                return CommunityWidget(comunidade: snapshot.data![index]);
              },
            );
          }
        },
      ),
    );
  }
}
