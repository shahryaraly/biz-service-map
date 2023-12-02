export class ElementProps {
    top: string = "0PX";
    left: string = "0PX";
    width: string = "100px";
    height: string = "100px";
    mouseClickX?: number = 0;
    mouseClickY?: number = 0;
    zIndex?: number = 0;
    transform?: string = "";
    transformOposite?: string = "";
    centerX: number = 0;
    centerY: number = 0;
    positionX: number = 0;
    positionY: number = 0;
    topY?: number = 0;
    leftX?: number = 0;
    pathString?: string = "";


    constructor(y: string, x: string, width: string, height: string) {
        this.top = y;
        this.left = x;
        this.width = width;
        this.height = height;
    }

    getPositionFromPx = (locInPx: string): number => {
        return parseInt(locInPx.substring(0, locInPx.toUpperCase().indexOf("PX")));
    }

    getPathString = (fromX?: number, fromY?: number, toX?: number, toY?: number) => {
        fromX = fromX ? fromX : 0;
        fromY = fromY ? fromY : 0;
        toX = toX ? toX : 0;
        toY = toY ? toY : 0;
        return "M" +
            (fromX) + "," + (fromY) + " " +
            "C" +
            (fromX) + "," + (fromY) + " " +
            (toX) + "," + (toY) + " " +
            (toX) + "," + (toY);
    }
}