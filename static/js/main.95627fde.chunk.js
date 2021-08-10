(this["webpackJsonpreact-covid-19-tracker"]=this["webpackJsonpreact-covid-19-tracker"]||[]).push([[0],{204:function(e,t,n){},207:function(e,t,n){},208:function(e,t,n){},212:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(36),s=n.n(r),o=(n(93),n(13)),i=n.n(o),l=n(19),u=n(11),d=n(213),j=n(214),f=n(9),h=n.n(f),b=(n(95),n(86)),v=(n(96),n(1)),m=["title","cases","total","active","caseType"];var O=function(e){var t=e.title,n=e.cases,a=e.total,c=e.active,r=e.caseType,s=Object(b.a)(e,m);return Object(v.jsx)(j.a,{onClick:s.onClick,className:"infoCard ".concat(c&&"infoCard--selected"," \n      ").concat("cases"===r&&"infoCard--cases","\n      ").concat("recovered"===r&&"infoCard--recovered","\n      ").concat("deaths"===r&&"infoCard--deaths"," "),children:Object(v.jsxs)(j.a.Body,{children:[Object(v.jsx)(j.a.Title,{children:t}),Object(v.jsx)(j.a.Text,{children:Object(v.jsx)("h2",{className:"infoCardCases ".concat("recovered"===r&&"infoCardCases--green"),children:n})}),Object(v.jsxs)(j.a.Footer,{className:"infoCardTotal",children:[a," Total"]})]})})},p=n(40),x=(n(79),"https://disease.sh/v3/covid-19"),y={plugins:{legend:{display:!1}},elements:{point:{radius:0}},maintainAspectRatio:!1,tooltips:{callbacks:{label:function(e,t){return h()(e.value).format("+0,0")}}},scales:{xAxes:[{type:"time",time:{format:"MM/DD/YY",tooltipFormat:"ll"}}],yAxes:[{ticks:{callback:function(e,t,n){return h()(e).format("0a")}}}]},title:{display:!1}},C=function(e,t){var n,a=[];for(var c in e.cases){if(n){var r={x:c,y:e[t][c]-n};a.push(r)}n=e[t][c]}return a};var g=function(e){var t=e.casesType,n=Object(a.useState)({}),c=Object(u.a)(n,2),r=c[0],s=c[1];return Object(a.useEffect)((function(){(function(){var e=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(x,"/historical/all?lastdays=120")).then((function(e){return e.json()})).then((function(e){var n=C(e,t);s(n)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[t]),Object(v.jsx)("div",{children:(null===r||void 0===r?void 0:r.length)>0&&Object(v.jsx)(p.a,{className:"lineChart",data:{datasets:[{backgroundColor:"rgba(75,192,192,0.2)",borderColor:"rgba(75,192,192,1)",fill:!0,data:r}]},options:y})})},w={plugins:{legend:{display:!1}},elements:{point:{radius:0}},maintainAspectRatio:!1,tooltips:{callbacks:{label:function(e,t){return h()(e.value).format("+0,0")}}},scales:{xAxes:[{type:"time",time:{format:"MM/DD/YY",tooltipFormat:"ll"}}],yAxes:[{ticks:{callback:function(e,t,n){return h()(e).format("0a")}}}]},title:{display:!1}},N=function(e){var t,n=[];for(var a in e.timeline){if(t){var c={x:a,y:e.timeline[a]-t};n.push(c)}t=e.timeline[a]}return n};var k=function(e){var t=e.selectedCountryCode,n=Object(a.useState)({}),c=Object(u.a)(n,2),r=c[0],s=c[1];return Object(a.useEffect)((function(){(function(){var e=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(x,"/vaccine/coverage/countries/").concat(t,"?lastdays=120")).then((function(e){return e.json()})).then((function(e){var t=N(e);s(t)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[t]),Object(v.jsx)("div",{children:(null===r||void 0===r?void 0:r.length)>0&&Object(v.jsx)(p.a,{className:"lineChart",data:{datasets:[{backgroundColor:"rgba(75,192,192,0.2)",borderColor:"rgba(75,192,192,1)",fill:!0,data:r}]},options:w})})};n(80);var T=function(e){var t=e.title,n=e.countries;return Object(v.jsxs)("div",{className:"tableContainer",children:[Object(v.jsx)("h3",{className:"tableHeader",children:t}),Object(v.jsx)("div",{className:"table",children:n.map((function(e){return Object(v.jsxs)("tr",{children:[Object(v.jsx)("td",{children:e.country}),Object(v.jsx)("td",{children:Object(v.jsx)("strong",{children:h()(e.cases).format("0,0")})})]})}))})]})};var S=function(e){var t=e.title,n=e.countries;return Object(v.jsxs)("div",{className:"tableContainer",children:[Object(v.jsx)("h3",{className:"tableHeader",children:t}),Object(v.jsx)("div",{className:"table",children:n.map((function(e){return Object(v.jsxs)("tr",{children:[Object(v.jsx)("td",{children:e.country}),Object(v.jsx)("td",{children:Object(v.jsx)("strong",{children:h()(e.timeline[0].total).format("0,0")})})]})}))})]})},D=n(217),I=n(218),E=n(215),M=n(216),A=(n(204),{cases:{hex:"#0000FF",multiplier:400},recovered:{hex:"#008000",multiplier:600},deaths:{hex:"#CC1034",multiplier:1e3}}),F=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"cases";return e.map((function(e){return Object(v.jsx)(E.a,{center:[e.countryInfo.lat,e.countryInfo.long],color:A[t].hex,fillColor:A[t].hex,fillOpacity:.2,radius:Math.sqrt(e[t])*A[t].multiplier,stroke:!1,children:Object(v.jsx)(M.a,{children:Object(v.jsxs)("div",{className:"infoContainer",children:[Object(v.jsx)("div",{className:"infoName",children:e.country}),Object(v.jsx)("div",{className:"infoFlag",style:{backgroundImage:"url(".concat(e.countryInfo.flag,")")}}),Object(v.jsxs)("div",{className:"infoConfirmed",children:["Cases: ",h()(e.cases).format("0,0")]}),Object(v.jsxs)("div",{className:"infoRecovered",children:["Recovered: ",h()(e.recovered).format("0,0")]}),Object(v.jsxs)("div",{className:"infoDeaths",children:["Deaths: ",h()(e.deaths).format("0,0")]})]})})})}))};n(207);var R=function(e){var t=e.countries,n=e.casesType,a=e.center,c=e.zoom;return Object(v.jsx)("div",{className:"mapContainer",children:Object(v.jsxs)(D.a,{center:a,zoom:c,scrollWheelZoom:!0,children:[Object(v.jsx)(I.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),F(t,n)]})})},W=n(10),z=function(e){var t=Object(W.a)(e);return t.sort((function(e,t){return e.cases>t.cases?-1:1})),t},B=function(e){var t=Object(W.a)(e);return t.sort((function(e,t){return e.timeline[0].total>t.timeline[0].total?-1:1})),t},V=function(e){return e?"+".concat(h()(e).format("0.0a")):"+0"},Y=(n(208),function(){var e=Object(a.useState)("worldwide"),t=Object(u.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)({}),s=Object(u.a)(r,2),o=s[0],f=s[1],b=Object(a.useState)([]),m=Object(u.a)(b,2),p=m[0],y=m[1],C=Object(a.useState)([]),w=Object(u.a)(C,2),N=w[0],D=w[1],I=Object(a.useState)([]),E=Object(u.a)(I,2),M=E[0],A=E[1],F=Object(a.useState)("cases"),W=Object(u.a)(F,2),Y=W[0],H=W[1],J=Object(a.useState)({lat:-.27489,lng:-78.4676}),q=Object(u.a)(J,2),G=q[0],L=q[1],Z=Object(a.useState)(5),$=Object(u.a)(Z,2),K=$[0],P=$[1],Q=Object(a.useState)([]),U=Object(u.a)(Q,2),X=U[0],_=U[1];Object(a.useEffect)((function(){fetch("".concat(x,"/all")).then((function(e){return e.json()})).then((function(e){f(e)}))}),[]),Object(a.useEffect)((function(){(function(){var e=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("".concat(x,"/countries")).then((function(e){return e.json()})).then((function(e){var t=e.map((function(e){return{name:e.country,value:e.countryInfo.iso2}})),n=z(e);y(t),D(e),A(n)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(a.useEffect)((function(){(function(){var e=Object(l.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("".concat(x,"/vaccine/coverage/countries?lastdays=1&fullData=true")).then((function(e){return e.json()})).then((function(e){var t=B(e);_(t)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var ee=function(){var e=Object(l.a)(i.a.mark((function e(t){var n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.target.value,a="worldwide"===n?"".concat(x,"/all"):"".concat(x,"/countries/").concat(n),e.next=4,fetch(a).then((function(e){return e.json()})).then((function(e){c(n),f(e),L("worldwide"===n?{lat:-.27489,lng:-78.4676}:[e.countryInfo.lat,e.countryInfo.long]),P(5)}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(v.jsxs)("div",{className:"app",children:[Object(v.jsxs)("div",{className:"appLeft",children:[Object(v.jsxs)("div",{className:"appHeader",children:[Object(v.jsx)("h1",{className:"header",children:"COVID-19 Global Cases"}),Object(v.jsxs)(d.a.Control,{as:"select",value:n,onChange:ee,children:[Object(v.jsx)("option",{value:"worldwide",children:"Worldwide"}),p.map((function(e){return Object(v.jsx)("option",{value:e.value,children:e.name})}))]})]}),Object(v.jsxs)("div",{className:"appStats",children:[Object(v.jsx)(O,{onClick:function(e){return H("cases")},title:"Today Confirmed Cases",active:"cases"===Y,caseType:"cases",cases:V(o.todayCases),total:h()(o.cases).format("0.0a")}),Object(v.jsx)(O,{onClick:function(e){return H("recovered")},title:"Today Recovered",caseType:"recovered",active:"recovered"===Y,cases:V(o.todayRecovered),total:h()(o.recovered).format("0.0a")}),Object(v.jsx)(O,{onClick:function(e){return H("deaths")},title:"Today Deaths",caseType:"deaths",active:"deaths"===Y,cases:V(o.todayDeaths),total:h()(o.deaths).format("0.0a")})]}),Object(v.jsx)(R,{countries:N,casesType:Y,center:G,zoom:K})]}),Object(v.jsx)(j.a,{children:Object(v.jsx)(j.a.Body,{children:Object(v.jsxs)("div",{className:"appInformation",children:[Object(v.jsxs)("div",{className:"appTables",children:[Object(v.jsx)(T,{title:"Confirmed Cases by Country",countries:M}),Object(v.jsx)(S,{title:"Vaccines rolled out by Country",countries:X})]}),Object(v.jsxs)("div",{className:"appChart",children:[Object(v.jsxs)("h3",{className:"lineChartName",children:["Worldwide new ",Y," in last 4 months"]}),Object(v.jsx)(g,{title:!0,casesType:Y}),Object(v.jsx)("br",{}),Object(v.jsx)("h3",{className:"lineChartName",children:"worldwide"===n?"Vaccines rolled out in Ecuador (default select) in last 4 months":"Vaccines rolled out in ".concat(n," in last 4 months")}),Object(v.jsx)(k,{selectedCountryCode:"worldwide"===n?"EC":n})]})]})})})]})});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(Object(v.jsx)(c.a.StrictMode,{children:Object(v.jsx)(Y,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},79:function(e,t,n){},80:function(e,t,n){},93:function(e,t,n){},96:function(e,t,n){}},[[212,1,2]]]);
//# sourceMappingURL=main.95627fde.chunk.js.map