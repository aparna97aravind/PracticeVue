function randomValue(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playersHealth: 100,
      monstersHealth: 100,
      round: 0,
      winner: null,
      logMessage : []
    };
  },
  computed: {
    monstersHealthbarWidth() {
      if(this.monstersHealth < 0)
      {
        return {width: '0%'};
      }
      return { width: this.monstersHealth + "%" };
    },
    playersHealthbarWidth() {
      if(this.playersHealth < 0)
      {
        return {width: '0%'};
      }
      return { width: this.playersHealth + "%" };
    },
    specialAttackTurn() {
      return this.round % 3 !== 0;
    },
  },
  watch: {
    playersHealth(value) {
      if (value <= 0 && this.monstersHealth <= 0) {
        this.winner = "draw";
        console.log(value, this.monstersHealth);
      } else if (value <= 0) {
        this.winner = "Monster";
      }
    },
    monstersHealth(value) {
      if (value <= 0 && this.playersHealth <= 0) {
        this.winner = "draw";
        console.log(value, this.playersHealth);
      } else if (value <= 0) {
        this.winner = "Player";
      }
    },
  },
  methods: {
    attackMonster() {
      this.round++;
      const attackvalue = randomValue(12, 5);
      this.monstersHealth = this.monstersHealth - attackvalue;
      this.addLogMessage("Player","Attacks By",attackvalue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackvalue = randomValue(15, 8);
      this.playersHealth = this.playersHealth - attackvalue;
      this.addLogMessage("Monster","Attacks By",attackvalue);
    },
    specialAttackMonster() {
      this.round++;
      attackvalue = randomValue(25, 10);
      this.monstersHealth = this.monstersHealth - attackvalue;
      this.addLogMessage("Player","Attacks By",attackvalue);
      this.attackPlayer();
    },
    healPlayer() {
      this.round++;
      const healValue = randomValue(20, 8);
      if (this.playersHealth + healValue > 100) {
        this.playersHealth = 100;
      } else {
        this.playersHealth += healValue;
      }
      this.addLogMessage("Player","Heals by",attackvalue);
      this.attackPlayer();
    },
    surrender() {
      this.winner = 'Monster';
      this.addLogMessage("Player","Surrendered","And lost");
    },
    newGame() {
      this.playersHealth =  100;
      this.monstersHealth =  100;
      this.round = 0;
      this.winner = null;
      this.logMessage = [];
    },
    addLogMessage(turn, action, value){
      this.logMessage.unshift({
        actionBy: turn,
        action : action,
        actionValue : value
      })

    }
  },
});
app.mount("#game");
