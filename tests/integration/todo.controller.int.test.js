const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");
const {response} = require("express");

const endpointUrl = "/todos/";

let firstTodo, newTodoId
const testData = {
    title: "Make integration test for PUT",
    done: false
};
const notExistingTodoId = '65b25aa2bcc9d796f9c62a59'

describe(endpointUrl, () => {
    it("POST" + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send(newTodo)
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
        newTodoId = response.body._id;
    });
    it("should return error 500 on malformed data with POST" + endpointUrl, async () => {
        const response = await request(app)
            .post(endpointUrl)
            .send({ title: "Missing done property" });
        expect(response.statusCode).toBe(500);
        // Update this message to match the actual API response
        expect(response.body).toStrictEqual({
            message: "Todo validation failed: done: Path `done` is required."
        });
    });

    test("GET" + endpointUrl, async () => {
        const response = await request(app).get(endpointUrl);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();
        firstTodo = response.body[0];
    });
    it("GET by Id " + endpointUrl + ":todoId", async () => {
        const response = await request(app)
            .get(endpointUrl + firstTodo._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.done).toBe(firstTodo.done);
    })
    it("GET todoby id doesnt exist" + endpointUrl + ":todoId", async () => {
        const response = await request(app)
            .get(endpointUrl + "65b2c14b65de8a4e0ac5f3ee");
        expect(response.statusCode).toBe(404);
    });
    it("PUT" + endpointUrl, async () => {
        const testData = {
            title: "Make integration test for PUT",
            done: true
        };
        const res = await request(app)
            .put(endpointUrl + newTodoId)
            .send(testData);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(testData.title);
        expect(res.body.done).toBe(testData.done);
    });
    it("should return 404 on PUT" + endpointUrl, async () => {
        const res = await request(app)
            .put(endpointUrl + notExistingTodoId)
            .send(testData);
        expect(res.statusCode).toBe(404);
    });
    it("HTTP DELETE", async () => {
        const res = await request(app)
            .delete(endpointUrl + newTodoId)
            .send();
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(testData.title);
        expect(res.body.done).toBe(testData.done);
    });
});