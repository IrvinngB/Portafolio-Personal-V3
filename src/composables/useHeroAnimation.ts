let gsap: any
let CustomEase: any
let CustomWiggle: any

if (import.meta.client) {
    const gsapModule = await import('gsap')
    const allModule = await import('gsap/all')
    gsap = gsapModule.default
    CustomEase = allModule.CustomEase
    CustomWiggle = allModule.CustomWiggle
    gsap.registerPlugin(CustomEase, CustomWiggle)
}

export function initHeroAnimation(root?: HTMLElement | null): () => void {
    const meTl = gsap.timeline({
        onComplete: addMouseEvent,
        delay: 1,
    });

    const q = (sel: string) => (root ? root.querySelectorAll(sel) : document.querySelectorAll(sel));
    const qs = (sel: string) => (root ? root.querySelector(sel) : document.querySelector(sel));

    gsap.set(qs(".bg") as Element, { transformOrigin: "50% 50%" });
    gsap.set(qs(".ear-right") as Element, { transformOrigin: "0% 50%" });
    gsap.set(qs(".ear-left") as Element, { transformOrigin: "100% 50%" });
    gsap.set(qs(".me") as Element, { opacity: 1, visibility: "visible", display: "block" });
    gsap.set(q(".hair-left"), { transformOrigin: "50% 50%" });

    meTl.from(
        ".me",
        {
            duration: 1,
            yPercent: 100,
            ease: "elastic.out(0.5, 0.4)",
        },
        0.5
    )
        .from(
            ".head , .hair , .shadow",
            {
                duration: 0.9,
                yPercent: 20,
                ease: "elastic.out(0.58, 0.25)",
            },
            0.6
        )
        .from(
            ".ear-right",
            {
                duration: 1,
                rotate: 40,
                yPercent: 10,
                ease: "elastic.out(0.5, 0.2)",
            },
            0.7
        )
        .from(
            ".ear-left",
            {
                duration: 1,
                rotate: -40,
                yPercent: 10,
                ease: "elastic.out(0.5, 0.2)",
            },
            0.7
        )
        .to(
            ".glasses",
            {
                duration: 1,
                keyframes: [{ yPercent: -10 }, { yPercent: 0 }],
                ease: "elastic.out(0.5, 0.2)",
            },
            0.75
        )
        .from(
            ".eyebrow-right , .eyebrow-left",
            {
                duration: 1,
                yPercent: 300,
                ease: "elastic.out(0.5, 0.2)",
            },
            0.7
        )
        .to(
            ".eye-right , .eye-left",
            {
                duration: 0.01,
                opacity: 1,
            },
            0.85
        )
        .to(
            ".eye-right-2 , .eye-left-2",
            {
                duration: 0.01,
                opacity: 0,
            },
            0.85
        );

    const blink = gsap.timeline({
        repeat: -1,
        repeatDelay: 5,
        paused: true,
    });

    blink
        .to(
            ".eye-right, .eye-left",
            {
                duration: 0.01,
                opacity: 0,
            },
            0
        )
        .to(
            ".eye-right-2, .eye-left-2",
            {
                duration: 0.01,
                opacity: 1,
            },
            0
        )
        .to(
            ".eye-right, .eye-left",
            {
                duration: 0.01,
                opacity: 1,
            },
            0.15
        )
        .to(
            ".eye-right-2 , .eye-left-2",
            {
                duration: 0.01,
                opacity: 0,
            },
            0.15
        );

    CustomWiggle.create("myWiggle", {
        wiggles: 6,
        type: "ease-out",
    });
    CustomWiggle.create("lessWiggle", {
        wiggles: 4,
        type: "ease-in-out",
    });

    let dizzyIsPlaying = false;

    const dizzy = gsap.timeline({
        paused: true,
        onComplete: () => {
            dizzyIsPlaying = false;
        },
    });

    dizzy
        .to(
            ".eyes",
            {
                duration: 0.01,
                opacity: 0,
            },
            0
        )
        .to(
            ".dizzy",
            {
                duration: 0.01,
                opacity: 0.3,
            },
            0
        )
        .to(
            ".mouth",
            {
                duration: 0.01,
                opacity: 0,
            },
            0
        )
        .to(
            ".oh",
            {
                duration: 0.01,
                opacity: 0.85,
            },
            0
        )
        .to(
            ".head, .hair-back, .shadow",
            {
                duration: 6,
                rotate: 2,
                transformOrigin: "50% 50%",
                ease: "myWiggle",
            },
            0
        )
        .to(
            ".me",
            {
                duration: 6,
                rotate: -2,
                transformOrigin: "50% 100%",
                ease: "myWiggle",
            },
            0
        )
        .to(
            ".me",
            {
                duration: 4,
                scale: 0.99,
                transformOrigin: "50% 100%",
                ease: "lessWiggle",
            },
            0
        )
        .to(
            ".dizzy-1",
            {
                rotate: -360,
                duration: 1,
                repeat: 5,
                transformOrigin: "50% 50%",
                ease: "none",
            },
            0.01
        )
        .to(
            ".dizzy-2",
            {
                rotate: 360,
                duration: 1,
                repeat: 5,
                transformOrigin: "50% 50%",
                ease: "none",
            },
            0.01
        )
        .to(
            ".eyes",
            {
                duration: 0.01,
                opacity: 1,
            },
            4
        )
        .to(
            ".dizzy",
            {
                duration: 0.01,
                opacity: 0,
            },
            4
        )
        .to(
            ".oh",
            {
                duration: 0.01,
                opacity: 0,
            },
            4
        )
        .to(
            ".mouth",
            {
                duration: 0.01,
                opacity: 1,
            },
            4
        );

    // mouse coords stuff

    let xPosition: number | undefined;
    let yPosition: number | undefined;

    let height: number;
    let width: number;

    function percentage(partialValue: number, totalValue: number): number {
        return (100 * partialValue) / totalValue;
    }

    function updateScreenCoords(event: MouseEvent): void {
        if (!dizzyIsPlaying) {
            xPosition = event.clientX;
            yPosition = event.clientY;
        }
        if (!dizzyIsPlaying && Math.abs(event.movementX) > 500) {
            dizzyIsPlaying = true;
            dizzy.restart();
        }
    }

    let storedXPosition = 0;
    let storedYPosition = 0;

    const dom = {
        face: qs(".face") as HTMLElement,
        eye: q(".eye") as NodeListOf<HTMLElement>,
        innerFace: qs(".inner-face") as HTMLElement,
        hairFront: qs(".hair-front") as HTMLElement,
        hairBack: qs(".hair-back") as HTMLElement,
        hairLeft: qs(".hair-left") as HTMLElement,
        shadow: q(".shadow") as NodeListOf<HTMLElement>,
        ear: q(".ear") as NodeListOf<HTMLElement>,
        eyebrowLeft: qs(".eyebrow-left") as HTMLElement,
        eyebrowRight: qs(".eyebrow-right") as HTMLElement,
    };

    function animateFace(): void {
        if (xPosition === undefined || yPosition === undefined) return;

        if (storedXPosition === xPosition && storedYPosition === yPosition) return;

        const x = percentage(xPosition, width) - 50;
        const y = percentage(yPosition, height) - 50;

        const yHigh = percentage(yPosition, height) - 20;
        const yLow = percentage(yPosition, height) - 80;

        gsap.to(dom.face, {
            yPercent: yLow / 30,
            xPercent: x / 30,
        });
        gsap.to(dom.eye, {
            yPercent: yHigh / 3,
            xPercent: x / 2,
        });
        gsap.to(dom.innerFace, {
            yPercent: y / 6,
            xPercent: x / 8,
        });
        gsap.to(dom.hairFront, {
            yPercent: yHigh / 15,
            xPercent: x / 22,
        });
        gsap.to([dom.hairBack, ...dom.shadow], {
            yPercent: (yLow / 20) * -1,
            xPercent: (x / 20) * -1,
        });
        // Enhanced hair animation - follows head movement naturally
        const headVerticalMovement = yLow / 30; // How much the head moves vertically

        if (dom.hairLeft) {
            gsap.to(dom.hairLeft, {
                duration: 1.0,
                ease: "power3.out",
                // Vertical: follows head movement
                yPercent: headVerticalMovement * 0.5,
                // Horizontal: follows head movement
                xPercent: x / 30 * 0.5,
                // Rotation: head tilt + horizontal movement
                rotation: (x / 90) + (y / 80), // More responsive to vertical movement
                scaleX: 1 + (Math.abs(x) / 800) + (Math.abs(y) / 1200), // Stretch with movement
            });
        }
        gsap.to(dom.ear, {
            yPercent: (y / 1.5) * -1,
            xPercent: (x / 10) * -1,
        });
        gsap.to([dom.eyebrowLeft, dom.eyebrowRight], {
            yPercent: y * 2.5,
        });

        storedXPosition = xPosition;
        storedYPosition = yPosition;
    }

    // Subtle breathing animation for hair when idle
    const hairBreathing = gsap.timeline({
        repeat: -1,
        yoyo: true,
        paused: true,
    });

    hairBreathing
        .to(dom.hairLeft, {
            duration: 3,
            yPercent: -1,
            rotation: 1,
            ease: "sine.inOut",
        }, 0);

    function addMouseEvent(): void {
        const safeToAnimate = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

        if (safeToAnimate) {
            window.addEventListener("mousemove", updateScreenCoords);

            gsap.ticker.add(animateFace);

            blink.play();
            hairBreathing.play();
        }
    }

    function updateWindowSize(): void {
        height = window.innerHeight;
        width = window.innerWidth;
    }

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    // Return cleanup function
    return () => {
        try {
            window.removeEventListener("resize", updateWindowSize);
        } catch (e) {
            // ignore
        }

        try {
            window.removeEventListener("mousemove", updateScreenCoords);
        } catch (e) {
            // ignore
        }

        try {
            gsap.ticker.remove(animateFace);
        } catch (e) {
            // ignore
        }

        try {
            // pause blinking timeline if it exists
            // note: blink is in closure; safe to try
            // @ts-ignore
            if (typeof blink !== 'undefined' && blink.pause) blink.pause();
        } catch (e) {
            // ignore
        }

        try {
            // pause hair breathing animation if it exists
            // @ts-ignore
            if (typeof hairBreathing !== 'undefined' && hairBreathing.pause) hairBreathing.pause();
        } catch (e) {
            // ignore
        }
    }
}
