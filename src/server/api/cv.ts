import { cvDataES, cvDataEN } from '../../data/cvData'

export default defineEventHandler((event) => {
    const query = getQuery(event)
    const lang = query.lang === 'en' ? 'en' : 'es'

    return lang === 'es' ? cvDataES : cvDataEN
})
