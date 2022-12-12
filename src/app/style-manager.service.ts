/**
* Copied from https://github.com/angular/material.angular.io/blob/master/src/app/shared/style-manager/style-manager.ts
* TODO(@SiddAjmera): Give proper attribution here
*/

import { Injectable } from "@angular/core";

@Injectable()
export class StyleManagerService {
    constructor() { }

    /**
     * Set the stylesheet with the specified key.
     */
    setStyle(key: string, href: string) {
        console.log(href);
        getLinkElementForKey(key).setAttribute("href", href);
    }

    /**
     * Remove the stylesheet with the specified key.
     */
    removeStyle(key: string) {
        const existingLinkElement = getExistingLinkElementByKey(key);
        const existingStyles = getExistingLinkStyles();
        console.log(existingStyles);
        console.log(existingLinkElement);
        if (existingLinkElement) {
            document.head.removeChild(existingLinkElement);
        }
        if (existingStyles) {
            document.head.removeChild(existingStyles);
        }
    }
}

function getLinkElementForKey(key: string) {
    return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
    return document.head.querySelector(
        `link[type="text/css"].${getClassNameForKey(key)}`
    );
}

function getExistingLinkStyles() {
    return document.head.querySelector(
        `link[href="styles.css"]`
    );
}

function createLinkElementWithKey(key: string) {
    const linkEl = document.createElement("link");
    //linkEl.setAttribute("rel", "stylesheet");
    linkEl.setAttribute("type", "text/css");
    linkEl.classList.add(getClassNameForKey(key));
    console.log(linkEl);
    document.head.appendChild(linkEl);
    return linkEl;
}

function getClassNameForKey(key: string) {
    return `app-${key}`;
}
