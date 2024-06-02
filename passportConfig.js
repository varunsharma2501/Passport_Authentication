// Import required modules

const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

// Define the initializePassport function
function initializePassport(passport) {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                // Find user by username
                const user = await User.findOne({ username });
                console.log(user);
                if (!user) {
                    // If user not found, return false
                    return done(null, false,{message:"User not found"});
                }
                // Check if password matches
                if (user.password !== password) {
                    // If password doesn't match, return false
                    return done(null, false,{message:'Password doesnt match'});
                }
                // If user and password are correct, return the user
                return done(null, user);
            } catch (error) {
                // If an error occurs, pass it to done callback
                return done(error,false);
            }
        })
    );

    passport.serializeUser((user,done)=>{
        done(null,user.id);
    })
    
    passport.deserializeUser(async(id,done)=>{
        try{
            const user=await User.findById(id);
            done(null,user);
        }catch(error){
            done(error,false);
        }
    })
}

// here the serialize and deserialize are like getUser and SetUser in jwt



// Export the initializePassport function
module.exports = initializePassport;
