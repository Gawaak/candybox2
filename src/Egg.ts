///<reference path="QuestEntity.ts"/>

import {QuestEntity} from "./QuestEntity";
import {CallbackCollection} from "./CallbackCollection";
import {Quest} from "./Quest";
import {Pos} from "./Pos";
import {Naming} from "./Naming";
import {RenderArea} from "./RenderArea";
import {CollisionBoxCollection} from "./CollisionBoxCollection";
import {CollisionBox} from "./CollisionBox";
import {QuestEntityMovement} from "./QuestEntityMovement";
import {Database} from "./Database";
import {QuestLogMessage} from "./QuestLogMessage";

export class Egg extends QuestEntity{
    // The callback we need to call when we die
    private callbackWhenDying: CallbackCollection;
    
    // Constructor
    constructor(quest: Quest, globalPosition: Pos, callbackWhenDying: CallbackCollection){
        // Call the mother constructor
        super()
        this.init(quest,
              globalPosition,
              new Naming("An egg", "an egg"),
              new RenderArea(2, 1),
              new Pos(0, 0),
              new CollisionBoxCollection(new CollisionBox(this, new Pos(0, 0), new Pos(2, 1))),
              new QuestEntityMovement()
             );
        
        // Set the callback from parameter
        this.callbackWhenDying = callbackWhenDying;
        
        // Set gravity
        this.getQuestEntityMovement().setGravity(true);
        
        // Set destructible
        this.setDestructible(true);
        this.setMaxHp(4);
        this.setHp(4);
        
        // Set the ascii art
        this.getRenderArea().drawArray(Database.getAscii("places/quests/castle/room3/egg"));
    }
    
    // willDie()
    public willDie(): void{
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage("An egg was destroyed."));
        this.callbackWhenDying.fire();
    }
}