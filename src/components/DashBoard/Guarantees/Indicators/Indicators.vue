<template src="./Indicators.html"> </template>

<script lang="ts" src="./Indicators.ts"> </script>

<style scoped>
.guarantee-summary-indicators-box {
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgba(132, 132, 132, 0.46), 0px 0px 16px rgba(132, 132, 132, 0.10);
  text-align: center;
  width: 100%;
}

.guarantee-summary-indicators-box h6 {
  margin-bottom: 7px;
  font-size: 13px;
  font-weight: 400;
  color: var(--main-color);
  margin:0;
  padding:0 0 3px;
}

.guarantee-summary-indicators-box h4 {
  margin-bottom: 2px;
  font-family: "Roboto";
  font-weight: 900;
  margin:0;
  padding:0;
  font-size: 26px;
}
.guarantee-summary-indicators-box .use-type h4 {
  margin-top:8px;
  font-size: 14px;
}

.guarantee-summary-indicators-box h4 span {
  font-weight: 800;
}

.guarantee-summary-indicators-box p {
  font-size: 14px;
  margin:0;
  padding:0;
  color: #838383;
}

.guarantee-summary-indicators-box .pendientes {
  position: relative;
}

.guarantee-summary-indicators-box .pendientes .divisors::before {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 1px;
  height: 40px;
  background-color: #dcdcdc;
}

.guarantee-summary-indicators-box .pendientes .divisors::after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  width: 1px;
  height: 40px;
  background-color: #dcdcdc;
}

.guarantee-summary-indicators-box .pendientes h4 span {
  color: #e26666;
}

@media only screen and (min-width: 768px) {
    .guarantee-summary-indicators-box h6,
    .guarantee-summary-indicators-box p {
        font-size: min(1.5vw, 14px);
    }

    .guarantee-summary-indicators-box h4 {
        font-size: min(2.5vw, 30px);
    }
}

.guarantee-summary-indicators-box .pendientes .good-green {
  color:#45C742;
}
.guarantee-summary-indicators-box .pendientes .late-yellow {
  color:#CFD23D;
}
.guarantee-summary-indicators-box .pendientes .very-late-orange {
  color:#FC8948;
}
.guarantee-summary-indicators-box .pendientes .urgent-red {
  color:#E73F3F;
}
.guarantee-summary-indicators-box .pendientes .normal-black {
  color:#333333;
}
</style>