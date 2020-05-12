<script>
 import Editor from './Editor.svelte';
 import TopBar from './TopBar.svelte';
 import BottomBar from './BottomBar.svelte';

 let text = '';
 
 $: char = text.split('').length;
 $: para = text.replace(/\n+/g, '\n').split('\n').filter(a => a != '').length;
 $: word = text.replace(/\s+/g, ' ').split(' ').filter(a => a != '').length;
 $: page = word / 250;
 let goal = 500; /* 2 pages as default goal value */

 let fg = '#000000';
 let bg = '#FFFFFF';
</script>

<style lang="sass">
h1
     text-align: center
main, .body
     height: 100%
     width: 100%
     margin: 0
     padding: 0
</style>

<div class="body" style="color: {fg}; background-color: {bg}">
    <header><TopBar bind:text bind:goal bind:fg bind:bg/></header>

    <main><Editor bind:value={text} /></main>
    
    <footer><BottomBar {char} {para} {word} {page} {goal}/></footer>
</div>
