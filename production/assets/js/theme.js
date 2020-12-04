class Backpack{open(){console.log("backpack open")}}class Craft{open(){console.log("craft open")}}class Data{constructor(e){this.api=e,this.apiUrl=`./api/${this.api}/`}loadMap(e){const t={kind:"GET",controller:`${this.apiUrl}map-${e}.${this.api}`};window.helper.ajax(t).then(e=>window.map.buildMap(e))}loadPlayer(){const e={kind:"GET",controller:`${this.apiUrl}player.${this.api}`};window.helper.ajax(e).then(e=>window.player.buildPlayer(e))}}class Enemy{}class Helper{ajax(e){return new Promise((t,i)=>{let a=new XMLHttpRequest;const r=void 0===e.kind?"GET":e.kind;a.open(r,e.controller,!0),a.setRequestHeader("Content-type","application/x-www-form-urlencoded"),a.onload=(()=>{a.status>=200&&a.status<300?t(a.responseText):i(a.statusText)}),a.onerror=(()=>i(a.statusText)),a.send(e.parameter)})}remove(e){null!==e&&e.parentNode.removeChild(e)}}class Interface{build(){this.update(),this.buildAction(),this.buildDirection()}buildAction(){this.elActionBackpack.onclick=(()=>{backpack.open()}),this.elActionCraft.onclick=(()=>{craft.open()}),this.elActionCatch.onclick=(()=>{player.catch()}),this.elActionHit.onclick=(()=>{player.hit()})}buildDirection(){this.elDirectionalUp.onclick=(()=>{player.moveUp()}),this.elDirectionalDown.onclick=(()=>{player.moveDown()}),this.elDirectionalLeft.onclick=(()=>{player.moveLeft()}),this.elDirectionalRight.onclick=(()=>{player.moveRight()})}update(){this.elBarLife=document.querySelector('[data-id="bar-life"]'),this.elBarHunger=document.querySelector('[data-id="bar-hunger"]'),this.elBarThirst=document.querySelector('[data-id="bar-thirst"]'),this.elActionBackpack=document.querySelector('[data-id="action-backpack"]'),this.elActionCraft=document.querySelector('[data-id="action-craft"]'),this.elActionCatch=document.querySelector('[data-id="action-catch"]'),this.elActionHit=document.querySelector('[data-id="action-hit"]'),this.elDirectionalUp=document.querySelector('[data-id="directional-up"]'),this.elDirectionalDown=document.querySelector('[data-id="directional-down"]'),this.elDirectionalLeft=document.querySelector('[data-id="directional-left"]'),this.elDirectionalRight=document.querySelector('[data-id="directional-right"]')}updateBar(){this.elBarLife.setAttribute("value",player.lifeCurrent),this.elBarLife.setAttribute("max",player.life),this.elBarHunger.setAttribute("value",player.hungerCurrent),this.elBarHunger.setAttribute("max",player.hunger),this.elBarThirst.setAttribute("value",player.thirstCurrent),this.elBarThirst.setAttribute("max",player.thirst)}}class Item{}class Keyboard{build(){document.addEventListener("keydown",e=>{this.buildAction(e.key)})}buildAction(e){switch(e){case"Up":case"ArrowUp":case"w":window.player.move("up"),window.map.move("up");break;case"Left":case"ArrowLeft":case"a":window.player.move("left"),window.map.move("left");break;case"Down":case"ArrowDown":case"s":window.player.move("down"),window.map.move("down");break;case"Right":case"ArrowRight":case"d":window.player.move("right"),window.map.move("right")}}}class Management{verifyLoad(){document.addEventListener("DOMContentLoaded",()=>{this.build()})}build(){window.interface.build(),window.keyboard.build(),window.map.build(),window.player.build()}}class Map{constructor(){this.current=0,this.json={},this.arr=[],this.tileSize=50,this.unity="px"}build(){this.update(),window.data.loadMap(this.current)}buildMap(e){this.json=JSON.parse(e),this.convertArray(),this.buildHtml()}buildHtml(){const e=this.buildHtmlRow();this.elMap.style.width=`${this.tileSize*this.json.column}${this.unity}`,this.elMap.style.height=`${this.tileSize*this.json.row}${this.unity}`,this.elMap.innerHTML="",this.elMap.insertAdjacentHTML("afterbegin",e)}buildHtmlRow(){let e="";for(let t=0;t<this.json.row;t++)e+=this.buildHtmlColumn(t);return e}buildHtmlColumn(e){let t="";for(let i=0;i<this.json.column;i++){t+=`<div class="tile tile--${this.arr[e][i].trim()}"></div>`}return t}convertArray(){const e=this.json.map,t=Object.keys(e).length;for(let i=0;i<t;i++){let t=e[i].split(",");this.arr[i]=t}}update(){this.elMap=document.querySelector("#map")}move(e){console.log(e)}}class Player{constructor(){}build(){this.load()}buildPlayer(e){const t=JSON.parse(e);this.life=t.life,this.lifeCurrent=t.lifeCurrent,this.hunger=t.hunger,this.hungerCurrent=t.hungerCurrent,this.thirst=t.thirst,this.thirstCurrent=t.thirstCurrent,window.interface.updateBar()}load(){window.data.loadPlayer()}catch(){console.log("catch")}hit(){console.log("hit")}move(e){console.log(e)}}class Theme{}window.helper=new Helper,window.data=new Data("json"),window.backpack=new Backpack,window.craft=new Craft,window.enemy=new Enemy,window.interface=new Interface,window.item=new Item,window.keyboard=new Keyboard,window.management=new Management,window.map=new Map,window.player=new Player,window.theme=new Theme,management.verifyLoad();