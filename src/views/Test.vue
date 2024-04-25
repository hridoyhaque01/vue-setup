<template>
    <section class="wrapper">
      <div id="wrapper2">dedd</div>
      <div id="wrapper2">ddd</div>
      <div class="img_wrapper">
        <!-- <img src="@/assets/service-1.jpg" alt="" /> -->
      </div>
    </section>
  </template>
  <script setup>
  const callback = (response) => {
    console.log(response);
    if (response.credential) {
      console.log("Call the endpoint which validates JWT credential string");
    } else {
      console.log("Call the endpoint which validates authorization code");
    }
  };
  </script>
  
  <style>
  .wrapper {
    background-color: beige;
    width: 100%;
    height: 100vh;
  }
  
  #wrapper2 {
    width: 100px;
    padding: 20px 12px;
    background-color: rgb(107, 152, 221);
  }
  
  .img_wrapper {
    width: 200px;
    height: 200px;
    overflow: hidden;
    background-color: aquamarine;
  }
  
  img {
    width: 100%;
  
    height: 100%;
  }
  </style>
  