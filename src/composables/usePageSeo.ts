import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import { useHead } from '@unhead/vue'

const SITE_URL = 'https://irvincodes.dev'

interface PageSeo {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  /** Route path, e.g. '/' or '/freelance' */
  path: string
  /** Page-specific schema.org nodes, merged into a JSON-LD @graph */
  schema?: MaybeRefOrGetter<Record<string, unknown>[]>
}

// One place for every per-page tag, so canonical/OG never leak between routes
export function usePageSeo({ title, description, path, schema }: PageSeo) {
  const url = `${SITE_URL}${path === '/' ? '/' : path}`

  useHead({
    title: () => toValue(title),
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: () => toValue(description) },
      { property: 'og:url', content: url },
      { property: 'og:title', content: () => toValue(title) },
      { property: 'og:description', content: () => toValue(description) },
      { name: 'twitter:title', content: () => toValue(title) },
      { name: 'twitter:description', content: () => toValue(description) },
    ],
    script: computed(() => {
      const nodes = toValue(schema)
      if (!nodes?.length) return []
      return [{
        type: 'application/ld+json',
        key: `ld-${path}`,
        innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }),
      }]
    }),
  })
}

export const absoluteUrl = (path: string) => `${SITE_URL}${path}`
