import supertest from 'supertest';
import app from '../../src/index'; // Importa o app Express configurado
import { httpServer } from '../../src/index'; // Seu caminho pode variar

const baseUrl = '/api/treino'; // Ajuste conforme a rota real usada no seu app
let agent:any = supertest(app);

let token: string; // Armazenará o token de autenticação

beforeAll((done) => {
    agent = supertest(app);
    if (!httpServer.listening) {
        httpServer.listen(4000, done);
    } else {
        done();
    }
});

beforeEach(async () => {
    // Fazer login para obter um token antes de cada teste
    const loginResponse = await agent.post('/api/auth/login')
        .send({
            email: 'test@test.com',
            senha: '123456'
        })
        .expect(200);

    token = loginResponse.body.token; // Supondo que o token esteja no corpo da resposta
});

afterAll((done) => {
    if (httpServer.listening) {
        httpServer.close(done);
    }
});

describe('Treino Controller Tests', () => {
    let createdTreinoId: number; // Guarda o ID do treino criado para uso nos testes subsequentes

    // Teste para criar um novo treino
    it('should create a new treino', async () => {
        const response = await agent.post(`${baseUrl}`)
            .set('token', `Bearer ${token}`)
            .send({
                nome: 'Treino de Teste',
                grupoMuscular: 'Peito'
            })
            .expect(200);

        expect(response.body).toHaveProperty('id');
        createdTreinoId = response.body.id; // Salva o ID para uso nos outros testes
    });

    // Teste para visualizar os treinos existentes
    it('should retrieve all treinos', async () => {
        
        const response = await agent.get(`${baseUrl}`)
            .set('token', `Bearer ${token}`)
            .expect(200);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Teste para visualizar um treino específico
    it('should retrieve a specific treino by ID', async () => {
        const response = await agent.get(`${baseUrl}/${createdTreinoId}`)
            .set('token', `Bearer ${token}`)
            .expect(200);

        expect(response.body.id).toEqual(createdTreinoId);
    });

    // Teste para modificar um treino existente
    it('should update an existing treino', async () => {
        const updatedName = 'Treino de Teste Modificado';
        const updatedGroup = 'Costas';

        const response = await agent.put(`${baseUrl}/${createdTreinoId}`)
            .set('token', `Bearer ${token}`)
            .send({
                nome: updatedName,
                grupoMuscular: updatedGroup
            })
            .expect(200);

        expect(response.body).toHaveProperty('id', createdTreinoId);
        expect(response.body.nome).toEqual(updatedName);
        expect(response.body.grupoMuscular).toEqual(updatedGroup);
    });

    // Teste para deletar um treino
    it('should delete a treino', async () => {
        await agent.delete(`${baseUrl}/${createdTreinoId}`)
            .set('token', `Bearer ${token}`)
            .expect(200);
        
        // Verificar se o treino foi realmente excluído
        await agent.get(`${baseUrl}/${createdTreinoId}`)
            .set('token', `Bearer ${token}`)
            .expect(404); // Assume que 404 é retornado para um treino não encontrado
    });
});
