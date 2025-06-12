import sql from "./db.js";

const criarTabela = async () => {
    try {
      await sql.query( `
    CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    duration INTEGER
);
`);
console.log('Tabela criada com sucesso!');
} catch (err) {
console.error('Erro ao criar tabela:', err);
} finally {
sql.end();
}
};

criarTabela();
