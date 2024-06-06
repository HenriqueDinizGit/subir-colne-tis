import 'package:mobile/services/api_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  final ApiService apiService;

  AuthService(this.apiService);

  Future<Map<String, dynamic>> login(String email, String senha) async {
    final response =
        await apiService.post('login', {'email': email, 'senha': senha});

    if (response != null && response['accessToken'] != null) {
      await _saveToken(response['accessToken']);
    }

    return response;
  }

  Future<Map<String, dynamic>> register(
      String email, String senha, String nome) async {
    final response = apiService.post('register', {'email': email, 'senha': senha, 'nome': nome});

    return response as Map<String, dynamic>;
  }

  Future<void> logout() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
  }

  // Salvar o JWT no SharedPreferences para uso posterior
  Future<void> _saveToken(String token) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', token);
  }

  Future<Map<String, dynamic>> getCurrentUser() async {
    final response = await apiService.get('currentUser');
    return response;
  }
}
