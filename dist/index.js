"use strict";(()=>{$(document).ready(()=>{let b=$(".cta_banner"),f=$(".navbar"),y=$(".footer-box"),A=$(f).height();$(window).on("scroll",()=>{if(b.length){let a=$(window).scrollTop()+$(window).height(),i=y.offset().top;window.scrollY>A*2?a>=i?b.removeClass("active"):b.addClass("active"):b.removeClass("active")}});function E(a,i){$(a).each(function(){new MutationObserver(r=>{r.forEach(t=>{t.type==="attributes"&&t.attributeName==="class"&&i(t.target)})}).observe(this,{attributes:!0,attributeFilter:["class"]})})}function T(a){$(a).hasClass("w--open")?f.addClass("open"):f.removeClass("open")}let h,v=!1;E(".w-nav-button",()=>{T(".w-nav-button"),v?($("html, body").scrollTop(h).removeClass("overflow-hidden"),$(".nav").removeClass("open")):(h=$(window).scrollTop(),$("html, body").scrollTop(0).addClass("overflow-hidden"),$(".nav").addClass("open")),v=!v});function C(){let a=document.querySelector("[data-modal-group-status]"),i=document.querySelectorAll("[data-modal-name]"),o=document.querySelectorAll("[data-modal-target]");o.forEach(r=>{r.addEventListener("click",function(){let t=this.getAttribute("data-modal-target");o.forEach(c=>c.setAttribute("data-modal-status","not-active")),i.forEach(c=>c.setAttribute("data-modal-status","not-active")),document.querySelector(`[data-modal-target="${t}"]`).setAttribute("data-modal-status","active"),document.querySelector(`[data-modal-name="${t}"]`).setAttribute("data-modal-status","active"),a&&a.setAttribute("data-modal-group-status","active")})}),document.querySelectorAll("[data-modal-close]").forEach(r=>{r.addEventListener("click",u)}),document.addEventListener("keydown",function(r){r.key==="Escape"&&u()});function u(){o.forEach(r=>r.setAttribute("data-modal-status","not-active")),a&&a.setAttribute("data-modal-group-status","not-active")}}C();function w(a={}){let o={...{containerSelector:".section_window-scroll-wall",videoSelector:".window-scroll-wall_video video",labelSelector:".window-scroll-wall_label",labels:[],scrubSpeed:.5,fadeOverlap:.1},...a},u=$(o.videoSelector),r=$(o.containerSelector);if(!r.length)return;let t=u[0],c=$(o.labelSelector),L=c.length;function _(){return c.map((e,d)=>{let s=o.labels[e],n=1/L;return{element:$(d),start:(s==null?void 0:s.start)/100,end:(s==null?void 0:s.end)/100}}).get()}t.muted=!0,t.playsInline=!0,t.setAttribute("playsinline",""),t.style.visibility="visible";function q(){gsap.registerPlugin(ScrollTrigger);let e=_(),d=-1,s=gsap.timeline({scrollTrigger:{trigger:o.containerSelector,start:"top top",end:"bottom bottom",scrub:o.scrubSpeed,onUpdate:n=>{let g=n.progress*t.duration;Math.abs(g-d)>.1&&(requestAnimationFrame(()=>{t.currentTime=g}),d=g),e.forEach(l=>{let k=o.fadeOverlap,S=l.end-l.start,m=Math.min(k*S,S/3),p=0;n.progress>=l.start&&n.progress<=l.end&&(n.progress<l.start+m?p=(n.progress-l.start)/m:n.progress>l.end-m?p=(l.end-n.progress)/m:p=1),l.element.css("opacity",Math.max(0,Math.min(1,p)))})},onEnter:()=>t.currentTime=0,onLeave:()=>t.currentTime=t.duration,onEnterBack:()=>t.currentTime=t.duration}})}function M(e){return new Promise(d=>{e.setAttribute("preload","auto"),e.setAttribute("playsinline",""),e.muted=!0,e.style.visibility="visible";function s(){$(".window-scroll-wall_loading").hide(),e.pause(),d(e)}if(e.readyState===4)return s();e.addEventListener("canplaythrough",function n(){e.removeEventListener("canplaythrough",n),s()}),e.load()})}gsap.set(c,{opacity:0}),M(t).then(()=>{q()}).catch(e=>{r.hide()})}w({containerSelector:".section_window-scroll-wall",labels:[{start:0,end:22},{start:22,end:34},{start:34,end:62},{start:62,end:66},{start:66,end:75},{start:75,end:85},{start:85,end:90},{start:90,end:100}]}),w({containerSelector:".section_windowwall-scroll-wall",labels:[{start:0,end:20},{start:58,end:75},{start:75,end:85},{start:85,end:100}]}),w({containerSelector:".section_patiodoors-scroll-wall",labels:[{start:0,end:14},{start:14,end:29},{start:29,end:62},{start:62,end:71},{start:62,end:71},{start:71,end:86},{start:86,end:100}]})});})();
