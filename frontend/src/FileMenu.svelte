<script>
 export let text;

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

 async function saveFile() {
     let email = await getUserEmail();
     const title = prompt('Title of document:\n');
     try {
	 const res = await fetch('/db/docu', {
	     method: 'POST',
	     headers: {
		 'Content-Type': 'application/json'
	     },
	     body: JSON.stringify({
		 title,
		 language: 'en',
		 count: 500,
		 authorCode: email,
		 text
	     })
	 });
	 console.log(res);
	 if(!res.ok) throw new Error('failure');
     } catch(e) {
	 console.error(e.message);
	 try {
	     // server wasn't okay, but it might have been a duplicate
	     const res_put = await fetch(`/db/docu/${title}`, {
		 method: 'PUT',
		 headers: {
		     'Content-Type': 'application/json'
		 },
		 body: JSON.stringify({
		     language: 'en',
		     count: 500,
		     authorCode: email,
		     text
		 })
	     });
	     console.log(res_put);
	     if(!res_put.ok) {
		 throw new Error(`${res_put.status} ${res_put.statustext}`);
	     } else {
		 console.log(await res_put.text());
		 alert('success put');
	     }
	 } catch(e) {
	     alert(e.message);
	 }
     }
 }

 async function restoreFile() {
     try {
	 const email = await getUserEmail();
	 const title = prompt('Enter title of document to restore:');
	 const res = await fetch(`/db/docu/${title}`);
	 if(res.ok) {
	     const document = await res.json();
	     console.log(document);
	     text = document.text;
	 } else {
	     throw new Error(res.statusMessage);
	 }
     } catch(e) {
	 alert(e.message);
     }
 }
 
 function openFileMenu() {
     document.getElementById('file-menu').style.display = 'block';
     document.getElementById('file').style.display = 'none';
 }

 function closeFileMenu() {
     document.getElementById('file-menu').style.display = 'none';
     document.getElementById('file').style.display = 'inline';
 }

 function download() {
     const filename = 'text.txt';
     let dl = document.createElement('a');
     dl.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
     dl.setAttribute('download', filename);
     dl.click();
 }

 function upload() {
     let upl = document.createElement('input');
     upl.setAttribute('type', 'file');
     upl.setAttribute('accept', 'text/*');
     const handler = async () => text = await upl.files[0].text();
     upl.addEventListener('change', handler, false);
     upl.click();
 }

 
</script>

<style lang="sass">
span
 opacity: 50%
 &:hover
     opacity: 100%
#file-menu
 display: none
</style>

<span id="file" on:click={openFileMenu}>File</span>
<div id="file-menu">
    <span id="save" on:click={saveFile}>Save</span>
    <span id="restore" on:click={restoreFile}>Restore</span>
    <span id="download" on:click={download}>Download</span>
    <span id="upload" on:click={upload}>Upload</span>
    <span id="file-back" on:click={closeFileMenu}>Back</span>
</div>
