import supertest from 'supertest';
import app from '../../src/index'; // Seu caminho pode variar
import { httpServer } from '../../src/index'; // Seu caminho pode variar

const baseUrl: string = '/api/auth';
let agent: any = supertest(app);


beforeEach((done) => {
    if (!httpServer.listening) {
        httpServer.listen(4000, () => {
            agent = supertest(app);
            done();
        });
    } else {
        agent = supertest(app);
        done();
    }
});

afterEach((done) => {
    if (httpServer.listening) {
        httpServer.close(() => {
            done();
        });
    } else {
        done();
    }
});

describe('Auth Controller', () => {
    describe('POST /register', () => {
        // it('should register a new user', async () => {
        //     const response = await agent
        //         .post(`${baseUrl}/register`)
        //         .send({
        //             email: '1@test.com',
        //             senha: '123456',
        //             nome: 'Test User'
        //         })
        //         .expect(200);

        //     expect(response.body.email).toBe('1@test.com');
        //     expect(response.body).toHaveProperty('id');
        // });

        it('should not register a user with existing email', async () => {
            await agent
                .post(`${baseUrl}/register`)
                .send({
                    email: 'testeNovo@test.com', //esse email já existe no bd
                    senha: '123456',
                    nome: 'Test User'
                })
                .expect(400);
        });

        it('should not register a user with missing fields', async () => {
            await agent
                .post(`${baseUrl}/register`)
                .send({
                    email: 'testeNovo@test.com', //esse email já existe no bd
                    senha: '123456',
                })
                .expect(400);
        });
    });

    describe('POST /login', () => {
        it('should login with correct credentials', async () => {
            const response = await agent
                .post(`${baseUrl}/login`)
                .send({
                    email: 'test@test.com',
                    senha: '123456'
                })
                .expect(200);

            expect(response.body).toHaveProperty('token');
        });

        it('should not login with incorrect credentials', async () => {
            await agent
                .post(`${baseUrl}/login`)
                .send({
                    email: 'test@test.com',
                    senha: 'wrongpassword'
                })
                .expect(400);
        });
    });
});
