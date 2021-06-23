import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Thumbnail extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("", "./Thumbnail/costumes/.svg", {
        x: 238.5060077314057,
        y: 187.53000622043018
      })
    ];

    this.sounds = [new Sound("pop", "./Thumbnail/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *smoothGlide(x, y, speed2) {
    while (
      !(
        Math.round(this.x) == Math.round(x) &&
        Math.round(this.y) == Math.round(y)
      )
    ) {
      this.effects.ghost += -15;
      this.x += (Math.round(x) - Math.round(this.x)) / speed2;
      this.y += (Math.round(y) - Math.round(this.y)) / speed2;
      yield;
    }
    this.goto(x, y);
  }

  *whengreaterthan() {
    yield* this.smoothGlide(0, 0, 6);
  }

  *whenGreenFlagClicked() {
    this.goto(-467, 0);
    this.effects.ghost = 100;
    while (true) {
      this.stage.vars.timer = this.timer;
      yield;
    }
  }
}
