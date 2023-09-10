/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        screens: {
            'xs': '480px',

            // => @media (min-width: 640px) { ... }
            'sm': '590px',

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
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
                'nav-sm': '15%',
            },
        },
    },
    plugins: [],
}
