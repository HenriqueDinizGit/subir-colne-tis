import 'api_service.dart'; // Asegure-se de que o ApiService está sendo importado corretamente

class ExerciceService {
  final ApiService apiService;

  ExerciceService(this.apiService);

  // Criar um novo exercício
  Future<Map<String, dynamic>> createExercicio(Map<String, dynamic> data) async {
    final response = await apiService.post("", data);
    return response;
  }

  // Atualizar um exercício existente
  Future<Map<String, dynamic>> updateExercicio(int id, Map<String, dynamic> data) async {
    final response = await apiService.put("$id", data);
    return response;
  }

  // Deletar um exercício
  Future<String> deleteExercicio(int id) async {
    final response = await apiService.delete("$id");
    return response['message'];
  }

  // Buscar todos os exercícios para um determinado treino
  Future<List<dynamic>> getExercicios(int treinoId) async {
    final response = await apiService.get("$treinoId");
    return response;
  }

  // Buscar um exercício pelo ID
  Future<Map<String, dynamic>> getExercicioById(int id) async {
    final response = await apiService.get("$id");
    return response;
  }
}
