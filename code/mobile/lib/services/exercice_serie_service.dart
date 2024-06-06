import 'api_service.dart'; // Asegure-se de que o ApiService está sendo importado corretamente

class ExerciceSerieService {
  final ApiService apiService;

  ExerciceSerieService(this.apiService);

  // Criar uma nova série de exercícios
  Future<Map<String, dynamic>> createSerieExercicio(Map<String, dynamic> data) async {
    final response = await apiService.post("", data);
    return response;
  }

  // Atualizar uma série de exercícios existente
  Future<Map<String, dynamic>> updateSerieExercicio(int id, Map<String, dynamic> data) async {
    final response = await apiService.put("$id", data);
    return response;
  }

  // Deletar uma série de exercícios
  Future<String> deleteSerieExercicio(int id) async {
    final response = await apiService.delete("$id");
    return response['message'];
  }

  // Buscar todas as séries de exercícios para um determinado exercício
  Future<List<dynamic>> getSeriesExercicios(int exercicioId) async {
    final response = await apiService.get("$exercicioId");
    return response;
  }
}
