const config = require('config.json');
const jwt = require('jsonwebtoken');
const bycrpt = require('bcryptjs');
const db = require('helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getAllUser,
    getUserById,
    updateUser,
    register,
    deleteUser: _deleteUser,
};

async function authenticate({username, password}) {
    const user = await User.findOne({username});
    if(user && bycrpt.compareSync(password, user.password)){
        const { hash, userWithoutHash} = user.toObject();
        const token = jwt.sign({sub: user.id}, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAllUser(){
    return await User.find().select('-password');
}

async function getUserById(id){
    return await User.findById(id).select('-password');
}

async function register(userParams){
    if( await User.findOne({username: userParams.username})){
        throw 'Username "'+ userParams.username + '" is already taken';
    }
    if(Object.entries(userParams).length === 0 || Object.keys(userParams).length === 0){
        throw 'Oopps you cannot register an empty form'; 
    }
    if(userParams.username=== '' || userParams.password ==='' || userParams.firstname ==='' || userParams.lastname ===''){
        throw 'Every Fields with * are required';  
    }
    const user = new User(userParams);
    if(userParams.password) {
       
        bycrpt.hash(userParams.password, 10).then(hash => {
            user.password = hash;
            // then update

            // save user
            user.save();
        });
    }
}
async function updateUser(id, userParams){
    const  user = await User.findById(id);

    if(!user) throw 'User not found!!';
    if(user.username !== userParams.username && await User.findOne({username: userParams.username})){
        throw 'Username "' + userParams.username + '" is already taken';
    }
    // hash password if it was entered
    if (userParam.password) {
        userParams.password = bcrypt.hashSync(userParams.password, 10);
    }
        // copy userParam properties to user
        Object.assign(user, userParams);

        await user.save();
    
}

async function _deleteUser(id){
    await User.findByIdAndRemove(id);
}