import {TheSea} from "./TheSea";

export class TheSeaPattern{
    // The sea
    private theSea: TheSea;
    
    // Initial distance
    private initialDistance: number;
    
    // Constructor
    constructor(theSea: TheSea, initialDistance: number){
        this.theSea = theSea;
        this.initialDistance = initialDistance;
    }
    
    // Public methods
    public isPatternDone(): boolean{
        return false;
    }
    
    public run(_x1: number, _x2: number): void{
        
    }
    
    // Public getters
    public getInitialDistance(): number{
        return this.initialDistance;
    }
    
    public getTheSea(): TheSea{
        return this.theSea;
    }
}
