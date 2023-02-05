let mysql = require('mysql')

export class SqlService {

    constructor(){
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'pi',
            password: 'wang19981021',
            database: 'setu'
        })
    }

    addLsp(){
        let command = `INSERT INTO lsp(userName, time) VALUES('` + message.author.username + `', ` + Date.now() + `)`
        this.connection.query(command)
    }

    getLsp(){
        let time = Date.now() - 604800000
        let command = "select userName, count(*) as count  from lsp  where time>" + time + " group by userName order by count(*) desc"
    }
}