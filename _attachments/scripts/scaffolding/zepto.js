var Zepto=(function(){var i,n,H,a,B=[],k=B.slice,e=window.document,A={},C={},l=e.defaultView.getComputedStyle,K={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},p=/^\s*<(\w+)[^>]*>/,w=[1,9,11],q=["prepend","after","before","append"],x=["append","prepend"],o=e.createElement("table"),D=e.createElement("tr"),g={tr:e.createElement("tbody"),tbody:o,thead:o,tfoot:o,td:D,th:D,"*":e.createElement("div")};
function v(L){return({}).toString.call(L)=="[object Function]"}function r(L){return L instanceof Object}function z(L){return L instanceof Array
}function t(L){return typeof L.length=="number"}function J(L){return L.filter(function(M){return M!==i&&M!==null})}function u(L){return L.length>0?[].concat.apply([],L):L
}function I(L){return L.replace(/-+(.)?/g,function(M,N){return N?N.toUpperCase():""})}function j(L){return L.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()
}function E(L){return L.filter(function(N,M,O){return O.indexOf(N)==M})}function F(L){return L in C?C[L]:(C[L]=new RegExp("(^|\\s)"+L+"(\\s|$)"))
}function f(L,M){return(typeof M=="number"&&!K[j(L)])?M+"px":M}function G(N){var L,M;if(!A[N]){L=e.createElement(N);e.body.appendChild(L);
M=l(L,"").getPropertyValue("display");L.parentNode.removeChild(L);M=="none"&&(M="block");A[N]=M}return A[N]}function d(N,M){if(M===i){p.test(N)&&RegExp.$1
}if(!(M in g)){M="*"}var L=g[M];L.innerHTML=""+N;return k.call(L.childNodes)}function b(M,L){M=M||B;M.__proto__=b.prototype;
M.selector=L||"";return M}function y(L,M){if(!L){return b()}if(M!==i){return y(M).find(L)}else{if(v(L)){return y(e).ready(L)
}else{if(L instanceof b){return L}else{var N;if(z(L)){N=J(L)}else{if(w.indexOf(L.nodeType)>=0||L===window){N=[L],L=null}else{if(p.test(L)){N=d(L,RegExp.$1),L=null
}else{if(L.nodeType&&L.nodeType==3){N=[L]}else{N=H(e,L)}}}}return b(N,L)}}}}y.extend=function(L){k.call(arguments,1).forEach(function(M){for(n in M){L[n]=M[n]
}});return L};y.qsa=H=function(M,L){return k.call(M.querySelectorAll(L))};function s(M,L){return L===i?y(M):y(M).filter(L)
}function m(N,M,L,O){return v(M)?M.call(N,L,O):M}y.isFunction=v;y.isObject=r;y.isArray=z;y.map=function(P,Q){var O,L=[],N,M;
if(t(P)){for(N=0;N<P.length;N++){O=Q(P[N],N);if(O!=null){L.push(O)}}}else{for(M in P){O=Q(P[M],M);if(O!=null){L.push(O)}}}return u(L)
};y.each=function(N,O){var M,L;if(t(N)){for(M=0;M<N.length;M++){if(O(M,N[M])===false){return N}}}else{for(L in N){if(O(L,N[L])===false){return N
}}}return N};y.fn={forEach:B.forEach,reduce:B.reduce,push:B.push,indexOf:B.indexOf,concat:B.concat,map:function(L){return y.map(this,function(N,M){return L.call(N,M,N)
})},slice:function(){return y(k.apply(this,arguments))},ready:function(L){if(e.readyState=="complete"||e.readyState=="loaded"){L()
}e.addEventListener("DOMContentLoaded",L,false);return this},get:function(L){return L===i?this:this[L]},size:function(){return this.length
},remove:function(){return this.each(function(){if(this.parentNode!=null){this.parentNode.removeChild(this)}})},each:function(L){this.forEach(function(N,M){L.call(N,M,N)
});return this},filter:function(L){return y([].filter.call(this,function(M){return H(M.parentNode,L).indexOf(M)>=0}))},end:function(){return this.prevObject||y()
},add:function(L,M){return y(E(this.concat(y(L,M))))},is:function(L){return this.length>0&&y(this[0]).filter(L).length>0},not:function(L){var M=[];
if(v(L)&&L.call!==i){this.each(function(O){if(!L.call(this,O)){M.push(this)}})}else{var N=typeof L=="string"?this.filter(L):(t(L)&&v(L.item))?k.call(L):y(L);
this.forEach(function(O){if(N.indexOf(O)<0){M.push(O)}})}return y(M)},eq:function(L){return L===-1?this.slice(L):this.slice(L,+L+1)
},first:function(){return y(this[0])},last:function(){return y(this[this.length-1])},find:function(M){var L;if(this.length==1){L=H(this[0],M)
}else{L=this.map(function(){return H(this,M)})}return y(L)},closest:function(L,N){var O=this[0],M=H(N!==i?N:e,L);if(M.length===0){O=null
}while(O&&O!==e&&M.indexOf(O)<0){O=O.parentNode}return y(O!==e&&O)},parents:function(L){var N=[],M=this;while(M.length>0){M=y.map(M,function(O){if((O=O.parentNode)&&O!==e&&N.indexOf(O)<0){N.push(O);
return O}})}return s(N,L)},parent:function(L){return s(E(this.pluck("parentNode")),L)},children:function(L){return s(this.map(function(){return k.call(this.children)
}),L)},siblings:function(L){return s(this.map(function(M,N){return k.call(N.parentNode.children).filter(function(O){return O!==N
})}),L)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(L){return this.map(function(){return this[L]
})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display=null);if(l(this,"").getPropertyValue("display")=="none"){this.style.display=G(this.nodeName)
}})},replaceWith:function(L){return this.each(function(){var N=this.parentNode,M=this.nextSibling;y(this).remove();M?y(M).before(L):y(N).append(L)
})},wrap:function(L){return this.each(function(){y(this).wrapAll(y(L)[0].cloneNode(false))})},wrapAll:function(L){if(this[0]){y(this[0]).before(L=y(L));
L.append(this)}return this},unwrap:function(){this.parent().each(function(){y(this).replaceWith(y(this).children())});return this
},hide:function(){return this.css("display","none")},toggle:function(L){return(L===i?this.css("display")=="none":L)?this.show():this.hide()
},prev:function(){return y(this.pluck("previousElementSibling"))},next:function(){return y(this.pluck("nextElementSibling"))
},html:function(L){return L===i?(this.length>0?this[0].innerHTML:null):this.each(function(M){var N=this.innerHTML;y(this).empty().append(m(this,L,M,N))
})},text:function(L){return L===i?(this.length>0?this[0].textContent:null):this.each(function(){this.textContent=L})},attr:function(L,M){return(typeof L=="string"&&M===i)?(this.length>0&&this[0].nodeName=="INPUT"&&this[0].type=="text"&&L=="value")?(this.val()):(this.length>0?this[0].getAttribute(L)||(L in this[0]?this[0][L]:i):i):this.each(function(N){if(r(L)){for(n in L){this.setAttribute(n,L[n])
}}else{this.setAttribute(L,m(this,M,N,this.getAttribute(L)))}})},removeAttr:function(L){return this.each(function(){this.removeAttribute(L)
})},data:function(L,M){return this.attr("data-"+L,M)},val:function(L){return(L===i)?(this.length>0?this[0].value:null):this.each(function(){this.value=L
})},offset:function(){if(this.length==0){return null}var L=this[0].getBoundingClientRect();return{left:L.left+e.body.scrollLeft,top:L.top+e.body.scrollTop,width:L.width,height:L.height}
},css:function(N,M){if(M===i&&typeof N=="string"){return this[0].style[I(N)]||l(this[0],"").getPropertyValue(N)}var L="";
for(n in N){L+=j(n)+":"+f(n,N[n])+";"}if(typeof N=="string"){L=j(N)+":"+f(N,M)}return this.each(function(){this.style.cssText+=";"+L
})},index:function(L){return L?this.indexOf(y(L)[0]):this.parent().children().indexOf(this[0])},hasClass:function(L){if(this.length<1){return false
}else{return F(L).test(this[0].className)}},addClass:function(L){return this.each(function(M){a=[];var O=this.className,N=m(this,L,M,O);
N.split(/\s+/g).forEach(function(P){if(!y(this).hasClass(P)){a.push(P)}},this);a.length&&(this.className+=(O?" ":"")+a.join(" "))
})},removeClass:function(L){return this.each(function(M){if(L===i){return this.className=""}a=this.className;m(this,L,M,a).split(/\s+/g).forEach(function(N){a=a.replace(F(N)," ")
});this.className=a.trim()})},toggleClass:function(M,L){return this.each(function(N){var P=this.className,O=m(this,M,N,P);
((L!==i&&!L)||y(this).hasClass(O))?y(this).removeClass(O):y(this).addClass(O)})}};"filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings".split(",").forEach(function(M){var L=y.fn[M];
y.fn[M]=function(){var N=L.apply(this,arguments);N.prevObject=this;return N}});["width","height"].forEach(function(L){y.fn[L]=function(M){var N;
if(M===i){return(N=this.offset())&&N[L]}else{return this.css(L,M)}}});function h(L,O,N){var M=(!L||L==3)?O:O.parentNode;M.insertBefore(N,!L?M.firstChild:L==1?O.nextSibling:L==2?O:null)
}function c(M,L){L(M);for(n in M.childNodes){c(M.childNodes[n],L)}}q.forEach(function(M,L){y.fn[M]=function(P){var N=typeof(P)=="object"?P:d(P);
if(!("length" in N)){N=[N]}if(N.length<1){return this}var O=this.length,Q=O>1,R=L<2;return this.each(function(S,V){for(var T=0;
T<N.length;T++){var U=N[R?N.length-T-1:T];c(U,function(W){if(W.nodeName!=null&&W.nodeName.toUpperCase()==="SCRIPT"){window["eval"].call(window,W.innerHTML)
}});if(Q&&S<O-1){U=U.cloneNode(true)}h(L,V,U)}})}});x.forEach(function(L){y.fn[L+"To"]=function(M){if(typeof(M)!="object"){M=y(M)
}M[L](this);return this}});b.prototype=y.fn;return y})();"$" in window||(window.$=Zepto);