<template>
  <div class="board-container">
    <div class="board">
      <div v-for="(cell, index) in cells" :key="index" class="cell" :class="cell.type" :style="cell.style">
        <span v-if="cell.text">{{ cell.text }}</span>
        <div v-if="cell.type === 'player'" class="player-marker" :style="cell.style">
          <span>{{ cell.text }}</span>
        </div>
      </div>
      <div v-for="player in players" :key="player.id" class="player-marker" :style="getPlayerStyle(player)">
        <span>{{ player.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'BoardComponent',
  props: ['board', 'players'],
  computed: {
    getPlayerStyle() {
    return (player) => {
      const cellIndex = player.position;
      if (cellIndex >= 0 && cellIndex < this.cells.length) {
        return this.cells[cellIndex].style;
      } else {
        console.error('Invalid player position or cell index:', cellIndex);
        return {}; // Default style
      }
    }
  },
    cells() {
      const cellSize = 8.33; // Percentuale della dimensione del tabellone per ogni cella (8.33% di 100%)
      const cellStyles = [
        // Top row
        { top: '0%', left: `${cellSize * 1}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Go
        { top: '0%', left: `${cellSize  * 2}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Mediterranean Ave
        { top: '0%', left: `${cellSize * 3}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Community Chest
        { top: '0%', left: `${cellSize * 4}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Baltic Ave
        { top: '0%', left: `${cellSize * 5}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Income Tax
        { top: '0%', left: `${cellSize * 6}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Reading Railroad
        { top: '0%', left: `${cellSize * 7}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Oriental Ave
        { top: '0%', left: `${cellSize * 8}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Chance
        { top: '0%', left: `${cellSize * 9}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Vermont Ave
        { top: '0%', left: `${cellSize * 10}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Connecticut Ave
        { top: '0%', left: `${cellSize * 11}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Jail

        // Right side
        { top: `${cellSize}%`, left: `${cellSize * 11}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // St. Charles Place
        { top: `${cellSize * 2}%`, left: `${cellSize * 11}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Electric Company
        { top: `${cellSize * 3}%`, left: `${cellSize * 11}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // States Ave
        { top: `${cellSize * 4}%`, left: `${cellSize * 11}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Virginia Ave
        { top: `${cellSize * 5}%`, left: `${cellSize * 11}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Pennsylvania Railroad
        { top: `${cellSize * 6}%`, left: `${cellSize * 11}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // St. James Place
        { top: `${cellSize * 7}%`, left: `${cellSize * 11}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Chance
        { top: `${cellSize * 8}%`, left: `${cellSize * 11}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Tennessee Ave
        { top: `${cellSize * 9}%`, left: `${cellSize * 11}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // New York Ave
        { top: `${cellSize * 10}%`, left: `${cellSize * 11}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Free Parking

        // Bottom row
        { top: `${cellSize * 10}%`, left: `${cellSize * 10}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Go to Jail
        { top: `${cellSize * 10}%`, left: `${cellSize * 9}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Kentucky Ave
        { top: `${cellSize * 10}%`, left: `${cellSize * 8}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Chance
        { top: `${cellSize * 10}%`, left: `${cellSize * 7}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Indiana Ave
        { top: `${cellSize * 10}%`, left: `${cellSize * 6}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Illinois Ave
        { top: `${cellSize * 10}%`, left: `${cellSize * 5}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // B&O Railroad
        { top: `${cellSize * 10}%`, left: `${cellSize * 4}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Atlantic Ave
        { top: `${cellSize * 10}%`, left: `${cellSize * 3}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Ventnor Ave
        { top: `${cellSize * 10}%`, left: `${cellSize * 2}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Water Works
        { top: `${cellSize * 10}%`, left: `${cellSize * 1}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Marvin Gardens

        // Left side
        { top: `${cellSize * 10}%`, left: `-${cellSize * 0}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Jail
        { top: `${cellSize * 9}%`, left: `-${cellSize * 0}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Pacific Ave
        { top: `${cellSize * 8}%`, left: `-${cellSize * 0}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // North Carolina Ave
        { top: `${cellSize * 7}%`, left: `-${cellSize * 0}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Community Chest
        { top: `${cellSize * 6}%`, left: `-${cellSize * 0}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Pennsylvania Ave
        { top: `${cellSize * 5}%`, left: `-${cellSize * 0}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Short Line
        { top: `${cellSize * 4}%`, left: `-${cellSize * 0}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Park Place
        { top: `${cellSize * 3}%`, left: `-${cellSize * 0}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Chance
        { top: `${cellSize * 2}%`, left: `-${cellSize * 0}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Boardwalk
        { top: `${cellSize}%`, left: `-${cellSize * 0}%`, width: `${cellSize}%`, height: `${cellSize}%` }, // Boardwalk
        { top: '0%', left: `-${cellSize * 0}%`, width: `${cellSize}%`, height: `${cellSize}%` } // Jail (corretto posizionamento angolare)
      ];

      return this.board.flat().map((cell, index) => ({
        ...cell,
        style: cellStyles[index]
      }));
    }
  }
};
</script>

<style scoped>
.board-container {
  width: 100%;
  height: 100%;
  overflow: hidden; /* Impedisce la visualizzazione delle barre di scorrimento */
  display: flex;
  justify-content: center;
  align-items: center;
}

.board {
  position: relative;
  width: 800px; /* Dimensione aumentata del tabellone */
  height: 800px; /* Dimensione aumentata del tabellone */



  display: grid;
  grid-template-rows: repeat(11, 1fr);
  grid-template-columns: repeat(12, 1fr);
}

.cell {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f39c12;
  border: 2px solid #ffffff;

  font-size: 0.8rem;
  color: #fff;
  font-weight: bold;
  text-align: center;
}

.cell.corner {
  background-color: #2c3e50;
  color: #fff;
  font-size: 1rem;
  font-weight: normal;
}

.cell.property {
  background-color: #f1c40f;
}

.player-marker {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Semitrasparente per evidenziare la posizione del giocatore */
  color: white;
  border-radius: 50%;
}

.cell.community-chest {
  background-color: #1abc9c;
}

.cell.chance {
  background-color: #e74c3c;
}

.cell.tax {
  background-color: #7f8c8d;
}

.cell.utility {
  background-color: #3498db;
}

.cell.railroad {
  background-color: #9b59b6;
}

.cell span {
  display: block;
  text-align: center;
}
</style>
