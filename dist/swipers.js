"use strict";(()=>{var f=window.innerWidth,d={};var I=(s,i,e,t,r)=>{let n=$(s).add(i);console.log(n.length),n.length===2&&(d[e]=0,d[e]=d[e]||0,n.each(function(){let l=`${e}_${d[e]}`;P(this,i,l,[".swiper-arrow",".swiper-navigation",".swiper-drag-wrapper"]);let o=x(t,l);V(this,i,l,e,o,r),d[e]++}))},P=(s,i,e,t)=>{t.forEach(r=>{$(s).find(r).addClass(e)}),$(s).find(i).addClass(e)},x=(s,i)=>{let e={el:`.swiper-navigation.${i}`,type:"bullets",bulletActiveClass:"swiper-bullet-active",bulletClass:"swiper-bullet",clickable:!0},t=s.pagination?{...e,...s.pagination}:e,r=s.on||{},n={...r,init:function(...l){r.init&&r.init.apply(this,l),setTimeout(()=>{ScrollTrigger.refresh()},100)},resize:function(...l){r.resize&&r.resize.apply(this,l),ScrollTrigger.refresh()}};return{speed:1e3,navigation:{prevEl:`.swiper-arrow.prev.${i}`,nextEl:`.swiper-arrow.next.${i}`},pagination:t,...s,on:n}},V=(s,i,e,t,r,n)=>{swipers[t]=swipers[t]||{},swipers[t][e]=swipers[t][e]||{};let o=swipers[t][e].swiperInstance,w=n==="desktop"&&window.matchMedia("(min-width: 992px)").matches,a=n==="mobile"&&window.matchMedia("(min-width: 0px) and (max-width: 991px)").matches,p=n==="all",c=()=>{o&&(o.destroy(!0,!0),delete swipers[t][e],console.log("Swiper destroyed for",i,"with uniqueKey",e))};!w&&n==="desktop"||!a&&n==="mobile"||!p&&n==="all"?c():(w||a||p)&&!o&&(()=>{let g=$(`${i}.${e}`)[0];if(!g)return;let h=new IntersectionObserver(v=>{v.forEach(E=>{if((w||a||p)&&!o){let m=new Swiper(`${i}.${e}`,r);swipers[t][e]={swiperInstance:m,mode:w?"desktop":a?"mobile":"all",initialized:!0},h.disconnect(),console.log("Swiper initialized for",i,"with uniqueKey",e)}})},{});swipers[t][e].observer=h,h.observe(g)})()},u=s=>{s.forEach(i=>{I(...i)})},b=(s,i)=>{u(s),window.addEventListener("resize",function(){window.innerWidth!==f&&(f=window.innerWidth,u(s))})};var _=[[".section_hp-inspired",".swiper-inspired","inspired-slider",{slidesPerView:"auto"},"all"],[".section_lp-official-carousel",".lp-official-carousel_slider","lp-official",{slidesPerView:1,loop:!0,threshhold:30,spaceBetween:24},"all"],[".section_hp-reviews",".swiper-reviews","reviews-slider",{slidesPerView:"auto",autoHeight:!0},"all"],[".section_windows-styles",".swiper-styles","styles-slider",{threshold:50,breakpoints:{0:{centeredSlides:!0,spaceBetween:20,slidesPerView:1.5},767:{centeredSlides:!0,spaceBetween:28,slidesPerView:2.4},992:{centeredSlides:!1,spaceBetween:20,slidesPerView:4}}},"all"],[".section_windows-energy",".swiper-energy","energy-slider",{pagination:{el:".section_windows-energy .slider-progress_bg",type:"progressbar"},breakpoints:{0:{centeredSlides:!0,spaceBetween:24,slidesPerView:1.1},767:{centeredSlides:!0,spaceBetween:28,slidesPerView:2},992:{spaceBetween:48,centeredSlides:!1,slidesPerView:"auto"}}},"all"],[".section_windows-control",".swiper-control","control-slider",{loop:!0,speed:1e3,centeredSlides:!0,autoplay:{delay:3e3},breakpoints:{0:{spaceBetween:24,slidesPerView:1.4},767:{spaceBetween:32,slidesPerView:2},992:{spaceBetween:16,slidesPerView:"auto"}}},"all"],[".section_blog-hero",".blog-hero_slider","blog-slider",{slidesPerView:1,loop:!0,threshhold:20,slideToClickedSlide:!0},"all"]];b(_);})();
