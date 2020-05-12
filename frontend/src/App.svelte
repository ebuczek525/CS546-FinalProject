<script>
 import Editor from './Editor.svelte';
 import TopBar from './TopBar.svelte';
 import BottomBar from './BottomBar.svelte';

 let text = '';
 $: console.log(text);
 let char = 0;
 let para = 0;
 let page = 0;
 let goal = 0;
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

<main><Editor bind:value={text} /></main>

<footer><BottomBar {char} {para} {page} {goal}/></footer>
