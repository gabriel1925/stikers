const path = require('path')
const morgan = require('morgan')
const multer = require('multer')
const express = require('express')
const errorHandler = require('errorhandler')
const methosover = require('method-override')
const flash = require('connect-flash') 
const passport = require('passport')
const mongoose = require('mongoose')
const connectMongo = require('connect-mongo')
const session = require('express-session')
const {database}= require('../keys')
const exphbs = require('express-handlebars')
const cors = require('cors')



module.exports = app=>{
    // helpers handlebars
    // initiliazations

    require('./passport')
    // settings6
    app.use(cors())
    app.set('port', process.env.PORT || 8080)
    // app.set('views engigne','pug')
    // app.set('views','src/views')
    app.set("views", path.join(__dirname, "../views"));
    app.engine(
        ".hbs",
        exphbs({
            defaultLayout: "main",
            layoutsDir: path.join(app.get("views"), "layouts"),
            partialsDir: path.join(app.get("views"), "partials"),
            helpers: require('../helpers/handlehelper') ,
            extname: ".hbs",
        })
    );
app.set("view engine", ".hbs");

    app.use(methosover('_method'))
    
    // meiddlewares
    
    app.use(morgan('dev'))
    app.use(multer({dest:path.join(__dirname,'../public/temp')}).single('image'))
    app.use(express.urlencoded({extended:true}))
    app.use(express.json())
    // const MongoStore = connectMongo.create(session);
    app.use(
        session({
            secret: "secret",
            resave: true,
            saveUninitialized: true,
            store: connectMongo.create({ mongoUrl: database.URI })
        })
        )
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg");
            res.locals.error_msg = req.flash("error_msg");
            res.locals.error = req.flash("error");
            res.locals.user = req.user || null;
            next();
        })
    
    
    // routes
    app.use(require ('../routes/index.routes'))
    app.use(require("../routes/user.routes"))
    app.use(require('../routes/remitos.routes'))
    app.use(require('../routes/provedores.routes'))
    app.use(require('../routes/productos.routes'))
    app.use(require('../routes/provedoresConsultas.routes'))

    
    // static file
    app.use('/public', express.static(path.join(__dirname,'../public')));
    //errorhandlers
    if('development' === app.get('env')){
        app.use(errorHandler);
    }
    return app;
}