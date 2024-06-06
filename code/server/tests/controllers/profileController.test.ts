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

describe('Profile Controller Tests', () => {
  it('deve retornar 400 se campos obrigatórios estiverem faltando', async () => {
    const response = await agent.put(`${baseUrl}/profile`)
      .send({
        userId: '',
        name: '',
        age: '',
        email: ''
      })
      .expect(400);

    expect(response.body.message).toBe('Todos os campos são obrigatórios.');
  });

  it('deve retornar 200 se o perfil for atualizado com sucesso', async () => {
    const response = await agent.put(`${baseUrl}/profile`)
      .send({
        userId: '1',
        name: 'Test User',
        age: 30,
        email: 'test@example.com'
      })
      .expect(200);

    expect(response.body).toHaveProperty('id', 1);
    expect(response.body.name).toBe('Test User');
    expect(response.body.age).toBe(30);
    expect(response.body.email).toBe('test@example.com');
  });
});
