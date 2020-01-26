<template>
  <div>
    <img id="logo" src="@/assets/images/svw-wappen.png" alt="" />
  </div>
</template>
<style>
#logo {
  animation: 2.5s appear;
  width: 400px;
  height: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
