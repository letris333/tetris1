import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class NextBlock extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./NextBlock/costumes/1.png", { x: 45, y: 45 }),
      new Costume("2", "./NextBlock/costumes/2.png", { x: 45, y: 45 }),
      new Costume("3", "./NextBlock/costumes/3.png", { x: 45, y: 45 }),
      new Costume("4", "./NextBlock/costumes/4.png", { x: 45, y: 45 }),
      new Costume("5", "./NextBlock/costumes/5.png", { x: 45, y: 45 }),
      new Costume("6", "./NextBlock/costumes/6.png", { x: 91, y: 45 }),
      new Costume("7", "./NextBlock/costumes/7.png", { x: 91, y: 45 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "change costume" },
        this.whenIReceiveChangeCostume
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.goto(175, 84);
    this.costume = this.random(1, 7);
  }

  *whenIReceiveChangeCostume() {
    this.visible = true;
    this.goto(175, 84);
    this.costume = this.random(1, 7);
  }

  *whengreaterthan() {
    this.visible = false;
  }

  *whenGreenFlagClicked2() {
    this.visible = true;
  }
}
