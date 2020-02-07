
describe('game of life tests', () => {
    it('should say uh oh', () => {
        let cell = new Cell();
        expect(() => { cell.step(null) }).toThrow(new Error("uh oh, spaghetti-o's"))
    })
})