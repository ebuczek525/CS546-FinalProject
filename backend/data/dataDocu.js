const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users
const documents = mongoCollections.documents
const { ObjectId } = require('mongodb')


/* add document */
async function addDocu(title, language, count, authorCode) {
    const docuColl = await documents();  // instantiate dbCollection("documents")

    if (await docuColl.findOne({ docuName: title }) != null) {  // avoid duplicate
        throw `"${title}" already exists.`
    }

    const newDocu = {
        docuName: title,
        lang: language,  // coding: ISO 639-1
        usrWordCountGoal: count,
        author: authorCode  // The ID of the author of the document
    }
    // insert
    const insertInfo = await docuColl.insertOne(newDocu);
    if (insertInfo.insertedCount == 0) { throw "Fail to add document." }

    return await this.getDocuByTitle(title);
}


/* retrieve all documents belong to an author */
async function getAllDocu(authorCode) {
    // const objID = ObjectId.createFromHexString(authorCode);
    const docuColl = await documents();  // instantiate dbCollection("documents")
    return await docuColl.find({ author: authorCode }).toArray();
}

/* retrieve a document based on title */
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
    const docuColl = await documents();  // instantiate dbCollection("documents")

    // remove from documents collection
    const deletionInfo = await docuColl.removeOne({ docuName: title });
    if (deletionInfo.deletedCount === 0) { throw `Fail to delete ${title}` }
}

module.exports = {
    addDocu,
    getAllDocu,
    getDocuByTitle,
    modifyDocu,
    removeDocu
}