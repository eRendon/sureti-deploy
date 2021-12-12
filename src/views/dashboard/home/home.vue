<template src="./home.html"> </template>

<script lang="ts" src="./home.ts"> </script>

<style>
#sureti-dashboard-stats-column {
    padding-top:20px;
    flex:1;
}
.sureti-dashboard-stat {
    padding: 25px 0;
    border-bottom:solid 1px #ddd;
}
#sureti-stat-0 {
    padding-top:0;
}
.sureti-dashboard-stat label {
    text-transform:uppercase;
    font-size: 13px;
    margin:0;
    padding:0;
}
.sureti-stat-amount {
    display:block;
    font-weight:900;
    font-size:26px;
    line-height:26px;
    margin:0;
    padding:0px 0;
}

#sureti-dashboard-list-column {
    padding: 0;
    flex:2;
}
#sureti-dashboard-list-type {
    padding:15px 0;
    margin-bottom:10px;
    border-bottom: solid 1px #ddd;
}
@media all and (max-width:460px) {
    #sureti-dashboard-list-type button {
        font-size: 13px;
    }
}
@media all and (min-width: 768px) {
    #sureti-dashboard-stats-column {
        padding: 0 30px 0 0;
        flex:1.6;
        max-width: 265px;
    }
    #sureti-dashboard-list-column {
        flex:3;
    }
    #sureti-dashboard-list-type {
        padding: 0 0 15px;
    }
}
</style>
