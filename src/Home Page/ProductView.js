import {
	Box,
	Grid,
	Typography,
	Button,
} from '@mui/material'
import * as React from 'react'

class ProductItem extends React.Component {
	render() {
		return (
			<Grid
				key={this.props.product['id']}
				item
				md={4}
			>
				<Box
					sx={{
						width: '100%',
						borderRadius: '16px',
					}}
					component='img'
					src={this.props.product['defaultImage']}
				/>
				<Typography
					variant='h6'
					sx={{ fontWeight: 'bold' }}
				>
					{this.props.product['name']}
				</Typography>
				<Typography variant='body1'>
					{this.props.product['description']}
				</Typography>
				<Typography
					variant='h5'
					sx={{
						fontWeight: 'bold',
						color: '#ff6d00',
					}}
				>
					${this.props.product['price']}
				</Typography>
				<Button variant='contained'>
					Add to Cart
				</Button>
			</Grid>
		)
	}
}

class ProductItems extends React.Component {
	render() {
		var objects = []
		for (var i = 0; i < 9; i++) {
			objects.push(
				<ProductItem
					key={i}
					product={this.props.products[i]}
				/>
			)
		}
		return objects
	}
}

class ProductView extends React.Component {
	render() {
		if (this.props.products.length > 0) {
			return (
				<Grid container spacing={4}>
					<ProductItems
						products={this.props.products}
					/>
				</Grid>
			)
		} else {
			return (
				<Typography
					variant='h5'
					sx={{ fontWeight: 'bold' }}
				>
					No Products Found
				</Typography>
			)
		}
	}
}

export default ProductView
