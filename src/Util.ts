/** Utility 
 * 
 * @author Alex Malotky
 */

type Attribute = string|number;
type Content = HTMLElement|string|number|Content[];

/** Create Element
 * 
 * @param {string} name 
 * @param {object} attributes 
 * @param {Array<any>} children 
 * @returns {HTMLElement}
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(name:K, attributes?:Record<string, Attribute>|Content, ...children:Array<Content>):HTMLElementTagNameMap[K]
export function createElement(name:string, attributes?:Record<string, Attribute>|Content, ...children:Array<Content>):HTMLElement
export function createElement(name:string, attributes:Record<string, Attribute>|Content = {}, ...children:Array<any>):HTMLElement {
    // If attribute could be content
    if(attributes instanceof HTMLElement || Array.isArray(attributes) || typeof attributes !== "object") {
        children.unshift(attributes);
        attributes = {};
    }

    const element = document.createElement(name);
    for(let name in attributes)
        element.setAttribute(name, String(attributes[name]));
    
    appendChildren(element, children);
    return element;
}

/** Append Children
 * 
 * Recursivly appends children in array to element.
 * 
 * @param {HTMLElement} element 
 * @param {Array<any>} children 
 */
export function appendChildren(element:HTMLElement, children:Array<Content>) {
    for(let child of children){
        if(Array.isArray(child)) {
            appendChildren(element, child);
        } else if(child instanceof HTMLElement) {
            element.append(child);
        } else if(child !== undefined && child !== null){
            element.append(String(child));
        }
    }
}