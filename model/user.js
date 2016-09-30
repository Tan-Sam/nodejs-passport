var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for user
var userSchema = mongoose.Schema({
    name            : String,
    phone           : String,
    email           : String,
    password        : String,
    role            : String,
    changePassword  : Boolean
},{
    timestamps: true
});

// methods ======================
/**
 * Password hash middleware.
 */
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('local.password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.local.password, salt, null, (err, hash) => {
            if (err) { return next(err); }
            user.local.password = hash;
            next();
        });
    });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.validPassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.local.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};

// create the model for users and expose it to our app
var User = mongoose.model('User', userSchema);

// Create basic admin user
User.findOne( {'email' : 'jens@silentmode.com' }, function(err, user){
    if(!user){

        console.log('Creating basic admin user');

        var admin = new User();
        admin.name              = 'Jens H. Nielsen';
        admin.phone             = '+85298005568';
        admin.email             = 'jens@silentmode.com';
        admin.password          = Math.random().toString(36).slice(-8);
        admin.role              = 'Administrator';
        admin.changePassword    = true;
        admin.save(function (err, newUser) {
            if (err) return console.error(err);
            console.log('Admin password ', admin.password);
        })
    }
});

// Create basic admin user
module.exports = User;