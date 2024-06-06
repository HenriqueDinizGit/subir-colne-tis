import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  final String baseUrl;

  ApiService(this.baseUrl);

  // Obter o token do SharedPreferences
  Future<String> _getToken() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token') ?? '';  // Certifique-se de armazenar o token com a chave 'token'
  }

  // Criação do cabeçalho com Bearer Token
  Future<Map<String, String>> _getHeaders() async {
    final token = await _getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token'
    };
  }

  // Método GET
  Future<dynamic> get(String endpoint) async {
    final response = await http.get(
      Uri.parse('$baseUrl/$endpoint'),
      headers: await _getHeaders(),
    );
    return _processResponse(response);
  }

  // Método POST
  Future<dynamic> post(String endpoint, dynamic data) async {
    final response = await http.post(
      Uri.parse('$baseUrl/$endpoint'),
      headers: await _getHeaders(),
      body: json.encode(data),
    );
    return _processResponse(response);
  }

  // Método PUT
  Future<dynamic> put(String endpoint, dynamic data) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$endpoint'),
      headers: await _getHeaders(),
      body: json.encode(data),
    );
    return _processResponse(response);
  }

  // Método PATCH
  Future<dynamic> patch(String endpoint, dynamic data) async {
    final response = await http.patch(
      Uri.parse('$baseUrl/$endpoint'),
      headers: await _getHeaders(),
      body: json.encode(data),
    );
    return _processResponse(response);
  }

  // Método DELETE
  Future<dynamic> delete(String endpoint) async {
    final response = await http.delete(
      Uri.parse('$baseUrl/$endpoint'),
      headers: await _getHeaders(),
    );
    return _processResponse(response);
  }

  // Processamento unificado de respostas
  dynamic _processResponse(http.Response response) {
    var data;
    try {
      data = json.decode(response.body);
    } catch (e) {
      throw Exception('Error parsing response: ${e.toString()}');
    }

    switch (response.statusCode) {
      case 200:
        return data;
      case 401:
        throw Exception('Unauthorized: Authentication is required and has failed.');
      case 403:
        throw Exception('Forbidden: You do not have permission to access this resource.');
      case 404:
        throw Exception('Not found: The requested resource was not found.');
      case 500:
        throw Exception('Internal Server Error: Something went wrong on the server side.');
      default:
        throw Exception('Failed to load data with status code: ${response.statusCode}');
    }
  }
}
