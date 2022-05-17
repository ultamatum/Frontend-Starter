import {
	Box,
	Grid,
	Typography,
	Button,
} from '@mui/material'
import * as React from 'react'

// Class for managing the look of each product in the shop grid.
//Separating it makes it easier to read and allows for easy duplication
class ProductItem extends React.Component {
	render() {
		return (
			<Grid
				key={this.props.product['id']}
				item
				md={4}
			>
				{/* Image Box*/}
				<Box
					sx={{
						width: '100%',
						borderRadius: '16px',
					}}
					component='img'
					src={this.props.product['defaultImage']}
				/>

				{/* Product Name */}
				<Typography
					variant='h6'
					sx={{ fontWeight: 'bold' }}
				>
					{this.props.product['name']}
				</Typography>

				{/* Product Description */}
				<Typography variant='body1'>
					{this.props.product['description']}
				</Typography>

				{/* Product Price */}
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

// Class to group all the items into an easy to render array for the productView class
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

//Manages the look of the ProductView Module (spacing, amount of items etc)
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
			/* If no items are found (whether nothing returned from search or API issues) we display "No products found" */
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
