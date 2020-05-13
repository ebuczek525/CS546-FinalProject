<script>
 export let value = '';
 export let selection = '';

async function onSelect() {
     const t = document.getElementById('editor');
     selection = value.substring(t.selectionStart, t.selectionEnd); 

     const ret = await fetch(`/lingua/${selection}`);
     
     console.log(ret);
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
