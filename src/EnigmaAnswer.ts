// We can't use this class directly, we have to use a daughter class
import {RenderArea} from "./RenderArea.ts";

export class EnigmaAnswer{
    // Constructor
    constructor(){
        
    }
    
    // Public methods
    public isRight(_answer: string): boolean{
        return false;
    }

    public getRandom(): string {
        return ""
    }

    public resetRandom(): void {

    }

    public display(_renderArea: RenderArea, _x: number, _y: number, _correctClass: string | null, _wrongClass: string | null): void {

    }
}
