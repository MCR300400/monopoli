<template>
    <div class="victory-screen">
      <h2>Congratulations, {{ winner.name }}!</h2>
      <p>You have won the game!</p>
      <button @click="exitGame">Return to Home</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VictoryScreen',
    props: {
      winner: {
        type: Object,
        required: true
      }
    },
    methods: {
      exitGame() {
        this.$emit('exit');
      }
    }
  };
  </script>
  
  <style scoped>
  .victory-screen {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  
  .victory-screen h2 {
    font-size: 2rem;
    color: #27ae60;
  }
  
  .victory-screen p {
    font-size: 1.2rem;
    color: #2c3e50;
  }
  
  .victory-screen button {
    padding: 0.8rem 1.5rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .victory-screen button:hover {
    background-color: #2980b9;
  }
  </style>
  