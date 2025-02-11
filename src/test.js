// Prevent scroll restoration
history.scrollRestoration = 'manual';

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () {
  // Cache DOM elements
  const $mainSection = $('.section_ai-how');
  const $steps = $mainSection.find('.ai-how_step');
  const $pots = {
    pot1: $('.ai-pot-1'),
    pot2: $('.ai-pot-2'),
    pot3: $('.ai-pot-3'),
    pot4: $('.ai-pot-4'),
  };
  const $textContainers = {
    step1: $(''),
    step2: $('.ai-how_text-container.is-2'),
    step3: $('.ai-how_text-container.is-3'),
    step4: $('.ai-how_text-container.is-4'),
  };
  const $basicTags = $('[data-tag="basic"]');
  const $enrichTags = $('[data-tag="enrich"]');

  let tagsTl;

  // Animation configurations
  const config = {
    duration: 0.5,
    easing: {
      in: 'power2.out',
      out: 'power2.in',
      tag: 'back.out(1.7)',
    },
  };

  // Common animation functions
  function animateTags() {
    let tl = gsap.timeline({ paused: true, invalidateOnRefresh: true });

    function getTagsHeight() {
      return `${$('.ai-tags').height() / 2}px`;
    }

    function getNegativeTagsHeight() {
      return `-${$('.ai-tags').height() / 2}px`;
    }

    tl.addLabel('Start');
    tl.fromTo(
      $basicTags,
      {
        y: '1.2rem',
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: config.easing.tag,
        duration: config.duration,
        stagger: {
          each: 0.05,
          ease: 'power2.out',
        },
      }
    );
    tl.addLabel('Basic Animated');
    tl.fromTo(
      $enrichTags,
      {
        y: '1.2rem',
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: config.easing.tag,
        duration: config.duration,
        stagger: {
          each: 0.05,
          ease: 'power2.out',
        },
      }
    );
    tl.addLabel('Enrich Animated');
    tl.to($($enrichTags).add($basicTags), {
      opacity: 0,
      ease: config.easing.tag,
      duration: config.duration,
    });
    tl.fromTo(
      $('.ai-tags'),
      { opacity: 1 },
      {
        opacity: 0,
        ease: config.easing.out,
        duration: config.duration,
      },
      '<'
    );
    tl.fromTo(
      [$('.ai-pot_container h2'), '.ai-pot'],
      {
        y: 0,
      },
      {
        y: () => {
          return getTagsHeight();
        },
        invalidateOnRefresh: true,
      },
      '<'
    );
    tl.fromTo(
      $('.ai-how_labels'),
      {
        y: 0,
      },
      {
        y: () => {
          return getNegativeTagsHeight();
        },
        invalidateOnRefresh: true,
      },
      '<'
    );
    tl.addLabel('All tags hidden');

    tagsTl = tl;
  }

  function animatePots(index) {
    const allPots = Object.values($pots).filter((el) => el.length > 0);

    allPots.forEach((pot, i) => {
      gsap.to(pot[0], {
        opacity: i <= index ? 1 : 0,
        duration: config.duration,
      });
    });
  }

  // Create a timeline variable outside the function to track animations
  let textTimeline;

  function animateText(index, direction = 'forward') {
    let isLast = index + 1 === Object.keys($textContainers).length;
    if (isLast && direction === 'backwards') return;

    // Kill existing timeline if it exists
    if (textTimeline) {
      textTimeline.kill();
    }

    // Create new timeline
    textTimeline = gsap.timeline();

    const allTexts = Object.values($textContainers).filter((el) => el.length > 0);
    const currentText = Object.values($textContainers)[index];

    // First hide all texts
    textTimeline.to(
      allTexts.map((el) => el[0]),
      {
        opacity: 0,
        y: '1.2rem',
        duration: config.duration,
        ease: config.easing.in,
      }
    );

    // Then show current text if it exists and index isn't 0
    if (index !== 0 && currentText?.length) {
      textTimeline.to(
        currentText[0],
        {
          opacity: 1,
          y: 0,
          duration: config.duration,
          ease: config.easing.in,
        },
        `>-${config.duration * 0.5}`
      ); // Slightly overlap animations for smoother transition
    }
  }

  function animationFunctions(index, direction = 'forward') {
    // Animate Text
    animateText(index, direction);

    // Tags
    if (index === 0) {
      tagsTl.tweenTo('Start');
    } else if (index === 1) {
      tagsTl.tweenTo('Basic Animated');
    } else if (index === 2) {
      tagsTl.tweenTo('Enrich Animated');
    } else if (index === 3) {
      tagsTl.tweenTo('All tags hidden');
    }

    // Pot
    animatePots(index, direction);
  }
  function initializeElements() {
    // Get all pots except the first one
    const potsAfterFirst = Object.values($pots)
      .filter((el) => el.length > 0)
      .slice(1)
      .map((el) => el[0]);

    // Get all text containers except the first one
    const textsAfterFirst = Object.values($textContainers)
      .filter((el) => el.length > 0)
      .slice(1)
      .map((el) => el[0]);

    // Set opacity 0 for all elements except first ones
    gsap.set(
      [...potsAfterFirst, ...textsAfterFirst, ...$basicTags.toArray(), ...$enrichTags.toArray()],
      {
        opacity: 0,
      }
    );
  }

  // Init
  initializeElements();
  animateTags();
  $steps.each(function (index) {
    ScrollTrigger.create({
      trigger: this,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => animationFunctions(index),
      onEnterBack: () => animationFunctions(index, 'backwards'),
    });
  });
});
