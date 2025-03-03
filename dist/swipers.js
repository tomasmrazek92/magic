"use strict";(()=>{var W=new Map,O=new Set;function X(){let t=$("section:has(.plyr_video)");if(!t.length)return;let r=window.innerWidth<=991,e=new IntersectionObserver(a=>{a.forEach(n=>{let s=n.target.id||`video-section-${Date.now()}`;n.isIntersecting&&!O.has(s)&&(Y(n.target,s,r),O.add(s),e.unobserve(n.target))})},{threshold:.1});t.each(function(){this.id||(this.id=`video-section-${Date.now()}`),e.observe(this)})}function Y(t,r,e){let a=$(t).find(".plyr_video"),n=[];W.set(r,n),a.each(function(){let s=$(this),c=s.parent(),f=c.attr("data-video-src"),h=c.attr("data-poster-src");h&&s.attr("poster",h),s.attr("src",f),s.attr("preload","auto");let w={controls:["play","mute"],clickToPlay:!1,muted:!0,resetOnEnd:!0,poster:h},p=new Plyr(s,w);p.on("ready",()=>{p.muted=!0}),n.push(p),e?Z(c,p,s[0],r):K(c,p,s[0],r)})}function Z(t,r,e,a){let n=!1;t.on("click",function(s){s.preventDefault(),n?(r.pause(),r.muted=!0,n=!1):(M(e,a),r.once("playing",()=>{n=!0}),r.muted=!1,r.play())})}function K(t,r,e,a){t.on("mouseenter",function(){M(e,a),r.play()}),t.on("mouseleave",function(){r.pause(),r.restart(),r.muted=!0}),t.on("click",function(n){n.preventDefault(),r.muted=!r.muted})}function M(t,r){(W.get(r)||[]).forEach(function(a){a.media!==t&&(a.pause(),a.restart(),a.muted=!0)})}$(document).ready(X);var N=window.innerWidth,P={};var E=(t,r,e,a,n)=>{let s=$(t).add(r);console.log(s.length),s.length===2&&(P[e]=0,P[e]=P[e]||0,s.each(function(){let c=`${e}_${P[e]}`;ee(this,r,c,[".swiper-arrow",".swiper-navigation",".swiper-drag-wrapper"]);let f=te(a,c);ie(this,r,c,e,f,n),P[e]++}))},ee=(t,r,e,a)=>{a.forEach(n=>{$(t).find(n).addClass(e)}),$(t).find(r).addClass(e)},te=(t,r)=>{let e={el:`.swiper-navigation.${r}`,type:"bullets",bulletActiveClass:"swiper-bullet-active",bulletClass:"swiper-bullet",clickable:!0},a=t.pagination?{...e,...t.pagination}:e,n=t.on||{},s={...n,init:function(...c){n.init&&n.init.apply(this,c),setTimeout(()=>{ScrollTrigger.refresh()},100)},resize:function(...c){n.resize&&n.resize.apply(this,c),ScrollTrigger.refresh()}};return{speed:1e3,navigation:{prevEl:`.swiper-arrow.prev.${r}`,nextEl:`.swiper-arrow.next.${r}`},mousewheel:{enabled:!0,forceToAxis:!0},pagination:a,...t,on:s}},ie=(t,r,e,a,n,s)=>{swipers[a]=swipers[a]||{},swipers[a][e]=swipers[a][e]||{};let f=swipers[a][e].swiperInstance,h=s==="desktop"&&window.matchMedia("(min-width: 992px)").matches,w=s==="mobile"&&window.matchMedia("(min-width: 0px) and (max-width: 991px)").matches,p=s==="all",z=()=>{f&&(f.destroy(!0,!0),delete swipers[a][e],console.log("Swiper destroyed for",r,"with uniqueKey",e))};!h&&s==="desktop"||!w&&s==="mobile"||!p&&s==="all"?z():(h||w||p)&&!f&&(()=>{let C=$(`${r}.${e}`)[0];if(!C)return;let k=new IntersectionObserver(G=>{G.forEach(l=>{if((h||w||p)&&!f){let y=new Swiper(`${r}.${e}`,n);swipers[a][e]={swiperInstance:y,mode:h?"desktop":w?"mobile":"all",initialized:!0},k.disconnect(),console.log("Swiper initialized for",r,"with uniqueKey",e)}})},{});swipers[a][e].observer=k,k.observe(C)})()},U=t=>{t.forEach(r=>{E(...r)})},j=(t,r)=>{U(t),window.addEventListener("resize",function(){window.innerWidth!==N&&(N=window.innerWidth,U(t))})};var ne=[[".section_hp-inspired",".swiper-inspired","inspired-slider",{slidesPerView:"auto"},"all"],[".section_lp-official-carousel",".lp-official-carousel_slider","lp-official",{slidesPerView:1,threshold:50,loop:!0,spaceBetween:24,on:{slideChangeTransitionEnd:function(){let r=this.slides[this.activeIndex].querySelector("[data-vimeo-player-init]");r&&m(r)},init:function(){let r=this.slides[this.activeIndex].querySelector("[data-vimeo-player-init]");r&&m(r)}}},"all"],[".section_hp-reviews",".swiper-reviews","reviews-slider",{slidesPerView:"auto",autoHeight:!0},"all"],[".section_windows-styles",".swiper-styles","styles-slider",{threshold:50,breakpoints:{0:{centeredSlides:!0,spaceBetween:20,slidesPerView:1.5},767:{centeredSlides:!0,spaceBetween:28,slidesPerView:2.4},992:{centeredSlides:!1,spaceBetween:20,slidesPerView:4}}},"all"],[".section_windows-energy",".swiper-energy","energy-slider",{pagination:{el:".section_windows-energy .slider-progress_bg",type:"progressbar"},breakpoints:{0:{centeredSlides:!0,spaceBetween:24,slidesPerView:1.1},767:{centeredSlides:!0,spaceBetween:28,slidesPerView:2},992:{spaceBetween:48,centeredSlides:!1,slidesPerView:"auto"}}},"all"],[".section_windows-control",".swiper-control","control-slider",{loop:!0,speed:1e3,centeredSlides:!0,autoplay:{delay:3e3},breakpoints:{0:{spaceBetween:24,slidesPerView:1.4},767:{spaceBetween:32,slidesPerView:2},992:{spaceBetween:16,slidesPerView:"auto"}}},"all"],[".section_blog-hero",".blog-hero_slider","blog-slider",{slidesPerView:1,loop:!0,threshhold:20,slideToClickedSlide:!0},"all"]];j(ne);var x=!1;if(typeof Vimeo!="undefined"&&Vimeo.Player)x=!0,console.log("Vimeo API already loaded");else{console.log("Loading Vimeo API dynamically");let t=document.createElement("script");t.src="https://player.vimeo.com/api/player.js",t.onload=function(){x=!0,console.log("Vimeo API loaded successfully")},t.onerror=function(){console.error("Failed to load Vimeo API")},document.body.appendChild(t)}function o(t,r){let e=new Date().toISOString();console.log(`[Vimeo Player ${e}] ${t}`,r||"")}function m(t){if(!x){console.warn("Vimeo API not ready yet. Will retry in 500ms."),setTimeout(()=>m(t),500);return}o("Initializing Vimeo player for:",t),(t?[t]:document.querySelectorAll("[data-vimeo-player-init]")).forEach(function(e,a){if(e.hasAttribute("data-vimeo-initialized")){o("Element already initialized, skipping",e.id);return}let n=e.getAttribute("data-vimeo-video-id");if(!n){console.error("No video ID found for element",e);return}o("Setting up video with ID:",n);let s=e.querySelector("iframe");s||(o("No iframe found, creating one"),s=document.createElement("iframe"),s.width="100%",s.height="100%",s.frameBorder="0",s.allow="autoplay; fullscreen",s.allowFullscreen=!0,(e.querySelector(".vimeo-bg__iframe-wrapper")||e).appendChild(s));let c=`https://player.vimeo.com/video/${n}?api=1&background=1&autoplay=0&loop=0&muted=1`;if(s.setAttribute("src",c),o("Set iframe src to:",c),!e.id){let l="vimeo-player-index-"+a;e.setAttribute("id",l),o("Assigned ID to element:",l)}let f=e.id;try{let v=function(){let i=e.offsetHeight/e.offsetWidth*100;o(`Container aspect ratio: ${i}`);let d=e.querySelector(".vimeo-bg__iframe-wrapper");if(d&&y)if(i>y*100){let u=`${i/(y*100)*100}%`;d.style.width=u,o("Updated iframe wrapper width to:",u)}else d.style.width="",o("Reset iframe wrapper width")},g=function(){o("vimeoPlayerPlay called for:",n),e.setAttribute("data-vimeo-activated","true"),e.setAttribute("data-vimeo-playing","true"),e._vimeoState.hasAttemptedPlay=!0,e._vimeoState.playAttempts++,l.play().then(()=>{o("Play command succeeded")}).catch(i=>{console.error("Play command failed:",i),e._vimeoState.errors.push({type:"play",error:i}),e._vimeoState.playAttempts<3&&(o(`Retrying play attempt ${e._vimeoState.playAttempts+1}/3`),setTimeout(()=>{l.play().catch(d=>{console.error("Retry play failed:",d)})},1e3))})},S=function(){o("vimeoPlayerPause called for:",n),e.setAttribute("data-vimeo-playing","false"),l.pause().catch(i=>{console.error("Pause command failed:",i)})},F=function(i){let d=Math.floor(i/3600);i-=d*3600;let u=Math.floor(i/60);return i-=u*60,u+":"+(i<10?"0"+i:i)},L=function(){l.getDuration().then(function(){let i=b.value;o(`Timeline changed to: ${i}s`),l.setCurrentTime(i),_&&(_.value=i)})},q=function(){e.setAttribute("data-vimeo-hover","false")},H=function(){o("Video ended"),e.setAttribute("data-vimeo-activated","false"),e.setAttribute("data-vimeo-playing","false"),l.unload()};var h=v,w=g,p=S,z=F,ae=L,C=q,k=H;o("Creating Vimeo Player instance for:",f);let l=new Vimeo.Player(s);e._vimeoState={isPlaying:!1,isLoaded:!1,hasAttemptedPlay:!1,playAttempts:0,errors:[]},l.ready().then(()=>{o("Player ready for video:",n),e._vimeoState.isReady=!0}).catch(i=>{console.error("Player ready promise failed:",i),e._vimeoState.errors.push({type:"ready",error:i})});let y;e.getAttribute("data-vimeo-update-size")==="true"&&(o("Will update aspect ratio for:",n),l.getVideoWidth().then(function(i){l.getVideoHeight().then(function(d){y=d/i,o(`Video aspect ratio: ${d}/${i} = ${y}`);let u=e.querySelector(".vimeo-player__before");u&&(u.style.paddingTop=y*100+"%",o("Updated padding-top to:",y*100+"%"))})})),e.getAttribute("data-vimeo-update-size")==="true"?(v(),l.getVideoWidth().then(function(){l.getVideoHeight().then(function(){v()})})):v();let T=()=>v();if(window.addEventListener("resize",T),e._vimeoResizeHandler=T,l.on("loaded",function(){o("Event: loaded",n),e._vimeoState.isLoaded=!0,e.setAttribute("data-vimeo-loaded","true");let i=window.getComputedStyle(s);o("iframe CSS - visibility:",i.visibility),o("iframe CSS - display:",i.display),o("iframe CSS - opacity:",i.opacity)}),l.on("play",function(){o("Event: play",n),e._vimeoState.isPlaying=!0,e.setAttribute("data-vimeo-loaded","true"),e.setAttribute("data-vimeo-playing","true")}),l.on("pause",function(){o("Event: pause",n),e._vimeoState.isPlaying=!1,e.setAttribute("data-vimeo-playing","false")}),l.on("ended",function(){o("Event: ended",n),e._vimeoState.isPlaying=!1}),l.on("error",function(i){console.error("Event: error",n,i),e._vimeoState.errors.push({type:"playback",error:i})}),e.getAttribute("data-vimeo-autoplay")==="false")o("Autoplay disabled for:",n),l.setVolume(1),l.pause();else if(o("Autoplay enabled for:",n),l.setVolume(0),e.setAttribute("data-vimeo-muted","true"),e.getAttribute("data-vimeo-paused-by-user")==="false"){let i=function(){let d=e.getBoundingClientRect(),u=d.top<window.innerHeight&&d.bottom>0;o(`Visibility check: ${u?"in view":"not in view"}`),u?g():S()};var G=i;i(),window.addEventListener("scroll",i),e._vimeoScrollHandler=i}else o("Attempting immediate play for:",n),g();e.querySelectorAll('[data-vimeo-control="play"]').forEach(i=>{i.addEventListener("click",function(){o("Play button clicked"),l.setVolume(0),g();let d=e.getAttribute("data-vimeo-muted")==="true"?0:1;l.setVolume(d)})});let D=e.querySelector('[data-vimeo-control="pause"]');D&&D.addEventListener("click",function(){o("Pause button clicked"),S(),e.getAttribute("data-vimeo-autoplay")==="true"&&(e.setAttribute("data-vimeo-paused-by-user","true"),e._vimeoScrollHandler&&window.removeEventListener("scroll",e._vimeoScrollHandler))});let B=e.querySelector('[data-vimeo-control="mute"]');B&&B.addEventListener("click",function(){o("Mute button clicked"),e.getAttribute("data-vimeo-muted")==="false"?(l.setVolume(0),e.setAttribute("data-vimeo-muted","true")):(l.setVolume(1),e.setAttribute("data-vimeo-muted","false"))});let J=!!(document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled),A=e.querySelector('[data-vimeo-control="fullscreen"]');!J&&A&&(A.style.display="none"),A&&A.addEventListener("click",()=>{o("Fullscreen button clicked");let i=document.getElementById(f);if(!i)return;document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement?(e.setAttribute("data-vimeo-fullscreen","false"),(document.exitFullscreen||document.webkitExitFullscreen||document.mozCancelFullScreen||document.msExitFullscreen).call(document)):(e.setAttribute("data-vimeo-fullscreen","true"),(i.requestFullscreen||i.webkitRequestFullscreen||i.mozRequestFullScreen||i.msRequestFullscreen).call(i))});let Q=()=>{let i=document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;e.setAttribute("data-vimeo-fullscreen",i?"true":"false")};["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","msfullscreenchange"].forEach(i=>{document.addEventListener(i,Q)});let V=e.querySelector("[data-vimeo-duration]");l.getDuration().then(function(i){o(`Got duration: ${i}s`),V&&(V.textContent=F(i)),e.querySelectorAll('[data-vimeo-control="timeline"], progress').forEach(u=>{u.setAttribute("max",i)})});let b=e.querySelector('[data-vimeo-control="timeline"]'),_=e.querySelector("progress");b&&["input","change"].forEach(i=>{b.addEventListener(i,L)}),l.on("timeupdate",function(i){b&&(b.value=i.seconds),_&&(_.value=i.seconds),V&&(V.textContent=F(Math.trunc(i.seconds)))});let R;e.addEventListener("mousemove",function(){e.getAttribute("data-vimeo-hover")==="false"&&e.setAttribute("data-vimeo-hover","true"),clearTimeout(R),R=setTimeout(q,3e3)}),l.on("ended",H),e._vimeoPlayer=l,e._vimeoPlayerPlay=g,e._vimeoPlayerPause=S,e.setAttribute("data-vimeo-initialized","true"),o("Player initialization complete for:",n),e.getAttribute("data-vimeo-autoplay")!=="false"&&setTimeout(()=>{o("Attempting delayed play"),g()},500)}catch(l){console.error("Failed to initialize Vimeo Player:",l)}})}function I(t){if(!t||!t.hasAttribute("data-vimeo-initialized")){o("Nothing to destroy",t);return}o("Destroying player for:",t.id),t._vimeoResizeHandler&&window.removeEventListener("resize",t._vimeoResizeHandler),t._vimeoScrollHandler&&window.removeEventListener("scroll",t._vimeoScrollHandler),t._vimeoPlayer&&t._vimeoPlayer.destroy().catch(r=>console.error("Error destroying Vimeo player:",r)),t.removeAttribute("data-vimeo-initialized"),t.removeAttribute("data-vimeo-playing"),t.removeAttribute("data-vimeo-activated"),t.removeAttribute("data-vimeo-loaded"),o("Player destroyed for:",t.id)}function oe(t){return!t||!t._vimeoPlayer?"No Vimeo player found":{id:t.id,videoId:t.getAttribute("data-vimeo-video-id"),initialized:t.hasAttribute("data-vimeo-initialized"),playing:t.hasAttribute("data-vimeo-playing"),loaded:t.hasAttribute("data-vimeo-loaded"),state:t._vimeoState||"No state tracking available"}}typeof $!="undefined"&&($.fn.initVimeoPlayer=function(){return this.each(function(){m(this)})},$.fn.destroyVimeoPlayer=function(){return this.each(function(){I(this)})},$.fn.vimeoPlayerPlay=function(){return this.each(function(){this._vimeoPlayerPlay&&this._vimeoPlayerPlay()})},$.fn.vimeoPlayerPause=function(){return this.each(function(){this._vimeoPlayerPause&&this._vimeoPlayerPause()})},$.fn.vimeoPlayerDebug=function(){return this.length===0?"No elements selected":oe(this[0])});function re(t){o("Setting up Swiper integration",t);let r={on:{init:function(){o("Swiper initialized");let a=this.slides[this.activeIndex].querySelectorAll("[data-vimeo-player-init]");a.length?(o(`Found ${a.length} Vimeo elements in active slide`),a.forEach(n=>{I(n),m(n),setTimeout(()=>{n._vimeoPlayerPlay&&(o("Forcing play on initial slide"),n._vimeoPlayerPlay())},800)})):o("No Vimeo elements found in active slide")},slideChangeTransitionStart:function(){o("Slide change transition start"),typeof this.previousIndex!="undefined"&&this.slides[this.previousIndex].querySelectorAll('[data-vimeo-player-init][data-vimeo-initialized="true"]').forEach(n=>{o("Destroying player on previous slide"),I(n)})},slideChangeTransitionEnd:function(){o("Slide change transition end");let a=this.slides[this.activeIndex].querySelectorAll("[data-vimeo-player-init]");a.length?(o(`Found ${a.length} Vimeo elements in new active slide`),a.forEach(n=>{setTimeout(()=>{I(n),m(n),setTimeout(()=>{n._vimeoPlayerPlay&&(o("Forcing play on new slide"),n._vimeoPlayerPlay(),setTimeout(()=>{n._vimeoPlayer&&!n._vimeoState.isPlaying&&(o("Second play attempt on new slide"),n._vimeoPlayerPlay())},1e3))},500)},100)})):o("No Vimeo elements found in new active slide")}}};return t.params&&t.params.on&&Object.assign(r.on,t.params.on),Object.assign(t.params,r),t.initialized&&(o("Swiper already initialized, running init handler manually"),r.on.init.call(t)),t}typeof $!="undefined"&&($.fn.setupVimeoSwiper=function(){return this.each(function(){this.swiper?re(this.swiper):console.error("No Swiper instance found on element:",this)})});})();
