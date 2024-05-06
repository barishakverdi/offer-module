/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/views/**/*.html',
        './src/js/**/*.js',
        './index.html',
    ],
    theme: {
        extend: {
            screens: {
                'min-xxl': {'min': '1441px'},
                'min-xl': {'min': '1281px'},
                'min-lg': {'min': '1025px'},
                'min-md': {'min': '769px'},
                'min-sm': {'min': '577px'},
                'xxl': {'max': '1440px'},
                'xl': {'max': '1280px'},
                'lg': {'max': '1024px'},
                'md': {'max': '768px'},
                'sm': {'max': '576px'},
            },

            colors: {
                primary: '#137ff2',
                dark: '#091929',
                light: '#dcdfe3',
                text: '#545557',
                white: '#FFFFFF',
                black: '#000000',
            },

            zIndex: {
                1: '1',
                2: '2',
                3: '3',
                4: '4',
            },

            flexGrow: {
                1: '1',
            },
        },
    },
    plugins: [
        // require('@tailwindcss/container-queries'),
        // require('prettier-plugin-tailwindcss'),
    ],
};

