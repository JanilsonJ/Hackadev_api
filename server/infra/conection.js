const pgPromise = require("pg-promise")();

// const db = pgPromise({
//   connectionString:
//     "postgres://svublpnpfaxmyv:8ab4f63ffd37a065bfbf82bcf47c5faa648a3ddc1442ad2b5530f4e9d55b6781@ec2-54-82-205-3.compute-1.amazonaws.com:5432/d2gm1cqagnlccu",
//   ssl: {
//     rejectUnauthorized: false,
//   }
// });

const db = pgPromise({
  connectionString:
    "postgres://postgres:1234@localhost:5432/Hackadev_bd"
});

try {
  db.connect();
  console.log('Conexão com o banco realizda com sucesso!')
} catch (error) {
  console.log('Erro ao conectar ao banco.' + error)
}

module.exports = db;
