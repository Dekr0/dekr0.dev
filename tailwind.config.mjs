/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
        extend: {
            colors: {
                solar: {
                    "base-00": "#657B83",
                    "base-01": "#586E75",
                    "base-02": "#073642",
                    "base-03": "#002B36",
                    "base-04": "#00141A",
                    "base-0": "#9EACAD",
                    "base-1": "#ADB8B8",
                    "base-2": "#EEE8D5",
                    "base-3": "#FDF6E3",
                    "base-4": "#FFFFFF",
                    "blue-100": "#AADCFF",
                    "blue-300": "#49AEF5",
                    "blue-500": "#268BD2",
                    "blue-700": "#1B6497",
                    "blue-900": "#103956",
                    "yellow-100": "#FFE999",
                    "yellow-300": "#FFC100",
                    "yellow-500": "#B58900",
                    "yellow-700": "#664D00",
                    "yellow-900": "#332700",
                    "cyna-100": "#B9FFFA",
                    "cyna-300": "#29EEDF",
                    "cyna-500": "#2AA198",
                    "cyna-700": "#1A6265",
                    "cyna-900": "#103B3D"
                }
            }
        },
	},
	plugins: [],
}
