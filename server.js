import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";
const server = fastify();

const database = new DatabaseMemory()

server.post('/videos', (request, response) => {

    const {title, description, duration} = request.body

    database.create({
        title, //short sintaxe
        description,
        duration,
    })

    return response.status(201).send()
})


server.get('/videos', (request) => {

    const search = request.query.search
    return database.list(search)
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