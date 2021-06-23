import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Block extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Block/costumes/1.png", { x: 45, y: 45 }),
      new Costume("2", "./Block/costumes/2.png", { x: 45, y: 45 }),
      new Costume("3", "./Block/costumes/3.png", { x: 45, y: 45 }),
      new Costume("4", "./Block/costumes/4.png", { x: 45, y: 45 }),
      new Costume("5", "./Block/costumes/5.png", { x: 45, y: 45 }),
      new Costume("6", "./Block/costumes/6.png", { x: 91, y: 45 }),
      new Costume("7", "./Block/costumes/7.png", { x: 91, y: 45 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "left arrow" },
        this.whenKeyLeftArrowPressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "down arrow" },
        this.whenKeyDownArrowPressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "up arrow" },
        this.whenKeyUpArrowPressed
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "right arrow" },
        this.whenKeyRightArrowPressed
      )
    ];

    this.vars.speed = 0.8;
    this.vars.reachedBottom = 0;
  }

  *whenGreenFlagClicked() {
    this.stage.vars.gameOn = 0;
    this.visible = false;
    while (!(this.stage.vars.gameOn == 1)) {
      yield;
    }
    this.visible = true;
    while (true) {
      this.goto(0, this.stage.vars.yTop - this.stage.vars.step / 2);
      this.vars.reachedBottom = 0;
      this.costume = this.sprites["NextBlock"].costume.name;
      this.broadcast("change costume");
      this.vars.speed = 0.8;
      while (!(this.vars.reachedBottom == 1)) {
        yield* this.wait(this.vars.speed);
        this.y += 0 - this.stage.vars.step;
        if (
          this.touching(this.sprites[undefined].andClones()) ||
          this.touching(Color.rgb(230, 230, 230))
        ) {
          this.vars.reachedBottom = 1;
          this.y += this.stage.vars.step;
          if (this.y > this.stage.vars.yTop - this.stage.vars.step) {
            this.stage.vars.gameOn = 0;
            return;
          }
          yield* this.broadcastAndWait("take cell");
          this.broadcast("remove full rows");
        }
        yield;
      }
      yield;
    }
  }

  *whenKeyLeftArrowPressed() {
    if (this.stage.vars.gameOn == 1) {
      if (this.vars.reachedBottom == 0) {
        this.x += 0 - this.stage.vars.step;
        if (
          this.touching(Color.rgb(102, 102, 102)) ||
          this.touching(Color.rgb(230, 230, 230))
        ) {
          this.x += this.stage.vars.step;
        }
      }
    }
  }

  *whenKeyDownArrowPressed() {
    if (this.stage.vars.gameOn == 1) {
      this.vars.speed = 0;
    }
  }

  *whengreaterthan() {
    this.visible = false;
  }

  *whenKeyUpArrowPressed() {
    if (this.stage.vars.gameOn == 1) {
      if (this.vars.reachedBottom == 0) {
        this.direction += 90;
        if (
          this.touching(Color.rgb(102, 102, 102)) ||
          this.touching(Color.rgb(230, 230, 230))
        ) {
          this.direction -= 90;
        }
      }
    }
  }

  *whenKeyRightArrowPressed() {
    if (this.stage.vars.gameOn == 1) {
      if (this.vars.reachedBottom == 0) {
        this.x += this.stage.vars.step;
        if (
          this.touching(Color.rgb(102, 102, 102)) ||
          this.touching(Color.rgb(230, 230, 230))
        ) {
          this.x += 0 - this.stage.vars.step;
        }
      }
    }
  }
}
