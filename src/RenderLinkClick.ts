import {RenderLink} from "./RenderLink";
import {CallbackCollection} from "./CallbackCollection";
// @ts-ignore
import $ from "jquery"

export class RenderLinkClick extends RenderLink{
    private element: string;
    private callbackCollection: CallbackCollection;
    
    // Constructor
    constructor(element: string, callbackCollection: CallbackCollection){
        super();
        this.element = element;
        this.callbackCollection = callbackCollection;
    }
    
    // Public methods
    public run(): void{
        // We copy the render link so we can use it in the functions below
        var renderLink: RenderLinkClick = this;
        
        $(this.element).mouseup(function(){
            renderLink.callbackCollection.fire();
            return false; // Avoid event bubbling
        });
    }
}