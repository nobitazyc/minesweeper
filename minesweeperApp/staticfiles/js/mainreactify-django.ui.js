(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,a){e.exports=a(56)},25:function(e,t,a){},27:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},28:function(e,t,a){},56:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),o=a(16),i=a.n(o),c=(a(25),a(3)),l=a(4),r=a(6),u=a(5),p=a(7),h=(a(27),a(28),a(17)),f=a.n(h),m=a(8),g=a.n(m),d=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(r.a)(this,Object(u.a)(t).call(this,e))).state={crf_token:f.a.get("csrftoken"),user:"admin",gameMap:[],flagMap:[],level:1,lost:!1,win:!1},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;g.a.get("/minesweeperApp/usermap/").then(function(t){e.setState({gameMap:JSON.parse(t.data.map)},e.setFlag)})}},{key:"setFlag",value:function(){for(var e=this.state.gameMap.length,t=this.state.gameMap[0].length,a=[],n=0;n<e;n++){for(var s=[],o=0;o<t;o++)s.push(0);a.push(s)}this.setState({flagMap:a})}},{key:"handleClick",value:function(e,t,a){var n=this;this.state.flagMap.length&&1===this.state.flagMap[t][a]||this.state.lost||g.a.post("/minesweeperApp/usermap/",{row:t,column:a},{headers:{"X-CSRFTOKEN":this.state.crf_token}}).then(function(e){n.setState({gameMap:JSON.parse(e.data.map)},n.checkLost)})}},{key:"contextMenu",value:function(e,t,a){e.preventDefault();var n=this.state.flagMap;n[t][a]=1-n[t][a],this.setState({flagMap:n})}},{key:"checkLost",value:function(){var e=this,t=0;this.state.gameMap.map(function(a){a.map(function(a){0==a[1]&&t++,-1==a[0]&&1==a[1]&&e.setState({lost:!0})})}),8===t&&this.setState({win:!0})}},{key:"resetMap",value:function(e){var t=this;g.a.post("/minesweeperApp/refresh/",{},{headers:{"X-CSRFTOKEN":this.state.crf_token}}).then(function(e){console.log(e),t.setState({gameMap:JSON.parse(e.data.map)},t.setFlag)}),this.setState({lost:!1}),this.setState({win:!1})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"container"},this.state.gameMap.map(function(t,a){return s.a.createElement("div",null,t.map(function(t,n){return s.a.createElement("div",{onClick:function(t){e.handleClick(t,a,n)},onContextMenu:function(t){e.contextMenu(t,a,n)},className:(1===t[1]?"opened":"closed")+(0===t[0]?" transparent":"")+" cell"},1===(e.state.flagMap.length&&e.state.flagMap[a][n])?s.a.createElement("i",{class:"fa fa-flag"}):-1===t[0]?s.a.createElement("i",{class:"fa fa-circle"}):t[0])}))}),this.state.lost?s.a.createElement("label",null,"You Lost"):"",this.state.win?s.a.createElement("label",null,"You Win"):"",s.a.createElement("button",{onClick:function(t){e.resetMap(t)}},"reset"))}}]),t}(n.Component),v=a(18),k=function(e){function t(){return Object(c.a)(this,t),Object(r.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement(v.a,null,s.a.createElement("div",{className:"App"},s.a.createElement(d,null)))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(52),a(54);i.a.render(s.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[19,2,1]]]);
//# sourceMappingURL=main.315bd789.chunk.js.map