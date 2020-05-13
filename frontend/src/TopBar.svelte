<script>
 export let text;
 export let goal;
 export let fg;
 export let bg;
 
 import FileMenu from './FileMenu.svelte';
 import SettingsMenu from './SettingsMenu.svelte';
 import AboutMenu from './AboutMenu.svelte';

 let lang = 'en'; // Will be send to children
</script>

<style lang="sass">
#top-menu-bar
     display: none
     font-family: sans-serif
#top-bar
     position: fixed
     height: 10%
     width: 100%
     &:hover
          #top-menu-bar
               height: 100%
               display: flex
               flex-direction: row
               justify-content: space-around
               align-items: center
</style>

<div id="top-bar">
    <div id="top-menu-bar">
	<FileMenu bind:text bind:lang bind:goal/>
	<SettingsMenu bind:goal bind:fg bind:bg bind:lang/>
	<AboutMenu/>
    </div>
</div>
