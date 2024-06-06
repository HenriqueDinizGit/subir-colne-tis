import 'api_service.dart'; // Asegure-se de que o ApiService está sendo importado corretamente

class WorkoutService {
  final ApiService apiService;

  WorkoutService(this.apiService);

  // Criar um novo treino
  Future<Map<String, dynamic>> createTreino(Map<String, dynamic> data) async {
    final response = await apiService.post("", data);
    return response;
  }

  // Atualizar um treino existente
  Future<Map<String, dynamic>> updateTreino(int id, Map<String, dynamic> data) async {
    final response = await apiService.put("$id", data);
    return response;
  }

  // Deletar um treino
  Future<String> deleteTreino(int id) async {
    final response = await apiService.delete("$id");
    return response['message'];
  }

  // Buscar todos os treinos do usuário
  Future<List<dynamic>> getTreinos() async {
    final response = await apiService.get("");
    return response;
  }

  // Buscar um treino pelo ID
  Future<Map<String, dynamic>> getTreinoById(int id) async {
    final response = await apiService.get("$id");
    return response;
  }

  // Copiar um treino existente
  Future<Map<String, dynamic>> copyTreino(int id) async {
    final response = await apiService.post("/copyTreino/$id", {});
    return response;
  }
}
