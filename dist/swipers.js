"use strict";(()=>{var f=window.innerWidth,d={};var P=(t,i,e,s,o)=>{let n=$(i);n.length!==0&&(d[e]=0,d[e]=d[e]||0,n.each(function(){let r=`${e}_${d[e]}`;V(this,i,r,[".swiper-arrow",".swiper-navigation",".swiper-drag-wrapper"]);let l=x(s,r);_(this,i,r,e,l,o),d[e]++}))},V=(t,i,e,s)=>{s.forEach(o=>{$(t).find(o).addClass(e)}),$(t).find(i).addClass(e)},x=(t,i)=>{let e={el:`.swiper-navigation.${i}`,type:"bullets",bulletActiveClass:"swiper-bullet-active",bulletClass:"swiper-bullet",clickable:!0},s=t.pagination?{...e,...t.pagination}:e;return{speed:1e3,navigation:{prevEl:`.swiper-arrow.prev.${i}`,nextEl:`.swiper-arrow.next.${i}`},pagination:s,...t}},_=(t,i,e,s,o,n)=>{swipers[s]=swipers[s]||{},swipers[s][e]=swipers[s][e]||{};let r=swipers[s][e],l=r.swiperInstance,w=n==="desktop"&&window.matchMedia("(min-width: 992px)").matches,a=n==="mobile"&&window.matchMedia("(min-width: 0px) and (max-width: 991px)").matches,p=n==="all",c=()=>{r.observer&&(r.observer.disconnect(),delete r.observer),l&&(l.destroy(!0,!0),delete swipers[s][e],console.log("Swiper destroyed for",i,"with uniqueKey",e))};!w&&n==="desktop"||!a&&n==="mobile"||!p&&n==="all"?c():(w||a||p)&&!l&&(()=>{r.observer&&r.observer.disconnect();let u=$(`${i}.${e}`)[0],h=new IntersectionObserver(v=>{v.forEach(m=>{if(m.isIntersecting&&(w||a||p)&&!l){let I=new Swiper(`${i}.${e}`,o);swipers[s][e]={swiperInstance:I,mode:w?"desktop":a?"mobile":"all",initialized:!0},h.disconnect(),console.log("Swiper initialized for",i,"with uniqueKey",e)}})},{});swipers[s][e].observer=h,h.observe(u)})()},b=t=>{t.forEach(i=>{P(...i)})},g=(t,i)=>{b(t),window.addEventListener("resize",function(){window.innerWidth!==f&&(f=window.innerWidth,b(t))})};var B=[[".section_hp-inspired",".swiper-inspired","inspired-slider",{slidesPerView:"auto"},"all"],[".section_lp-official-carousel",".lp-official-carousel_slider","lp-official",{slidesPerView:1,loop:!0,threshhold:30,spaceBetween:24},"all"],[".section_hp-reviews",".swiper-reviews","reviews-slider",{slidesPerView:"auto",autoHeight:!0},"all"],[".section_windows-styles",".swiper-styles","styles-slider",{breakpoints:{0:{centeredSlides:!0,spaceBetween:20,slidesPerView:1.5},767:{centeredSlides:!0,spaceBetween:28,slidesPerView:2.4},992:{centeredSlides:!1,spaceBetween:20,slidesPerView:4}}},"all"],[".section_windows-energy",".swiper-energy","energy-slider",{pagination:{el:".section_windows-energy .slider-progress_bg",type:"progressbar"},breakpoints:{0:{centeredSlides:!0,spaceBetween:24,slidesPerView:1.5},767:{centeredSlides:!0,spaceBetween:28,slidesPerView:2},992:{spaceBetween:48,centeredSlides:!1,slidesPerView:"auto"}}},"all"],[".section_windows-control",".swiper-control","control-slider",{loop:!0,speed:1e3,centeredSlides:!0,autoplay:{delay:3e3},breakpoints:{0:{spaceBetween:24,slidesPerView:1.4},767:{spaceBetween:32,slidesPerView:2},992:{spaceBetween:16,slidesPerView:"auto"}}},"all"],[".section_styles-hero",".swiper-tabs","tabs-slider",{slidesPerView:"auto",loop:!0,threshhold:20,slideToClickedSlide:!0},"all"]];g(B);})();
