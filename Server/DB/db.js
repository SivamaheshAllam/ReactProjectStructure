let mysql= require('mysql');
let dotenv=require('dotenv')

dotenv.config();
let connection=mysql.createConnection(
    {
        host:process.env.dbHost,
        port:process.env.dbPort,
        user:process.env.dbUser,
        password:process.env.dbPassword,
        database:process.env.dbName
    }
)

module.exports= connection;