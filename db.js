import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

const sql = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default sql;