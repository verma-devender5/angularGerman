(self.webpackChunkvera_smart_care=self.webpackChunkvera_smart_care||[]).push([[120],{8120:(e,t,o)=>{"use strict";o.r(t),o.d(t,{AdministrationModule:()=>_});var i=o(1116),n=o(7958),r=o(2935),s=o(5366);let a=(()=>{class e{constructor(e,t){this.dialogRef=e,this.data=t,this.uid=t.uid}ngOnInit(){console.log("name: "+this.uid)}}return e.\u0275fac=function(t){return new(t||e)(s.Y36(r.so),s.Y36(r.WI))},e.\u0275cmp=s.Xpm({type:e,selectors:[["app-personal-info-popup"]],decls:9,vars:1,consts:[["mat-dialog-title",""],[1,"mat-typography"],["align","end"],["mat-button","","mat-dialog-close",""],["mat-button","","cdkFocusInitial","",3,"mat-dialog-close"]],template:function(e,t){1&e&&(s.TgZ(0,"h2",0),s._uU(1,"Install Angular"),s.qZA(),s.TgZ(2,"mat-dialog-content",1),s._uU(3," evelop across all platforms Learn one way to build applications with Angular and reuse your code and abilities to build apps for any deployment target. For web, mobile web, native mobile and native desktop. Speed & Performance Achieve the maximum speed possible on the Web Platform today, and take it further, via Web Workers and server-side rendering. Angular puts you in control over scalability. Meet huge data requirements by building data models on RxJS, Immutable.js or another push-model. Incredible tooling Build features quickly with simple, declarative templates. Extend the template language with your own components and use a wide array of existing components. Get immediate Angular-specific help and feedback with nearly every IDE and editor. All this comes together so you can focus on building amazing apps rather than trying to make the code work. Loved by millions From prototype through global deployment, Angular delivers the productivity and scalable infrastructure that supports Google's largest applications. What is Angular? "),s.qZA(),s.TgZ(4,"mat-dialog-actions",2),s.TgZ(5,"button",3),s._uU(6,"Cancel"),s.qZA(),s.TgZ(7,"button",4),s._uU(8,"Install"),s.qZA(),s.qZA()),2&e&&(s.xp6(7),s.Q6J("mat-dialog-close",!0))},directives:[r.uh,r.xY,r.H8,r.ZT],styles:[""]}),e})();var c=o(4238),l=o(6747),u=o(1428);let d=(()=>{class e{constructor(e,t,o){this.db=e,this.auth=t,this.afAuth=o,this.getCustomer=e=>this.db.collection("users").doc(e).collection("customers").valueChanges(),this.getUser=()=>this.db.collection("users",e=>e.where("roles.employee","==",!0).orderBy("firstName","asc").orderBy("lastName","asc")).valueChanges()}}return e.\u0275fac=function(t){return new(t||e)(s.LFG(c.ST),s.LFG(l.M),s.LFG(u.zQ))},e.\u0275prov=s.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var g=o(1041),p=o(7307);let m=(()=>{class e{transform(e,t){return e?t?e.filter(e=>Object.keys(e).some(o=>String(e[o]).toLowerCase().includes(t.toLowerCase()))):e:[]}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=s.Yjl({name:"userFilter",type:e,pure:!0}),e})();function h(e,t){1&e&&(s.TgZ(0,"div",21),s.TgZ(1,"button",22),s._UZ(2,"span",23),s._uU(3," Loading... "),s.qZA(),s.qZA())}function Z(e,t){if(1&e){const e=s.EpF();s.TgZ(0,"div",24),s.TgZ(1,"div",25),s.TgZ(2,"button",26),s.NdJ("click",function(){return s.CHM(e),s.oxw(2).openModal()}),s._uU(3),s.ALo(4,"titlecase"),s.qZA(),s.qZA(),s.TgZ(5,"a",27),s.TgZ(6,"h5",28),s._uU(7),s.ALo(8,"titlecase"),s.ALo(9,"titlecase"),s.qZA(),s.qZA(),s.TgZ(10,"p",29),s._uU(11),s.qZA(),s.TgZ(12,"p",30),s.TgZ(13,"mat-icon",31),s.NdJ("click",function(){const t=s.CHM(e).$implicit;s.oxw();const o=s.MAs(3);return s.oxw().getCustomerList(t.uid),o.value=t.uid}),s._uU(14," arrow_forward_ios "),s.qZA(),s.qZA(),s.qZA()}if(2&e){const e=t.$implicit;s.oxw();const o=s.MAs(3);s.xp6(3),s.hij(" ",s.lcZ(4,5,e.firstName.charAt(0)),""),s.xp6(4),s.AsE(" ",s.lcZ(8,7,e.firstName)," ",s.lcZ(9,9,e.lastName)," "),s.xp6(4),s.Oqu(e.email),s.xp6(2),s.Q6J("ngClass",e.uid==o.value?"activeIcon":"inactiveicon")}}function b(e,t){if(1&e&&(s.TgZ(0,"div",17),s.YNc(1,h,4,0,"div",11),s._UZ(2,"input",18,19),s.YNc(4,Z,15,11,"div",20),s.ALo(5,"userFilter"),s.qZA()),2&e){const e=s.oxw();s.xp6(1),s.Q6J("ngIf",e.isLoading),s.xp6(3),s.Q6J("ngForOf",s.xi3(5,2,e.userList,e.searchText))}}function f(e,t){1&e&&(s.TgZ(0,"div",21),s.TgZ(1,"button",22),s._UZ(2,"span",23),s._uU(3," Loading... "),s.qZA(),s.qZA())}function A(e,t){if(1&e&&(s.TgZ(0,"tr"),s.TgZ(1,"td"),s._uU(2),s.qZA(),s.TgZ(3,"td"),s._uU(4),s.qZA(),s.TgZ(5,"td"),s._uU(6,"01/01/2016"),s.qZA(),s.TgZ(7,"td"),s._uU(8,"26/04/2016"),s.qZA(),s.TgZ(9,"td"),s.TgZ(10,"span",32),s._uU(11,"Released"),s.qZA(),s.qZA(),s.TgZ(12,"td"),s._uU(13,"Coderthemes"),s.qZA(),s.qZA()),2&e){const e=t.$implicit,o=t.index;s.xp6(2),s.Oqu(o+1),s.xp6(2),s.Oqu(e.email)}}function x(e,t){1&e&&(s.TgZ(0,"div",33),s._uU(1,"No record found."),s.qZA())}function v(e,t){if(1&e&&(s.TgZ(0,"p"),s._uU(1),s.qZA()),2&e){const e=s.oxw();s.xp6(1),s.hij('No results found for "',e.searchText,'".')}}const T=[{path:"",children:[{path:"employees",component:(()=>{class e{constructor(e,t,o,i,n){this.userService=e,this.authService=t,this.dialog=o,this.afAuth=i,this.router=n,this.isLoading=!1,this.isLoadingCustomer=!1,this.userCount=!1,this.searchText="",this.name="got name"}ngOnInit(){this.authService.isAdmin?this.getUser():this.router.navigate(["admin/Notfound"])}openModal(){this.afAuth.authState.subscribe(e=>{}),this.dialog.open(a,{data:{uid:"uid"}})}getUser(){this.isLoading=!0,this.userService.getUser().subscribe(e=>{this.userList=e,this.isLoading=!1})}getFilteredData(e){return this.userList.filter(t=>t.firstName.toLowerCase().includes(e))}getCustomerList(e){this.isLoadingCustomer=!0,this.userService.getCustomer(e).subscribe(e=>{this.customerList=e,this.isLoadingCustomer=!1})}}return e.\u0275fac=function(t){return new(t||e)(s.Y36(d),s.Y36(l.M),s.Y36(r.uw),s.Y36(u.zQ),s.Y36(n.F0))},e.\u0275cmp=s.Xpm({type:e,selectors:[["app-employee-list"]],decls:41,vars:9,consts:[[1,"container-fluid"],[1,"row"],[1,"col-12"],[1,"page-title-box",2,"height","20px !important"],[1,"col-xl-4"],[1,"card"],[1,"card-body"],[1,"header-title","mb-4"],["type","text","placeholder","Search user....",1,"form-control",3,"ngModel","ngModelChange"],["class","inbox-widget slimscroll","style"," max-height:250px;\n             overflow-y:auto; ",4,"ngIf","ngIfElse"],[1,"col-xl-8"],["class","bd-example",4,"ngIf"],[1,"table-responsive"],[1,"table","mb-0","table-nowrap"],[4,"ngFor","ngForOf"],["class","norecord",4,"ngIf"],["noResults",""],[1,"inbox-widget","slimscroll",2,"max-height","250px","overflow-y","auto"],["type","hidden"],["localid",""],["class","inbox-item",4,"ngFor","ngForOf"],[1,"bd-example"],["type","button","disabled","",1,"btn","btn-primary"],["role","status","aria-hidden","true",1,"spinner-border","spinner-border-sm"],[1,"inbox-item"],[1,"inbox-item-img"],[1,"rounded-circle",2,"color","skyblue",3,"click"],["href","#"],[1,"inbox-item-author","font-14","m-0",2,"color","deepskyblue !important"],[1,"inbox-item-text","text-truncate"],[1,"inbox-item-date"],["aria-hidden","false","aria-label","Example home icon",2,"cursor","pointer",3,"ngClass","click"],[1,"badge","badge-danger"],[1,"norecord"]],template:function(e,t){if(1&e&&(s.TgZ(0,"div",0),s.TgZ(1,"div",1),s.TgZ(2,"div",2),s._UZ(3,"div",3),s.qZA(),s.qZA(),s.TgZ(4,"div",1),s.TgZ(5,"div",4),s.TgZ(6,"div",5),s.TgZ(7,"div",6),s.TgZ(8,"h4",7),s._uU(9,"Inbox"),s.qZA(),s.TgZ(10,"div"),s.TgZ(11,"input",8),s.NdJ("ngModelChange",function(e){return t.searchText=e}),s.qZA(),s.qZA(),s.YNc(12,b,6,5,"div",9),s.ALo(13,"userFilter"),s.qZA(),s.qZA(),s.qZA(),s.TgZ(14,"div",10),s.TgZ(15,"div",5),s.TgZ(16,"div",6),s.TgZ(17,"h4",7),s._uU(18,"Latest Projects"),s.qZA(),s.YNc(19,f,4,0,"div",11),s.TgZ(20,"div",12),s.TgZ(21,"table",13),s.TgZ(22,"thead"),s.TgZ(23,"tr"),s.TgZ(24,"th"),s._uU(25,"#"),s.qZA(),s.TgZ(26,"th"),s._uU(27,"Project Name"),s.qZA(),s.TgZ(28,"th"),s._uU(29,"Start Date"),s.qZA(),s.TgZ(30,"th"),s._uU(31,"Due Date"),s.qZA(),s.TgZ(32,"th"),s._uU(33,"Status"),s.qZA(),s.TgZ(34,"th"),s._uU(35,"Assign"),s.qZA(),s.qZA(),s.qZA(),s.TgZ(36,"tbody"),s.YNc(37,A,14,2,"tr",14),s.qZA(),s.qZA(),s.YNc(38,x,2,0,"div",15),s.qZA(),s.qZA(),s.qZA(),s.qZA(),s.qZA(),s.qZA(),s.YNc(39,v,2,1,"ng-template",null,16,s.W1O)),2&e){const e=s.MAs(40);s.xp6(11),s.Q6J("ngModel",t.searchText),s.xp6(1),s.Q6J("ngIf",s.xi3(13,6,t.userList,t.searchText).length>0)("ngIfElse",e),s.xp6(7),s.Q6J("ngIf",t.isLoadingCustomer),s.xp6(18),s.Q6J("ngForOf",t.customerList),s.xp6(1),s.Q6J("ngIf",t.customerList)}},directives:[g.Fj,g.JJ,g.On,i.O5,i.sg,p.Hw,i.mk],pipes:[m,i.rS],styles:[".rounded-circle[_ngcontent-%COMP%]{border:1px solid #ececec!important;padding:5px 11px!important}.matIcon[_ngcontent-%COMP%]{color:#ececec}.activeIcon[_ngcontent-%COMP%]{color:skyblue}.inactiveicon[_ngcontent-%COMP%]{color:#ececec}.bd-example[_ngcontent-%COMP%]{margin-top:10px!important;margin-bottom:10px!important}.norecord[_ngcontent-%COMP%]{margin:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-track{box-shadow:inset 0 0 5px grey;border-radius:10px}[_ngcontent-%COMP%]::-webkit-scrollbar{width:6px;overflow-y:scroll;background:#d3d3d3;box-shadow:inset 0 0 4px #707070}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:skyblue;border-radius:10px}.norecord[_ngcontent-%COMP%]{margin:5px;text-align:center;color:red}"]}),e})()},{path:"",redirectTo:"admin",pathMatch:"full"}]}];let q=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({imports:[[n.Bz.forChild(T)],n.Bz]}),e})();var y=o(2345);let _=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({imports:[[i.ez,q,y.m]]}),e})()}}]);