<template src="./register.html"> </template>

<script lang="ts" src="./register.ts"> </script>

<style scoped>
#sureti-register-form{
    max-width:500px;
    margin:0 auto;
}
#sureti-register-form ul {
    padding-top:20px;
}
#sureti-register-form ul li {
    padding:5px 0 10px;
}
@media all and (min-width:768px){
    #sureti-register-form{
        max-width:720px;
    }
    #sureti-register-form ul {
        text-align:center;
    }
    #sureti-register-form ul li {
        display:inline-block;
        width:50%;
        padding: 5px 10px 10px 0;
        text-align:left;
        vertical-align:top;
    }
    #sureti-register-form ul li.notifications-checkbox {
        width:25%;
    }
    .notifications-checkbox-p {
        text-align:left;
        width:40%;
        padding-top:10px;
    }
}

.submit-box a {
    display:inline-block;
    padding-left: 25px;
    color:red;
}
</style>
