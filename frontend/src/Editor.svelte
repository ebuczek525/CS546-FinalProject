<script>
 export let value = '';
 export let selection = '';

 function onSelect() {
     const t = document.getElementById('editor');
     selection = value.substring(t.selectionStart, t.selectionEnd); 
 }
 
 $: console.log(selection);
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
