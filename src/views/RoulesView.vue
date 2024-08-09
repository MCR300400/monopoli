<template>
  <div class="rules-view">
    <nav class="navbar">
      <router-link to="/" class="nav-link">HomePage</router-link>
      <router-link to="/about" class="nav-link">About</router-link>
    </nav>
    
    <header>
      <h1>Monopoly Online Rules</h1>
    </header>
    
    <section>
      <h2>Objective</h2>
      <p>
        The goal of Monopoly Online is to bankrupt your opponents by acquiring properties, building houses and hotels, and collecting rent from other players.
      </p>
      
      <h2>How to Play</h2>
      <ol>
        <li>Each player starts with a fixed amount of money.</li>
        <li>Players take turns rolling the dice and moving their token clockwise around the board.</li>
        <li>Depending on where your token lands, you can buy properties, pay rent, draw Chance or Community Chest cards, or go to Jail.</li>
        <li>The game continues until only one player remains with any money.</li>
      </ol>
      
      <h2>Special Rules</h2>
      <ul>
        <li><strong>Jail:</strong> If you land in Jail, you must either roll a double, use a Get Out of Jail Free card, or pay a fine to get out.</li>
        <li><strong>Houses & Hotels:</strong> Build houses and hotels on your properties to increase the rent you can charge other players.</li>
        <li><strong>Trading:</strong> Players can trade properties, money, and other assets at any time.</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'RulesView'
}
</script>

<style scoped>
.rules-view {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
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
  text-align: center;
}

section {
  text-align: left;
}

h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

ol, ul {
  margin-left: 1.5rem;
  font-size: 1.2rem;
  color: #34495e;
}

ol li, ul li {
  margin-bottom: 0.75rem;
}
</style>
