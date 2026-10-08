const isClient = typeof window !== 'undefined'

let gsapInstance: any = null
let CustomWigglePlugin: any = null

const initPlugins = async () => {
  if (!isClient || gsapInstance) return
  const gsapModule = await import('gsap')
  // Import only the plugins in use; 'gsap/all' pulls every plugin (~250 KB)
  const [easeModule, wiggleModule] = await Promise.all([
    import('gsap/CustomEase'),
    import('gsap/CustomWiggle'),
  ])
  gsapInstance = gsapModule.gsap || gsapModule.default
  CustomWigglePlugin = wiggleModule.CustomWiggle
  gsapInstance.registerPlugin(easeModule.CustomEase, CustomWigglePlugin)
}

const SLEEP_AFTER_MS = 12_000

export async function initHeroAnimation(root?: HTMLElement | null): Promise<() => void> {
  if (!isClient) return () => {}
  await initPlugins()
  const gsap = gsapInstance

  // Scoped selector: never touch elements outside the avatar
  const $ = gsap.utils.selector(root ?? document.body)
  const one = (sel: string) => $(sel)[0] as SVGElement | undefined

  // ═══ Managed timers — everything is cleared on unmount ═══
  const timers = new Set<ReturnType<typeof setTimeout>>()
  const later = (fn: () => void, ms: number) => {
    const id = setTimeout(() => { timers.delete(id); fn() }, ms)
    timers.add(id)
  }

  // ═══ DOM references ═══
  const dom = {
    me: one('.me'),
    head: one('.head'),
    face: one('.face'),
    innerFace: one('.inner-face'),
    hair: one('.hair-group'),
    glasses: one('.glasses'),
    nose: one('.nose'),
    mouth: one('.mouth'),
    smile: one('.smile'),
    // `.eye` includes open eyes, closed-eye lines and blush — they all track together
    eyes: $('.eye') as SVGElement[],
    eyesOpen: $('.eye-left, .eye-right'),
    eyesClosed: $('.eye-left-2, .eye-right-2'),
    eyebrows: $('.eyebrow-left, .eyebrow-right'),
    ears: $('.ear'),
    shadow: $('.shadow'),
    body: one('.body'),
    glint: one('.glint'),
    zzz: $('.zzz text'),
  }

  // ═══ Setup ═══
  gsap.set(dom.me, { opacity: 1, visibility: 'visible', display: 'block' })
  gsap.set(dom.face, { transformOrigin: '50% 70%' })
  gsap.set(dom.head, { transformOrigin: '50% 100%' })
  // Hair pivots near the crown so the sway reads as hair, not as a hat sliding
  gsap.set(dom.hair, { transformOrigin: '50% 90%' })
  gsap.set(dom.body, { transformOrigin: '50% 100%' })
  gsap.set(dom.nose, { transformOrigin: '50% 100%' })
  gsap.set(dom.eyesClosed, { opacity: 0 })
  gsap.set([dom.smile, ...dom.zzz], { opacity: 0 })

  // ════════════════════════════════════
  // STATE
  // ════════════════════════════════════
  let dizzyIsPlaying = false
  let isAsleep = false
  let isHappy = false
  const busy = () => dizzyIsPlaying || isAsleep

  // ════════════════════════════════════
  // MOUSE TRACKING — quickTo setters are created ONCE and re-targeted,
  // instead of spawning ~10 new tweens on every frame.
  // ════════════════════════════════════
  const qt = (el: any, prop: string, duration: number, ease = 'power2.out') =>
    el ? gsap.quickTo(el, prop, { duration, ease }) : () => {}

  const track = {
    faceX: qt(dom.face, 'xPercent', 0.6),
    faceY: qt(dom.face, 'yPercent', 0.6),
    faceTilt: qt(dom.face, 'rotation', 0.9),
    eyeX: qt(dom.eyes, 'xPercent', 0.3, 'power1.out'),
    eyeY: qt(dom.eyes, 'yPercent', 0.3, 'power1.out'),
    innerX: qt(dom.innerFace, 'xPercent', 0.5),
    innerY: qt(dom.innerFace, 'yPercent', 0.5),
    earX: qt(dom.ears, 'xPercent', 0.5),
    earY: qt(dom.ears, 'yPercent', 0.5),
    browX: qt(dom.eyebrows, 'xPercent', 0.4, 'power1.out'),
    browY: qt(dom.eyebrows, 'yPercent', 0.4, 'power1.out'),
    noseX: qt(dom.nose, 'xPercent', 0.5),
    noseY: qt(dom.nose, 'yPercent', 0.5),
    glassX: qt(dom.glasses, 'xPercent', 0.5),
    glassY: qt(dom.glasses, 'yPercent', 0.5),
    shadowX: qt(dom.shadow, 'xPercent', 0.7),
    shadowY: qt(dom.shadow, 'yPercent', 0.7),
  }

  const lookAt = (clientX: number, clientY: number) => {
    const px = (100 * clientX) / window.innerWidth
    const py = (100 * clientY) / window.innerHeight
    const x = px - 50
    const y = py - 50
    const yHigh = py - 20
    const yLow = py - 80

    track.faceX(x / 30); track.faceY(yLow / 30)
    track.faceTilt(x / 25) // head tilts toward the cursor — gives it depth
    track.eyeX(x / 2); track.eyeY(yHigh / 3)
    track.innerX(x / 8); track.innerY(y / 6)
    track.earX(-x / 10); track.earY(-y / 1.5)
    track.browX(x * 0.5); track.browY(y * 2)
    track.noseX(x / 20); track.noseY(y / 25)
    track.glassX(x / 35); track.glassY(yHigh / 40)
    track.shadowX(-x / 20); track.shadowY(-yLow / 20)
  }

  // ════════════════════════════════════
  // HAIR — spring-driven secondary motion.
  // Hair inherits the face transform, then lags behind and overshoots
  // based on how fast the head moves (overlapping action).
  // ════════════════════════════════════
  let hairAngle = 0
  let hairVel = 0
  let prevFaceX = 0
  let prevTilt = 0

  const springHair = () => {
    if (!dom.face || !dom.hair) return
    const dt = gsap.ticker.deltaRatio(60) // 1 at 60fps, frame-rate independent
    const fx = gsap.getProperty(dom.face, 'xPercent') as number
    const tilt = gsap.getProperty(dom.face, 'rotation') as number
    const drive = (fx - prevFaceX) * 40 + (tilt - prevTilt) * 6
    prevFaceX = fx
    prevTilt = tilt

    const stiffness = 0.14
    const damping = 0.8 // < 1 → a little overshoot, like real hair
    hairVel += (-drive - hairAngle) * stiffness * dt
    hairVel *= Math.pow(damping, dt)
    hairAngle = gsap.utils.clamp(-5, 5, hairAngle + hairVel * dt)

    if (Math.abs(hairAngle) > 0.005 || Math.abs(hairVel) > 0.005) {
      gsap.set(dom.hair, { rotation: hairAngle })
    }
  }

  // ════════════════════════════════════
  // BLINK — natural random intervals
  // ════════════════════════════════════
  const blink = (double = Math.random() < 0.15) => {
    const tl = gsap.timeline()
      .to(dom.eyesOpen, { duration: 0.05, opacity: 0 }, 0)
      .to(dom.eyesClosed, { duration: 0.05, opacity: 1 }, 0)
      .to(dom.eyesOpen, { duration: 0.08, opacity: 1 }, 0.1)
      .to(dom.eyesClosed, { duration: 0.01, opacity: 0 }, 0.1)
    if (double) {
      tl.to(dom.eyesOpen, { duration: 0.04, opacity: 0 }, 0.2)
        .to(dom.eyesClosed, { duration: 0.04, opacity: 1 }, 0.2)
        .to(dom.eyesOpen, { duration: 0.06, opacity: 1 }, 0.25)
        .to(dom.eyesClosed, { duration: 0.01, opacity: 0 }, 0.25)
    }
    return tl
  }

  const scheduleBlink = () => {
    later(() => {
      if (!busy()) blink()
      scheduleBlink()
    }, (2 + Math.random() * 6) * 1000)
  }

  // ════════════════════════════════════
  // GLASSES GLINT — a light sweep across the lenses
  // ════════════════════════════════════
  const glint = () => {
    if (!dom.glint) return
    gsap.timeline()
      .set(dom.glint, { x: 0, opacity: 0 })
      .to(dom.glint, { opacity: 0.85, duration: 0.12 })
      .to(dom.glint, { x: 70, duration: 0.55, ease: 'power2.inOut' }, 0)
      .to(dom.glint, { opacity: 0, duration: 0.12 }, 0.45)
  }

  const scheduleGlint = () => {
    later(() => {
      if (!busy()) glint()
      scheduleGlint()
    }, (8 + Math.random() * 7) * 1000)
  }

  // ════════════════════════════════════
  // IDLE — breathing + occasional glance
  // ════════════════════════════════════
  const idleTl = gsap.timeline({ repeat: -1, yoyo: true, paused: true })
    .to(dom.body, { duration: 2.6, scaleY: 1.015, ease: 'sine.inOut' }, 0)
    .to(dom.head, { duration: 2.6, y: -0.6, ease: 'sine.inOut' }, 0)
    .to(dom.me, { duration: 5, xPercent: 0.3, ease: 'sine.inOut' }, 0)

  const scheduleGlance = () => {
    later(() => {
      if (!busy()) {
        const dir = Math.random() > 0.5 ? 1 : -1
        gsap.timeline()
          .to(dom.eyes, { duration: 0.3, xPercent: dir * 15, ease: 'power2.out' })
          .to(dom.eyes, { duration: 0.6, xPercent: 0, ease: 'power2.inOut' }, '+=0.8')
      }
      scheduleGlance()
    }, (4 + Math.random() * 8) * 1000)
  }

  // ════════════════════════════════════
  // HAPPY — hovering the avatar makes him smile
  // ════════════════════════════════════
  const happyTl = gsap.timeline({ paused: true })
    .to(dom.mouth, { duration: 0.15, opacity: 0 }, 0)
    .to(dom.smile, { duration: 0.2, opacity: 1 }, 0)
    .to(dom.eyebrows, { duration: 0.3, y: -1.6, ease: 'back.out(3)' }, 0)

  const setHappy = (on: boolean) => {
    if (isHappy === on || busy()) return
    isHappy = on
    on ? happyTl.play() : happyTl.reverse()
  }

  // ════════════════════════════════════
  // SLEEP — no activity for a while → dozes off with floating "z"
  // ════════════════════════════════════
  const sleepTl = gsap.timeline({ paused: true })
    .to(dom.eyesOpen, { duration: 0.5, opacity: 0 }, 0)
    .to(dom.eyesClosed, { duration: 0.5, opacity: 1 }, 0)
    .to(dom.head, { duration: 1.6, rotation: -5, ease: 'sine.inOut' }, 0)

  const zzzTl = gsap.timeline({ paused: true, repeat: -1 })
  dom.zzz.forEach((z: Element, i: number) => {
    const t = i * 0.7
    zzzTl
      .fromTo(z,
        { opacity: 0, x: 0, y: 0, scale: 0.6, transformOrigin: '50% 50%' },
        { opacity: 1, duration: 0.4 }, t)
      .to(z, { x: 6, y: -14, scale: 1, duration: 1.8, ease: 'sine.out' }, t)
      .to(z, { opacity: 0, duration: 0.4 }, t + 1.4)
  })

  const fallAsleep = () => {
    if (busy()) return
    if (isHappy) setHappy(false)
    isAsleep = true
    sleepTl.timeScale(1).play()
    zzzTl.restart()
  }

  const wakeUp = () => {
    if (!isAsleep) return
    zzzTl.pause()
    gsap.to(dom.zzz, { duration: 0.2, opacity: 0 })
    sleepTl.timeScale(3).reverse().eventCallback('onReverseComplete', () => {
      isAsleep = false
      blink(true) // startled double blink
    })
  }

  let sleepTimer: ReturnType<typeof setTimeout> | undefined
  const resetSleepTimer = () => {
    if (sleepTimer) { clearTimeout(sleepTimer); timers.delete(sleepTimer) }
    sleepTimer = setTimeout(fallAsleep, SLEEP_AFTER_MS)
    timers.add(sleepTimer)
  }

  // ════════════════════════════════════
  // DIZZY — very fast mouse movement
  // ════════════════════════════════════
  CustomWigglePlugin.create('myWiggle', { wiggles: 6, type: 'ease-out' })
  CustomWigglePlugin.create('lessWiggle', { wiggles: 4, type: 'ease-in-out' })

  const dizzy = gsap.timeline({
    paused: true,
    onStart: () => { dizzyIsPlaying = true },
    onComplete: () => { dizzyIsPlaying = false },
  })
    .to($('.eyes'), { duration: 0.01, opacity: 0 }, 0)
    .to($('.dizzy'), { duration: 0.01, opacity: 0.35 }, 0)
    .to([dom.mouth, dom.smile], { duration: 0.01, opacity: 0 }, 0)
    .to($('.oh'), { duration: 0.01, opacity: 0.9 }, 0)
    .to([dom.head, ...dom.shadow], {
      duration: 3, rotation: 3, transformOrigin: '50% 50%', ease: 'myWiggle',
    }, 0)
    .to(dom.me, { duration: 3, rotation: -2, transformOrigin: '50% 100%', ease: 'myWiggle' }, 0)
    .to(dom.me, { duration: 2.5, scale: 0.98, transformOrigin: '50% 100%', ease: 'lessWiggle' }, 0)
    .to($('.dizzy-1'), { rotation: -360, duration: 0.8, repeat: 3, transformOrigin: '50% 50%', ease: 'none' }, 0.01)
    .to($('.dizzy-2'), { rotation: 360, duration: 0.8, repeat: 3, transformOrigin: '50% 50%', ease: 'none' }, 0.01)
    .to($('.eyes'), { duration: 0.01, opacity: 1 }, 2.5)
    .to($('.dizzy'), { duration: 0.01, opacity: 0 }, 2.5)
    .to($('.oh'), { duration: 0.01, opacity: 0 }, 2.5)
    .add(() => { gsap.set(isHappy ? dom.smile : dom.mouth, { opacity: 1 }) }, 2.5)

  // ════════════════════════════════════
  // INPUT
  // ════════════════════════════════════
  const onPointerMove = (e: PointerEvent) => {
    resetSleepTimer()
    if (isAsleep) wakeUp()
    if (dizzyIsPlaying) return
    if (Math.abs(e.movementX) > 400) {
      dizzyIsPlaying = true
      dizzy.restart()
      return
    }
    lookAt(e.clientX, e.clientY)
  }

  const onPointerDown = () => {
    resetSleepTimer()
    if (isAsleep) wakeUp()
  }
  const onEnter = () => setHappy(true)
  const onLeave = () => setHappy(false)

  // ════════════════════════════════════
  // ACTIVATION
  // ════════════════════════════════════
  const safeToAnimate = window.matchMedia('(prefers-reduced-motion: no-preference)').matches

  if (safeToAnimate) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    root?.addEventListener('pointerenter', onEnter)
    root?.addEventListener('pointerleave', onLeave)
    gsap.ticker.add(springHair)
    idleTl.play()
    scheduleBlink()
    scheduleGlance()
    scheduleGlint()
    resetSleepTimer()
  }

  // ════════════════════════════════════
  // CLEANUP
  // ════════════════════════════════════
  return () => {
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerdown', onPointerDown)
    root?.removeEventListener('pointerenter', onEnter)
    root?.removeEventListener('pointerleave', onLeave)
    gsap.ticker.remove(springHair)
    timers.forEach(clearTimeout)
    timers.clear()
    ;[idleTl, happyTl, sleepTl, zzzTl, dizzy].forEach((tl) => tl.kill())
    if (root) gsap.killTweensOf($('*'))
  }
}
