import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";
const server = fastify();

// const database = new DatabaseMemory()
const database = new DatabasePostgres;

server.post('/videos', async(request, response) => {

    const {title, description, duration} = request.body

    await database.create({
        title, //short sintaxe
        description,
        duration,
    })

    return response.status(201).send()
})


server.get('/videos', async (request) => {

    const search = request.query.search
    return await database.list(search)
})

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    const { title, description,  duration } = request.body
    database.update(videoId, {
        title, //short sintaxe
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: 3333
});