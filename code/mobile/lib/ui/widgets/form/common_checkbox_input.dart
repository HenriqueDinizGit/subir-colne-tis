import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';

class CommonCheckboxInput extends StatefulWidget {
  final String name;
  final String title;

  const CommonCheckboxInput(
      {super.key, required this.name, required this.title});

  @override
  _CommonCheckboxInputState createState() => _CommonCheckboxInputState();
}

class _CommonCheckboxInputState extends State<CommonCheckboxInput> {
  bool isChecked = false;

  @override
  Widget build(BuildContext context) {
    return FormBuilderCheckbox(
      name: widget.name,
      title: Text(
        widget.title,
        style: const TextStyle(
          color: Colors.black,
          fontWeight: FontWeight.bold,
          fontSize: 12,
        ),
      ),
    );
  }
}
