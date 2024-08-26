///<reference path="EqItem.ts"/>

import {EqItem} from "./EqItem";
import {Player} from "./Player";
import {Quest} from "./Quest";
import {QuestEntity} from "./QuestEntity";
import {QuestEntityDamageReason} from "./QuestEntityDamageReason";

export class EnchantedKnightBodyArmour extends EqItem{
    // Constructor
    constructor(){
        super("eqItemBodyArmoursEnchantedKnightBodyArmour",
              "eqItemBodyArmoursEnchantedKnightBodyArmourName",
              "eqItemBodyArmoursEnchantedKnightBodyArmourDescription",
              "eqItems/bodyArmours/enchantedKnightBodyArmour");
    }
    
    // Special ability
    public getSpecialAbility(): string{
        return "Dam. taken reduced by 80%, dam. inflicted divided by 2 (enchanted knight body armour)";
    }
    
    // hit()
    public hit(_player: Player, _quest: Quest, _questEntity: QuestEntity, damage: number, _reason: QuestEntityDamageReason): number{
        return Math.ceil(damage/2);
    }
    
    // inflictDamage()
    public inflictDamage(_player: Player, _quest: Quest, damage: number, _reason: QuestEntityDamageReason): number{
        return Math.ceil(damage - damage*80/100);
    }
}