import * as React from 'react'
import { Grid } from '@mui/material'
import ProductColumn from './Home Page/ProductColumn.js'
import CartColumn from './Home Page/CartColumn.js'

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
