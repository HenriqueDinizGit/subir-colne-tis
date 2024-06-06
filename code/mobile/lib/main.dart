import 'package:flutter/material.dart';
import 'main_widget.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future<void> main() async {
   WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(); // Carrega variáveis de ambiente
  final baseUrl = dotenv.get('BASE_URL');
  runApp(MyApp(baseUrl: baseUrl));
}
