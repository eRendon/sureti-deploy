<template src="./Document.html"> </template>

<script lang="ts" src="./Document.ts"> </script>

<style scoped>
.sureti-doc-pill {
    border:solid 1px #ddd;
    border-radius:8px;
    background-color:#f2f2f2;
    margin:5px 0;
    padding:5px 10px;
}
.sureti-doc-pill p {
    display:inline-block;
    vertical-align:middle;
    width: calc(100% - 70px);
    padding:0;
    margin:0;
    line-height:19px;
    font-size:14px;
    font-weight:600;
}
.doc-action-icon {
    width:30px;
    min-width:0;
    border: solid 1px #ddd;
    background-color:#fff;
    padding:3px;
    border-radius:5px;
    cursor:pointer;
    display:inline-block;
    vertical-align:middle;
    margin-left:3px;
    transition: background-color 0.15s ease-in-out;
}
.doc-action-icon:hover {
    background-color:#ddd;
}
</style>