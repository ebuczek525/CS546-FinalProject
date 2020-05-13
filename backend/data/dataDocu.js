const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users
const documents = mongoCollections.documents
// const { ObjectId } = require('mongodb')


/* add document */
async function addDocu(title, language, count, authorCode, text) {
    const docuColl = await documents();  // instantiate dbCollection("documents")

    if (await docuColl.findOne({ docuName: title }) != null) {  // avoid duplicate
        throw `"${title}" already exists.`
    }

    const newDocu = {
        docuName: title,
        lang: language,  // coding: ISO 639-1
        usrWordCountGoal: count,
        author: authorCode,  // The ID of the author of the document,
	text: text	     // The content of the document
    };
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
    if (document == null) { throw `Could not find ${title}.` }
    return document;
}


/* modify all document information */
async function modifyDocu(title, language, count, author, text) {
    // const objID = ObjectId.createFromHexString(id);
    const docuColl = await documents();  // instantiate dbCollection("documents")
    const newDocu = {
        docuName: title,
        lang: language,
        usrWordCountGoal: count,
	text: text
    }
    const updatedDocu = await docuColl.updateOne({ docuName: title }, { $set: newDocu });
    if (updatedDocu.modifiedCount === 0) { throw "Fail to update document information." }
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
