///<reference path="QuestEntity.ts"/>

import {QuestEntity} from "./QuestEntity";
import {Quest} from "./Quest";
import {Pos} from "./Pos";
import {Naming} from "./Naming";
import {RenderArea} from "./RenderArea";
import {CollisionBoxCollection} from "./CollisionBoxCollection";
import {CollisionBox} from "./CollisionBox";
import {QuestEntityMovement} from "./QuestEntityMovement";
import {Database} from "./Database";
import {RenderTransparency} from "./RenderTransparency";
import {QuestLogMessage} from "./QuestLogMessage";
import {QuestItemFound} from "./QuestItemFound";

export class Teapot extends QuestEntity{
    // Constructor
    constructor(quest: Quest, pos: Pos){
        super(); this.init(quest, pos,
              new Naming("A teapot", "a teapot"),
              new RenderArea(19, 6),
              new Pos(0, 0),
              new CollisionBoxCollection(new CollisionBox(this, new Pos(0, 1), new Pos(3, 1)),
                                         new CollisionBox(this, new Pos(6, 1), new Pos(8, 1)),
                                         new CollisionBox(this, new Pos(1, 2), new Pos(18, 1)),
                                         new CollisionBox(this, new Pos(2, 3), new Pos(17, 1)),
                                         new CollisionBox(this, new Pos(3, 4), new Pos(16, 1)),
                                         new CollisionBox(this, new Pos(5, 5), new Pos(12, 1))
                                        ),
              new QuestEntityMovement()
             );
        
        // Set gravity
        this.getQuestEntityMovement().setGravity(true);
        this.getQuestEntityMovement().setWormsLike(true);
        
        // Set destructible
        this.setDestructible(true);
        this.setMaxHp(1000000);
        this.setHp(1000000);
        
        // Set the ascii art and the transparent character
        this.getRenderArea().drawArray(Database.getAscii("places/quests/fortress/teapot"));
        this.setTransparency(new RenderTransparency(" ", "%"));
    }
    
    // update()
    public update(): void{
        super.update();
        
        // We heal ourselves if the player is too far on the left
        if(this.getQuest().getGame().getPlayer().getGlobalPosition().x < this.getGlobalPosition().x - 50) this.heal(50);
    }
    
    // willDie()
    public willDie(): void{
        // Candies
        this.getQuest().getGame().getQuestLog().addMessage(new QuestLogMessage(this.getDeathMessage()));
        // The spoon
        this.getQuest().foundGridOrEqItem(new QuestItemFound(this.getQuest(), "eqItemWeaponGiantSpoon", "You found a giant spoon inside the teapot.", "You gain a giant spoon."));
    }
}