import { Point } from "pixi.js/lib/core/math";

export function makeDraggable(obj) {

    obj.interactive = true;
    obj.cursor = "pointer";
    obj.on('mousedown', drag_downHandler);
    obj.on('mousemove', drag_moveHandler);
    obj.on('mouseup', drag_upHandler);
    obj.on('mouseupoutside', drag_upHandler);
}

export function makeIndraggable(obj) {

    obj.interactive = false;
    obj.off('mousedown', drag_downHandler);
    obj.off('mousemove', drag_moveHandler);
    obj.off('mouseup', drag_upHandler);
    obj.off('mouseupoutside', drag_upHandler);
}

function drag_downHandler(e) {
    e.stopPropagation();
    $("#canvas-container").css("pointer-events", "none");

    this.dragging = true;
    this.downPoint = e.data.getLocalPosition(this);
}

function drag_upHandler(e) {

    $("#canvas-container").css("pointer-events", "auto");
    this.dragging = false;
    delete this.downPoint;
}

function drag_moveHandler(e) {
    
    if (this.dragging) {

        let parent = this.parent;
        let sc = parent.scale;
        parent.setChildIndex(this, parent.children.length - 1);

        let loc = this.downPoint;
        let gbl = e.data.getLocalPosition(parent);
        let prp = parent.position;

        let pos = new Point(
            gbl.x - loc.x, 
            gbl.y - loc.y
        );
        this.position = pos;
    }
}
