// Importar o mongoDB
var mongo = require('mongodb')

var connMongoDb = function () {
    console.log('Entrou na função de conexão')
    var db = new mongo.Db(
        'got',
        new mongo.Server(
            'localhost',
            27017,
            {}
        ),
        {}
    )
    return db
}

module.exports = function(){
    return connMongoDb
} 
