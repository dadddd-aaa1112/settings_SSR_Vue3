const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				dark_grey: '#04202C',
				dark_green: '#384737',
				light_green: '#5B7065',
				light: '#C9D1C8',
				vanil: '#ece1b2',
				dark_vanil: '#dcc770',
			},
		},
	},

	plugins: [require('@tailwindcss/forms')],
}
