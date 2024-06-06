import 'package:flutter/material.dart';

class CommunityWidget extends StatelessWidget {
  final Map<String, dynamic> comunidade;

  CommunityWidget({Key? key, required this.comunidade}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(comunidade['nome']),
        subtitle: Text("${comunidade['descricao']}\nDe ${comunidade['dataDeInicio']} até ${comunidade['dataDeFim']}"),
        onTap: () {
          Navigator.pushNamed(context, '/community/${comunidade['id']}');
        },
      ),
    );
  }
}
