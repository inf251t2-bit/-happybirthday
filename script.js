gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {

  /* -----------------------------------------
     GLOBAL AMBIENT BACKGROUND
     ----------------------------------------- */
  gsap.to(".ambient-bg", {
    x: "8%",
    y: "-5%",
    scale: 1.08,
    duration: 18,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to("body::before", {
    x: 80,
    y: -50,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  gsap.to(".bg-orb-1", {
    x: 130, y: -80, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut"
  });

  gsap.to(".bg-orb-2", {
    x: -90, y: 120, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut"
  });

  gsap.to(".bg-orb-3", {
    x: -100, y: -100, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut"
  });

  /* light sweep occasionally crosses the screen */
  gsap.to(".light-sweep", {
    x: "180vw",
    duration: 5,
    repeat: -1,
    repeatDelay: 8,
    ease: "power1.inOut"
  });

  /* -----------------------------------------
     SCROLL PROGRESS
     ----------------------------------------- */
  gsap.to(".scroll-progress span", {
    height: "100%",
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      scrub: true
    }
  });

  /* -----------------------------------------
     HERO
     ----------------------------------------- */
  const heroTl = gsap.timeline();

  heroTl
    .from(".hero .eyebrow", {
      y: 30,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out"
    })
    .from(".hero h1", {
      y: 100,
      opacity: 0,
      scale: .94,
      duration: 1.4,
      ease: "power4.out"
    }, "-=.75")
    .from(".hero-sub", {
      y: 25,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=.85")
    .from(".scroll-hint", {
      opacity: 0,
      y: 15,
      duration: .8
    }, "-=.5");

  gsap.to(".hero-glow", {
    scale: 1.28,
    opacity: .6,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });

  /* -----------------------------------------
     SECTION INTRO
     ----------------------------------------- */
  gsap.from(".memory-intro > *", {
    y: 55,
    opacity: 0,
    stagger: .12,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".memory-intro",
      start: "top 72%"
    }
  });

  /* -----------------------------------------
     MEMORY CARDS
     CINEMATIC CLIP-PATH REVEAL
     ----------------------------------------- */
  gsap.utils.toArray(".memory-card").forEach((card, i) => {
    const photo = card.querySelector(".photo-wrap");
    const img = card.querySelector("img");
    const copy = card.querySelector(".card-copy");
    const frame = photo.querySelector("::before");

    const fromClip = i % 2 === 0
      ? "inset(0% 100% 0% 0% round 2px)"
      : "inset(0% 0% 0% 100% round 2px)";

    /* Card enters with depth */
    gsap.fromTo(card,
      {
        y: 110,
        opacity: 0,
        rotateX: 8,
        rotateY: i % 2 ? -4 : 4,
        scale: .94
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          end: "top 45%",
          scrub: .8
        }
      }
    );

    /* Main clip-path image reveal */
    gsap.fromTo(photo,
      {
        clipPath: fromClip
      },
      {
        clipPath: "inset(0% 0% 0% 0% round 2px)",
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
          end: "top 42%",
          scrub: .8
        }
      }
    );

    /* Image parallax + cinematic grading */
    gsap.fromTo(img,
      {
        scale: 1.28,
        xPercent: i % 2 ? 5 : -5,
        yPercent: -8,
        filter: "saturate(.55) contrast(.88)"
      },
      {
        scale: 1,
        xPercent: i % 2 ? -3 : 3,
        yPercent: 8,
        filter: "saturate(.9) contrast(1)",
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

    /* Inner frame appears after image opens */
    gsap.to(photo, {
      "--frame-opacity": 1,
      scrollTrigger: {
        trigger: card,
        start: "top 62%",
        end: "top 40%",
        scrub: true
      }
    });

    /* Text mask reveal */
    gsap.to(copy, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 64%"
      }
    });

    gsap.from(copy.children, {
      x: i % 2 ? 55 : -55,
      opacity: 0,
      stagger: .1,
      duration: .85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 62%"
      }
    });

    /* Depth / scale while passing through viewport */
    ScrollTrigger.create({
      trigger: card,
      start: "top 15%",
      end: "bottom 15%",
      scrub: true,
      onUpdate: self => {
        const scale = 1 - self.progress * .035;
        gsap.set(card, { scale });
      }
    });
  });

  /* -----------------------------------------
     LETTER
     ----------------------------------------- */
  gsap.from(".letter-inner", {
    y: 100,
    opacity: 0,
    scale: .94,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".letter",
      start: "top 72%"
    }
  });

  gsap.from(".letter-inner > *", {
    y: 25,
    opacity: 0,
    stagger: .08,
    duration: .75,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".letter-inner",
      start: "top 65%"
    }
  });

  /* -----------------------------------------
     FINAL PHOTO
     ----------------------------------------- */
  gsap.from(".final-message > *", {
    y: 80,
    opacity: 0,
    stagger: .14,
    duration: 1.2,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".final-photo",
      start: "top 70%"
    }
  });

  gsap.fromTo(".final-image img",
    {
      scale: 1.18,
      filter: "brightness(.72) saturate(.55)"
    },
    {
      scale: 1.04,
      filter: "brightness(.9) saturate(.85)",
      ease: "none",
      scrollTrigger: {
        trigger: ".final-photo",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    }
  );

  /* final message slight floating depth */
  gsap.to(".final-message", {
    y: -35,
    ease: "none",
    scrollTrigger: {
      trigger: ".final-photo",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  /* Refresh after images finish loading */
  window.addEventListener("load", () => ScrollTrigger.refresh());
}
