"use strict";

class Hello extends HTMLElement {

    static get observedAttributes() { return ['message']; }

    constructor(){
        super();
        
        console.log('Custom element instanciated.');
        
        this.shadow = this.attachShadow({mode: 'open'});

        var style = document.createElement('style');
        style.innerText = `
        :host {
          display:block;
          font-family: monospace;
          font-size: 1em;
          color: #fff;
          padding: 12px 24px;
          background-color: #16a085;
          border-radius: 6px;
          width: 280px;
          margin: 0 auto;
          text-align: center;
        }`;
        var template = document.createElement('template');
        template.innerHTML = `
        <h1>Hello the world</h1>
        `;
        this.shadow.appendChild(style);
        this.shadow.appendChild(template.content.cloneNode(true));


    }

    get message() {
        return this.getAttribute('message');
    }

    set message(newMessage) {
        this.setAttribute('message', newMessage);
    }
    connectedCallback(){
        console.log('Custom element added to page.');
        this.shadow.querySelector('h1').innerHTML= this.getAttribute('title');

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

