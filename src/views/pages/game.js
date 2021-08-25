import {html, render } from 'lit-html'

import App from '../../App'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'

class ProductsView {
  init(){
    document.title = 'Products'    
    this.render()    
    this.initWheel()
    this.render()
    Utils.pageIntroAnim()
  }

initWheel(){
    // spinning wheel code reused from https://codepen.io/sumeshkp18/pen/VGBPYg
    var padding = {top:20, right:40, bottom:0, left:0},
            w = 500 - padding.left - padding.right,
            h = 500 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            picked = 100000,
            oldpick = [],
            color = d3.scale.category20();//category20c()
            //randomNumbers = getRandomNumbers();
        //http://osric.com/bingo-card-generator/?title=HTML+and+CSS+BINGO!&words=padding%2Cfont-family%2Ccolor%2Cfont-weight%2Cfont-size%2Cbackground-color%2Cnesting%2Cbottom%2Csans-serif%2Cperiod%2Cpound+sign%2C%EF%B9%A4body%EF%B9%A5%2C%EF%B9%A4ul%EF%B9%A5%2C%EF%B9%A4h1%EF%B9%A5%2Cmargin%2C%3C++%3E%2C{+}%2C%EF%B9%A4p%EF%B9%A5%2C%EF%B9%A4!DOCTYPE+html%EF%B9%A5%2C%EF%B9%A4head%EF%B9%A5%2Ccolon%2C%EF%B9%A4style%EF%B9%A5%2C.html%2CHTML%2CCSS%2CJavaScript%2Cborder&freespace=true&freespaceValue=Web+Design+Master&freespaceRandom=false&width=5&height=5&number=35#results
        var data = [
                    {"label":"Free Cider",  "value":1,  "question":"A free Case of Reveller Bottles! "}, 
                    {"label":"Free Cider",  "value":2,  "question":"A free Case of Reveller Bottles!"}, 
                    {"label":"No Prize",  "value":3,  "question":"Sorry, You dont win anything. Better luck next time..."},
                    {"label":"Tour",  "value":4,  "question":"A free tour to visit us on the farm!!"}, 
                    {"label":"No Prize",  "value":5,  "question":"Sorry, You dont win anything. Better luck next time..."},
                    {"label":"No Prize",  "value":6,  "question":"Sorry, You dont win anything. Better luck next time..."},
                    {"label":"T-shirt",  "value":7,  "question":"Free Orchard Pig T-Shirt!!"}, 
                    {"label":"Pint Glass",  "value":8,  "question":"Free Orchard Pig Pint Glass"},
                    {"label":"No Prize",  "value":9,  "question":"Sorry, You dont win anything. Better luck next time..."},
                    {"label":"No Prize", "value":10, "question":"Sorry, You dont win anything. Better luck next time..."}
        ];
        var svg = d3.select('#chart')
            .append("svg")
            .data([data])
            .attr("width",  w + padding.left + padding.right)
            .attr("height", h + padding.top + padding.bottom);
        var container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
        var vis = container
            .append("g");
            
        var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);
        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");
            
