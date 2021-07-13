const helpers = {}
helpers.isAuthenticated = (req,res,next)=>{
    // console.log(req.isAuthenticated()) 
    const session =req.isAuthenticated()
    if (req.isAuthenticated()){
        return next()
    }else{
        req.flash('error', 'No autorizado')
        res.redirect('/singin')
    }
}
helpers.authenticatedviews = (req,res,next)=>{
    // console.log(req.isAuthenticated()) 
    const session =req.isAuthenticated()
    if (req.isAuthenticated()){
        req.flash('error', 'No autorizado')
        res.redirect('/')
    }else{
        return next()
    }
}
module.exports = helpers
