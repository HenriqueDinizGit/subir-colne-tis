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

describe('User List Controller Tests', () => {
  it('deve retornar 200 se a lista de usuários for obtida com sucesso', async () => {
    const response = await agent.get(`${baseUrl}`)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('deve retornar 500 se houver um erro no servidor', async () => {
    const response = await agent.get(`${baseUrl}`)
      .expect(500);

    expect(response.body.message).toBe('Erro no servidor.');
  });
});
