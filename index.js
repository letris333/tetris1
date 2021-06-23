import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Cell from "./Cell/Cell.js";
import Block from "./Block/Block.js";
import NextBlock from "./NextBlock/NextBlock.js";
import Thumbnail from "./Thumbnail/Thumbnail.js";
import Ruler from "./Ruler/Ruler.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Cell: new Cell({
    x: -104,
    y: -180,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  Block: new Block({
    x: 92,
    y: 56.5,
    direction: -90,
    costumeNumber: 5,
    size: 100,
    visible: false,
    layerOrder: 5
  }),
  NextBlock: new NextBlock({
    x: 175,
    y: 84,
    direction: 90,
    costumeNumber: 3,
    size: 100,
    visible: false,
    layerOrder: 4
  }),
  Thumbnail: new Thumbnail({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 3
  }),
  Ruler: new Ruler({
    x: 0,
    y: -162,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 2
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
