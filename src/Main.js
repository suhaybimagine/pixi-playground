import React from "react";
import ReactDOM from "react-dom";
import PIXI, { loader } from "pixi.js";

import TWEEN from "@tweenjs/tween.js";
import styles from "./styles/box.css";
import { Application, Sprite, Graphics } from "pixi.js/lib/core";
import * as interaction from "./Interaction";
import Box from "./Box";
import { Point, Rectangle } from "pixi.js/lib/core/math";

let app = new Application({antialias: true});
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

    // Add the bunny to the scene we are building.
    app.stage.addChild(leaves);

    /*
new TWEEN.Tween(graph.position)
.to({ x: 800, y: 600 }, 6000)
.easing(TWEEN.Easing.Quadratic.Out)
.start();*/

    for(var i =0; i < 30; i++) {

        let box = new Box();
        box.x = Math.random() * window.innerWidth;
        box.y = Math.random() * window.innerHeight;

        app.stage.addChild(box);
    }
    
    $("#canvas-container").on('mousewheel', function(e){
        let sc = app.stage.scale;
        let delY = e.originalEvent.deltaY;

        let tsc = sc.x + delY * 0.001;
        if(tsc <= 5.0 && tsc >= 0.05) {
            
            sc.x = tsc;
            sc.y = tsc;
        }
    });
}

