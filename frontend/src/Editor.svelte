<script>
 export let value = '';
 export let selection = '';
 
 async function getUserEmail() {
     const res = await fetch('/me');
     console.log(res);
     if(res.status !== 200) {
	 console.error(res);
	 throw new Error(`Error: ${res.status} ${res.statusText}`);
     } else {
	 const body = await res.text();
	 return body;
     }
 }

 async function onSelect() {
     const t = document.getElementById('editor');
     selection = value.substring(t.selectionStart, t.selectionEnd); 
     
     const ret = await ((await fetch(`/lingua/${selection}`)).json());
     
     if(ret.entries.length === 0) {
	 // lemma does not exist in LinguaRobot
	 // look in personal user dictionary
	 try {
	     const email = await getUserEmail();
	     const userInfoRet = await (await fetch(`/db/${email}`)).json();
	     console.log(userInfoRet);
	     if(lemma in userInfoRet.dictionary) {
		 alert(`${lemma}\n\nDefinition: ${userInfoRet.dictionary[lemma]}`);
	     } else {
		 if(confirm(`${lemma} is not a recognized word.\nAdd it to your dictionary?`)) {
		     // add the lemma to the user's dictionary
		     const def = prompt(`Enter definition for ${lemma}:\n`);
		     if(def) {
			 userInfoRet.dictionary[lemma] = def;
			 const insertDictRet = await fetch(`/db/dic/${email}`, {
			     method: 'POST',
			     headers: {
				 'Content-Type': 'application/json',
			     },
			     body: {
				 dic: userInfoRet.dictionary
			     }
			 });
		     }
		 } else {
		     return;
		 }
	     }
	 } catch(e) {
	     console.error(e);
	 } 
     } else {
	 // lemma _does_ exist in LinguaRobot
	 const entry = ret.entries[0];

	 // We're going to build a string containing the loosely-formatted
	 // data to give to the user. It will like kinda like this:
	 /* <Lemma>
	  *
	  * [
	  *  (<part of speech>) {<pronunciation>}
	  * Synonyms: <Syns>
	  * Antonyms: <Ants>
	  * [
	  * Definition: <Def>
	  * Examples:
	  * [<Example>] For each `example` up to 3
	  * ] For each `sense` up to 3
	  * ] For each `lexeme` up to 3
	  */

	 // None of these are really guaranteed to exist except for lemma

	 let alert_pages = [];

	 const lemma = entry.entry;

	 // try to find a transcript pronunciation
	 let pronounce = '';
	 for(let p of entry.pronunciations) { // pronunciations is an array of objs
	     // we're trying to find entry.pronunciations.<#>.transcriptions.transcription
	     if(p.transcriptions && p.transcriptions.transcription) {
		 pronounce = p.transcription.transcription;
		 break;
	     } 
	 }

	 // lemma and pronounce is global, but each lexeme is scoped to an alert page
	 // At this level we need a part of speech, synonyms, and antonyms
	 for(let lexeme of entry.lexemes) { // array of objects
	     let page = lemma + '\n';
	     if(pronounce) page += ` {${pronounce}}}\n\n`;
	     
	     if(lexeme.synonymSets) {
		 page += 'Synonyms: ';
		 for(let syn of lexeme.synonymSets[0].synonyms) { // array of strings
		     page += syn + ', ';
		 }
		 page += '\n';
	     }

	     if(lexeme.antonymSets) {
		 page += 'Antonyms: ';
		 for(let ant of lexeme.antonymSets[0].antonyms) { // array of strings
		     page += ant + ', ';
		 }
		 page = page.slice(0, -2);
		 page += '\n';
	     }

	     page += '\n';
	     
	     // Now we loop through each `sense` of the lexeme, appending
	     // definitions and lists of examples

	     if(lexeme.senses) {
		 for(let sense of lexeme.senses) { // array of objects
		     if(sense.definition) {
			 page += `Definition: ${sense.definition}\n`;
		     }

		     if(sense.usageExamples) {
			 for(let example of sense.usageExamples) { // array of strings
			     page += `Example: ${example}\n`;
			 }
		     }
		     page += '\n';
		 }
	     }

	     // all the stuff that can be added has been added
	     alert_pages.push(page);
	 }
	 
	 // everything is done, let's render the data
	 for(let page of alert_pages) { // array of strings
	     alert(page);
	 }
	 
	 
     }
     
 }
</script>

<style lang="sass">
#editor
  display: absolute
  width: 80%
  height: 80%
  margin: 10%
  font-size: 1.5em
  font-family: serif
  border: none
  outline: none
  color: inherit;
  background-color: inherit;
</style>

<textarea
    autofocus
    placeholder="Welcome to DocPal."
    id="editor"
    bind:value
    on:select={onSelect}></textarea>
