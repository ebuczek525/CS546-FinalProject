<script>
 export let text;
 
 import FileMenu from './FileMenu.svelte';
 import SettingsMenu from './SettingsMenu.svelte';
 import AboutMenu from './AboutMenu.svelte';
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
	<FileMenu bind:text/>
	<SettingsMenu/>
	<AboutMenu/>
    </div>
</div>
