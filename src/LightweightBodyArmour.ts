///<reference path="EqItem.ts"/>

import {EqItem} from "./EqItem";
import {Player} from "./Player";
import {Quest} from "./Quest";
import {QuestEntityDamageReason} from "./QuestEntityDamageReason";

export class LightweightBodyArmour extends EqItem{
    // Constructor
    constructor(){
        super("eqItemBodyArmoursLightweightBodyArmour",
              "eqItemBodyArmoursLightweightBodyArmourName",
              "eqItemBodyArmoursLightweightBodyArmourDescription",
              "eqItems/bodyArmours/lightweightBodyArmour");
    }
    
    // Special ability
    public getSpecialAbility(): string{
        return "Damage taken reduced by 15% (lightweight body armour)";
    }
    
    // inflictDamage()
    public inflictDamage(_player: Player, _quest: Quest, damage: number, _reason: QuestEntityDamageReason): number{
        return Math.ceil(damage - damage*15/100);
    }
}