import { getAllPoker } from "./fs"
import { cardType, cardValue, parseCards } from "./util"

export class Card {
    public name: string
    public score: number
    public type: string
    public value: string
    public typeIndex: number
    public valIndex: number

    constructor(type: string, value: string, score: number) {
        this.name = type + value
        this.type = type
        this.value = value
        this.score = score
        this.typeIndex = cardType.indexOf(type)
        this.valIndex = cardValue.indexOf(value)
    }
}

export default class Poker {
    public cards: Card[][][] = []
    private index = 0

    constructor() {
        this.initPoker()
    }

    private initPoker() {
        const allCards = getAllPoker()
        for (const cds of allCards) {
            const parseArr = parseCards(cds)
            if (!parseArr.length) { // 解析失败，手牌不正确
                // errorCard(cds.join(';'))
                continue
            }
            this.cards.push(parseArr)
        }
    }

    deal() {
        if (this.index < this.cards.length) {
            const result = this.cards[this.index]
            this.index++
            return result
        }
        return null
    }
}
