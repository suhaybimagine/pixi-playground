import React from "react";
import ReactDOM from "react-dom";
import PIXI, { loader, Container } from "pixi.js";

import TWEEN from "@tweenjs/tween.js";
import styles from "./styles/box.css";
import { Application, Sprite, Graphics } from "pixi.js/lib/core";
import * as interaction from "./Interaction";
import Box from "./Box";
import { Point, Rectangle } from "pixi.js/lib/core/math";
import { print } from "util";

let app = new Application({antialias: true});
let root = new Container()
app.stage.addChild(root);

$("#canvas-container").append(app.view);

app.renderer.backgroundColor = 0xffffee;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.view.style.width = "100%";
app.renderer.view.style.height = "100%";
app.renderer.roundPixels = true;
window.addEventListener("resize", function () {
    app.renderer.resize(window.innerWidth, window.innerHeight);
})

let resourcesStore = {};
loader.add('leaves', 'img/leaves.png').load(function (loader, resources) {

    resourcesStore = resources;
    app.ticker.add(function () {
        TWEEN.update();
    });

    initDiagram();
});

function initDiagram() {
    
    // This creates a texture from a 'bunny.png' image.
    var leaves = new Sprite(resourcesStore.leaves.texture);

    // Setup the position of the bunny
    leaves.x = app.renderer.width / 2;
    leaves.y = app.renderer.height / 2;

    // Rotate around the center
    leaves.anchor.x = 0.5;
    leaves.anchor.y = 0.5;
    leaves.width = 50;
    leaves.height = 50;

    root.addChild(leaves);

    for(var i =0; i < 30; i++) {

        let box = new Box();
        box.x = Math.random() * window.innerWidth;
        box.y = Math.random() * window.innerHeight;

        root.addChild(box);
    }
    
    $("#canvas-container").on('mousewheel', function(e){
        let sc = root.scale;
        let delY = e.originalEvent.deltaY;

        let tsc = sc.x + delY * 0.001;
        if(tsc <= 5.0 && tsc >= 1.0) {

            let locP = root.toLocal(new Point(e.clientX, e.clientY))
            let scX = sc.x;
            let scY = sc.y;

            sc.x = tsc;
            sc.y = tsc;

            root.position.x -= (tsc - scX) * locP.x;
            root.position.y -= (tsc - scY) * locP.y;
        }
    });

    $("#canvas-container").on('mousedown', function(e){
        this.down = true;
        this.prevX = e.clientX;
        this.prevY = e.clientY;
    });

    $("#canvas-container").on('mouseup', function(e){
        this.down = false;
    });

    $("#canvas-container").on('mouseout', function(e){
        this.down = false;
    });

    $("#canvas-container").on('mousemove', function(e){

        if(this.down) {
            
            let dX = e.clientX - this.prevX;
            let dY = e.clientY - this.prevY;

            let tx = root.position.x + dX;
            let ty = root.position.y + dY;

            if (tx <= Math.abs(window.innerWidth - root.width)) {
                root.position.x = tx;
            }

            if (ty <= Math.abs(window.innerHeight - root.height)) {
                root.position.y = ty;
            }
            
            this.prevX = e.clientX;
            this.prevY = e.clientY;
        }
    });
}

