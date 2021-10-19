<template src="./login.html"> </template>

<script lang="ts" src="./login.ts"> </script>

<style scoped>
h2 {
    font-size:20px;
}
h4 {
    font-size:17px;
    padding-bottom: 10px;
}
h2, h3, h4, p {
    color:#333/*#5747D7*/;
}
input {
    text-align:center;
    color:#5747D7;
    font-weight:500;
}
input::placeholder {
    color:#777;
}
#sureti-auth-panel {
    padding: 20px 20px 80px;
    margin:0 auto;
}
#sureti-login-form {
    padding: 25px 15px 40px;
    margin:0 auto;
    background-color:#fff;
    border: solid 1px #fff;
    text-align:center;
    max-width:320px;
}
.sureti-login-links {
    text-align:center;
}
.login-link-box {
    padding: 25px 15px;
    margin:8px;
    background-color:#f1f1f1;
    text-align:center;
    border-radius:8px;
    z-index: 1;
    position:relative;
    box-shadow: 0px 1px 1px rgba(0,0,0,0.15);
    max-width:320px;
    display:inline-block;
}
.login-link-box h4 {}
.login-link-box p {}
.login-link-box button {
    margin-top:15px;
}
</style>
