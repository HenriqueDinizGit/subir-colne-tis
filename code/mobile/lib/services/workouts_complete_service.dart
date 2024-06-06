import 'api_service.dart'; // Asegure-se de que o ApiService está sendo importado corretamente

class WorkoutCompleteService {
  final ApiService apiService;

  WorkoutCompleteService(this.apiService);

  // Criar um novo treino realizado
  Future<Map<String, dynamic>> createTreinoRealizado(int treinoId) async {
    final response = await apiService.post("$treinoId", {});
    return response;
  }

  // Buscar treinos realizados por um usuário
  Future<List<dynamic>> getTreinosRealizadosDoUsuario() async {
    final response = await apiService.get("usuario");
    return response;
  }

  // Buscar treinos realizados na comunidade
  Future<List<dynamic>> getTreinoRealizadoNaComunidade(String comunidadeId) async {
    final response = await apiService.get("comunidade/$comunidadeId");
    return response;
  }

  // Buscar um treino realizado pelo ID
  Future<Map<String, dynamic>> getTreinoRealizado(int id) async {
    final response = await apiService.get("$id");
    return response;
  }

  // Deletar um treino realizado
  Future<Map<String, dynamic>> deleteTreinoRealizado(int id) async {
    final response = await apiService.delete("$id");
    return response;
  }

  // Atualizar um treino realizado
  Future<Map<String, dynamic>> updateTreinoRealizado(int id, Map<String, dynamic> data) async {
    final response = await apiService.put("$id", data);
    return response;
  }
}
