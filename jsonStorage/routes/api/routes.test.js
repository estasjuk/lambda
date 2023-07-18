const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");

const { Route } = require("../../db/models/routes");

const {DB_HOST_TEST, PORT} = process.env;

const randomRoute = Math.random().toString(16).substr(2);

describe("test /api/routes route", ()=> {
    let server = null;
    const data = {
        name: "Bogdan",
        email: "bogdan@gmail.com",
        password: "123456"
    };

    const wrongData = {};

    const wrongRouteWithQuestionMark = "ghjg?jkjlk";
    const wrongRouteWithSpace = "jkjlk%20jkjklj";

    beforeAll(async ()=> {
        server = app.listen(PORT, () => {
            console.log(
                `${new Date().toLocaleString()}: Server running. Use our API on port: ${PORT}`
            );
        });
        await mongoose.connect(DB_HOST_TEST);
            console.log(`${new Date().toLocaleString()}: Database connection successful`)
    })

    afterAll(async ()=> {
        await Route.deleteMany({})
        server.close();
        await mongoose.connection.close();
    });

    test("test add user route with correct data", async()=> {

        const res = await request(app).post(`/api/${randomRoute}`).send(data);
        expect(res.statusCode).toBe(201);
        expect(res.body.route).toBe(randomRoute);
        expect(res.body.data).toEqual(data);

        const route = await Route.findOne().limit(1); //returns the last record
        expect(route.route).toEqual(randomRoute);
        
    });

    test("test add user route with incorrect data", async()=> {

        const res = await request(app).post(`/api/${randomRoute}`).send(wrongData);
        expect(res.statusCode).toBe(400);
        
    });

    test("test add user route with absent route", async()=> {

        const res = await request(app).post(`/api/`).send(data);
        expect(res.statusCode).toBe(400);
        
    });

    test("test add user route with wrong route with question mark", async()=> {

        const res = await request(app).post(`/api/${wrongRouteWithQuestionMark}`).send(data);
        expect(res.statusCode).toBe(400);
        
    });

    test("test add user route with wrong route with space", async()=> {

        const res = await request(app).post(`/api/${wrongRouteWithSpace}`).send(data);
        expect(res.statusCode).toBe(400);
        
    });



    test("test get user route with correct data", async()=> {

        const res = await request(app).get(`/api/${randomRoute}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.route).toBe(randomRoute);
        expect(res.body.data).toEqual(data);

    });

    test("test get user route with absent route", async()=> {

        const res = await request(app).get(`/api/`);
        expect(res.statusCode).toBe(400);
        
    });

    test("test get user route with wrong route with question mark", async()=> {

        const res = await request(app).get(`/api/${wrongRouteWithQuestionMark}`);
        expect(res.statusCode).toBe(400);
        
    });

});