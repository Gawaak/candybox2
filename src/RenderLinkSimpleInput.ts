import {RenderLink} from "./RenderLink";
import {CallbackCollection} from "./CallbackCollection";
// @ts-ignore
import $ from "jquery"

export class RenderLinkSimpleInput extends RenderLink{
    private element: string;
    private callbackCollection: CallbackCollection;
    private defaultValue: string | null;
    private hasFocus: boolean;
    
    // Constructor
    constructor(element: string, callbackCollection: CallbackCollection, defaultValue: string | null, hasFocus: boolean){
        super();
        this.element = element;
        this.callbackCollection = callbackCollection;
        this.defaultValue = defaultValue;
        this.hasFocus = hasFocus;
    }
    
    // Public methods
    public run(): void{
        // We copy the render link so we can use it in the functions below
        var renderLink: RenderLinkSimpleInput = this;
        
        // If the default value isn't null
        if(this.defaultValue != null){
            // We set the default value
            $(this.element).val(this.defaultValue);
        }
        
        // We set the change event
        $(this.element).change(function(){
            // We fire the callback collection
            renderLink.callbackCollection.fire();
            
            return false; // Avoid event bubbling
        });
        
        if(this.hasFocus) $(this.element).focus();
    }
}