import React from "react";
import ReactDOM from "react-dom";

import Paper from "paper";
import TWEEN from "@tweenjs/tween.js";
import styles from "./styles/box.css";

class Root extends React.Component {

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <div className={styles.box}></div>
            </div>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById("app"));

Paper.install(window);
window.onload = function () {

    Paper.setup('main-board');
    Paper.view.on("frame", function (e) {
        TWEEN.update();
    });

    initCanvas();
}

function initCanvas() {

    console.log("PaperJS canvas is up and running !.");

    let stick = new Paper.Path.Rectangle(new Rectangle(0, 0, 100, 4));
    stick.fillColor = "red";
    stick.position = new Point(100, 300);

    stick.on("frame", function(e){
        this.rotation += 3;
    });
}