import 'api_service.dart';

class CommunityService {
  final ApiService apiService;

  CommunityService(this.apiService);

  Future<Map<String, dynamic>> getComunidadesDoUsuario() async {
    return await apiService.get('');
  }

  Future<Map<String, dynamic>> getComunidade(int id) async {
    return await apiService.get('$id');
  }

  Future<Map<String, dynamic>> getMembros(int comunidadeId) async {
    return await apiService.get('getMembros/$comunidadeId');
  }

  Future<String> shareComunidade(int comunidadeId) async {
    final response =
        await apiService.get('compartilhar-comunidade/$comunidadeId');
    return response['linkCompartilhamento'];
  }

  Future<Map<String, dynamic>> createComunidade(
      Map<String, dynamic> data) async {
    return await apiService.post('', data);
  }

  Future<Map<String, dynamic>> editComunidade(
      int id, Map<String, dynamic> data) async {
    return await apiService.put('$id', data);
  }

  Future<Map<String, dynamic>> deleteComunidade(int id) async {
    return await apiService.delete('$id');
  }

  Future<bool> verificarAdmin(int id) async {
    final response = await apiService.get('verificarADM/$id');
    return response['admin'] ?? false;
  }

  Future<List<dynamic>> calcularPontosMembrosComunidade(
      int comunidadeId) async {
    return await apiService.get('ranking/$comunidadeId');
  }
}
