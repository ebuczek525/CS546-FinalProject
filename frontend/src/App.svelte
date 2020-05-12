<script>
 import Editor from './Editor.svelte';
 import TopBar from './TopBar.svelte';
 import BottomBar from './BottomBar.svelte';

 let text = '';
 
 $: char = text.split('').length;
 $: para = text.replace(/\n+/g, '\n').split('\n').filter(a => a != '').length;
 $: word = text.replace(/\s+/g, ' ').split(' ').filter(a => a != '').length;
 $: page = word / 250;
 const goal = 750; /* 3 pages as default goal value */
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

<header><TopBar bind:text/></header>

<main><Editor bind:value={text} /></main>

<footer><BottomBar {char} {para} {word} {page} {goal}/></footer>
