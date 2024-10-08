///<reference path="EqItem.ts"/>

import {EqItem} from "./EqItem";

export class OctopusKingCrown extends EqItem{
    // Constructor
    constructor(){
        super("eqItemHatOctopusKingCrown",
              "eqItemHatOctopusKingCrownName",
              "eqItemHatOctopusKingCrownDescription",
              "eqItems/hats/octopusKingCrown");
    }
    
    // Special ability
    public getSpecialAbility(): string{
        return "You are a lot more confident.";
    }
}