<template>
  <div class="game-view">
    <div class="game-container">
      <div class="sidebar">
        <div class="player-info" v-for="player in players" :key="player.id"
          :class="{ 'active': player.id === currentPlayer.id }">
          <h3>{{ player.name }}</h3>
          <p>Money: {{ player.money }}</p>
          <p>Properties: {{ player.properties.join(', ') }}</p>
          <p>Position: {{ player.position }}</p>
        </div>
        <div class="dice-roll">
          <button @click="rollDice" :disabled="diceRolled">Roll Dice</button>
          <div v-if="diceResults">
            <div v-if="currentPlayer.inJail" class="jail-info">
              <p>Turns remaining to roll: {{ remainingRolls }}</p>
            </div>

            <p>Dice 1: {{ diceResults.dice1 }}</p>
            <p>Dice 2: {{ diceResults.dice2 }}</p>
            <p>Total: {{ diceResults.total }}</p>
          </div>
        </div>
        <div v-if="currentCellInfo && canBuyProperty" class="cell-info">
          <h3>Cell Info</h3>
          <p><strong>Type:</strong> {{ currentCellInfo.type }}</p>
          <p><strong>Name:</strong> {{ currentCellInfo.text }}</p>
          <p v-if="currentCellInfo.price"><strong>Price:</strong> {{ currentCellInfo.price }}</p>
          <p v-if="currentCellInfo.sellPrice"><strong>Sell Price:</strong> {{ currentCellInfo.sellPrice }}</p>
          <p v-if="currentCellInfo.houses || currentCellInfo.hotels">
            <strong>Houses:</strong> {{ currentCellInfo.houses }} <br>
            <strong>Hotels:</strong> {{ currentCellInfo.hotels }}
          </p>
          <button v-if="canBuyProperty" @click="buyProperty">Buy Property</button>
        </div>

      </div>
      <div class="board-container">
        <BoardComponent :board="board" :players="players" class="board" />
      </div>
    </div>

    <footer>
      <button @click="endTurn">End Turn</button>
      <button @click="leaveGame">Leave Game</button>
    </footer>


    <VictoryComponent v-if="gameOver" :winner="winner" @exit="leaveGame" />
  <PopupComponent v-for="(popup, index) in popups" :key="index" :message="popup.message" :type="popup.type" />
  </div>
</template>




