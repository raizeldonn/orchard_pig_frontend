// @polymer/lit-element is part of the lit library which helps
// us to build template app elements in js.
// https://lit-element.polymer-project.org/guide/templates
import { LitElement, html, css } from '@polymer/lit-element'

customElements.define('va-bottle-spinner', class AppSpinner extends LitElement {
  constructor(){
    super()    
  }


  render() {
    return html `
    
    <style>
    #spinner {
      animation-name: example;
      animation-duration: 2s;
      animation-iteration-count: infinite;
    
    }
    @keyframes example {
      from {transform: rotate(0deg);}
      to {transform : rotate(360deg);}
    }
    </style>
   
    <img id="spinner" width = "40px" src="/images/bottle_spinner.png" alt="spinner">
   
    `
  }

})
