// @polymer/lit-element is part of the lit library which helps
// us to build template app elements in js.
// https://lit-element.polymer-project.org/guide/templates
import { LitElement, html, css } from '@polymer/lit-element'

customElements.define('va-app-footer', class AppFooter extends LitElement {
  constructor(){
    super()    
  }

  render(){    
    return html`
    <style>      
      * {
        box-sizing: border-box;
      }
      footer{
        display: flex;
        height: var(--app-header-height);
        width: 100%;
        background-color: grey;
        position: absolute;
        bottom: 0;
        left: 0;
        div{
          width: 30%;
        }
      }
      
      /* RESPONSIVE - MOBILE ------------------- */
      @media all and (max-width: 768px){       
      }

    </style>

    <footer>
      <div style="background-color: Red;">

      </div>
      <div style="background-color: green;">

      </div>
      <div style="background-color: blue;">

      </div>
    </footer>
    `
  }
  
})
