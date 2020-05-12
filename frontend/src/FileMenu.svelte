<script>
 function openFileMenu() {
     document.getElementById('file-menu').style.display = 'block';
     document.getElementById('file').style.display = 'none';
 }

 function closeFileMenu() {
     document.getElementById('file-menu').style.display = 'none';
     document.getElementById('file').style.display = 'inline';
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
    <span id="download">Download</span>
    <span id="upload">Upload</span>
    <span id="file-back" on:click={closeFileMenu}>Back</span>
</div>
