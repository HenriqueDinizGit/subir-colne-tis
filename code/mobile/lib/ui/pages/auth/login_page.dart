import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/services/auth_service.dart';
import 'package:mobile/ui/widgets/form/common_checkbox_input.dart';
import 'package:mobile/ui/widgets/form/common_text_input.dart';
import 'package:provider/provider.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({superKey, Key? key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormBuilderState>();
  bool _isPasswordVisible = false;
  @override
  Widget build(BuildContext context) {
    final authService = Provider.of<AuthService>(context, listen: false);
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        FormBuilder(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
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
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: CommonCheckboxInput(
                      name: 'rememberMe',
                      title: "Remember me",
                    ),
                  ),
                  Expanded(
                    child: Align(
                      alignment: Alignment.centerRight,
                      child: InkWell(
                        onTap: () {
                          context.go(
                            '/forgetPassword',
                          );
                        },
                        child: const Text(
                          "Esqueceu a senha?",
                          style: TextStyle(
                            color: Colors.blue,
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              const SizedBox(height: 10),
              MaterialButton(
                color: Colors.blue,
                onPressed: () async {
                  if (_formKey.currentState?.saveAndValidate() ?? false) {
                    final formData = _formKey.currentState?.value;
                    final email = formData?['email'];
                    final password = formData?['password'];
                    try {
                      // Chame o método de login do authService aqui
                      final success = await authService.login(email, password);
                      if (success != null && success.isNotEmpty) {
                        context.go('/home');
                      } else {
                        // Tratamento caso o login falhe
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                              content: Text("Login falhou! Tente novamente.")),
                        );
                      }
                    } catch (e) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Erro durante o login: $e')),
                      );
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
                      'Login',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 10),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Não tem uma conta? '),
            InkWell(
              onTap: () {
                context.go(
                  '/register',
                );
              },
              child: const Text(
                'Registre-se',
                style:
                    TextStyle(fontWeight: FontWeight.bold, color: Colors.black),
              ),
            ),
          ],
        ),
        const SizedBox(height: 10),
      ],
    );
  }
}
