const isClient = typeof window !== 'undefined'

let gsapInstance: any = null
let CustomEasePlugin: any = null
let CustomWigglePlugin: any = null

const initPlugins = async () => {
  if (!isClient || gsapInstance) return
  const gsapModule = await import('gsap')
  // Import only the two plugins in use; 'gsap/all' pulls every plugin (~250 KB)
  const [easeModule, wiggleModule] = await Promise.all([
    import('gsap/CustomEase'),
    import('gsap/CustomWiggle'),
  ])
  gsapInstance = gsapModule.gsap || gsapModule.default
  CustomEasePlugin = easeModule.CustomEase
  CustomWigglePlugin = wiggleModule.CustomWiggle
  gsapInstance.registerPlugin(CustomEasePlugin, CustomWigglePlugin)
}

export async function initHeroAnimation(root?: HTMLElement | null): Promise<() => void> {
  if (!isClient) return () => {}
  await initPlugins()
  const gsap = gsapInstance

  const q = (sel: string) => (root ? root.querySelectorAll(sel) : document.querySelectorAll(sel))
  const qs = (sel: string) => (root ? root.querySelector(sel) : document.querySelector(sel))

  // ═══ Setup transform origins ═══
  gsap.set(qs(".bg") as Element, { transformOrigin: "50% 50%" })
  gsap.set(qs(".ear-right") as Element, { transformOrigin: "0% 50%" })
  gsap.set(qs(".ear-left") as Element, { transformOrigin: "100% 50%" })
  gsap.set(qs(".me") as Element, { opacity: 1, visibility: "visible", display: "block" })
  gsap.set(q(".hair-left"), { transformOrigin: "50% 50%" })
  gsap.set(qs(".nose") as Element, { transformOrigin: "50% 100%" })

  // ═══ DOM references ═══
  const dom = {
    face: qs(".face") as HTMLElement,
    eye: q(".eye") as NodeListOf<HTMLElement>,
    innerFace: qs(".inner-face") as HTMLElement,
    hairFront: qs(".hair-front") as HTMLElement,
    hairBack: qs(".hair-back") as HTMLElement,
    hairLeft: qs(".hair-left") as HTMLElement,
    hairGroup: qs(".hair-group") as HTMLElement,
    shadow: q(".shadow") as NodeListOf<HTMLElement>,
    ear: q(".ear") as NodeListOf<HTMLElement>,
    eyebrowLeft: qs(".eyebrow-left") as HTMLElement,
    eyebrowRight: qs(".eyebrow-right") as HTMLElement,
    glasses: qs(".glasses") as HTMLElement,
    mouth: qs(".mouth") as HTMLElement,
    nose: qs(".nose") as HTMLElement,
    neck: qs(".neck") as HTMLElement,
    body: qs(".body") as HTMLElement,
    me: qs(".me") as HTMLElement,
  }

  // ════════════════════════════════════
  // INITIAL STATE — avatar visible immediately
  // ════════════════════════════════════
  const entrance = gsap.timeline({
    onComplete: addMouseEvent,
  })

  // Ensure everything is visible from the start
  entrance.set(qs(".bg") as Element, { scale: 1, opacity: 1 })
  entrance.set(dom.me, { yPercent: 0, scale: 1, opacity: 1, visibility: "visible", display: "block" })
  entrance.set(".head, .hair-group, .shadow", { yPercent: 0, scale: 1 })
  entrance.set(".ear-right, .ear-left", { rotate: 0, yPercent: 0 })
  entrance.set(dom.glasses, { yPercent: 0, opacity: 1 })
  entrance.set(".eyebrow-right, .eyebrow-left", { yPercent: 0, opacity: 1 })
  entrance.set(".eye-right, .eye-left", { opacity: 1 })
  entrance.set(".eye-right-2, .eye-left-2", { opacity: 0 })
  if (dom.body) entrance.set(dom.body, { yPercent: 0, opacity: 1 })
  if (dom.neck) entrance.set(dom.neck, { yPercent: 0, opacity: 1 })

  // ════════════════════════════════════
  // BLINK — Natural random intervals
  // ════════════════════════════════════
  let blinkTl: gsap.core.Timeline | null = null

  const playBlink = () => {
    const tl = gsap.timeline()
    tl
      .to(".eye-right, .eye-left", { duration: 0.05, opacity: 0 }, 0)
      .to(".eye-right-2, .eye-left-2", { duration: 0.05, opacity: 1 }, 0)
      .to(".eye-right, .eye-left", { duration: 0.08, opacity: 1 }, 0.1)
      .to(".eye-right-2, .eye-left-2", { duration: 0.01, opacity: 0 }, 0.1)

    // 15% chance of double blink
    if (Math.random() < 0.15) {
      tl
        .to(".eye-right, .eye-left", { duration: 0.04, opacity: 0 }, 0.2)
        .to(".eye-right-2, .eye-left-2", { duration: 0.04, opacity: 1 }, 0.2)
        .to(".eye-right, .eye-left", { duration: 0.06, opacity: 1 }, 0.25)
        .to(".eye-right-2, .eye-left-2", { duration: 0.01, opacity: 0 }, 0.25)
    }

    blinkTl = tl
    scheduleBlink()
  }

  const scheduleBlink = () => {
    const delay = 2 + Math.random() * 6 // 2-8 seconds
    setTimeout(() => {
      if (dizzyIsPlaying) { scheduleBlink(); return }
      playBlink()
    }, delay * 1000)
  }

  // ════════════════════════════════════
  // IDLE — Subtle living animations
  // ════════════════════════════════════
  const idleTl = gsap.timeline({ repeat: -1, yoyo: true, paused: true })

  idleTl
    // Head + hair move together — no separation
    .to([dom.face, dom.hairLeft], {
      duration: 4,
      rotate: 0.5,
      ease: "sine.inOut",
    }, 0)
    // Glasses slide down nose slightly
    .to(dom.glasses, {
      duration: 4,
      yPercent: 1.5,
      ease: "sine.inOut",
    }, 0)
    // Body subtle sway — hair follows
    .to([dom.me, dom.hairGroup], {
      duration: 5,
      xPercent: 0.3,
      ease: "sine.inOut",
    }, 0)

  // Occasional glance — eyes look to the side
  const scheduleGlance = () => {
    const delay = 4 + Math.random() * 8
    setTimeout(() => {
      if (dizzyIsPlaying) { scheduleGlance(); return }
      const dir = Math.random() > 0.5 ? 1 : -1
      gsap.to(dom.eye, {
        duration: 0.3,
        xPercent: dir * 15,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(dom.eye, {
            duration: 0.6,
            xPercent: 0,
            ease: "power2.inOut",
            delay: 0.8,
          })
        },
      })
      scheduleGlance()
    }, delay * 1000)
  }

  // ════════════════════════════════════
  // DIZZY — Faster mouse triggers dizziness
  // ════════════════════════════════════
  CustomWigglePlugin.create("myWiggle", { wiggles: 6, type: "ease-out" })
  CustomWigglePlugin.create("lessWiggle", { wiggles: 4, type: "ease-in-out" })

  let dizzyIsPlaying = false

  const dizzy = gsap.timeline({
    paused: true,
    onStart: () => { dizzyIsPlaying = true },
    onComplete: () => { dizzyIsPlaying = false },
  })

  dizzy
    .to(".eyes", { duration: 0.01, opacity: 0 }, 0)
    .to(".dizzy", { duration: 0.01, opacity: 0.35 }, 0)
    .to(".mouth", { duration: 0.01, opacity: 0 }, 0)
    .to(".oh", { duration: 0.01, opacity: 0.9 }, 0)
    .to(".head, .hair-back, .shadow", {
      duration: 3,
      rotate: 3,
      transformOrigin: "50% 50%",
      ease: "myWiggle",
    }, 0)
    .to(dom.me, {
      duration: 3,
      rotate: -2,
      transformOrigin: "50% 100%",
      ease: "myWiggle",
    }, 0)
    .to(dom.me, {
      duration: 2.5,
      scale: 0.98,
      transformOrigin: "50% 100%",
      ease: "lessWiggle",
    }, 0)
    .to(".dizzy-1", {
      rotate: -360,
      duration: 0.8,
      repeat: 3,
      transformOrigin: "50% 50%",
      ease: "none",
    }, 0.01)
    .to(".dizzy-2", {
      rotate: 360,
      duration: 0.8,
      repeat: 3,
      transformOrigin: "50% 50%",
      ease: "none",
    }, 0.01)
    .to(".eyes", { duration: 0.01, opacity: 1 }, 2.5)
    .to(".dizzy", { duration: 0.01, opacity: 0 }, 2.5)
    .to(".oh", { duration: 0.01, opacity: 0 }, 2.5)
    .to(".mouth", { duration: 0.01, opacity: 1 }, 2.5)

  // ════════════════════════════════════
  // MOUSE TRACKING — Parallax face follow
  // ════════════════════════════════════
  let xPosition: number | undefined
  let yPosition: number | undefined
  let height: number
  let width: number
  let storedXPosition = 0
  let storedYPosition = 0

  function percentage(partialValue: number, totalValue: number): number {
    return (100 * partialValue) / totalValue
  }

  function updateScreenCoords(event: MouseEvent): void {
    if (!dizzyIsPlaying) {
      xPosition = event.clientX
      yPosition = event.clientY
    }
    if (!dizzyIsPlaying && Math.abs(event.movementX) > 400) {
      dizzyIsPlaying = true
      dizzy.restart()
    }
  }

  function animateFace(): void {
    if (xPosition === undefined || yPosition === undefined) return
    if (storedXPosition === xPosition && storedYPosition === yPosition) return

    const x = percentage(xPosition, width) - 50
    const y = percentage(yPosition, height) - 50
    const yHigh = percentage(yPosition, height) - 20
    const yLow = percentage(yPosition, height) - 80

    // Face follows mouse subtly
    gsap.to(dom.face, {
      duration: 0.6,
      yPercent: yLow / 30,
      xPercent: x / 30,
      ease: "power2.out",
    })

    // Eyes track mouse more responsively
    gsap.to(dom.eye, {
      duration: 0.3,
      yPercent: yHigh / 3,
      xPercent: x / 2,
      ease: "power1.out",
    })

    // Inner face shifts
    gsap.to(dom.innerFace, {
      duration: 0.5,
      yPercent: y / 6,
      xPercent: x / 8,
      ease: "power2.out",
    })

    // Hair front — slight movement
    gsap.to(dom.hairFront, {
      duration: 0.7,
      yPercent: yHigh / 15,
      xPercent: x / 22,
      ease: "power2.out",
    })

    // Hair back + shadow — opposite direction for parallax
    gsap.to([dom.hairBack, ...dom.shadow], {
      duration: 0.7,
      yPercent: (yLow / 20) * -1,
      xPercent: (x / 20) * -1,
      ease: "power2.out",
    })

    // Hair left — subtly follows face, never detaches
    if (dom.hairLeft) {
      gsap.to(dom.hairLeft, {
        duration: 0.8,
        ease: "power3.out",
        yPercent: yLow / 60,       // half of face movement
        xPercent: x / 60,          // half of face movement
        rotation: x / 120,         // very subtle rotation
      })
    }

    // Hair group — follows face proportionally
    if (dom.hairGroup) {
      gsap.to(dom.hairGroup, {
        duration: 0.8,
        rotation: x / 160,
        xPercent: x / 80,
        ease: "power2.out",
      })
    }

    // Ears move opposite to face
    gsap.to(dom.ear, {
      duration: 0.5,
      yPercent: (y / 1.5) * -1,
      xPercent: (x / 10) * -1,
      ease: "power2.out",
    })

    // Eyebrows — expressive, move with eyes
    gsap.to([dom.eyebrowLeft, dom.eyebrowRight], {
      duration: 0.4,
      yPercent: y * 2,
      xPercent: x * 0.5,
      ease: "power1.out",
    })

    // Nose — subtle shift
    if (dom.nose) {
      gsap.to(dom.nose, {
        duration: 0.5,
        xPercent: x / 20,
        yPercent: y / 25,
        ease: "power2.out",
      })
    }

    // Glasses — slight slide
    if (dom.glasses) {
      gsap.to(dom.glasses, {
        duration: 0.5,
        yPercent: yHigh / 40,
        xPercent: x / 35,
        ease: "power2.out",
      })
    }

    storedXPosition = xPosition
    storedYPosition = yPosition
  }

  // ════════════════════════════════════
  // ACTIVATION
  // ════════════════════════════════════
  function addMouseEvent(): void {
    const safeToAnimate = window.matchMedia("(prefers-reduced-motion: no-preference)").matches

    if (safeToAnimate) {
      window.addEventListener("mousemove", updateScreenCoords)
      gsap.ticker.add(animateFace)
      idleTl.play()
      playBlink()
      scheduleGlance()
    }
  }

  function updateWindowSize(): void {
    height = window.innerHeight
    width = window.innerWidth
  }

  updateWindowSize()
  window.addEventListener("resize", updateWindowSize)

  // ════════════════════════════════════
  // CLEANUP
  // ════════════════════════════════════
  return () => {
    window.removeEventListener("resize", updateWindowSize)
    window.removeEventListener("mousemove", updateScreenCoords)
    gsap.ticker.remove(animateFace)
    if (blinkTl) blinkTl.kill()
    idleTl.kill()
    dizzy.kill()
    entrance.kill()
  }
}
