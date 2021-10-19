<template src="./home.html"> </template>

<script lang="ts" src="./home.ts"> </script>

<style>
#sureti-dashboard-stats-column {
    padding: 0 30px 0 0;
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
    padding: 0 10px;
    flex:2;
}
#sureti-dashboard-list-type {
    padding-bottom:15px;
    margin-bottom:10px;
    border-bottom: solid 1px #ddd;
}
@media all and (min-width: 900px) {
    #sureti-dashboard-stats-column {
        flex:1;
    }
    #sureti-dashboard-list-column {
        flex:3;
    }
}
</style>
