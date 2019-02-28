(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{218:function(e,t,a){e.exports=a(395)},395:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(52),i=a.n(c),l=a(21),u=a.n(l),o=a(31),s=a(53),p=a(54),h=a(59),m=a(55),d=a(60),f=a(414),E=a(412),g={margin:"1em 0em",textAlign:"center"},v=function(e){e.title;return r.a.createElement("div",null,r.a.createElement(E.a,{style:g,as:"h2"},"CO",r.a.createElement("sup",null,"2"),"-EMISSIONS"))},y=a(71),C=a(58),b=a(123),O=a.n(b),x={getAll:function(){var e=Object(o.a)(u.a.mark(function e(){var t;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("/api/country");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),getWithCode:function(){var e=Object(o.a)(u.a.mark(function e(t){var a;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("".concat("/api/country","/").concat(t));case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},w={country:{}},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SEARCH_COUNTRY":return t.country;default:return e}},S={searchText:"",perCapita:!1,results:[]},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_SEARCHTEXT":return Object.assign({},e,{searchText:t.text});case"TOGGLE_PERCAPITA":return Object(y.a)({},e,{perCapita:!e.perCapita});case"INIT_SEARCH_RESULTS":return Object(y.a)({},e,{results:t.results});default:return e}},R=a(408),A=a(413),k=a(411),I=a(44),P=a(404),_=a(406),z=a(70),L=a(407),D=a(409),H=a(193),N=a(410),U=a(403),W=function(e){var t=e.name,a=e.id,n=e.values;e.perCapita;return r.a.createElement("div",null,r.a.createElement(A.a,{raised:!0},r.a.createElement(H.a,{width:"100%",height:"18em",loader:r.a.createElement("div",{style:{height:"8em"}},r.a.createElement(N.a,{active:!0},r.a.createElement(U.a,{size:"big"},"Loading"))),chartType:"LineChart",data:n,options:{title:"".concat(t," (").concat(a,")"),hAxis:{title:"Year"},vAxis:{title:"Emission (kt)"}}})))},G=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(h.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).handleSearchTextChange=function(e){e.preventDefault(),a.props.updateSearchText(e.target.value)},a.handleSearch=function(){a.props.searchCountry(a.props.searchText)},a.togglePerCapita=function(){a.props.togglePerCapita()},a.processdata=function(e){var t=new Array(["Year","Emission"]);return e.forEach(function(e){t.push([e.year,parseInt(e.value)])}),t},a.handleResultSelect=function(e,t){var n=t.result;a.props.updateSearchText(n.name),a.props.searchCountry(n.code)},a}return Object(d.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(f.a,{centered:!0},r.a.createElement(f.a.Column,{style:{maxWidth:"600px"}},r.a.createElement(R.a,{size:"large",onSubmit:this.props.handleSearch},r.a.createElement(A.a,null,r.a.createElement(R.a.Field,{style:{padding:"1em"}},r.a.createElement(k.a,{fluid:!0,size:"huge",icon:r.a.createElement(I.a,{name:"search",inverted:!0,circular:!0,link:!0,color:"blue"}),placeholder:"country name...",value:this.props.searchText,onSearchChange:this.handleSearchTextChange,onResultSelect:this.handleResultSelect,resultRenderer:M,selectFirstResult:!0,minCharacters:2,results:this.props.filteredResults})),r.a.createElement(R.a.Group,{inline:!0,style:{margin:"1em"}},r.a.createElement(R.a.Field,null,r.a.createElement(P.a,{toggle:!0,label:"per capita",onChange:this.togglePerCapita,onClick:function(){return console.log(e.props)}}))))),r.a.createElement(_.a,{horizontal:!0},"OR"),r.a.createElement(A.a,{textAlign:"center"},r.a.createElement(z.a,{color:"pink",size:"big"},"Choose a country from a map")),r.a.createElement(L.a,{fluid:!0},void 0===this.props.country.emissions?null:r.a.createElement(W,{name:this.props.country.name,id:this.props.country.code,values:this.processdata(this.props.country.emissions)}))))}}]),t}(r.a.Component),M=function(e){var t=e.name;return r.a.createElement(D.a,{key:t},t)},Y=Object(C.b)(function(e){return{searchText:e.search.searchText,perCapita:e.search.perCapita,filteredResults:(t=e.search.results,a=e.search.searchText,t.filter(function(e){return e.name.toLowerCase().includes(a.toLowerCase())}).map(function(e){return Object(y.a)({},e,{title:e.name,key:e.code})})),country:e.country};var t,a},{togglePerCapita:function(){return function(e){e({type:"TOGGLE_PERCAPITA"})}},updateSearchText:function(e){return function(t){t({type:"UPDATE_SEARCHTEXT",text:e})}},searchCountry:function(e){return function(){var t=Object(o.a)(u.a.mark(function t(a){var n;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x.getWithCode(e);case 2:n=t.sent,a({type:"SEARCH_COUNTRY",country:n});case 4:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()}})(G),F=function(){new Date;return r.a.createElement(A.a,{inverted:!0,vertical:!0,style:{padding:"5em 0em",marginTop:"24em"}},r.a.createElement(f.a,{centered:!0,columns:2},r.a.createElement(f.a.Column,{width:2},r.a.createElement(I.a,{name:"github",size:"huge"}))))},J=a(72),X={width:"100%",maxWidth:980,margin:"0 auto"},B=(n.Component,function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(h.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).componentDidMount=Object(o.a)(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a.props.resultInitialization();case 1:case"end":return e.stop()}},e,this)})),a}return Object(d.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(f.a,{centered:!0,textAlign:"center",style:{height:"100%"},verticalAlign:"middle"},r.a.createElement(f.a.Row,null,r.a.createElement(f.a.Column,{style:{maxWidth:450}},r.a.createElement(v,{title:"CO2-EMISSIONS"}))),r.a.createElement(f.a.Row,null,r.a.createElement(f.a.Column,null,r.a.createElement(Y,null))),r.a.createElement(f.a.Row,null)),r.a.createElement(F,null))}}]),t}(n.Component)),q=Object(C.b)(null,{resultInitialization:function(){return function(){var e=Object(o.a)(u.a.mark(function e(t){var a;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.getAll();case 2:a=e.sent,t({type:"INIT_SEARCH_RESULTS",results:a});case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}})(B),K=a(41),Q=a(204),V=a(205),Z=Object(K.combineReducers)({search:j,country:T}),$=Object(K.createStore)(Z,Object(V.composeWithDevTools)(Object(K.applyMiddleware)(Q.a))),ee=function(){i.a.render(r.a.createElement(C.a,{store:$},r.a.createElement(q,null)),document.getElementById("root"))};ee(),$.subscribe(ee)}},[[218,1,2]]]);
//# sourceMappingURL=main.3942f5c7.chunk.js.map