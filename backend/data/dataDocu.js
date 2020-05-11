const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users
const documents = mongoCollections.documents
const { ObjectId } = require('mongodb')


/*  */
async function addDocu(title, language, count, authorCode) {
    const docuColl = await documents();  // instantiate dbCollection("documents")
    const newDocu = {
        docuName: title,
        lang: language,
        usrWordCountGoal: count,
        author: authorCode
    }
}


/* retrieve all documents belong to an author */
async function getAllDocu(authorCode) {
    // const objID = ObjectId.createFromHexString(authorCode);
    const docuColl = await documents();  // instantiate dbCollection("documents")
    return await docuColl.find({ author: authorCode }).toArray();
}

/* retrieve a document based on author ID */
async function getDocuByTitle(title) {
    const docuColl = await documents();  // instantiate dbCollection("documents")
    const document = await docuColl.findOne({ docuName: title });
    if (document == null) { throw 'no album found with that id' }
    return document;
}


/* modify all document information */
async function modifyDocu(id, title, language, count, authorCode) {
    // const objID = ObjectId.createFromHexString(id);
    const docuColl = await documents();  // instantiate dbCollection("documents")
    const newDocu = {
        docuName: title,
        lang: language,
        usrWordCountGoal: count,
        author: authorCode
    }
    const updatedDocu = await docuColl.updateOne({ _id: id }, { $set: newDocu });
    if (updatedDocu.modifiedCount === 0) { throw 'could not update album' }
    return await this.getDocuByTitle(title);
}

/* remove document */
async function removeDocu(title) {
    // const objID = ObjectId.createFromHexString(id);
    const docuColl = await documents();  // instantiate dbCollection("documents")

    // remove from documents collection
    const deletionInfo = await docuColl.removeOne({ docuName: title });
    if (deletionInfo.deletedCount === 0) { throw `Fail to delete document ${title}` }

    return title;
}

module.exports = {
    getAllDocu,
    getDocuByTitle,
    modifyDocu,
    removeDocu
}