import 'package:flutter/material.dart';

class CommunityRankingWidget extends StatelessWidget {
  final Map<String, dynamic> ranking;

  CommunityRankingWidget({Key? key, required this.ranking}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text("${ranking['nome']} - Pontos: ${ranking['pontos']}"),
    );
  }
}
