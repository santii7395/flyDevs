const User = require('../models/user');

async function get(id){
    let user = await User.findById(id);
    return user;
}

async function update(user) {
    try{
        let updated = await User.findOneAndUpdate({ _id: user.id}, user, { new: true });
        return updated;
    } catch(error){
        throw error;
    }
}

async function create (userId, name, lastname, age, password){
    try{
        const newUser = new User({ userId: userId, name: name, lastname: lastname, age: age, password: password });
        return await newUser.save();
    } catch(error){
        throw error;
    }
    
}

async function list(filter){
    return await User.find(filter);
}

async function deleteUser(id){
    return await User.deleteOne({ _id: id })
}

module.exports = {
    get,
    create,
    list,
    update,
    deleteUser
}