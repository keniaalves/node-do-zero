import { randomUUID } from "node:crypto"
import sql from './db.js';
export class DatabasePostgres {
    #videos = new Map;//cerquilha é propriedade privada

    async list(search) {
        let videos;
        if (search) {
            videos = await sql.query('select * from videos where title ilike $1',
                [`%${search}%`]
            );
        } else {
            videos = await sql.query('select * from videos');
        }

        return videos;
    }

    async create(video) {
        const videoId = randomUUID();
        const { title, description, duration } = video;
        await sql.query('insert into videos (id, title, description, duration) VALUES ($1, $2, $3, $4)',
            [videoId, title, description, duration]
        );
    }

    async update(id, video) {
        const { title, description, duration } = video
        await sql.query('update videos set title = $1, description = $2, duration = $3 where id = $4',
            [title, description, duration, id]
        )
    }

    async delete(id) {
        await sql.query('delete from videos where id = $1',
            [id]
        )
    }
}