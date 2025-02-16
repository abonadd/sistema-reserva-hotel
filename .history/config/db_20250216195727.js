const mysql = require('mysql2');

// Configuração da conexão com o MySQL
const pool = mysql.createPool({
  host: 'localhost', // Endereço do servidor MySQL
  user: 'root', // Substitua pelo seu usuário do MySQL
  password: '#', // Substitua pela sua senha do MySQL
  database: 'sistema_db', // Nome do banco de dados
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexões no pool
  queueLimit: 0
});

// Exporta o pool de conexões para ser usado em outros arquivos
module.exports = pool.promise(); // Usando promises para facilitar o uso com async/await