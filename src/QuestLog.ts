import {QuestLogMessage} from "./QuestLogMessage";
import {RenderArea} from "./RenderArea";
import {Pos} from "./Pos";

export class QuestLog{
    // Array of messages contained in the quest log
    private messages: QuestLogMessage[] = [];
    
    // Constructor
    constructor(){

    }
    
    // Public method
    public addDelimiter(): void{
    }
    
    public addMessage(message: QuestLogMessage): void{
        // We add the message
        this.messages.push(message);
        
        // We check the log size
        this.checkLogSize();
    }
    
    public draw(renderArea: RenderArea, pos: Pos): void{
        // We draw the messages
        for(var i = 0; i < this.messages.length; i++){
            this.messages[i].draw(renderArea, new Pos(pos.x, pos.y + this.messages.length-1-i), 98);
        }
    }
    
    // Private methods
    private checkLogSize(): void{
        if(this.messages.length > 10){
            this.messages.splice(0, this.messages.length - 10);
        }
    }
}