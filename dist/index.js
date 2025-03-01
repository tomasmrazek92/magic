"use strict";(()=>{$(document).ready(()=>{let y=$(".cta_banner"),f=$(".navbar"),x=$(".footer-box"),_=$(f).height();$(window).on("scroll",()=>{if(y.length){let s=$(window).scrollTop()+$(window).height(),p=x.offset().top;window.scrollY>_*2?s>=p?y.removeClass("active"):y.addClass("active"):y.removeClass("active")}f.length&&(window.scrollY>_*2?f.addClass("fixed"):f.removeClass("fixed"))});function M(s,p){$(s).each(function(){new MutationObserver(c=>{c.forEach(o=>{o.type==="attributes"&&o.attributeName==="class"&&p(o.target)})}).observe(this,{attributes:!0,attributeFilter:["class"]})})}function P(s){$(s).hasClass("w--open")?f.addClass("open"):f.removeClass("open")}let q,C=!1;M(".w-nav-button",()=>{P(".w-nav-button"),C?($("html, body").scrollTop(q).removeClass("overflow-hidden"),$(".nav").removeClass("open")):(q=$(window).scrollTop(),$("html, body").scrollTop(0).addClass("overflow-hidden"),$(".nav").addClass("open")),C=!C});function F(){let s=document.querySelector("[data-modal-group-status]"),p=document.querySelectorAll("[data-modal-name]"),t=document.querySelectorAll("[data-modal-target]");t.forEach(c=>{c.addEventListener("click",function(){let o=this.getAttribute("data-modal-target");t.forEach(u=>u.setAttribute("data-modal-status","not-active")),p.forEach(u=>u.setAttribute("data-modal-status","not-active")),document.querySelector(`[data-modal-target="${o}"]`).setAttribute("data-modal-status","active"),document.querySelector(`[data-modal-name="${o}"]`).setAttribute("data-modal-status","active"),s&&s.setAttribute("data-modal-group-status","active")})}),document.querySelectorAll("[data-modal-close]").forEach(c=>{c.addEventListener("click",w)}),document.addEventListener("keydown",function(c){c.key==="Escape"&&w()});function w(){t.forEach(c=>c.setAttribute("data-modal-status","not-active")),s&&s.setAttribute("data-modal-group-status","not-active")}}F();function A(s={}){let t={...{containerSelector:".section_window-scroll-wall",videoSelector:".window-scroll-wall_video video",labelSelector:".window-scroll-wall_label",loadingElement:".window-scroll-wall_loading",loadingClass:"wall-loading",labels:[],scrubSpeed:.5,fadeOverlap:.1},...s},w=$(t.videoSelector);if(!$(t.containerSelector).length)return;let o=w[0],u=$(t.labelSelector),B=u.length;function z(){return u.map((e,h)=>{let n=t.labels[e],d=1/B;return{element:$(h),start:(n==null?void 0:n.start)/100,end:(n==null?void 0:n.end)/100}}).get()}o.muted=!0,o.playsInline=!0,o.setAttribute("playsinline",""),o.style.visibility="visible";function O(){gsap.registerPlugin(ScrollTrigger);let e=z(),h=-1,n,d=!1,m=[],L=3;function k(l){for(m.push(l);m.length>L;)m.shift();if(m.length<2)return l;let g=0,i=0;for(let b=0;b<m.length;b++){let S=b+1;i+=m[b]*S,g+=S}return i/g}function a(){d&&(Math.abs(r-o.currentTime)>.01&&(o.currentTime=r),requestAnimationFrame(a))}let r=0,v=gsap.timeline({scrollTrigger:{trigger:t.containerSelector,start:"top top",end:"bottom bottom",scrub:!0,onUpdate:l=>{let g=l.progress*o.duration;r=k(g),d||(d=!0,a()),e.forEach(i=>{let b=t.fadeOverlap,S=i.end-i.start,T=Math.min(b*S,S/3),E=0;l.progress>=i.start&&l.progress<=i.end&&(l.progress<i.start+T?E=(l.progress-i.start)/T:l.progress>i.end-T?E=(i.end-l.progress)/T:E=1),i.element.css("opacity",Math.max(0,Math.min(1,E)))})},onEnter:()=>{r=0,o.currentTime=0},onLeave:()=>{r=o.duration,o.currentTime=o.duration},onEnterBack:()=>{r=o.duration,o.currentTime=o.duration},onLeaveBack:()=>{r=0,o.currentTime=0},fastScrollEnd:!0}});ScrollTrigger.addEventListener("scrollEnd",function(){d=!1}),document.addEventListener("visibilitychange",function(){d=!document.hidden&&ScrollTrigger.isScrolling()})}function R(e){return new Promise(h=>{e.setAttribute("preload","auto"),e.setAttribute("playsinline",""),e.muted=!0,e.style.opacity="0",e.style.visibility="hidden";let n=10,d=new Array(n).fill(!1);function m(){return d.every(a=>a===!0)}function L(a){return new Promise(r=>{let v=e.duration/n,l=a*v;console.log(`Preloading segment ${a+1}/${n} at time ${l.toFixed(2)}`),e.currentTime=l;function g(){e.readyState===4?(d[a]=!0,r()):setTimeout(g,200)}g()})}async function k(){e.readyState===0&&await new Promise(a=>{e.addEventListener("loadedmetadata",a,{once:!0}),e.load()});try{e.currentTime=0,e.playbackRate=8,await e.play(),await new Promise(a=>setTimeout(a,1e3)),e.pause()}catch(a){console.warn("Fast preload attempt failed:",a)}for(let a=0;a<n;a++)if(await L(a),t.loadingElement){let r=((a+1)/n*100).toFixed(0);$(t.loadingElement).find(".progress-text").text(`${r}%`)}for(let a=0;a<3;a++){let r=Math.random()*e.duration;e.currentTime=r,await new Promise(v=>setTimeout(v,300))}e.currentTime=0,e.style.opacity="1",e.style.visibility="visible",t.loadingElement&&$(t.loadingElement).hide(),t.containerSelector&&t.loadingClass&&$(t.containerSelector).removeClass(t.loadingClass),h(e)}k().catch(a=>{console.error("Error during video preloading:",a),e.style.opacity="1",e.style.visibility="visible",t.loadingElement&&$(t.loadingElement).hide(),t.containerSelector&&t.loadingClass&&$(t.containerSelector).removeClass(t.loadingClass),h(e)})})}gsap.set(u,{opacity:0}),$(t.containerSelector).addClass(t.loadingClass),R(o).then(()=>{O()}).catch(e=>{console.log(e)})}A({containerSelector:".section_window-scroll-wall",labels:[{start:0,end:22},{start:22,end:34},{start:34,end:62},{start:62,end:66},{start:66,end:75},{start:75,end:85},{start:85,end:90},{start:90,end:100}]}),A({containerSelector:".section_windowwall-scroll-wall",labels:[{start:0,end:20},{start:58,end:75},{start:75,end:85},{start:85,end:100}]}),A({containerSelector:".section_patiodoors-scroll-wall",labels:[{start:0,end:14},{start:14,end:29},{start:29,end:62},{start:62,end:66},{start:66,end:71},{start:71,end:86},{start:86,end:100}]})});})();
