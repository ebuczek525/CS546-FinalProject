<script>
 function about() {
     prompt('DocPal © 2020 The DocPal Team:\nEric S. Londres,\nXuhao Li,\nErik Buczek, and\nAnnmarie DiGioia.\n\nMade (with love) for CS 546: Web Programming.\n\nFeel free to type your thoughts into this box:\n');
 }
</script>

<style lang="sass">
#about
 opacity: 50%
 &:hover
     opacity: 100%
</style>

<span id="about" on:click={about}>About</span>
