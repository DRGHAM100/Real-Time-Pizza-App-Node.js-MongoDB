const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

function authController(){
    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders'
    }
    
    return {

        login(req,res){
            res.render('auth/login');
        },
        postLogin(req,res,next){
            const { email,password } = req.body;

            // Validate Request
            if(!email || !password){
                req.flash('error','All fields are required!');
                return res.redirect('/login');
            }

            passport.authenticate('local',(err,user,info)=>{
                if(err){
                    req.flash('error',info.message);
                    return next(err);
                }

                if(!user){
                    req.flash('error',info.message);
                    return res.redirect('/login');
                }

                req.logIn(user,(err)=>{
                    if(err){
                        req.flash('error',info.message); 
                        return next(err);
                    }

                    return res.redirect(_getRedirectUrl(req));
                });
            })(req,res,next);
        }
        ,
        register(req,res){
            res.render('auth/register');
        },
        async postRegister(req,res){
            const { name,email,password } = req.body;

            // Validate Request
            if(!name || !email || !password){
                req.flash('error','All fields are required!');
                req.flash('name',name);
                req.flash('email',email);
                return res.redirect('/register');
            }

            // Check if email exist
            User.exists({ email: email },(err,result)=>{
                if(result){
                    req.flash('error','Email Already taken!');
                    req.flash('name',name);
                    req.flash('email',email);
                    return res.redirect('/register');
                }
            });

            // Hash Password
            const hashedPassword = await bcrypt.hash(password,10);

            // Create User
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            });

            user.save().then((user)=>{
                // Login
                return res.redirect('/login');
            }).catch(err=>{
                req.flash('error','Something went wrong!');
                return res.redirect('/');
            });

        },
        logout(req,res){
            req.logout((err)=>{
                if (err) { return next(err); }
                return res.redirect('/login');
            });          
        }
    };

}


module.exports = authController;