const mongoCollections = require('../config/mongoCollections')
const bands = mongoCollections.bands
const albums = mongoCollections.albums
const { ObjectId } = require('mongodb')

async function addAlbum(title, author, songs) {
    if (typeof (title) != 'string') throw 'must provide a valid title';
    if (typeof (author) != 'string') throw 'must provide a valid band ID as author';
    if (!Array.isArray(songs)) throw 'must provide an array of songs';

    const albumCollection = await albums();
    const bandCollection = await bands();

    // check existence
    if (await albumCollection.findOne({ title: title }) !== null) throw `${title} already exists`
    const ID = ObjectId.createFromHexString(author);
    const bandfound = await bandCollection.findOne({ _id: ID });
    if (bandfound === null) throw 'no corresponding band found with that author';

    // inserting...
    let newAlbum = {
        title: title,   // String title
        author: author, // ID of band as string
        songs: songs    // Array of strings
    }
    // insert into album collection
    const insertInfo = await albumCollection.insertOne(newAlbum);
    if (insertInfo.insertedCount === 0) throw 'could not add album';
    // add into band.albums[]
    await bandCollection.updateOne({ _id: ID }, { $addToSet: { albums: insertInfo._id + '' } });
    // return newly inserted album
    return await this.getAlbumById(insertInfo.insertedId + '')
}

async function getAllAlbums() {
    const albumCollection = await albums();
    return await albumCollection.find({}).toArray();
}

async function getAlbumById(id) {
    if (!id) throw 'must provide an id';

    const objID = ObjectId.createFromHexString(id);
    const albumCollection = await albums();

    const albumFound = await albumCollection.findOne({ _id: objID });
    if (albumFound === null) throw 'no album found with that id';

    return albumFound
}

async function updateAlbum(id, title = undefined, songs = undefined) {
    // initiate
    const objID = ObjectId.createFromHexString(id);
    const albumCollection = await albums();
    let updatedAlbum = new Object();

    // judge
    if (!title) {
        if (!Array.isArray(songs)) throw 'must provide a valid title';
        updatedAlbum.songs = songs;
    } else if (!songs) {
        if (typeof (title) != 'string') throw 'must provide an array of songs';
        updatedAlbum.title = title;
    } else {
        if (typeof (title) != 'string') throw 'must provide a valid title';
        if (!Array.isArray(songs)) throw 'must provide an array of songs';
        updatedAlbum.title = title;
        updatedAlbum.songs = songs;
    }

    // update
    const updatedInfo = await albumCollection.updateOne({ _id: objID }, { $set: updatedAlbum });
    if (updatedInfo.modifiedCount === 0) throw 'could not update album';

    return await this.getAlbumById(id)
}

async function removeAlbum(id) {
    if (!id) throw 'must provide an id';

    const objID = ObjectId.createFromHexString(id);
    const albumCollection = await albums();
    const bandCollection = await bands();

    // remove from album collection
    const deletionInfo = await albumCollection.removeOne({ _id: objID });
    if (deletionInfo.deletedCount === 0) throw `could not delete album ${objID}`;
    // remove from array in band collection
    bandCollection.updateMany({}, { $pull: { albums: { _id: id } } });
}

module.exports = {
    addAlbum,
    getAllAlbums,
    getAlbumById,
    updateAlbum,
    removeAlbum
}