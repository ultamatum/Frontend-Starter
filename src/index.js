import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './App'
import '@fontsource/open-sans'
import './index.css'

const root = ReactDOM.createRoot(
	document.getElementById('App')
)
root.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>
)
