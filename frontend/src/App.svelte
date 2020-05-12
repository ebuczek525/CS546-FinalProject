<script>
 import Editor from './Editor.svelte';
 import TopBar from './TopBar.svelte';
 import BottomBar from './BottomBar.svelte';
</script>

<style lang="sass">
h1
     text-align: center
main
     height: 100%
     width: 100%
     margin: 0
     padding: 0
</style>

<header><TopBar/></header>

<main><Editor/></main>

<footer></footer>
