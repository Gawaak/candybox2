///<reference path="EqItem.ts"/>

import {EqItem} from "./EqItem";
import {Player} from "./Player";
import {Quest} from "./Quest";
import {QuestEntityDamageReason} from "./QuestEntityDamageReason";

export class KnightBodyArmour extends EqItem{
    // Constructor
    constructor(){
        super("eqItemBodyArmoursKnightBodyArmour",
              "eqItemBodyArmoursKnightBodyArmourName",
              "eqItemBodyArmoursKnightBodyArmourDescription",
              "eqItems/bodyArmours/knightBodyArmour");
    }
    
    // Special ability
    public getSpecialAbility(): string{
        return "Damage taken reduced by 30% (knight body armour)";
    }
    
    // inflictDamage()
    public inflictDamage(_player: Player, _quest: Quest, damage: number, _reason: QuestEntityDamageReason): number{
        return Math.ceil(damage - damage*30/100);
    }
}