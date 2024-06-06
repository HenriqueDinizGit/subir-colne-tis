import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';

class CommonDropdownInput extends StatefulWidget {
  final Key key;
  final String name;
  final String labelText;
  final List<String? Function(String?)> validators;
  final List<String> options; // Novo parâmetro options

  final Widget? suffixIcon;
  final bool visible;

  const CommonDropdownInput({
    required this.key,
    required this.name,
    required this.labelText,
    required this.validators,
    required this.options, // Atualizado para receber o parâmetro options
    this.suffixIcon,
    this.visible = true,
  });

  @override
  _CommonDropdownInputState createState() => _CommonDropdownInputState();
}

class _CommonDropdownInputState extends State<CommonDropdownInput> {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 12.0),
          child: Text(
            widget.labelText,
            style: TextStyle(
              color: Colors.black,
              fontWeight: FontWeight.bold,
              fontSize: 24,
            ),
          ),
        ),
        ConstrainedBox(
          constraints: BoxConstraints(
            maxWidth: MediaQuery.of(context).size.width,
          ),
          child: FormBuilderDropdown(
            key: widget.key,
            name: widget.name,
            decoration: InputDecoration(
              labelText: widget.labelText,
              floatingLabelBehavior: FloatingLabelBehavior.never,
              suffixIcon: Padding(
                padding: const EdgeInsets.only(
                    right: 8.0), // Adicionado padding direito para o ícone
                child: widget.suffixIcon,
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: const BorderSide(color: Colors.grey),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: const BorderSide(color: Colors.grey),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: const BorderSide(color: Colors.grey),
              ),
              filled: true,
              fillColor: Colors.grey.withOpacity(0.1),
            ),
            items: widget.options.map((option) => DropdownMenuItem(
              value: option,
              child: Text(option),
            )).toList(),
            validator: FormBuilderValidators.compose(widget.validators),
          ),
        ),
      ],
    );
  }
}
