import supertest from 'supertest';
import app from '../../src/index';
import { httpServer } from '../../src/index';

const baseUrl = '/api/treinos';
let agent: any = supertest(app);
let token: string;

beforeAll((done) => {
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
  } else {
    done();
  }
});

describe('Training Controller Tests', () => {
  let createdTrainingId: number; // Guarda o ID do treino criado para uso nos testes subsequentes

  it('deve criar um novo treino', async () => {
    const response = await agent.post(`${baseUrl}`)
      .set('token', `Bearer ${token}`)
      .send({
        userId: 1,
        trainingName: 'Treino de Teste',
        exercises: ['Exercício 1', 'Exercício 2']
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    createdTrainingId = response.body.id; // Salva o ID para uso nos outros testes
  });

  it('deve recuperar todos os treinos', async () => {
    const response = await agent.get(`${baseUrl}`)
      .set('token', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('deve recuperar um treino específico por ID', async () => {
    const response = await agent.get(`${baseUrl}/${createdTrainingId}`)
      .set('token', `Bearer ${token}`)
      .expect(200);

    expect(response.body.id).toEqual(createdTrainingId);
  });

  it('deve atualizar um treino existente', async () => {
    const updatedName = 'Treino de Teste Modificado';
    const updatedExercises = ['Exercício 3', 'Exercício 4'];

    const response = await agent.put(`${baseUrl}/${createdTrainingId}`)
      .set('token', `Bearer ${token}`)
      .send({
        trainingName: updatedName,
        exercises: updatedExercises
      })
      .expect(200);

    expect(response.body).toHaveProperty('id', createdTrainingId);
    expect(response.body.trainingName).toEqual(updatedName);
    expect(response.body.exercises).toEqual(updatedExercises);
  });

  it('deve excluir um treino', async () => {
    await agent.delete(`${baseUrl}/${createdTrainingId}`)
      .set('token', `Bearer ${token}`)
      .expect(200);

    await agent.get(`${baseUrl}/${createdTrainingId}`)
      .set('token', `Bearer ${token}`)
      .expect(404); // Assume que 404 é retornado para um treino não encontrado
  });
});
