// @polymer/lit-element is part of the lit library which helps
// us to build template app elements in js.
// https://lit-element.polymer-project.org/guide/templates
import { LitElement, html, css } from '@polymer/lit-element'
import { anchorRoute, gotoRoute } from './../Router'

customElements.define('va-app-footer', class AppFooter extends LitElement {
  constructor(){
    super()    
  }
  static get properties() {
    return {
      margin: {
        type: String
      }
    }
  }

  firstUpdated() {
    super.firstUpdated()
    this.addMargin()
  }

  addMargin(){
    if (this.margin == "true"){
      const footer = this.shadowRoot.querySelector('footer')
      footer.classList.add('margin')
    }
    if (this.margin == "false"){
      const footer = this.shadowRoot.querySelector('footer')
      footer.classList.remove('margin')
    }

  }

  render(){    
    return html`
    <style>      
      * {
        box-sizing: border-box;
      }
      .margin{
        margin-top: 200px;
      }
      footer {
        padding: 3% 5%;
        margin: 0;
        color: white;
        height: 90vh;
        width: 100%;
        background-color: rgb(73, 73, 73);
      }

      .footer-grid{
        display: grid;
        grid-template-columns: repeat(4, auto);
        width: 100%;
      }
      .footer-grid div h2{
        font-size: 24px;
        color: white;
        font-family: var(--heading-font-family);
        text-transform: uppercase;
      }
      ul {
        padding: 0;
        list-style-type: none;
      }
      li{
        margin: 4% 0;
        cursor: pointer;
      }


      .footer-logo {
        width: 25%;
        cursor: pointer;
        margin-left: auto;
        margin-right: auto;
        display: block;
        margin-top: 3%;
        margin-bottom: 4%;
      }

      a { color: inherit; text-decoration: none;} 

      #social img {
          width: 70px;
          height: 70px;
          margin: 0px;
          color: white;
      }

      #disclaimer{
        font-size: 12px;
      }

      @media all and (max-width: 640px){
        .footer-grid{
          display: grid;
          grid-template-columns: auto auto;
          width: 100%;
        }

        footer{
          height: 100vh;
        }

      }

    

    </style>
<footer>
          <div class='footer-grid'>
            <div >
              <h2>Products</h2>
              <ul @click="${() => gotoRoute('/products')}">
                <li>Reveller</li>
                <li>Truffler</li>
                <li>Hogfather</li>
                <li>Pink</li>
                <li>Charmer</li>
              </ul>
            </div>
            <div class='help'>
              <h2>Help</h2>
              <ul>
                <li>Delivery and Returns</li>
                <li>Terms and Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div class='contact-us'>
              <h2>Contact Us</h2>
              <ul>
                <li>275 Burnfield Road, Thornliebank</li>
                <li>01632 960493</li>
                <li>oink@orchardpig.co.uk</li>
              </ul>
            </div>
            <div class='follow-us'>
              <h2>Follow Us</h2>
              <div id="social">
                <!--<a href='https://www.facebook.com/OrchardPig' target="_blank"><i class="fab fa-facebook-square" ></i></a>-->
                <!--<a href='https://www.instagram.com/theorchardpig/' target="_blank"><i class="fab fa-instagram"></i></a>-->
                <!--<a href='https://twitter.com/Orchardpig' target="_blank"><i class="fab fa-twitter-square"></i></a>-->
                <a href='https://www.facebook.com/OrchardPig' target="_blank"><img src="/images/facebook-white2.png"></a>
                <a href='https://www.instagram.com/theorchardpig/' target="_blank"><img src="/images/instagram-white2.png"></a>
                <a href='https://twitter.com/Orchardpig' target="_blank"><img src="/images/twitter-white2.png"</a>
              </div>
            </div>
          </div>

          <img @click="${() => gotoRoute('/')}" class='footer-logo' src='/images/logo-white-cut.png'></a>  

          <hr/>
          <p id='disclaimer'>
            This website has been created as part of an assignment in an approved course of study for Curtin University 
            and contains copyright material not created by the author. 
            All copyright material used remains copyright of the respective owners 
            and has been used here pursuant to Section 40 of the Copyright Act 1968 (Commonwealth of Australia). 
            No part of this work may be reproduced without consent of the original copyright owners. 
            See code comments for references.
          </p>
          </footer>
    `
  }
  
})