<script>
import BoardComponent from '@/components/BoardComponent.vue';
import PopupComponent from '@/components/PopupComponent.vue';
import VictoryComponent from '@/components/VictoryComponent.vue';
export default {
  name: 'GameView',
  components: {
    BoardComponent,
    VictoryComponent,
    PopupComponent
  },
  props: {
    idGame: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      remainingRolls: 0, // Number of attempts remaining when in jail
      gameOver: false, // Nuovo stato per la fine del gioco
      winner: null, // Nuovo stato per il vincitore
      popups: [],
      board: [
        // Top row
        [
          { type: 'corner', text: 'Go' },
          { type: 'property', text: 'Mediterranean Ave', price: 60, owner: null, houseCost: 50, hotelCost: 100, houses: 0, hotels: 0 },
          { type: 'community-chest', text: 'Community Chest' },
          { type: 'property', text: 'Baltic Ave', price: 60, owner: null, houseCost: 50, hotelCost: 100, houses: 0, hotels: 0 },
          { type: 'tax', text: 'Income Tax' },
          { type: 'property', text: 'Reading Railroad', price: 200, owner: null, houseCost: 0, hotelCost: 0, houses: 0, hotels: 0 },
          { type: 'property', text: 'Oriental Ave', price: 100, owner: null, houseCost: 50, hotelCost: 100, houses: 0, hotels: 0 },
          { type: 'chance', text: 'Chance' },
          { type: 'property', text: 'Vermont Ave', price: 100, owner: null, houseCost: 50, hotelCost: 100, houses: 0, hotels: 0 },
          { type: 'property', text: 'Connecticut Ave', price: 120, owner: null, houseCost: 50, hotelCost: 100, houses: 0, hotels: 0 },
          { type: 'corner', text: 'Jail' }
        ],
        // Right side
        [
          { type: 'property', text: 'St. Charles Place', price: 140, owner: null, houseCost: 100, hotelCost: 200, houses: 0, hotels: 0 },
          { type: 'utility', text: 'Electric Company', price: 150, owner: null, houseCost: 0, hotelCost: 0, houses: 0, hotels: 0 },
          { type: 'property', text: 'States Ave', price: 140, owner: null, houseCost: 100, hotelCost: 200, houses: 0, hotels: 0 },
          { type: 'property', text: 'Virginia Ave', price: 160, owner: null, houseCost: 100, hotelCost: 200, houses: 0, hotels: 0 },
          { type: 'railroad', text: 'Pennsylvania Railroad', price: 200, owner: null, houseCost: 0, hotelCost: 0, houses: 0, hotels: 0 },
          { type: 'property', text: 'St. James Place', price: 180, owner: null, houseCost: 100, hotelCost: 200, houses: 0, hotels: 0 },
          { type: 'chance', text: 'Chance' },
          { type: 'property', text: 'Tennessee Ave', price: 180, owner: null, houseCost: 100, hotelCost: 200, houses: 0, hotels: 0 },
          { type: 'property', text: 'New York Ave', price: 200, owner: null, houseCost: 100, hotelCost: 200, houses: 0, hotels: 0 },
          { type: 'corner', text: 'Free Parking' }
        ],
        // Bottom row
        [
          { type: 'corner', text: 'Go to Jail' },
          { type: 'property', text: 'Kentucky Ave', price: 220, owner: null, houseCost: 150, hotelCost: 300, houses: 0, hotels: 0 },
          { type: 'chance', text: 'Chance' },
          { type: 'property', text: 'Indiana Ave', price: 220, owner: null, houseCost: 150, hotelCost: 300, houses: 0, hotels: 0 },
          { type: 'property', text: 'Illinois Ave', price: 240, owner: null, houseCost: 150, hotelCost: 300, houses: 0, hotels: 0 },
          { type: 'railroad', text: 'B&O Railroad', price: 200, owner: null, houseCost: 0, hotelCost: 0, houses: 0, hotels: 0 },
          { type: 'property', text: 'Atlantic Ave', price: 260, owner: null, houseCost: 150, hotelCost: 300, houses: 0, hotels: 0 },
          { type: 'property', text: 'Ventnor Ave', price: 260, owner: null, houseCost: 150, hotelCost: 300, houses: 0, hotels: 0 },
          { type: 'utility', text: 'Water Works', price: 150, owner: null, houseCost: 0, hotelCost: 0, houses: 0, hotels: 0 },
          { type: 'property', text: 'Marvin Gardens', price: 280, owner: null, houseCost: 150, hotelCost: 300, houses: 0, hotels: 0 },
          { type: 'corner', text: 'Go To Jail' }
        ],
        // Left side
        [
          { type: 'corner', text: 'Jail' },
          { type: 'property', text: 'Pacific Ave', price: 300, owner: null, houseCost: 200, hotelCost: 400, houses: 0, hotels: 0 },
          { type: 'property', text: 'North Carolina Ave', price: 300, owner: null, houseCost: 200, hotelCost: 400, houses: 0, hotels: 0 },
          { type: 'community-chest', text: 'Community Chest' },
          { type: 'property', text: 'Pennsylvania Ave', price: 320, owner: null, houseCost: 200, hotelCost: 400, houses: 0, hotels: 0 },
          { type: 'railroad', text: 'Short Line', price: 200, owner: null, houseCost: 0, hotelCost: 0, houses: 0, hotels: 0 },
          { type: 'property', text: 'Park Place', price: 350, owner: null, houseCost: 200, hotelCost: 400, houses: 0, hotels: 0 },
          { type: 'chance', text: 'Chance' },
          { type: 'property', text: 'Boardwalk', price: 400, owner: null, houseCost: 200, hotelCost: 400, houses: 0, hotels: 0 },
          { type: 'corner', text: 'Jail' }
        ]
      ],
      players: [
        { id: 1, name: 'Player 1', money: 1500, properties: [], position: 0, inJail: false, turnsInJail: 0 },
        { id: 2, name: 'Player 2', money: 1500, properties: [], position: 0, inJail: false, turnsInJail: 0 },
        // Altri giocatori se necessario
      ],
      currentPlayerIndex: 0,
      diceResults: null,
      currentCellInfo: null,
      diceRolled: false,
      canBuyProperty: false,
      jailTurnsLimit: 3 // Maximum number of turns in jail
    };
  },
  computed: {
    currentPlayer() {
      return this.players[this.currentPlayerIndex];
    }
  },
  methods: {
    calculateRent(cell) {
    return cell.price * 1000 + (cell.houses * cell.houseCost) + (cell.hotels * cell.hotelCost);
  },
  declareBankruptcy() {
  // Trova il giocatore che ha perso tutto il denaro
  const loser = this.currentPlayer;
  this.gameOver = true;
  this.winner = this.players.find(player => player.id !== loser.id);
  this.showPopup(`${loser.name} has gone bankrupt! ${this.winner.name} wins!`, 'success');
},
    payRent(cell) {
    const rent = this.calculateRent(cell);
    if (this.currentPlayer.money >= rent) {
      const owner = this.players.find(player => player.id === cell.owner);
      this.currentPlayer.money -= rent;
      owner.money += rent;
      this.showPopup(`You paid $${rent} rent to ${owner.name}.`, 'error');
    } else {
      this.showPopup('You do not have enough money to pay the rent.', 'error');
      this.declareBankruptcy();
    }
  },
    buyProperty() {
  const cell = this.getCell(this.currentPlayer.position);
  if (cell && cell.type === 'property' && this.canBuyProperty) {
    if (this.currentPlayer.money >= cell.price) {
      this.currentPlayer.money -= cell.price;
      cell.owner = this.currentPlayer.id;
      this.currentPlayer.properties.push(cell.text);
      this.canBuyProperty = false;
      this.showPopup(`You have bought ${cell.text} for $${cell.price}!`, 'success');
    } else {
      this.showPopup('You do not have enough money to buy this property.', 'error');
    }
  }
}
,
    showPopup(message, type = 'info') {
      this.popups.push({ message, type });
      setTimeout(() => {
        this.popups.shift(); // Rimuove il popup dopo 3 secondi
      }, 3000);
    },
    rollDice() {
      if (this.currentPlayer.inJail) {
        if (this.remainingRolls > 0) {
          const dice1 = Math.floor(Math.random() * 6) + 1;
          const dice2 = Math.floor(Math.random() * 6) + 1;
          const total = dice1 + dice2;

          this.diceResults = { dice1, dice2, total };

          if (dice1 === dice2) {
            // Successfully rolled doubles and can get out of jail
            this.currentPlayer.inJail = false;
            this.remainingRolls = 0; // Reset remaining rolls
            this.diceRolled = true; // Allow the next dice roll
            this.movePlayer(total);
          } else {
            this.remainingRolls -= 1;
            if (this.remainingRolls === 0) {
              this.showPopup('You did not roll doubles. You remain in jail.', 'error');
              this.movePlayer(0); // Do not move the player
            }
          }
        } else {
          this.showPopup('You have exhausted your attempts to roll doubles.', 'error');
        }
      } else {
        if (this.diceRolled) return;

        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        const total = dice1 + dice2;
        this.diceResults = { dice1, dice2, total };
        this.diceRolled = true;

        this.movePlayer(total);
        this.updateCellInfo();
      }
    },

    movePlayer(steps) {
    const player = this.currentPlayer;
    const boardSize = this.board.flat().length;
    const goPosition = this.board.flat().findIndex(cell => cell.type === 'corner' && cell.text === 'Go');

    if (!player.inJail) {
      const oldPosition = player.position;
      player.position = (player.position + steps) % boardSize;
      this.handleCellAction();

      // Verifica se il giocatore ha passato "Go"
      if (oldPosition < goPosition && player.position >= goPosition) {
        this.addPassGoMoney();
      }
    }
  },

  addPassGoMoney() {
    this.currentPlayer.money += 200;
    this.showPopup('You have passed Go and collected $200!', 'success');
  },
    payTax() {
      // Assuming tax amounts are predefined for simplicity
      const taxAmount = 100; // You can set this to different values based on the tax type
      
      if (this.currentPlayer.money >= taxAmount) {
        this.currentPlayer.money -= taxAmount;
        this.showPopup(`You paid $${taxAmount} in taxes.`, 'info');
      } else {
        this.showPopup('You do not have enough money to pay the tax.', 'error');
        // Handle case when player cannot pay tax (e.g., declare bankruptcy)
      }
    },

    handleCellAction() {
  const cell = this.getCell(this.currentPlayer.position);
  if (cell) {
    if (cell.type === 'tax') {
      this.payTax();
    } else if (cell.type === 'property') {
      if (cell.owner === null) {
        this.canBuyProperty = true;
      } else if (cell.owner !== this.currentPlayer.id) {
        this.canBuyProperty = false;
        this.payRent(cell);
      }
    } else if (cell.type === 'corner' && cell.text === 'Go To Jail') {
      this.sendToJail();
    }
  }
}
,

    sendToJail() {
      const player = this.currentPlayer;
      player.inJail = true;
      player.position = this.getJailPosition();
      this.remainingRolls = this.jailTurnsLimit; // Reset the number of attempts
      this.updateCellInfo();
    },

    getJailPosition() {
      const jailCell = this.board.flat().find(cell => cell.type === 'corner' && cell.text === 'Jail');
      return this.board.flat().indexOf(jailCell);
    },

    updateCellInfo() {
      const player = this.currentPlayer;
      const cell = this.getCell(player.position);
      if (cell) {
        this.currentCellInfo = {
          type: cell.type,
          text: cell.text,
          price: cell.price || null,
          sellPrice: cell.price ? cell.price / 4 : null,
          houses: cell.houses || 0,
          hotels: cell.hotels || 0
        };
        this.canBuyProperty = cell.type === 'property' && cell.owner === null && this.currentPlayer.money >= cell.price;
      } else {
        this.currentCellInfo = null;
        this.canBuyProperty = false;
      }
    },

    getCell(position) {
      return this.board.flat()[position] || null;
    },

    nextPlayer() {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      this.diceRolled = false;
      // Reset remaining rolls if the player was in jail
      if (this.players[this.currentPlayerIndex].inJail) {
        this.remainingRolls = this.jailTurnsLimit;
      }
    },

    endTurn() {
      this.nextPlayer();
    },

    leaveGame() {
      this.$router.push('/');
    },

    initializeGame() {
      console.log('Game initialized with ID:', this.idGame);
    }
  },
  created() {
    this.initializeGame();
  },
  watch: {
    idGame(newId) {
      if (newId) {
        this.initializeGame();
      }
    }
  }
};

</script>







<style scoped>
.game-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f8f9fa;
  height: 100vh;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
}
.jail-info {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.jail-info p {
  font-size: 1rem;
  color: #e74c3c;
}


header p {
  font-size: 1.2rem;
  color: #34495e;
}

.dice-roll {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.dice-roll button {
  padding: 0.8rem 1.5rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dice-roll button:hover {
  background-color: #c0392b;
}

.dice-roll div {
  margin-top: 1rem;
}

.dice-roll p {
  font-size: 1.2rem;
  color: #2c3e50;
}

.cell-info {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.cell-info h3 {
  margin-bottom: 1rem;
}

.cell-info p {
  font-size: 1rem;
  color: #2c3e50;
}

.dice-roll button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.game-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2rem;
  flex: 1;
}

.board {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.player-info {
  background-color: #fff;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.player-info.active {
  border: 2px solid #3498db;
  /* Colore di evidenziazione */
  background-color: #eaf4ff;
  /* Colore di sfondo per evidenziare */
}

footer {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

footer button {
  padding: 0.8rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

footer button:hover {
  background-color: #2980b9;
}
</style>







