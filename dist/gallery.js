"use strict";(()=>{window.fsAttributes.push(["cmsfilter",e=>{let[t]=e;$(".search_clear").hide(),t.listInstance.on("renderitems",function(){t.filtersData[0].values.size>=1?($("[data-filter-default]").hide(),$("[data-filter-results]").css("display","flex"),$(".search_clear").show()):($("[data-filter-default]").show(),$("[data-filter-results]").hide(),$(".search_clear").hide())})}]);var n=$(".search_input");function u(){n.on("input",function(){let e=$(this).val().toLowerCase().trim();$(".p-gallery_menu-link").each(function(){let t=$(this).text().toLowerCase().trim();t===e?(console.log("Match found:",t),$(this).addClass("w--current")):$(this).removeClass("w--current")})})}u();$(".p-gallery_menu-link").on("click",function(){let e=$(this).text();n.val(e),n[0].dispatchEvent(new Event("input",{bubbles:!0}))});function d(e,t,o={}){let r={...{typeSpeed:100,wordDelay:2e3,eraseSpeed:50},...o},i=0,s=0,a=!1;function l(){let c=t[i];if(a){if(e.attr("placeholder",c.substring(0,s)),s--,s<0){a=!1,i=(i+1)%t.length,setTimeout(l,r.typeSpeed);return}setTimeout(l,r.eraseSpeed)}else{if(e.attr("placeholder",c.substring(0,s)),s++,s>c.length){a=!0,setTimeout(l,r.wordDelay);return}setTimeout(l,r.typeSpeed)}}l()}d(n,searchWords);})();
