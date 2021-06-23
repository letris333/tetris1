import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Ruler extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("ruler", "./Ruler/costumes/ruler.png", { x: 211, y: 6 })
    ];

    this.sounds = [new Sound("pop", "./Ruler/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "remove full rows" },
        this.whenIReceiveRemoveFullRows
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Change Score BOIS" },
        this.whenIReceiveChangeScoreBois
      )
    ];

    this.vars.score = 73;
    this.vars.fullRow = 0;

    this.watchers.score = new Watcher({
      label: "Ruler: score",
      style: "large",
      visible: false,
      value: () => this.vars.score,
      x: 266,
      y: 143
    });
  }

  *whenIReceiveRemoveFullRows() {
    this.vars.fullRow = 0;
    this.goto(0, this.sprites["Block"].y + 1.5 * this.stage.vars.step);
    for (let i = 0; i < 4; i++) {
      this.visible = true;
      if (!this.touching(Color.rgb(255, 255, 255)) && this.y > -163) {
        this.vars.fullRow += 1;
        yield* this.broadcastAndWait("remove this row");
      }
      this.visible = false;
      this.y += 0 - this.stage.vars.step;
      yield;
    }
    if (this.vars.fullRow == 1) {
      this.vars.score += 100;
    }
    if (this.vars.fullRow == 2) {
      this.vars.score += 300;
    }
    if (this.vars.fullRow == 3) {
      this.vars.score += 500;
    }
    if (this.vars.fullRow == 4) {
      this.vars.score += 800;
    }
  }

  *whenGreenFlagClicked() {
    this.vars.score = 0;
    this.visible = false;
  }

  *whenGreenFlagClicked2() {
    this.stage.watchers.Highscore.visible = true;
    this.watchers.score.visible = true;
    while (true) {
      if (this.vars.score > this.stage.vars.Highscore) {
        this.stage.vars.Highscore = this.vars.score;
      }
      yield;
    }
  }

  *whenIReceiveChangeScoreBois() {
    this.vars.score += this.random(10, 50);
  }

  *whengreaterthan() {
    this.visible = false;
    this.watchers.score.visible = false;
    this.stage.watchers.Highscore.visible = false;
  }
}
