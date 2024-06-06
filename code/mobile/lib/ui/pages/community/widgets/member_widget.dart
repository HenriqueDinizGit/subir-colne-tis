import 'package:flutter/material.dart';

class MemberWidget extends StatelessWidget {
  final Map<String, dynamic> member;

  MemberWidget({Key? key, required this.member}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    String initials = member['nome'].split(" ").map((n) => n[0]).take(2).join();
    return Container(
      width: 60,
      height: 60,
      decoration: BoxDecoration(
        color: Colors.blue,
        shape: BoxShape.circle,
      ),
      alignment: Alignment.center,
      child: Text(initials, style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
    );
  }
}
