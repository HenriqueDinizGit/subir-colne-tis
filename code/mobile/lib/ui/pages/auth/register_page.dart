import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/services/auth_service.dart';
import 'package:mobile/ui/widgets/form/common_checkbox_input.dart';
import 'package:mobile/ui/widgets/form/common_text_input.dart';
import 'package:provider/provider.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key, superKey, Key? customKey});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _formKey = GlobalKey<FormBuilderState>();
  bool _isPasswordVisible = false;

  @override
  Widget build(BuildContext context) {
    final authService = Provider.of<AuthService>(context);
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        FormBuilder(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              CommonTextInput(
                key: const Key('name'),
                name: 'name',
                labelText: 'Name',
                validators: [
                  FormBuilderValidators.required(),
                ],
              ),
              CommonTextInput(
                key: const Key("email"),
                name: 'email',
                labelText: 'Email',
                validators: [
                  FormBuilderValidators.required(),
                  FormBuilderValidators.email(),
                ],
              ),
              CommonTextInput(
                key: const Key('password'),
                name: 'password',
                labelText: 'Password',
                validators: [
                  FormBuilderValidators.required(),
                  FormBuilderValidators.minLength(6),
                ],
                visible: _isPasswordVisible,
                suffixIcon: GestureDetector(
                  onTap: () {
                    setState(() {
                      _isPasswordVisible = !_isPasswordVisible;
                    });
                  },
                  child: Icon(
                    _isPasswordVisible
                        ? Icons.visibility
                        : Icons.visibility_off,
                  ),
                ),
              ),
              const SizedBox(height: 10),
              const CommonCheckboxInput(
                name: 'acceptTerms',
                title: 'Accept Terms',
              ),
              const SizedBox(height: 10),
              const SizedBox(height: 10),
              MaterialButton(
                color: Colors.red,
                onPressed: () async {
                  if (_formKey.currentState?.saveAndValidate() ?? false) {
                    if (true) {
                      final formData = _formKey.currentState?.value;

                      final name = formData?['name'] ?? '';
                      final email = formData?['email'] ?? '';
                      final password = formData?['password'] ?? '';

                      await authService.register(email,password,name);
                    }
                  }
                  debugPrint(_formKey.currentState?.value.toString());
                },
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const SizedBox(
                  // width: double.infinity,
                  height: 50,
                  child: Center(
                    child: Text(
                      'Criar Conta',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 10),
            ],
          ),
        ),
        MaterialButton(
          color: Colors.blue,
          onPressed: () {
            context.go("/login");
          },
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          child: const SizedBox(
            // width: double.infinity,
            height: 50,
            child: Center(
              child: Text(
                'Voltar',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
