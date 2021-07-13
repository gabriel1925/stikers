module.exports = {
    database:{
        URI:'mongodb://localhost/inventario',
        URIse:{
            host: '192.168.0.11',
            port:3307,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
              }},
        DB:'bitnami_wordpress',
        User:'desarrollo',
        Password:'mercusys123'
        // URIse:{
        //     host: 'localhost',
        //     dialect: 'mariadb',
        //     pool: {
        //         max: 5,
        //         min: 0,
        //         acquire: 30000,
        //         idle: 10000
        //       }},
        // DB:'anida',
        // User:'siriux',
        // Password:'siriux'
    }
}