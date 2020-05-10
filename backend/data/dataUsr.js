const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users
const documents = mongoCollections.documents

/**  Database document searching is mainly based on email **/

async function addUser(fn, ln, usrWordCountGoal, usrWordCountProgress, em, pw, dictionary, setting) {
    const usrColl = await users();  // instantiate dbCollection("users")
    const newUser = {
        firstname: fn,
        lastname: ln,
        email: em,
        password: pw
    }
}


/* get a user's information through email address */
async function getUsr(em) {
    const usrColl = await users();  // instantiate dbCollection("users")
    const user = await usrColl.findOne({ email: em });
    if (user == null) { throw "No band found." }
    return user;
}


/* check login information */
async function checkUsr(em, pw) {
    const usrColl = await users();  // instantiate dbCollection("users")
    const user = await usrColl.findOne({ email: em });  // check email existance
    if (user != null && user.password == pw) {  // check password
        return true;
    } else {
        return false;
    }
}


/* modify login information (email or password) */
async function modifyLog(newEM, newPW, oldEM, pw = 0) {
    const usrColl = await users();  // instantiate dbCollection("users")
    const id = await this.getUsr(oldEM)["_id"];  // obtain account _id
    const newCredential = {
        email: newEM,
        password: newPW
    }
    const updatedUsr = await usrColl.updateOne({ _id: id }, { $set: newCredential });  // update login info based on _id
    if (updatedUsr.modifiedCount == 0) { throw "Fail to change login information." }
    return await this.getUsr(newEM);
}

/* modify account information (name) */
async function modifyAccInfo(fn, ln, em, pw = 0) {
    const usrColl = await users();  // instantiate dbCollection("users")
    const newAccInfo = {
        firstname: fn,
        lastname: ln
    }
    const updatedUsr = await usrColl.updateOne({ email: em }, { $set: newAccInfo });  // update account info based on email
    if (updatedUsr.modifiedCount == 0) { throw "Fail to modify account information." }
    return await this.getUsr(em);
}


/* remove account */
async function removeAcc(em, pw = 0) {
    const usrColl = await users();  // instantiate dbCollection("users")
    // remove from users collection
    const deletionInfo = await usrColl.deleteOne({ email: em });
    if (deletionInfo.deletedCount == 0) { throw `Fail to delete account ${em}` }

    return em;
}


module.exports = {
    getUsr,
    checkUsr,
    modifyLog,
    modifyAccInfo,
    removeAcc
}