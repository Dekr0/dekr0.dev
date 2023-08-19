/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        fontFamily: {

        },
        extend: {
            colors: {
                'bg': '#1a1b26',
                'fg': '#a9b1d6',
                'purple': '#9d7cd8',
                'cyan': '#7dcfff',
                'red': '#f7768e',
                'icon-color': '#7dcfff',
                'icon-hover': '#9d7cd8',
            },
            flexBasis: {
                'nav-sm': '13.6%',
            },
        },
    },
    plugins: [],
}
