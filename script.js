"use strict";

class Hello extends HTMLElement {

    static get observedAttributes() { return ['message']; }

    constructor(){
        super();
        
        console.log('Custom element instanciated.');  
        this.shadow = this.attachShadow({mode: 'open'});

    }

    get message() {
        return this.getAttribute('message');
    }

    set message(newMessage) {
        this.setAttribute('message', newMessage);
    }

    connectedCallback(){
        console.log('Custom element added to page.');

        const defaultRootTagName = 'p';
        const defaultTheme = 'green';
        // Style

        let theme = this.hasAttribute('theme') ? this.getAttribute('theme') : defaultTheme;
        let color;
        switch(theme) {
            case 'green':   color = '#16a085'; break;
            case 'orange':  color = '#d35400'; break;
            case 'red':     color = '#e74c3c'; break;
            case 'blue':    color = '#2980b9'; break;
            case 'dark':    color = '#212121'; break;
            default:        color = '#16a085';

        }

        var style = document.createElement('style');
        style.innerHTML = `
        :host {
          display:block;
          font-family: monospace;
          font-size: 1em;
          color: #fff;
          padding: 8px 16px;
          background-color: ${color};
          border-radius: 6px;
          width: 280px;
          text-align: center;
          margin: 4px;
        }`;
        this.shadow.appendChild(style);

        // Content
        let title = this.hasAttribute('title') ? this.getAttribute('title') : '';
        let rootTagName = this.hasAttribute('root') ? this.getAttribute('root') : defaultRootTagName;

        let template = document.createElement(rootTagName);
        template.innerHTML = title;

        this.shadow.appendChild(template.cloneNode(true));



        
    }

    disconnectedCallback() {
        console.log('Custom element removed from page.');
    }
      
    adoptedCallback() {
        console.log('Custom element moved to new page.');
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        console.log('Custom element attributes changed.');
        if (oldValue !== newValue)
        this[attr] = newValue;
    }

}

window.customElements.define('hello-component', Hello);