        arcs.append("path")
            .attr("fill", function(d, i){ return color(i); })
            .attr("d", function (d) { return arc(d); });
        // add the text
        arcs.append("text").attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle)/2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
            })
            .attr("text-anchor", "end")
            .text( function(d, i) {
                return data[i].label;
            });
        container.on("click", spin);
        function spin(d){
            
            container.on("click", null);
            //all slices have been seen, all done
            // console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
            if(oldpick.length == data.length){
                // console.log("done");
                container.on("click", null);
                return;
            }
            var  ps       = 360/data.length,
                 pieslice = Math.round(1440/data.length),
                 rng      = Math.floor((Math.random() * 1440) + 360);
                
            rotation = (Math.round(rng / ps) * ps);
            
            picked = Math.round(data.length - (rotation % 360)/ps);
            picked = picked >= data.length ? (picked % data.length) : picked;
            if(oldpick.indexOf(picked) !== -1){
                d3.select(this).call(spin);
                return;
            } else {
                oldpick.push(picked);
            }
            rotation += 90 - Math.round(ps/2);
            vis.transition()
                .duration(12000)
                .attrTween("transform", rotTween)
                .each("end", function(){
                    //mark question as seen
                    d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                        .attr("fill", "#111");
                    //populate question
                    d3.select("#question h1")
                        .text(data[picked].question);
                    oldrotation = rotation;
              
                    /* Get the result value from object "data" */
                    // console.log(data[picked].value)
                    enterEmail(data[picked].value)
                    /* Comment the below line for restrict spin to sngle time */
                    // container.on("click", spin);
                });
        }
        // //make arrow
        // svg.append("g")
        //     .attr("transform", "translate(" + (w + padding.left + padding.right) + "," + ((h/2)+padding.top) + ")")
        //     .append("path")
        //     .attr("d", "M-" + (r*.15) + ",0L0," + (r*.05) + "L0,-" + (r*.05) + "Z")
        //     .style({"fill":"black"});
        //draw spin circle
        container.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 60)
            .style({"fill":"white","cursor":"pointer", "background-image":"url'../../images/logo-black.png'"});
        //spin text
        container.append("text")
            .attr("x", 0)
            .attr("y", 15)
            .attr("text-anchor", "middle")
            .text("SPIN")
            .style({"font-weight":"bold", "font-size":"30px", "transform": "rotate(90deg)", "cursor":"pointer"});
        // spin logo
        // container.append("img")
        //     .attr("src","/images/logo-black.png")
        //     .style({"width":"10px", "height":"10px"});
        
        function rotTween(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            return "rotate(" + i(t) + ")";
          };
        }
        
        
        function getRandomNumbers(){
            var array = new Uint16Array(1000);
            var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
            if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
                window.crypto.getRandomValues(array);
                // console.log("works");
            } else {
                //no support for crypto, get crappy random numbers
                for(var i=0; i < 1000; i++){
                    array[i] = Math.floor(Math.random() * 100000) + 1;
                }
            }
            return array;
        }

        function enterEmail(value)
        {
            if (value==1 || value==2 || value==4 || value==7 ||value==8){
                // console.log("prize won")
                let claimPrize = document.querySelector(".claim-prize")
                claimPrize.style.visibility = "visible"
            }
        }
}

claimPrize(){
    // send email addres t oclaim prize
    // and redirect to home page
    gotoRoute('/')
    Toast.show("thank you for spinning to win! we have received your email address and will be in touch with you.")
}


  // method from lit library which allows us 
  // to render html from within js to a container
  render(){
    const template = html`
      <va-app-header products=${localStorage.getItem('cartProducts')}></va-app-header>
      <div class="page-content game"> 
      <img class='pigsteps' src='/images/pigsteps.png'>
        <div class='game-left'>
            <h1>SPIN TO WIN</h1>
            <p>Press on the spin button and bet your lucky pigs youll win something!</p>
            <a href="/" @click=${anchorRoute}>No thanks, I'm good</a>
        </div>  
        <div class='game-center'>
            <img  class='wheel-back'src='/images/wheel_back.png'>
            <div id="chart"></div>
        </div>
        <div class='game-right'>
        <h1 class='you-win'>You Win:</h1>
            <div id="question">
                <h1></h1>
            </div>
            <div class='claim-prize'>
                <p>Let the pig know and it will deliver!</p>
                <p>Enter email address to claim your prize:</p>
                <sl-input type="text" placeholder='email address'></sl-input>
                <sl-button @click='${this.claimPrize}'>Submit</sl-button>
            </div>
        </div>  
        
        
        
      </div>      
    `
    // this assigns the template html container to App.rootEl
    // which provides the html to the <div id="root"></div> element 
    // in the index.html parent page
    render(template, App.rootEl)
  }
}


export default new ProductsView()