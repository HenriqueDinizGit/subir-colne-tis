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

describe('Register Controller Tests', () => {
  it('deve retornar 400 se campos obrigatórios estiverem faltando', async () => {
    const response = await agent.post(`${baseUrl}/register`)
      .send({
        email: '',
        fullName: '',
        password: '',
        confirmPassword: ''
      })
      .expect(400);

    expect(response.body.message).toBe('Todos os campos são obrigatórios.');
  });

  it('deve retornar 400 se a confirmação de senha não coincidir', async () => {
    const response = await agent.post(`${baseUrl}/register`)
      .send({
        email: 'test@example.com',
        fullName: 'Test User',
        password: 'password123',
        confirmPassword: 'password124'
      })
      .expect(400);

    expect(response.body.message).toBe('Confirmação de senha não coincide.');
  });

  it('deve retornar 409 se o usuário já existir', async () => {
    const response = await agent.post(`${baseUrl}/register`)
      .send({
        email: 'testeNovo@test.com', // esse email já existe no bd
        fullName: 'Test User',
        password: 'password123',
        confirmPassword: 'password123'
      })
      .expect(409);

    expect(response.body.message).toBe('Usuário já existe.');
  });

  it('deve retornar 201 se o cadastro for bem-sucedido', async () => {
    const response = await agent.post(`${baseUrl}/register`)
      .send({
        email: 'newuser@example.com',
        fullName: 'New User',
        password: 'password123',
        confirmPassword: 'password123'
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('newuser@example.com');
  });
});
