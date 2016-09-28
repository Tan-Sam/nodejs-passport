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
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
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