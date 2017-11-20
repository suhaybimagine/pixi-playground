import { Graphics, Container } from "pixi.js/lib/core";
import * as interaction from "./Interaction";


export default class Box extends Container {

    constructor(){
        super();
        this.graph = new Graphics();
        this.shadow = new Graphics();

        this.addChild(this.shadow);
        this.addChild(this.graph);
        this.drawBox(200, 100);
        interaction.makeDraggable(this);
    }

    drawBox(w, h){

        let graph = this.graph;

        graph.clear();
        graph.lineStyle(1, 0xcccccc, 0.6);
        graph.beginFill(0xffffff);
        graph.drawRoundedRect(0, 0, w, h, 10);
        graph.endFill();

        let shadow = this.shadow;
        shadow.clear();
        shadow.beginFill(0x999999, 0.4);
        shadow.drawRoundedRect(3, 3, w, h, 10);
        shadow.endFill();
    }

    setWidth = (w) => {
        this.drawBox(w, this.height);
    }

    setHeight = (h) => {
        this.drawBox(this.width, h);
    }

    setSize = (w, h) => {
        this.drawBox(w, h);
    } 
}