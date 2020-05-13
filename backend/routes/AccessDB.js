const express = require('express')
const router = express.Router()
const usrData = require('../data').users
const docuData = require('../data').documents
const bcrypt = require('bcryptjs')
const path = require('path')


/*------ routes for dataUsr ------*/

/* register db route */
router.post('/', async (req, res) => {
    let po = req.body;  // should take in fn, ln, em, pw
    try {
        const newUsr = await usrData.addUser(po.fn, po.ln, po.em, po.pw);
        res.send('success');
    } catch (error) {
        console.log(error);
        res.status(500).sendFile(path.join(__dirname, '../public/500.html'));
    }
})

/* retrieve user's info route */
router.get('/:em', async (req, res) => {
    try {
        const user = await usrData.getUsrByEm(req.params.em);
        user["documents"] = await docuData.getAllDocu(user["_id"]);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
    }
})

/* update word counts route */
router.put('/word/:em', async (req, res) => {
    let pu = req.body;  // should take in em, wordCountGoal, wordCountProgress
    try {
        const updatedUsr = await usrData.modWordCount(req.params.em, pu.wordCountGoal, pu.wordCountProgress);
        res.send('success');
    } catch (error) {
        console.log(error);
        res.status(500).sendFile(path.join(__dirname, '../public/500.html'));
    }
})

/* update dictionary route */
router.put('/dic/:em', async (req, res) => {
    let pu = req.body;  // should take in em, wordCountGoal, wordCountProgress
    try {
        const updatedUsr = await usrData.modifyDic(req.params.em, dic);
        res.send(updatedUsr["dictionary"]);
    } catch (error) {
        console.log(error);
        res.status(500).sendFile(path.join(__dirname, '../public/500.html'));
    }
})

/* delete account route */
router.delete('/:id', async (req, res) => {
    try {
        await usrData.removeAcc(req.params.id);
        let feedback = new Object();
        feedback["deleted"] = true;
        res.send('success');
    } catch (error) {
        res.status(500).sendFile(path.join(__dirname, '../public/500.html'));
    }
})


/*------ routes for dataDocu ------*/

/* add document route */
router.post('/docu', async (req, res) => {
    let po = req.body;  // should take in title, language, count, authorcode, text
    try {
        const doc = await docuData.addDocu(po.title, po.language, po.count, po.authorCode, po.text);
        res.send('success');
    } catch (error) {
        console.log(error);
        res.status(500).sendFile(path.join(__dirname, '../public/500.html'));
    }
})

/* retrieve a document */
router.get('/docu/:title', async (req, res) => {
    try {
        const doc = await docuData.getDocuByTitle(req.params.title);
        res.send(doc);
    } catch (error) {
        console.log(error);
        res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
    }
})

/* modify document route */
router.put('/docu/:title', async (req, res) => {
    let pu = req.body;  // should take in lang, wordCountGoal, authorCode, text
    try {
	console.table(pu);
        const doc = await docuData.modifyDocu(req.params.title, pu.language, pu.count, pu.authorCode, pu.text);
        res.send(doc);
    } catch (error) {
        console.log(error);
        res.status(500).sendFile(path.join(__dirname, '../public/500.html'));
    }
})

/* remove document */
router.delete('/docu/:title', async (req, res) => {
    try {
        await docuData.removeDocu(req.params.title);
        let feedback = new Object();
        feedback["deleted"] = true;
        res.send('success');
    } catch (error) {
        console.log(error);
        res.status(500).sendFile(path.join(__dirname, '../public/500.html'));
    }
})


module.exports = router
