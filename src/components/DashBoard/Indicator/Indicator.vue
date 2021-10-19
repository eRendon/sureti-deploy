<template src="./Indicator.html"> </template>

<script lang="ts" src="./Indicator.ts"> </script>

<style scoped>
.sureti-stat-action {
    border:solid 1px #dddddd;
    display:inline-block;
    padding: 4px 30px 5px 10px;
    margin-top:15px;
    border-radius: 80px;
    background-color:#eaeaea;
    color:#5747D7;
    font-size:14px;
    font-weight:500;
    position:relative;
    transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out, color 0.15s ease-in-out;
    cursor:pointer;
}
.sureti-stat-action:hover {
    background-color:#5747D7;
    border-color:#5747D7;
    color:#fff;
}
.sureti-stat-action img {
    position:absolute;
    right:8px;
    top:7px;
    width:15px;
    height:auto;
    transition: opacity 0.15s ease-in-out;
}
.sureti-stat-action:hover img.idle-img {
    opacity:0;
}

@media all and (min-width:768px) {
.sureti-stat-action {
    display:block;
}
}
</style>
