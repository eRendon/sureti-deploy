<template src="./SidebarProfile.html"> </template>

<script lang="ts" src="./SidebarProfile.ts"> </script>

<style scoped>
.sureti-profile-sidebar {
}
.sureti-profile-sidebar-card {
    width:calc(100% - 40px);
    margin: 60px 20px 30px;
    box-shadow: 0px 1px 20px rgba(0,0,0,0.1), 0px 1px 10px rgba(0,0,0,0.03), 0px 1px 2px rgba(0,0,0,0.03);
    border-radius:8px;
    vertical-align:top;
    padding:10px;
}
.sureti-profile-sidebar-close {
    position:absolute;
    top:10px;
    right:20px;
    width: 30px;
    height:auto;
    transform: rotate(45deg);
    padding:3px;
    border-radius:20px;
    transition: background-color 0.15s ease-in-out;
    cursor:pointer;
}
.sureti-profile-sidebar-close:hover {
    background-color:#ddd;
}
img.sureti-profile-sidebar-thumb {
    display:inline-block;
    width:40px;
    vertical-align:top;
}
.sureti-profile-sidebar-details {
    display: inline-block;
    width: calc(100% - 60px);
    margin-left:10px;
    text-align:left;
    line-height:17px;
}
.sureti-profile-sidebar-details span{
    font-size:12px;
    line-height:15px;
    color:#666;
    padding:0;
    margin:0;
    display:inline-block;
}
.sureti-profile-sidebar-menu {
    margin:0 20px 20px;
}
.sureti-profile-sidebar-menu ul {

}
.sureti-profile-sidebar-menu ul li {
    display:block;
    text-align:left;
}
.sureti-profile-sidebar-menu ul a {
    color:#5747D7;
    font-weight:500;
    display:block;
    padding:8px;
    border-bottom: solid 1px #eee;
    transition: background-color 0.15s ease-in-out;
    cursor:pointer;
}
.sureti-profile-sidebar-menu ul a:hover {
    background-color:#eee;
}
</style>