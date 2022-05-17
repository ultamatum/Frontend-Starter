import * as React from 'react'
import { Grid } from '@mui/material'
import ProductColumn from './Home Page/ProductColumn.js'
import CartColumn from './Home Page/CartColumn.js'

// Header section of the site, can be replaced with a logo or whatever the client requires
class Header extends React.Component {
	render() {
		return (
			<header className='header'>
				<div className='header-content'>
					<h1>Smart Hardware Shop</h1>
				</div>
			</header>
		)
	}
}

//Root of the site, currently split into 1/3 2/3 but can easily be changed
function Root() {
	return (
		<div className='App'>
			<Header />
			<Grid container direction='row' spacing={2}>
				<Grid item xs={8}>
					<ProductColumn />
				</Grid>
				<Grid item xs={4}>
					<CartColumn />
				</Grid>
			</Grid>
		</div>
	)
}

export default Root
