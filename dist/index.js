"use strict";(()=>{$(document).ready(()=>{let g=$(".cta_banner"),f=$(".navbar"),h=$(".footer-box"),S=$(f).height();$(window).on("scroll",()=>{if(g.length){let r=$(window).scrollTop()+$(window).height(),c=h.offset().top;window.scrollY>S*2?r>=c?g.removeClass("active"):g.addClass("active"):g.removeClass("active")}});function E(r,c){$(r).each(function(){new MutationObserver(e=>{e.forEach(n=>{n.type==="attributes"&&n.attributeName==="class"&&c(n.target)})}).observe(this,{attributes:!0,attributeFilter:["class"]})})}function T(r){$(r).hasClass("w--open")?f.addClass("open"):f.removeClass("open")}let w,v=!1;E(".w-nav-button",()=>{T(".w-nav-button"),v?($("html, body").scrollTop(w).removeClass("overflow-hidden"),$(".nav").removeClass("open")):(w=$(window).scrollTop(),$("html, body").scrollTop(0).addClass("overflow-hidden"),$(".nav").addClass("open")),v=!v});function A(){let r=document.querySelector("[data-modal-group-status]"),c=document.querySelectorAll("[data-modal-name]"),o=document.querySelectorAll("[data-modal-target]");o.forEach(e=>{e.addEventListener("click",function(){let n=this.getAttribute("data-modal-target");o.forEach(u=>u.setAttribute("data-modal-status","not-active")),c.forEach(u=>u.setAttribute("data-modal-status","not-active")),document.querySelector(`[data-modal-target="${n}"]`).setAttribute("data-modal-status","active"),document.querySelector(`[data-modal-name="${n}"]`).setAttribute("data-modal-status","active"),r&&r.setAttribute("data-modal-group-status","active")})}),document.querySelectorAll("[data-modal-close]").forEach(e=>{e.addEventListener("click",d)}),document.addEventListener("keydown",function(e){e.key==="Escape"&&d()});function d(){o.forEach(e=>e.setAttribute("data-modal-status","not-active")),r&&r.setAttribute("data-modal-group-status","not-active")}}A();function C(r={}){let o={...{videoSelector:".window-scroll-wall_video video",containerSelector:".section_window-scroll-wall",labelSelector:".window-scroll-wall_label",labels:[],scrubSpeed:.5,fadeOverlap:.1},...r},d=$(o.videoSelector);if(!d.length)return;let e=d[0],n=$(o.labelSelector),u=n.length;function L(){return n.map((t,b)=>{let a=o.labels[t],s=1/u;return{element:$(b),start:(a==null?void 0:a.start)/100,end:(a==null?void 0:a.end)/100}}).get()}e.muted=!0,e.playsInline=!0,e.setAttribute("playsinline",""),e.style.visibility="visible";function k(){gsap.registerPlugin(ScrollTrigger);let t=L();gsap.set(n,{opacity:0});let b=gsap.timeline({scrollTrigger:{trigger:o.containerSelector,start:"top top",end:"bottom bottom",scrub:o.scrubSpeed,markers:!0,onEnter:()=>e.currentTime=0,onUpdate:a=>{e.currentTime=a.progress*e.duration,t.forEach(({element:s,start:l,end:i})=>{let y=o.fadeOverlap,m=Math.min(y*(i-l),(i-l)/3),p=0;a.progress>=l&&a.progress<=i&&(a.progress<l+m?p=(a.progress-l)/m:a.progress>i-m?p=(i-a.progress)/m:p=1),s.css("opacity",Math.max(0,Math.min(1,p)))})},onLeave:()=>e.currentTime=e.duration,onEnterBack:()=>e.currentTime=0}});window.addEventListener("orientationchange",()=>ScrollTrigger.refresh()),window.addEventListener("resize",()=>ScrollTrigger.refresh())}function I(t,b){console.log("\u{1F50D} Checking video readiness..."),t.setAttribute("preload","auto"),t.setAttribute("playsinline",""),t.muted=!0,t.style.visibility="visible";let a=!1,s=()=>{a||(a=!0,console.log("\u{1F3AC} Video is ready! Firing callback..."),t.pause(),b())};if(t.load(),console.log(`\u2705 Initial readyState: ${t.readyState}`),t.readyState>=3){s();return}t.addEventListener("loadeddata",s,{once:!0}),t.addEventListener("canplaythrough",s,{once:!0}),t.addEventListener("error",y=>{console.error("\u274C Video error:",y)}),t.addEventListener("play",()=>{console.warn("\u{1F6AB} Video started unexpectedly. Pausing..."),t.pause()});let l=0,i=setInterval(()=>{console.warn(`\u23F3 Retry ${++l}: readyState ${t.readyState}`),t.readyState>=3&&(clearInterval(i),s()),l>=5&&(clearInterval(i),console.error("\u{1F6AB} Max retries reached. Video still not ready."))},1500);setTimeout(()=>{!a&&t.readyState>=2&&(console.warn("\u26A0\uFE0F Final fallback triggered."),s())},7e3)}I(e,()=>{console.log("\u{1F3D7}\uFE0F Initializing ScrollTrigger..."),k()})}C({labels:[{start:0,end:22},{start:22,end:34},{start:34,end:62},{start:62,end:66},{start:66,end:75},{start:75,end:85},{start:80,end:90},{start:90,end:100}]})});})();
