require('dotenv').config()

module.exports = {
    client: 'mariasql',
    debug: true,
    seNullAsDefault: true,
    connection: {
        host: process.env.SQL_HOST,
        port: parseInt(process.env.SQL_PORT),
        user: process.env.SQL_USER,
        password: process.env.SQL_PASS,
        db: process.env.SQL_DATABASE,
        charset: 'utf8',
    },
}
