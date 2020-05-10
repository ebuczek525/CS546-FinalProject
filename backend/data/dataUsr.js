const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users
// const documents = mongoCollections.documents

async function addUser(fn, ln, usrWordCountGoal, usrWordCountProgress, em, pw, dictionary, setting) {
    const usrColl = await users();  // instantiate dbCollection("user")
    const newUser = {
        firstname: fn,
        lastname: ln,
        email: em,
        password: pw
    }
}


// get a user's information through email address
async function getUsr(em) {
    const usrColl = await users();  // instantiate dbCollection("user")
    const user = await usrColl.findOne({ email: em });
    if (user == null) throw "No band found.";
    return user;
}


// check login information
async function checkUsr(em, pw) {
    const usrColl = await users();  // instantiate dbCollection("user")
    const user = await usrColl.findOne({ email: em });
    if (user != null && user.password == pw) {
        return user;
    } else {
        return false;
    }
}


// modify login information (email or password)
async function modifyLog(newEM, newPW, oldEM, pw = 0) {
    const usrColl = await users();  // instantiate dbCollection("user")
    const ID = await this.getUsr(oldEM)._id;  // attain account ID
    const newCredential = {
        email: newEM,
        password: newPW
    }
    const updateUsr = await usrColl.updateOne({ _id: ID }, { $set: newCredential });  //update info based on _id
    if (updateUsr.modifiedCount == 0) throw "Fail to change login information.";
    return await this.getUsr(newEM);
}

// modify account information (name)
async function modifyAcc(fn, ln, em, pw = 0) {
    const usrColl = await users();  // instantiate dbCollection("user")
    const newAccInfo = {
        firstname: fn,
        lastname: ln
    }
    const updateUsr = await usrColl.updateOne({ email: em }, { $set: newAccInfo });
    if (updateUsr.modifiedCount == 0) throw "Fail to modify account information.";
    return await this.getUsr(em);
}


async function removeBand(id) {
    if (!id) throw 'must provide an id';

    const objId = ObjectId.createFromHexString(id);
    const bandCollection = await bands();
    const albumCollection = await albums();

    // remove from band collection
    const deletionInfo = await bandCollection.removeOne({ _id: objId });
    if (deletionInfo.deletedCount === 0) throw `could not delete band ${id}`;
    // remove associated albums
    albumCollection.deleteMany({ author: id + '' });
}

module.exports = {
    getUsr,
    checkUsr,
    modifyLog,
    modifyAcc
}