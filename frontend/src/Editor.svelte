<script>
 export let value = '';
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
</style>

<textarea autofocus placeholder="Welcome to DocPal." id="editor" bind:value></textarea>
