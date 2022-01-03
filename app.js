function getRanNum(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      myHealth: 100,
      monsterHealth: 100,
      round: 0,
      winner: "",
      battelLog: [],
    };
  },
  methods: {
    attack() {
      this.round++;
      let val = getRanNum(6, 10);
      this.monsterHealth -= val;
      this.addBattleLog("You", "Attack", val);
      this.attackBack(5, 11);
    },
    attackBack(min, max) {
      let val = getRanNum(min, max);
      this.myHealth -= val;
      this.addBattleLog("Monster", "Attack", val);
    },
    speacialAttack() {
      this.round++;
      let val = getRanNum(10, 20);
      this.monsterHealth -= val;
      this.addBattleLog("You", "Speacial Attack", val);
      this.attackBack(10, 25);
    },
    heal() {
      this.round++;
      let healNum = getRanNum(5, 10);
      if (this.myHealth + healNum < 100) {
        this.myHealth += healNum;
      } else {
        this.myHealth = 100;
      }
      this.addBattleLog("You", "Heal", healNum);
      this.healMonster();
    },
    healMonster() {
      let healNum = getRanNum(4, 8);
      if (this.monsterHealth + healNum < 100) {
        this.monsterHealth += healNum;
      } else {
        this.monsterHealth = 100;
      }
      this.addBattleLog("Monster", "Heal", healNum);
    },
    restart() {
      this.myHealth = 100;
      this.monsterHealth = 100;
      this.round = 0;
      this.winner = "";
      this.battelLog = [];
    },
    surrender() {
      this.winner = "monster";
    },
    addBattleLog(who, what, value) {
      this.battelLog.unshift({
        who,
        what,
        value,
      });
    },
  },
  computed: {
    monsterHealthBar() {
      if (this.monsterHealth < 0) return { width: "0%" };
      return { width: this.monsterHealth + "%" };
    },
    myHealthBar() {
      if (this.myHealth < 0) return { width: "0%" };
      return { width: this.myHealth + "%" };
    },
    speacialAttackActive() {
      return this.round % 3 !== 0;
    },
  },
  watch: {
    myHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.myHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
});
app.mount("#game");
