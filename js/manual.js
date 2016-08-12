var manual=function(t){function r(e){if(n[e])return n[e].exports;var _=n[e]={exports:{},id:e,loaded:!1};return t[e].call(_.exports,_,_.exports,r),_.loaded=!0,_.exports}var n={};return r.m=t,r.c=n,r.p="",r(0)}([function(t,r,n){t.exports=n(1)},function(t,r,n){"use strict";t.exports={wires:n(2),button:n(3),keypad:n(5),onFirst:n(6),memory:n(7),morse:n(8),complicatedWires:n(9),wireSequences:n(10),maze:n(11),passwords:n(14),knobs:n(15)}},function(t,r){"use strict";var n=function(t,r){var n=0;return t.forEach(function(t){return t===r&&n++}),n},e=function(t){return t[t.length-1]},_=function(t){return t.indexOf("r")===-1?"cut the second wire":"w"===e(t)?"cut the last wire":n(t,"b")>1?"cut the last blue wire":"cut the last wire"},o=function(t,r){var _=n(t,"r");return _>1&&r?"cut the last red wire":"y"===e(t)&&0===_||1===n(t,"b")?"cut the first wire":n(t,!1)?"cut the last wire":"cut the second wire"},i=function(t,r){return"k"===e(t)&&r?"cut the fourth wire":1===n(t,"r")&&n(t,!1)?"cut the first wire":0===n(t,"k")?"cut the second wire":"cut the first wire"},u=function(t,r){return 0===n(t,"y")&&r?"cut the third wire":1===n(t,"y")&&n(t,!1)?"cut the fourth wire":0===n(t,"r")?"cut the last wire":"cut the fourth wire"},a=function(t,r){var n=t.split("");switch(n.length){case 3:return _(n);case 4:return o(n,r);case 5:return i(n,r);case 6:return u(n,r);default:return"incorrect number of wires"}};t.exports={cut:a}},function(t,r,n){"use strict";var e=n(4),_=function(t){return t===e.BLUE?4:t===e.YELLOW?5:1},o=function(t,r,n,_){return t===e.BLUE&&"abort"===r?e.HOLD:n>1&&"detonate"===r?e.IMMEDIATE:t===e.WHITE||t===e.YELLOW||n>2&&_===e.YES?e.HOLD:n===-1&&_===e.YES||!_&&n>2||n===-1&&!_?e.INDETERMINATE:t===e.RED&&"hold"===r?e.IMMEDIATE:e.HOLD};t.exports={press:o,hold:_}},function(t,r){"use strict";t.exports={HOLD:"h",IMMEDIATE:"i",INDETERMINATE:"?",WHITE:"w",RED:"r",BLUE:"b",BLACK:"k",YELLOW:"y",YES:"y",NO:"n"}},function(t,r){"use strict";var n=[[1,2,3,4,5,6,7],[8,1,7,9,10,6,11],[12,13,9,14,15,3,10],[16,17,18,5,14,11,19],[20,19,18,21,17,22,23],[16,8,24,25,20,26,27]],e=function(t,r){return r.find(function(r){return r===parseInt(t)})},_=function(t,r,n,e,_){var o=[t.indexOf(parseInt(r)),t.indexOf(parseInt(n)),t.indexOf(parseInt(e)),t.indexOf(parseInt(_))].sort();return[t[o[0]],t[o[1]],t[o[2]],t[o[3]]]},o=function(t,r,o,i){var u=n.filter(function(n){return e(t,n)&&e(r,n)&&e(o,n)&&e(i,n)})[0];return _(u,t,r,o,i)};t.exports={find:o}},function(t,r){"use strict";var n={yes:["middle","left"],first:["top","right"],display:["bottom","right"],okay:["top","right"],says:["bottom","right"],nothing:["middle","left"],"":["bottom","left"],blank:["middle","right"],no:["bottom","right"],led:["middle","left"],lead:["bottom","right"],read:["middle","right"],red:["middle","right"],reed:["bottom","left"],leed:["bottom","left"],"hold on":["bottom","right"],you:["middle","right"],"you are":["bottom","right"],your:["top","right"],"you're":["top","right"],ur:["top","left"],there:["bottom","right"],"they're":["bottom","left"],their:["top","right"],"they are":["middle","left"],see:["bottom","right"],c:["top","right"],cee:["bottom","right"]},e={READY:"YES, OKAY, WHAT, MIDDLE, LEFT, PRESS, RIGHT, BLANK, READY",FIRST:"LEFT, OKAY, YES, MIDDLE, NO, RIGHT, NOTHING, UHHH, WAIT, READY, BLANK, WHAT, PRESS, FIRST",NO:"BLANK, UHHH, WAIT, FIRST, WHAT, READY, RIGHT, YES, NOTHING, LEFT, PRESS, OKAY, NO",BLANK:"WAIT, RIGHT, OKAY, MIDDLE, BLANK",NOTHING:"UHHH, RIGHT, OKAY, MIDDLE, YES, BLANK, NO, PRESS, LEFT, WHAT, WAIT, FIRST, NOTHING",YES:"OKAY, RIGHT, UHHH, MIDDLE, FIRST, WHAT, PRESS, READY, NOTHING, YES",WHAT:"UHHH, WHAT",UHHH:"READY, NOTHING, LEFT, WHAT, OKAY, YES, RIGHT, NO, PRESS, BLANK, UHHH",LEFT:"RIGHT, LEFT",RIGHT:"YES, NOTHING, READY, PRESS, NO, WAIT, WHAT, RIGHT",MIDDLE:"BLANK, READY, OKAY, WHAT, NOTHING, PRESS, NO, WAIT, LEFT, MIDDLE",OKAY:"MIDDLE, NO, FIRST, YES, UHHH, NOTHING, WAIT, OKAY",WAIT:"UHHH, NO, BLANK, OKAY, YES, LEFT, FIRST, PRESS, WHAT, WAIT",PRESS:"RIGHT, MIDDLE, YES, READY, PRESS",YOU:"SURE, YOU ARE, YOUR, YOU'RE, NEXT, UH HUH, UR, HOLD, WHAT?, YOU","YOU ARE":"YOUR, NEXT, LIKE, UH HUH, WHAT?, DONE, UH UH, HOLD, YOU, U, YOU'RE, SURE, UR, YOU ARE",YOUR:"UH UH, YOU ARE, UH HUH, YOUR","YOU'RE":"YOU, YOU'RE",UR:"DONE, U, UR",U:"UH HUH, SURE, NEXT, WHAT?, YOU'RE, UR, UH UH, DONE, U","UH HUH":"UH HUH","UH UH":"UR, U, YOU ARE, YOU'RE, NEXT, UH UH","WHAT?":"YOU, HOLD, YOU'RE, YOUR, U, DONE, UH UH, LIKE, YOU ARE, UH HUH, UR, NEXT, WHAT?",DONE:"SURE, UH HUH, NEXT, WHAT?, YOUR, UR, YOU'RE, HOLD, LIKE, YOU, U, YOU ARE, UH UH, DONE",NEXT:"WHAT?, UH HUH, UH UH, YOUR, HOLD, SURE, NEXT",HOLD:"YOU ARE, U, DONE, UH UH, YOU, UR, SURE, WHAT?, YOU'RE, NEXT, HOLD",SURE:"YOU ARE, DONE, LIKE, YOU'RE, YOU, HOLD, UH HUH, UR, SURE",LIKE:"YOU'RE, NEXT, U, UR, HOLD, DONE, UH UH, WHAT?, UH HUH, YOU, LIKE"},_=function(t){return n[t]},o=function(t){return e[t]};t.exports={findPosition:_,getWords:o}},function(t,r){"use strict";var n=function(t){return{position:Math.max(2,parseInt(t))}},e=function(t,r){return 1==t?{label:4}:2==t||4==t?{position:r[0].position}:3==t?{position:1}:void 0},_=function(t,r){return 1==t?{label:r[1].label}:2==t?{label:r[0].label}:3==t?{position:3}:4==t?{label:4}:void 0},o=function(t,r){return 1==t?{position:r[0].position}:2==t?{position:1}:3==t||4==t?{position:r[1].position}:void 0},i=function(t,r){return 1==t?{label:r[0].label}:2==t?{label:r[1].label}:3==t?{label:r[3].label}:4==t?{label:r[2].label}:void 0},u=[n,e,_,o,i],a=void 0,c=function(){a=[]},s=function(t){for(var r=u[a.length](t,a),n=arguments.length,e=Array(n>1?n-1:0),_=1;_<n;_++)e[_-1]=arguments[_];return r.position?r.label=e[r.position-1]:r.label&&(r.position=e.indexOf(r.label)+1),a.push(r),r.label};t.exports={init:c,getNumber:s}},function(t,r){"use strict";var n={a:".-",b:"-...",c:"-.-.",d:"-..",e:".",f:"..-.",g:"--.",h:"....",i:"..",j:".---",k:"-.-",l:".-..",m:"--",n:"-.",o:"---",p:".--.",q:"--.-",r:".-.",s:"...",t:"-",u:"..-",v:"...-",w:".--",x:"-..-",y:"-.--",z:"--..",1:".----",2:"..---",3:"...--",4:"....-",5:".....",6:"-....",7:"--...",8:"---..",9:"----.",0:"-----"},e={shell:"3.505 MHz",halls:"3.515 MHz",slick:"3.522 MHz",trick:"3.532 MHz",boxes:"3.535 MHz",leaks:"3.542 MHz",strobe:"3.545 MHz",bistro:"3.552 MHz",flick:"3.555 MHz",bombs:"3.565 MHz","break":"3.572 MHz",brick:"3.575 MHz",steak:"3.582 MHz",sting:"3.592 MHz",vector:"3.595 MHz",beats:"3.600 MHz"},_=function(t){var r={},e=!0,_=!1,o=void 0;try{for(var i,u=t[Symbol.iterator]();!(e=(i=u.next()).done);e=!0){var a=i.value,c=a.split(""),s=[],l=!0,f=!1,H=void 0;try{for(var E,U=c[Symbol.iterator]();!(l=(E=U.next()).done);l=!0){var h=E.value;s.push(n[h])}}catch(d){f=!0,H=d}finally{try{!l&&U["return"]&&U["return"]()}finally{if(f)throw H}}r[s.join("")]=a}}catch(d){_=!0,o=d}finally{try{!e&&u["return"]&&u["return"]()}finally{if(_)throw o}}return r},o=function(t){var r={};for(var n in t)r[n+"b"+n]=t[n];return r},i=function(t,r){var n=Object.keys(t),e=[],_=!0,o=!1,i=void 0;try{for(var u,a=n[Symbol.iterator]();!(_=(u=a.next()).done);_=!0){var c=u.value;c.includes(r)&&e.push(t[c])}}catch(s){o=!0,i=s}finally{try{!_&&a["return"]&&a["return"]()}finally{if(o)throw i}}return e},u=function(t){var r=[],n=!0,_=!1,o=void 0;try{for(var i,u=t[Symbol.iterator]();!(n=(i=u.next()).done);n=!0){var a=i.value;r.push(a+": "+e[a])}}catch(c){_=!0,o=c}finally{try{!n&&u["return"]&&u["return"]()}finally{if(_)throw o}}return r.join("\n")},a=function(t){var r=Object.keys(e),n=o(_(r)),a=i(n,t);return 0===a.length?"no matches found":u(a)};t.exports={interpret:a}},function(t,r,n){"use strict";var e=n(4),_={"0w0":"c","0w1":"c","1w0":"d","1w1":"b","0r0":"s","0r1":"c","1r0":"b","1r1":"b","0b0":"s","0b1":"d","1b0":"p","1b1":"p","0br0":"s","0br1":"p","1br0":"s","1br1":"d"},o=function(t){var r=t.includes(e.RED),n=t.includes(e.BLUE);return r&&n?e.BLUE+e.RED:r?"r":n?"b":"w"},i=function(t){return t?1:0},u=function(t,r,n){r=o(r);var e=_[""+i(t)+r+i(n)];return e};t.exports={shouldCut:u}},function(t,r){"use strict";var n=[["c"],["b"],["a"],["a","c"],["b"],["a","c"],["a","b","c"],["a","b"],["b"]],e=[["b"],["a","c"],["b"],["a"],["b"],["b","c"],["c"],["a","c"],["a"]],_=[["a","b","c"],["a","c"],["b"],["a","c"],["b"],["b","c"],["a","b"],["c"]],o={r:n,b:e,k:_},i=void 0,u=function(){i={r:0,b:0,k:0}},a=function(t,r){var n=o[t][i[t]].indexOf(r)!==-1;return i[t]++,n};t.exports={init:u,shouldCut:a}},function(t,r,n){(function(r){"use strict";var e=n(13),_=6,o=6,i=1,u=2,a=4,c=8,s=function(t,r){for(var n=[],e=0;e<t;e++)n.push(Array(r).fill(0));return n},l=function(t){var r=!0,n=!1,e=void 0;try{for(var l,f=t[Symbol.iterator]();!(r=(l=f.next()).done);r=!0){var H=l.value,E=s(o,_),U=H.mazeData.split("\n");U.shift();for(var h=0;h<o;h++)for(var d=0;d<_;d++)" "!==U[h][2*d+1]&&(E[d][h]|=i),"|"===U[h+1][2*d]&&(E[d][h]|=c)," "!==U[h+1][2*d+1]&&(E[d][h]|=a),"|"===U[h+1][2*d+2]&&(E[d][h]|=u);H.maze=E}}catch(O){n=!0,e=O}finally{try{!r&&f["return"]&&f["return"]()}finally{if(n)throw e}}},f=function(t,r){return t[0]===r[0]&&t[1]===r[1]},H=function(t,r){return r===c?[t[0]-1,t[1]]:r===i?[t[0],t[1]-1]:r===u?[t[0]+1,t[1]]:r===a?[t[0],t[1]+1]:void 0},E=function d(t,r,n,e){if(f(r,n))return[r];for(var _=t[r[0]][r[1]],o=[i,a,c,u],s=0;s<o.length;s++){var l=o[s];if(0===(_&l)&&!f(e,H(r,l))){var E=d(t,H(r,l),n,r);if(E)return E.unshift(r),E}}return!1},U=function(t){return H(H(t,c),i)},h=function(t,r,n){var _=e.find(function(r){return r.coords.some(function(r){return f(r,t)})});return E(_.maze,U(r),U(n),[-1,-1])};l(e),t.exports={getPath:h}}).call(r,n(12))},function(t,r){function n(){l&&c&&(l=!1,c.length?s=c.concat(s):f=-1,s.length&&e())}function e(){if(!l){var t=i(n);l=!0;for(var r=s.length;r;){for(c=s,s=[];++f<r;)c&&c[f].run();f=-1,r=s.length}c=null,l=!1,u(t)}}function _(t,r){this.fun=t,this.array=r}function o(){}var i,u,a=t.exports={};!function(){try{i=setTimeout}catch(t){i=function(){throw new Error("setTimeout is not defined")}}try{u=clearTimeout}catch(t){u=function(){throw new Error("clearTimeout is not defined")}}}();var c,s=[],l=!1,f=-1;a.nextTick=function(t){var r=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)r[n-1]=arguments[n];s.push(new _(t,r)),1!==s.length||l||i(e,0)},_.prototype.run=function(){this.fun.apply(null,this.array)},a.title="browser",a.browser=!0,a.env={},a.argv=[],a.version="",a.versions={},a.on=o,a.addListener=o,a.once=o,a.off=o,a.removeListener=o,a.removeAllListeners=o,a.emit=o,a.binding=function(t){throw new Error("process.binding is not supported")},a.cwd=function(){return"/"},a.chdir=function(t){throw new Error("process.chdir is not supported")},a.umask=function(){return 0}},function(t,r){"use strict";t.exports=[{coords:[[1,2],[6,3]],mazeData:"\n.___________.\n| ._. | .___|\n| | ._|___. |\n| |_. | ._. |\n| |_____|_. |\n| ._. | ._| |\n|___|___|___|\n"},{coords:[[2,4],[5,2]],mazeData:"\n.___________.\n|_. ._|   ._|\n| ._| ._|_. |\n| | ._| ._. |\n| ._| ._| | |\n| | | | ._| |\n|_|___|_____|\n"},{coords:[[4,4],[6,4]],mazeData:"\n.___________.\n| ._. | | . |\n|_| | |___| |\n| . | | . | |\n| | | | | | |\n| |___| | | |\n|_______|___|\n"},{coords:[[1,1],[1,4]],mazeData:"\n.___________.\n| . |_____. |\n| | | .___. |\n| |___| ._| |\n| |_______. |\n| ._____. | |\n|_____|___|_|\n"},{coords:[[4,6],[5,3]],mazeData:"\n.___________.\n|_______. . |\n| .___. ._|_|\n| . |___| . |\n| |___. |_| |\n| | ._____| |\n|_|_________|\n"},{coords:[[3,5],[5,1]],mazeData:"\n.___________.\n| | . |_. . |\n| | | | ._| |\n| ._|_| | ._|\n|_. | . | | |\n| ._|_| |_. |\n|_______|___|\n"},{coords:[[2,1],[2,6]],mazeData:"\n.___________.\n| .___. | . |\n| | ._|___| |\n|___| ._| ._|\n| . | .___| |\n| |_|___. | |\n|___________|\n"},{coords:[[3,4],[4,1]],mazeData:"\n.___________.\n| | ._. | . |\n| .___|___| |\n| | .___. | |\n| |_. |_____|\n| | |_______|\n|___________|\n"},{coords:[[1,5],[3,2]],mazeData:"\n.___________.\n| | .___. . |\n| | | ._| | |\n| .___| ._| |\n| | | ._|_. |\n| | | | . |_|\n|___|___|___|\n"}]},function(t,r){"use strict";var n=["about","after","again","below","could","every","first","found","great","house","large","learn","never","other","place","plant","point","right","small","sound","spell","still","study","their","there","these","thing","think","three","water","where","which","world","would","write"],e=function(t,r){var e=[];return n.forEach(function(n){t.indexOf(n[0])!==-1&&r.indexOf(n[n.length-1])!==-1&&e.push(n)}),e};t.exports={crack:e}},function(t,r){"use strict";var n=function(t,r){return 0===t[0]&&1===t[1]&&1===r[0]&&0===r[1]?"UP":0===t[0]&&0===t[1]&&1===r[0]&&1===r[1]?"UP":0===t[0]&&1===t[1]&&0===r[0]&&0===r[1]?"DOWN":0===t[0]&&0===t[1]&&1===r[0]&&0===r[1]?"DOWN":0===t[0]&&1===t[1]&&1===r[0]&&1===r[1]?"LEFT":1===t[0]&&0===t[1]&&1===r[0]&&1===r[1]?"RIGHT":1===t[0]&&0===t[1]&&0===r[0]&&1===r[1]?"RIGHT":void 0};t.exports={getPosition:n}}]);
//# sourceMappingURL=manual.js.map