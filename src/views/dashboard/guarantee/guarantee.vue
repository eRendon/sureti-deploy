<template src="./guarantee.html"> </template>

<script lang="ts" src="./guarantee.ts"> </script>

<style scoped>
#sureti-single-guarantee-tabs {
    padding:15px 0 0;
}
.sureti-single-guarantee-section {
    padding: 5px 0 30px;
}
.sureti-single-guarantee-section h3 {
    margin-top:30px;
}
#sureti-single-guarantee-detail {
    padding:20px;
    background-color:#f6f6f6;
    border:solid 1px #eee;
    border-radius:10px;
}
#sureti-single-guarantee-detail img.guarantee-icon {
    width:40px;
    height:40px;
    display:inline-block;
    vertical-align: top;
    margin-right:20px;
}
#sureti-single-guarantee-location {
    display:inline-block;
    vertical-align: top;
    width:calc(100% - 65px);
}
.guarantee-owner-box {
    padding:15px;
    margin:5px;
    background-color:#f6f6f6;
    border:solid 1px #eee;
    border-radius:10px;
}
@media all and (min-width:768px) {
    #sureti-single-guarantee-location h3 {
        display: inline-block;
        vertical-align: top;
        width:calc(100% - 180px);
    }
    #sureti-single-guarantee-location #guarantee-manage-loan {
        display:inline-block;
        vertical-align: top;
    }
}
#sureti-single-guarantee-location h3 span {
    display:inline-block;
    vertical-align: top;
    font-size:14px;
    font-weight:300;
    line-height: 19px;
    color:#5747D7;
}
#sureti-single-guarantee-location h3 span.address {
    display:block;
    font-size:20px;
    font-weight:900;
    line-height: 25px;
    color:#333;
}

</style>