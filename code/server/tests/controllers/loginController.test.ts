import supertest from 'supertest';
import app from '../../src/index';
import { httpServer } from '../../src/index';

const baseUrl = '/api/auth';
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

describe('Login Controller Tests', () => {
  it('deve retornar 400 se campos obrigatórios estiverem faltando', async () => {
    const response = await agent.post(`${baseUrl}/login`)
      .send({
        email: '',
        password: ''
      })
      .expect(400);

    expect(response.body.message).toBe('Todos os campos são obrigatórios.');
  });

  it('deve retornar 401 se as credenciais forem inválidas', async () => {
    const response = await agent.post(`${baseUrl}/login`)
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      })
      .expect(401);

    expect(response.body.message).toBe('Credenciais inválidas.');
  });

  it('deve retornar 200 se o login for bem-sucedido', async () => {
    const response = await agent.post(`${baseUrl}/login`)
      .send({
        email: 'test@example.com',
        password: 'password123'
      })
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });
});
