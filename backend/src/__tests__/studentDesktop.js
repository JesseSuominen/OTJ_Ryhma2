const { describe, expect, test, afterAll } = require('@jest/globals');
const request = require('supertest');
const app = require('../app'); // Import your Express app

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const BAD_REQUEST = 400;
const HTTP_STATUS_NOK = 404;
const INTERNAL_ERROR = 500;

const login = async () => {
    return await request(app)
        .post('/api/user/login')
        .set('Accept', 'application/json')
        .set('Content', 'appliction/json')
        .send({
            username: 'name',
            password: 'yoo'
        })
}

describe('user setup', () => {
    test('make user, should return 201', async () => {
        const response = await request(app)
            .post('/api/user/signup')
            .set('Accept', 'application/json')
            .set('Content', 'appliction/json')
            .send({
                username: 'name',
                password: 'yoo'
            })
        expect(response.status).toEqual(201);
        expect(response.headers['content-type']).toMatch(/json/);
    });

    test('login, should return 200', async () => {
        const response = await login()
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('token');
    });

    test('make user that exists, should return 422', async () => {
        const response = await request(app)
            .post('/api/user/signup')
            .set('Accept', 'application/json')
            .set('Content', 'appliction/json')
            .send({
                username: 'name',
                password: 'yoo'
            })
        expect(response.status).toEqual(422);
        expect(response.headers['content-type']).toMatch(/json/);
    });
})

describe('Chat routes', () => {
    let createdChatroomId;
    let createdMessageId;
    let token;
    let user_id;

    beforeAll(async () => {
        const response = await login();
        token = response.body.token;
        user_id = response.body.user_id;
    });

    test('POST /api/chat', async () => {
        const response = await request(app)
            .post('/api/chat')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Testing Roomabcde', description: 'This is a test roomabcde', type: 1});
        expect(response.status).toEqual(201);
        createdChatroomId = response.body.id;
    });


    test('GET /api/chat/rooms', async () => {
        const response = await request(app)
            .get('/api/chat/rooms')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('POST /api/chat/message', async () => {
        console.log(`user_id: ${user_id}`);
        console.log(`createdChatroomId: ${createdChatroomId}`);
        const response = await request(app)
            .post('/api/chat/message')
            .set('Authorization', `Bearer ${token}`)
            .send({ user_id: user_id, chatroom_id: createdChatroomId, text: 'Test message', datetime: '2024-04-16 16:45:32' });
        expect(response.status).toEqual(201);
        createdMessageId = response.body.id;
    });

    test('GET /api/chat/messages', async () => {
        const response = await request(app)
            .get(`/api/chat/messages?id=${createdChatroomId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    afterAll(async () => {
        await request(app)
            .delete(`/api/chat/message/delete/${createdMessageId}`)
            .set('Authorization', `Bearer ${token}`);
        await request(app)
            .delete(`/api/chat/room/delete/${createdChatroomId}`)
            .set('Authorization', `Bearer ${token}`);
    });
});

describe('Calendar routes', () => {
    let createdEventId;
    let createdWorkhourId;
    let token;
    let user_id;

    beforeAll(async () => {
        const response = await login();
        token = response.body.token;
        user_id = response.body.user_id;
    });

    test('POST /api/calendar/event', async () => {
        console.log(`user_id: ${user_id}`);
        const response = await request(app)
            .post('/api/calendar/event?id=' + user_id)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Eventa',
                description: 'This is a test eventa',
                start_date: '2024-04-20 16:45:32',
                end_date: '2024-04-21 17:45:32'
            });
        expect(response.status).toEqual(201);
        createdEventId = response.body.id;
    });

    test('GET /api/calendar/events', async () => {
        const response = await request(app)
            .get('/api/calendar/events?id=' + user_id)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(HTTP_STATUS_OK);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('POST /api/calendar/hour', async () => {
        const response = await request(app)
            .post('/api/calendar/hour?id=' + user_id)
            .set('Authorization', `Bearer ${token}`)
            .send({user_id: user_id,
                amount: 3,
                name: 'Working on tests',
                date: '2024-04-17T00:00:00Z' // ISO 8601 format
            });
        expect(response.status).toEqual(HTTP_STATUS_CREATED);
        createdWorkhourId = response.body.id;
    });

    test('GET /api/calendar/hours', async () => {
        const response = await request(app)
            .get('/api/calendar/hours?id=' + user_id)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(HTTP_STATUS_OK);
        expect(response.body).toBeInstanceOf(Array);
    });

    afterAll(async () => {
        await request(app)
            .delete(`/api/calendar/event/delete/${createdEventId}`)
            .set('Authorization', `Bearer ${token}`);
        await request(app)
            .delete(`/api/calendar/hour/delete/${createdWorkhourId}`)
            .set('Authorization', `Bearer ${token}`);
    });
});