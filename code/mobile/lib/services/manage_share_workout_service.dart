import 'api_service.dart'; // Asegure-se de que o ApiService está sendo importado corretamente

class ManageSharedWorkoutService {
  final ApiService apiService;

  ManageSharedWorkoutService(this.apiService);

  // Buscar todos os treinos compartilhados pelo usuário
  Future<List<dynamic>> getSharedTreinos() async {
    final response = await apiService.get("");
    return response;
  }

  // Deletar um treino compartilhado pelo ID
  Future<dynamic> deleteSharedTreino(int id) async {
    final response = await apiService.delete("$id");
    return response;
  }

  // Obter usuários que receberam um treino compartilhado pelo ID do treino
  Future<List<dynamic>> getUsuariosFromSharedTreino(int id) async {
    final response = await apiService.get("$id");
    return response;
  }

  // Remover um usuário de um treino compartilhado
  Future<dynamic> deleteUsuarioFromSharedTreino(int treinoId, int usuarioId) async {
    final response = await apiService.delete("$treinoId/user/$usuarioId");
    return response;
  }
}
