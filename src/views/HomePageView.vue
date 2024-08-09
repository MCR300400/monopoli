<template>
  <div class="homepage">
    <nav class="navbar">
      <router-link to="/about" class="nav-link">About</router-link>
      <router-link to="/rules" class="nav-link">Rules</router-link>
    </nav>
    
    <header>
      <h1>Welcome to Monopoly Online</h1>
      <p>Your favorite classic board game, now online! Challenge your friends, or play against the AI. Roll the dice, buy properties, and bankrupt your opponents!</p>
    </header>
    
    <div class="actions">
      <router-link to="/game/123" class="button join-game">PLAY</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePageView'
}
</script>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  height: 100vh;
  text-align: center;
}

.navbar {
  width: 100%;
  background-color: #343a40;
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #495057;
}

.nav-link {
  color: #f8f9fa;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  transition: color 0.3s, transform 0.3s;
}

.nav-link:hover {
  color: #007bff;
  transform: scale(1.05);
}

header {
  margin-bottom: 3rem;
}

header h1 {
  font-size: 3rem;
  color: #212529;
  margin-bottom: 0.5rem;
}

header p {
  font-size: 1.25rem;
  color: #6c757d;
  max-width: 800px;
  margin: 0 auto;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.button {
  padding: 1rem 2.5rem;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.3s;
}

.button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.join-game {
  background-color: #28a745;
}

.join-game:hover {
  background-color: #218838;
}
</style>
