///<reference path="RenderLink.ts"/>

import {RenderLink} from "./RenderLink";
// @ts-ignore
import $ from "jquery"

export class RenderLinkOver extends RenderLink{
    private firstElement: string;
    private secondElement: string;
    
    // Constructor
    constructor(firstElement: string, secondElement: string){
        super();
        this.firstElement = firstElement;
        this.secondElement = secondElement;
    }
    
    // Public methods
    public run(): void{
        // We copy the render link so we can use it in the functions below
        var renderLink: RenderLinkOver = this;
        
        $(this.firstElement).mouseenter(function(){
            $(renderLink.secondElement).show();
            
            return false; // Avoid event bubbling
        })
        .mouseleave(function(){
            $(renderLink.secondElement).hide();
            
            return false; // Avoid event bubbling
        });
        
        /*
        $(this.firstElement).hover(
            function(){
                $(renderLink.secondElement).css('visibility', 'visible');
            },
            function(){
                $(renderLink.secondElement).css('visibility', 'hidden');
            }
        );
        */
    }
}