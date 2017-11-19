import React from "react";
import ReactDOM from "react-dom";
import PIXI, { loader } from "pixi.js";

import TWEEN from "@tweenjs/tween.js";
import styles from "./styles/box.css";
import { Application, Sprite, Graphics } from "pixi.js/lib/core";

class Root extends React.Component {

    render() {
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById("app"));


let app = new Application();

document.body.appendChild(app.view);

loader.add('leaves', 'img/leaves.png').load(function (loader, resources) {
    
    // This creates a texture from a 'bunny.png' image.
    var bunny = new Sprite(resources.leaves.texture);

    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // Add the bunny to the scene we are building.
    app.stage.addChild(bunny);

    let graph = new Graphics();
    graph.beginFill(0xff0000);
    graph.drawCircle(0, 0, 40);
    graph.endFill();

    graph.x = 200;
    graph.y = 200;

    app.stage.addChild(graph);

    // Listen for frame updates
    app.ticker.add(function () {
        // each frame we spin the bunny around a bit
        bunny.rotation += 0.01;
    });


});


