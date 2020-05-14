const collections = require('./backend/config/mongoCollections');
const users = collections.users;
const documents = collections.documents;
const docu = require('./backend/data/dataDocu');
const usr = require('./backend/data/dataUsr');

async function main() {
    await usr.addUser('Sherlock',
		  'Holmes',
		  'sholmes@scotland.uk',
		  '$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.',
		  {}, 0, 0, {});
    await usr.addUser('Liz',
		  'Lemon',
		  'lemon@lemon.lemon',
		  '$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm',
		  {}, 0, 0, {});
    
    await docu.addDocu('Hello', 'en', 500, 'lemon@lemon.lemon', 'world');
    await docu.addDocu('Heloo', 'en', 140, 'lemon@lemon.lemon', 'woold');
    await docu.addDocu('test doc', 'en', 9, 'sholmes@scotland.uk', 'hi');
}

main().catch(console.log);
