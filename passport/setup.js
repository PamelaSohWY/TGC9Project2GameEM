const UserModel = require ('../models/userModel')
const passport = require ('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require ('bcryptjs')

passport.serializeUser(function(user,done){
    done(null,user._id);
})

passport.deserializeUser(async function(id,done){
    let user=await UserModel.findUserById(id);
    done(null,user);
})

passport.use(
    new LocalStrategy({
        'usernameField':'email'
    }, async function(email, password, done){

        let user = await UserModel.findUserByEmail(email);
        if (user&&bcrypt.compareSync(password, user.password)){
            console.log("user logged in successfully in passport")
            done(null, user);
        } else {
        done(null, false{
            message:'Invalid login'
        })
        }
        })
)

    })

)
)