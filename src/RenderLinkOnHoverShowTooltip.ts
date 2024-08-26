import {RenderLink} from "./RenderLink";
// @ts-ignore
import $ from "jquery"

export class RenderLinkOnHoverShowTooltip extends RenderLink{
    // Classes
    private classHover: string;
    private classTooltip: string;
    
    // Constructor
    constructor(classHover: string, classTooltip: string){
        super();
        this.classHover = classHover;
        this.classTooltip = classTooltip;
    }
    
    // Public methods
    public run(): void{
        // We copy the render link so we can use it in the functions below
        var renderLink: RenderLinkOnHoverShowTooltip = this;
        
        // If we hover on the classHover elements
        $(this.classHover).hover(function(){
            // We show the classTooltip tooltips
            $(renderLink.classTooltip).css({
                "display": "block"
            });
            
            // Avoid event bubbling
            return false;
        });
        
        // Else, if we're out of the classHover elements
        $(this.classHover).mouseout(function(){
            // We stop showing the classTooltip tooltips
            $(renderLink.classTooltip).css({
                display: "none"
            });
            
            // Avoid event bubbling
            return false;
        });
        
        // If the mouse moves, we put the classTooltip elements under the mouse
        $(this.classHover).on('mousemove', function(e: any){
            $(renderLink.classTooltip).css({
                left: e.pageX - $(document).scrollLeft(),
                top: e.pageY - $(document).scrollTop()
            });
        });
    }
}