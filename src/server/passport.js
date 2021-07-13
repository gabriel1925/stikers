const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.models')


passport.use(new LocalStrategy({
    usernameField:'email'}, async (email,password,done) => {
        const user = await User.findOne({email:email})
        if(!user){
            return done(null,false,{message:'no encontre el usuario '})
        }else{
            const mach = await user.machPassword(password)
            if(mach){
                return done(null,user)
            }else{
                return done(null, false, {message:'Contraseña  incorrecto'})
            }
        }

    }
))
passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})