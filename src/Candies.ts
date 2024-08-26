///<reference path="StatusBarResource.ts"/>

import {Game} from "./Game";
import {StatusBarResource} from "./StatusBarResource";
const formatter = Intl.NumberFormat('en', { notation: 'compact' })

export class Candies extends StatusBarResource{
    // Constructor
    constructor(game: Game, savingPrefix: string){
        super(game, savingPrefix);
    }
    
    // Public methods
    public getCurrentAsString(): string{
        return `>o< × ${formatter.format(this.getCurrent())}`
    }
}