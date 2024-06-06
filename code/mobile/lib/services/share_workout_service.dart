import 'api_service.dart'; // Asegure-se de que o ApiService está sendo importado corretamente

class ShareWorkoutService {
  final ApiService apiService;

  ShareWorkoutService(this.apiService);

  // Compartilhar um treino
  Future<Map<String, dynamic>> shareTreino(int treinoId, bool isEditable) async {
    final response = await apiService.post("compartilhar/$treinoId?editavel=$isEditable", {});
    return response;
  }


  void redirectSharedTreino(String token) {
     //TODO
  }

  // Aceitar um treino compartilhado
  Future<String> acceptSharedTreino(String token) async {
    final response = await apiService.post("aceitar-compartilhamento/$token", {});
    return response['message'];
  }
}
