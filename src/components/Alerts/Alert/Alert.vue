<template src="./Alert.html"> </template>

<script lang="ts" src="./Alert.ts"> </script>

<style scoped>
.sureti-alert-pill-overlay {
    width:100vw;
    height:100vh;
    background-color:rgba(0,0,0,0.7);
    position:fixed;
    top:0;
    left:0;
    z-index:50000;
    display:inline-block;
    vertical-align:middle;
    text-align:center;
}

.sureti-alert-pill {
    width:100%;
    display:inline-block;
    vertical-align:middle;
    max-width:320px;
    background-color:#fff;
    border-radius: 10px;
    box-shadow: 0 0 22px rgba(0,0,0,0.3);
    padding: 45px 15px 15px;
    margin:0 auto;
    position:relative;
    z-index:50001;
}
.sureti-alert-pill .sureti-alert-pill-close {
    padding: 4px 4px 3px;
    width:auto;
    min-width:0;
    position:absolute;
    top:3px;
    right:3px;
    font-size:22px;
    line-height:15px;
}
.sureti-alert-pill .sureti-alert-pill-icon {
    padding: 4px;
    color:#000;
    width:20px;
    height:20px;
    min-width:0;
    position:absolute;
    top:3px;
    left:3px;
    font-size:22px;
    line-height:15px;
}
</style>
