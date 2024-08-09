<template>
  <div class="player-info">
    <h2>Players</h2>
    <ul>
      <li v-for="(player, index) in players" :key="index" :class="{ current: player.name === currentPlayer }">
        <strong>{{ player.name }}</strong> - Money: ${{ player.money }} - Properties: {{ player.properties.length }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PlayerInfoComponent',
  props: {
    players: {
      type: Array,
      required: true
    },
    currentPlayer: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.player-info {
  background-color: #fff;
  padding: 15px;
  border: 3px solid #2c3e50;
  border-radius: 10px;
}

.player-info h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.player-info ul {
  list-style-type: none;
  padding: 0;
}

.player-info li {
  padding: 8px;
  border-bottom: 1px solid #bdc3c7;
  font-size: 1.1rem;
  color: #34495e;
}

.player-info li.current {
  background-color: #3498db;
  color: white;
}

.player-info li:last-child {
  border-bottom: none;
}

.player-info strong {
  color: #2c3e50;
}
</style>
