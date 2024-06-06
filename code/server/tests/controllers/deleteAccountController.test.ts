import supertest from 'supertest';
import app from '../../src/index';
import { httpServer } from '../../src/index';

const baseUrl = '/api/users';
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

describe('Delete Account Controller Tests', () => {
  it('deve retornar 200 se o usuário for excluído com sucesso', async () => {
    const userId = 1; // Assumindo que este usuário existe no banco de dados
    const response = await agent.delete(`${baseUrl}/${userId}`)
      .expect(200);

    expect(response.body.message).toBe('Usuário excluído com sucesso.');
  });

  it('deve retornar 500 se houver um erro no servidor', async () => {
    const userId = 1; // Assumindo que este usuário existe no banco de dados
    const response = await agent.delete(`${baseUrl}/${userId}`)
      .expect(500);

    expect(response.body.message).toBe('Erro no servidor.');
  });
});
