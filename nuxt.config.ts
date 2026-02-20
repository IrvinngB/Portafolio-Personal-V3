// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    srcDir: 'src/',
    css: ['~/style.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    app: {
        head: {
            title: 'Irvin Benitez - Portfolio',
            htmlAttrs: {
                lang: 'es'
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            ],
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/vite.svg' }
            ]
        }
    },
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true }
})
