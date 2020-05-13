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
	     const userInfo = await fetch(`/db/${email}`);
	     console.log(userInfo);
	     alert('TODO');
	 } catch(e) {
	     console.error(e);
	 } 
     } else {
	 
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
