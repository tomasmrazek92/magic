"use strict";(()=>{$(document).ready(()=>{let f=$(".cta_banner"),p=$(".navbar"),y=$(".footer-box"),T=$(p).height();$(window).on("scroll",()=>{if(f.length){let a=$(window).scrollTop()+$(window).height(),n=y.offset().top;window.scrollY>T*2?a>=n?f.removeClass("active"):f.addClass("active"):f.removeClass("active")}});function E(a,n){$(a).each(function(){new MutationObserver(t=>{t.forEach(s=>{s.type==="attributes"&&s.attributeName==="class"&&n(s.target)})}).observe(this,{attributes:!0,attributeFilter:["class"]})})}function A(a){$(a).hasClass("w--open")?p.addClass("open"):p.removeClass("open")}let h,g=!1;E(".w-nav-button",()=>{A(".w-nav-button"),g?($("html, body").scrollTop(h).removeClass("overflow-hidden"),$(".nav").removeClass("open")):(h=$(window).scrollTop(),$("html, body").scrollTop(0).addClass("overflow-hidden"),$(".nav").addClass("open")),g=!g});function C(){let a=document.querySelector("[data-modal-group-status]"),n=document.querySelectorAll("[data-modal-name]"),o=document.querySelectorAll("[data-modal-target]");o.forEach(t=>{t.addEventListener("click",function(){let s=this.getAttribute("data-modal-target");o.forEach(i=>i.setAttribute("data-modal-status","not-active")),n.forEach(i=>i.setAttribute("data-modal-status","not-active")),document.querySelector(`[data-modal-target="${s}"]`).setAttribute("data-modal-status","active"),document.querySelector(`[data-modal-name="${s}"]`).setAttribute("data-modal-status","active"),a&&a.setAttribute("data-modal-group-status","active")})}),document.querySelectorAll("[data-modal-close]").forEach(t=>{t.addEventListener("click",l)}),document.addEventListener("keydown",function(t){t.key==="Escape"&&l()});function l(){o.forEach(t=>t.setAttribute("data-modal-status","not-active")),a&&a.setAttribute("data-modal-group-status","not-active")}}C();function L(a={}){let o={...{videoSelector:".window-scroll-wall_video video",containerSelector:".section_window-scroll-wall",labelSelector:".window-scroll-wall_label",labels:[],scrubSpeed:.5,fadeOverlap:.1},...a},l=$(o.videoSelector);if(!l.length)return;let t=l[0],s=$(o.labelSelector),i=s.length;function M(){let c=[];return s.each(function(m){let b=$(this),e=o.labels[m];if(e&&typeof e.start=="number"&&typeof e.end=="number"&&e.start>=0&&e.end<=100&&e.start<e.end)c.push({element:b,start:e.start/100,end:e.end/100});else{let u=1/i;c.push({element:b,start:m*u,end:(m+1)*u})}}),c}t.pause();function w(){gsap.registerPlugin(ScrollTrigger);let c=M();gsap.set(s,{opacity:0}),gsap.set(t,{visibility:"visible"});let m=gsap.timeline({scrollTrigger:{trigger:o.containerSelector,start:"top top",end:"bottom bottom",scrub:o.scrubSpeed,onEnter:()=>{t.readyState>=2&&(t.currentTime=0)},onUpdate:b=>{if(t.readyState>=2){let{progress:e}=b,u=e*t.duration;Math.abs(t.currentTime-u)>.01&&(t.currentTime=u),c.forEach(r=>{let k=o.fadeOverlap,S=r.end-r.start,v=Math.min(k*S,S/3),d=0;e>=r.start&&e<=r.end&&(e<r.start+v?d=(e-r.start)/v:e>r.end-v?d=(r.end-e)/v:d=1,d=Math.max(0,Math.min(1,d))),r.element.css("opacity",d)})}},onLeave:()=>{t.readyState>=2&&(t.currentTime=t.duration-.001)},onEnterBack:()=>{t.readyState>=2&&(t.currentTime=t.duration)}}})}t.readyState>=2?w():t.addEventListener("loadeddata",w,{once:!0}),t.muted=!0,t.preload="auto",t.addEventListener("play",function(c){ScrollTrigger.isScrolling()||t.pause()})}L({labels:[{start:0,end:22},{start:22,end:34},{start:34,end:62},{start:62,end:66},{start:66,end:75},{start:75,end:77},{start:77,end:88},{start:88,end:100}]})});})();
