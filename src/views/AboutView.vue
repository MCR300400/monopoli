<template>
  <div class="about-view">
    <nav class="navbar">
      <router-link to="/" class="nav-link">HomePage</router-link>
      <router-link to="/roules" class="nav-link">Rules</router-link>
    </nav>
    
    <header>
      <h1>About Monopoly Online</h1>
    </header>
    
    <section>
      <p>
        Monopoly Online brings the classic board game to your fingertips, allowing you to play with friends or against AI from anywhere in the world. 
        Our online version captures the excitement and strategy of the original game while offering a seamless digital experience.
      </p>
      <p>
        The game was developed with a passion for board games and a desire to bring people together through fun and friendly competition.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about-view {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar {
  width: 100%;
  background-color: #2c3e50;
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #3498db;
}

header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

section p {
  font-size: 1.2rem;
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
</style>
