///<reference path="QuestEntityWeapon.ts"/>

import {Random} from "./Random";
import {QuestEntityWeapon} from "./QuestEntityWeapon";

export class Bludgeon extends QuestEntityWeapon{
    // Public methods
    public getRealDamage(): number{
        return Random.between(15, 25);
    }
    
    public getRealDamageText(): string{
        return "15-25";
    }
}