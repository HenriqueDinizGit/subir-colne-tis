import supertest from 'supertest';
import app from '../../src/index';
import { httpServer } from '../../src/index';

const baseUrl = '/api/assignTraining';
let agent: any = supertest(app);

beforeAll((done) => {
  if (!httpServer.listening) {
    httpServer.listen(4000, done);
  } else {
    done();
  }
});

afterAll((done) => {
  if (httpServer.listening) {
    httpServer.close(done);
  } else {
    done();
  }
});

describe('Assign Training Controller Tests', () => {
  it('deve retornar 400 se campos obrigatórios estiverem faltando na atribuição de treino', async () => {
    const response = await agent.post(`${baseUrl}`)
      .send({
        userId: '',
        trainingId: ''
      })
      .expect(400);

    expect(response.body.message).toBe('Todos os campos são obrigatórios.');
  });

  it('deve retornar 200 se o treino for atribuído com sucesso', async () => {
    const response = await agent.post(`${baseUrl}`)
      .send({
        userId: '1',
        trainingId: '1'
      })
      .expect(200);

    expect(response.body).toHaveProperty('userId', '1');
    expect(response.body).toHaveProperty('trainingId', '1');
  });

  it('deve retornar 500 se houver um erro no servidor ao atribuir o treino', async () => {
    const response = await agent.post(`${baseUrl}`)
      .send({
        userId: '1',
        trainingId: '1'
      })
      .expect(500);

    expect(response.body.message).toBe('Erro no servidor.');
  });
});
    