<script>
 export let text;
 
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
    <span id="save">Save</span>
    <span id="restore">Restore</span>
    <span id="download" on:click={download}>Download</span>
    <span id="upload" on:click={upload}>Upload</span>
    <span id="file-back" on:click={closeFileMenu}>Back</span>
</div>
