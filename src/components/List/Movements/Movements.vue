<template src="./Movements.html"> </template>

<script lang="ts" src="./Movements.ts"> </script>

<style scoped>
.sureti-movement-list {
    background-color: var(--main-color);
    padding: 15px 15px 20px;
    border-radius:8px;
}
.sureti-movement-summary:last-of-type {
    border-bottom:none;
}
#sureti-dashboard-list-header {
  padding:10px 0;
  position:relative;
}
#sureti-dashboard-list-header h2 {
    font-size:25px;
    color:#fff;
    margin:0;
    padding:0;
}
#sureti-dashboard-list-header p {
    font-size:15px;
    color:var(--secondary-color);
    margin:0;
    padding:0;
    padding-bottom:15px;
}

.sureti-movement-summary {
    border-bottom: solid 1px var(--secondary-color);
    padding:14px 0;
}
.sureti-movement-summary-title {
    font-weight:400;
    font-size:16px;
    letter-spacing:0.25px;
    color:#fff;
}
.sureti-movement-summary-title .movement-date,
.movement-state {
    font-size:12px;
    font-weight:400;
    color:var(--secondary-color);
    display: inline-block;
    padding: 0 5px;
}
.movement-amount {
    font-size:22px;
    font-weight: 800;
    display: block;
    width: (100% - 32px);
}
.movement-state-icon {
    font-weight: 800;
    display: block;
    position:absolute;
    bottom:2px;
    right:2px;
    width:25px;
    opacity:0.8;
}
.sureti-movement-summary-details {
    font-weight:300;
    color:#fff;
    position:relative;
}
.sureti-movement-list-filters {
    border: solid 1px #dfdfdf/*#534BCD*/;
    border-radius:8px;
    margin: 8px 0;
    padding:8px;
    background-color:#efefef;
}
.sureti-movement-list-filter {
    display:inline-block;
    margin-right:30px;
    vertical-align:top;
}
</style>