(self.webpackChunkvera_smart_care=self.webpackChunkvera_smart_care||[]).push([[592],{1110:(e,t,s)=>{"use strict";s.d(t,{H:()=>u});var r=s(8318),n=s(8569),i=s(2293),c=s(6163);function u(e=0,t,s){let u=-1;return(0,i.k)(t)?u=Number(t)<1?1:Number(t):(0,c.K)(t)&&(s=t),(0,c.K)(s)||(s=n.P),new r.y(t=>{const r=(0,i.k)(e)?e:+e-s.now();return s.schedule(o,r,{index:0,period:u,subscriber:t})})}function o(e){const{index:t,period:s,subscriber:r}=e;if(r.next(t),!r.closed){if(-1===s)return r.complete();e.index=t+1,this.schedule(e,s)}}},5416:(e,t,s)=>{"use strict";s.d(t,{R:()=>n});var r=s(6882);function n(e){return t=>t.lift(new i(e))}class i{constructor(e){this.notifier=e}call(e,t){const s=new c(e),n=(0,r.ft)(this.notifier,new r.IY(s));return n&&!s.seenValue?(s.add(n),t.subscribe(s)):s}}class c extends r.Ds{constructor(e){super(e),this.seenValue=!1}notifyNext(){this.seenValue=!0,this.complete()}notifyComplete(){}}},1741:(e,t,s)=>{"use strict";s.d(t,{Z:()=>u});var r=s(8277);class n extends r.o{constructor(e,t){super(e,t),this.scheduler=e,this.work=t}requestAsyncId(e,t,s=0){return null!==s&&s>0?super.requestAsyncId(e,t,s):(e.actions.push(this),e.scheduled||(e.scheduled=requestAnimationFrame(()=>e.flush(null))))}recycleAsyncId(e,t,s=0){if(null!==s&&s>0||null===s&&this.delay>0)return super.recycleAsyncId(e,t,s);0===e.actions.length&&(cancelAnimationFrame(t),e.scheduled=void 0)}}var i=s(1098);class c extends i.v{flush(e){this.active=!0,this.scheduled=void 0;const{actions:t}=this;let s,r=-1,n=t.length;e=e||t.shift();do{if(s=e.execute(e.state,e.delay))break}while(++r<n&&(e=t.shift()));if(this.active=!1,s){for(;++r<n&&(e=t.shift());)e.unsubscribe();throw s}}}const u=new c(n)},8721:(e,t,s)=>{"use strict";s.d(t,{b:()=>n});var r=s(5366);let n=(()=>{class e{transform(e,t){return e?t?e.filter(e=>Object.keys(e).some(s=>String(e[s]).toLowerCase().includes(t.toLowerCase()))):e:[]}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=r.Yjl({name:"userFilter",type:e,pure:!0}),e})()},7438:(e,t,s)=>{"use strict";s.d(t,{v:()=>c});var r=s(5366),n=s(4238),i=s(1428);let c=(()=>{class e{constructor(e,t,s){this.firestore=e,this.db=t,this.afAuth=s,this.dbPath="/customers",this.getCustomer=()=>(this.afAuth.authState.subscribe(e=>{e&&(this.uid=e.uid)}),console.log(this.uid),this.firestore.collection("users").doc(this.uid).collection("customers").valueChanges())}}return e.\u0275fac=function(t){return new(t||e)(r.LFG(n.ST),r.LFG(n.ST),r.LFG(i.zQ))},e.\u0275prov=r.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},6304:(e,t,s)=>{"use strict";function r(e,t,s,r,n,i,c){try{var u=e[i](c),o=u.value}catch(l){return void s(l)}u.done?t(o):Promise.resolve(o).then(r,n)}function n(e){return function(){var t=this,s=arguments;return new Promise(function(n,i){var c=e.apply(t,s);function u(e){r(c,n,i,u,o,"next",e)}function o(e){r(c,n,i,u,o,"throw",e)}u(void 0)})}}s.d(t,{Z:()=>n})}}]);