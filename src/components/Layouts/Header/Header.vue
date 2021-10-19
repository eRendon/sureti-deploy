<template src="./Header.html"> </template>

<script lang="ts" src="./Header.ts"> </script>

<style scoped>
    #sureti-top-bar {
        background-color:#f6f6f6;
    }
    #sureti-top-bar-container {
        height: auto;
        width: 100%;
        max-width: 1200px;
        padding: 0;
        margin: 0 auto;
        position:relative;
        text-align:center;
    }
    #sureti-nav-bar {
        /*display:none;*/
        display:block;
        height:auto;
        width:100%;
    }
    #sureti-nav-bar.logged-in {
        display:block;
    }
    #sureti-nav-bar ul {
        margin:0;
        padding:20px 0 0;
        list-style:none;
        text-align:center
    }
    #sureti-nav-bar ul li {
        display:inline-block;
        font-family: 'Montserrat', 'Helvetica Neue', 'Roboto', sans-serif;
        font-size:17px;
        letter-spacing:0.3px;
        color:#534BCD;
        text-transform:uppercase;
        font-weight:700;
        margin: 0 10px;
        border-bottom: 5px solid transparent;
        padding-bottom: 3px;
    }

    #sureti-top-logo {
        display:inline-block;
        vertical-align:middle;
        padding:10px 10px 10px 0;
        text-align:center;
    }
    #sureti-top-logo img{
        padding-top:5px;
        height:55px;
        display:inline-block;
    }
    #sureti-icon-bar {
        display:inline-block;
        height:55px;
        border-left:solid 1px #534BCD;
        padding: 0 0 0 15px;
        margin-left:12px;
        vertical-align:middle;
    }
    #sureti-icon-bar.logged-in {
        display:inline-block;
    }
    #sureti-icon-bar ul {
        margin:0;
        padding:18px 0 0;
        list-style:none;
    }
    #sureti-icon-bar ul li {
        display:inline-block;
        padding:0 0 8px ;
        margin: 0 10px;
        border-bottom: solid 4px transparent;
    }
    #sureti-icon-bar img {
        width:25px;
    }

    #sureti-nav-bar ul li:hover,
    #sureti-icon-bar ul li:hover {
        border-color: #CCC;
        cursor:pointer;
    }
    #sureti-nav-bar ul li.current,
    #sureti-icon-bar ul li.current {
        border-color: #FFE102;
    }
    @media all and (min-width: 768px) {
        #sureti-top-bar-container {
            height: 80px;
        }
        #sureti-nav-bar {
            /*display:none;*/
            display:block;
            height:auto;
            width:360px;
            margin-left:30px
        }
        #sureti-nav-bar.logged-in {
            display:block;
        }
        #sureti-nav-bar ul {
            padding-top:27px;
            text-align:left
        }
        #sureti-top-logo {
            display:block;
            width:140px;
            position: absolute;
            top:5px;
            right:calc(50% - 70px);
            padding:0 20px 0;
            margin:0 auto;
        }
        #sureti-top-logo img{
            padding-top:10px;
            height:60px;
            display:block;
        }
        #sureti-top-logo.logged-in {
            right: 200px;
        }
        #sureti-icon-bar {
            display:block;
            height:60px;
            border-left:solid 2px #534BCD;
            padding: 0 15px;
            position:absolute;
            top:10px;
            right:25px;
        }
        #sureti-icon-bar.logged-in {
            display:inline-block;
        }
    }
</style>
