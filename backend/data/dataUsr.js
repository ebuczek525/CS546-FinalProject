const mongoCollections = require('../config/mongoCollections')
const bcrypt = require('bcryptjs')
const users = mongoCollections.users
const documents = mongoCollections.documents


async function addUser(fn, ln, em, pw, usrWordCountGoal, usrWordCountProgress, dictionary, setting) {
    const usrColl = await users();  // instantiate dbCollection("users")

    if (await usrColl.findOne({ email: em }) != null) {  // avoid duplicate
        throw `Account already exists.`
    }

    const newUser = {
        firstname: fn,
        lastname: ln,
        email: em,
        password: pw
        // usrWordCountGoal,
        // usrWordCountProgress,
        // dictionary,
        // setting
    }
    // insert
    const insertedInfo = await usrColl.insertOne(newUser);
    if (insertedInfo.insertedCount == 0) { throw "Fail to register." }

    return await this.getUsrByEm(em);
}


/* get a user's information through email address */
async function getUsrByEm(em) {
    const usrColl = await users();  // instantiate dbCollection("users")
    const user = await usrColl.findOne({ email: em });
    if (user == null) { throw "No user found." }
    return user;
}


/* check login information */
async function checkUsr(em, pw) {
    const usrColl = await users();  // instantiate dbCollection("users")
    const user = await usrColl.findOne({ email: em });  // check email existance
    const boolean = await bcrypt.compare(pw, user.password);  // check password
    if (user != null && boolean) {
        return true;
    } else {
        return false;
    }
}


/* modify login information (email or password) */
async function modifyLog(newEM, newPW, oldEM, pw = undefined) {
    const usrColl = await users();  // instantiate dbCollection("users")
    const id = await this.getUsrByEm(oldEM)["_id"];  // obtain account _id
    const newCredential = {
        email: newEM,
        password: newPW
    }
    const updatedUsr = await usrColl.updateOne({ _id: id }, { $set: newCredential });  // update login info based on _id
    if (updatedUsr.modifiedCount == 0) { throw "Fail to change logon information." }
    return await this.getUsrByEm(newEM);
}

/* modify account information (name) */
async function modifyAccInfo(fn, ln, em, pw = undefined) {
    const usrColl = await users();  // instantiate dbCollection("users")
    const newAccInfo = {
        firstname: fn,
        lastname: ln
    }
    const updatedUsr = await usrColl.updateOne({ email: em }, { $set: newAccInfo });  // update account info based on email
    if (updatedUsr.modifiedCount == 0) { throw "Fail to modify account information." }
    return await this.getUsrByEm(em);
}


/* remove account */
async function removeAcc(id, em = undefined, pw = undefined) {
    const usrColl = await users();  // instantiate dbCollection("users")
    const docuColl = await documents();  // instantiate dbCollection("documents")

    // remove from user collection
    const deletionInfo = await usrColl.deleteOne({ _id: id });
    if (deletionInfo.deletedCount == 0) { throw `Fail to delete account` }
    // remove associated documents
    await docuColl.deleteMany({ author: id });
}


module.exports = {
    addUser,
    getUsrByEm,
    checkUsr,
    modifyLog,
    modifyAccInfo,
    removeAcc
}