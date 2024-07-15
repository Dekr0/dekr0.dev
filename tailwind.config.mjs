import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
        extend: {
            screens: {
                "xs": "400px"
            },
            colors: {
                solar: {
                    "base-00"    : "#657B83",
                    "base-01"    : "#586E75",
                    "base-02"    : "#073642",
                    "base-03"    : "#002B36",
                    "base-04"    : "#00141A",
                    "base-0"     : "#9EACAD",
                    "base-1"     : "#ADB8B8",
                    "base-2"     : "#EEE8D5",
                    "base-3"     : "#FDF6E3",
                    "base-4"     : "#FFFFFF",
                    "blue-100"   : "#AADCFF",
                    "blue-300"   : "#49AEF5",
                    "blue-500"   : "#268BD2",
                    "blue-700"   : "#1B6497",
                    "blue-900"   : "#103956",
                    "cyna-100"   : "#B9FFFA",
                    "cyna-300"   : "#29EEDF",
                    "cyna-500"   : "#2AA198",
                    "cyna-700"   : "#1A6265",
                    "cyna-900"   : "#103B3D",
                    "green-100"  : "#D6FFAC",
                    "green-300"  : "#BAFB00",
                    "green-500"  : "#859900",
                    "green-700"  : "#596600",
                    "green-900"  : "#2C3300",
                    "orange-100" : "#FF9468",
                    "orange-300" : "#F8520E",
                    "orange-500" : "#CB4B16",
                    "orange-700" : "#A13C11",
                    "orange-900" : "#5C220A",
                    "red-100"    : "#FF9D9B",
                    "red-300"    : "#F6524F",
                    "red-500"    : "#DC322F",
                    "red-700"    : "#B7211F",
                    "red-900"    : "#57100F",
                    "yellow-100" : "#FFE999",
                    "yellow-300" : "#FFC100",
                    "yellow-500" : "#B58900",
                    "yellow-700" : "#664D00",
                    "yellow-900" : "#332700"
                }
            },
        },
        fontFamily: {
            mono: ['codenew', ...defaultTheme.fontFamily.mono]
        }
	},
    plugins: []
}
