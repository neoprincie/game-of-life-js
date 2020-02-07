class Cell {
    constructor(x,y,element) {
        this.x = x;
        this.y = y;
        this.element = element;
        this.livesNextFrame = false;
    }

    step = (grid) => {
        throw new Error("uh oh, spaghetti-o's")
    }

    apply = () => {
    }
}