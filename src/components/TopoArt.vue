<template>
  <svg viewBox="0 0 400 500" class="topo" aria-hidden="true" focusable="false">
    <g class="rings">
      <path
        v-for="(d, i) in rings"
        :key="i"
        :d="d"
        pathLength="1"
        class="ring topo-ring"
        :class="i % 2 ? 'ring-cw' : 'ring-ccw'"
        :style="{ '--i': i, '--o': 0.85 - i * 0.07 }"
      />
    </g>

    <!-- "You are here" marker -->
    <circle :cx="CX" :cy="CY" r="14" class="marker-pulse" />
    <circle :cx="CX" :cy="CY" r="5" class="marker" />

    <text x="24" y="470" class="coords">8.88° N · 79.78° W</text>
    <text x="376" y="470" text-anchor="end" class="coords">Panamá Oeste</text>
  </svg>
</template>

<script setup lang="ts">
// Contour lines are generated deterministically so SSR and client markup match
const CX = 200
const CY = 235
const RINGS = 9
const POINTS = 64

const contour = (index: number) => {
  const base = 26 + index * 22
  const pts: [number, number][] = []
  for (let k = 0; k < POINTS; k++) {
    const t = (k / POINTS) * Math.PI * 2
    const wobble =
      1 +
      0.09 * Math.sin(3 * t + index * 0.7) +
      0.05 * Math.sin(5 * t - index * 0.45) +
      0.025 * Math.sin(8 * t + index * 1.3)
    const r = base * wobble
    pts.push([CX + r * Math.cos(t), CY + r * 1.12 * Math.sin(t)])
  }
  // Closed Catmull-Rom spline converted to cubic Béziers
  const at = (i: number) => pts[(i + POINTS) % POINTS] as [number, number]
  let d = `M${at(0)[0].toFixed(1)} ${at(0)[1].toFixed(1)}`
  for (let i = 0; i < POINTS; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${c1[0]!.toFixed(1)} ${c1[1]!.toFixed(1)} ${c2[0]!.toFixed(1)} ${c2[1]!.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return `${d}Z`
}

const rings = Array.from({ length: RINGS }, (_, i) => contour(i))
</script>

<style scoped>
.topo {
  width: 100%;
  height: 100%;
  display: block;
}

.ring {
  fill: none;
  stroke: var(--accent);
  stroke-width: 1.2;
  opacity: var(--o);
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transform-box: view-box;
  transform-origin: 200px 235px;
}

.ring:first-child {
  stroke: var(--accent-alt);
  stroke-width: 1.6;
}

/* Draw-in on reveal lives in style.css (.is-visible .topo-ring) */

.ring-cw {
  animation: drift-cw 26s ease-in-out infinite;
}

.ring-ccw {
  animation: drift-ccw 32s ease-in-out infinite;
}

@keyframes drift-cw {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(4deg) scale(1.015); }
}

@keyframes drift-ccw {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(-3deg) scale(0.99); }
}

.marker {
  fill: var(--accent-alt);
}

.marker-pulse {
  fill: var(--accent-alt);
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  animation: pulse 2.8s ease-out infinite;
}

@keyframes pulse {
  0% { opacity: 0.45; transform: scale(0.4); }
  100% { opacity: 0; transform: scale(2.2); }
}

.coords {
  font-family: 'Cascadia Code', 'Fira Code', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  fill: var(--muted);
}

@media (prefers-reduced-motion: reduce) {
  .ring {
    stroke-dashoffset: 0;
    animation: none;
  }
  .marker-pulse {
    animation: none;
  }
}
</style>
