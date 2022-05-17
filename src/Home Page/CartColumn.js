import * as React from 'react'
import {
	Box,
	List,
	ListItemButton,
	ListItemText,
	Divider,
	Typography,
} from '@mui/material'
import {
	GetCart,
	GetProduct,
} from './../Handlers/HTTPRequest.js'

// CartItem Object, this decides the look of each list item in the cart
class CartItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			productName: '',
			productPrice: 0,
			productQuantity: 0,
		}
	}

	async componentDidMount() {
		await GetProduct(this.props.product['id'])
			.then((response) => {
				this.setState({
					productName: response['name'],
					productPrice: response['price'],
					productQuantity:
						this.props.product['quantity'],
				})
			})
			.then(() => {
				this.props.increaseCartTotal(
					this.state.productPrice *
						this.state.productQuantity
				)
			})
	}

	render() {
		return (
			<ListItemButton>
				<ListItemText
					primary={this.state.productName}
					secondary={`Quantity: ${
						this.state.productQuantity
					} | Price: ${
						this.state.productPrice *
						this.state.productQuantity
					}`}
				/>
			</ListItemButton>
		)
	}
}

//This class is only to shorten the code in the main cart class and easily allow for theoretically infinite items in the cart
class CartItems extends React.Component {
	render() {
		var objects = []
		for (var i = 0; i < this.props.cartLength; i++) {
			objects.push(
				<CartItem
					key={this.props.products[i]['id']}
					product={this.props.products[i]}
					increaseCartTotal={
						this.props.increaseCartTotal
					}
				/>
			)
		}
		return objects
	}
}

// Overall Cart Class, decides the look of the cart module (the rounded white box which the items are drawn on)
class Cart extends React.Component {
	render() {
		if (this.props.cartLength > 0) {
			return (
				<Box
					sx={{
						width: '100%',
						height: 400,
						bgcolor: 'background.paper',
						borderRadius: '16px',
					}}
				>
					<List>
						<CartItems
							products={
								this.props.cartProducts
							}
							cartLength={
								this.props.cartLength
							}
							increaseCartTotal={
								this.props.increaseCartTotal
							}
						/>
					</List>
				</Box>
			)
		} else {
			return (
				<Box
					sx={{
						width: '100%',
						height: 400,
						bgcolor: 'background.paper',
						borderRadius: '16px',
					}}
				>
					<Typography
						variant='h5'
						sx={{ fontWeight: 'bold' }}
					>
						No Products Found
					</Typography>
				</Box>
			)
		}
	}
}

//The right column of the site, housing the cart and the total price
class CartColumn extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cartProducts: [],
			cartTotal: 0,
		}

		this.increaseCartTotal =
			this.increaseCartTotal.bind(this)
	}

	//When the component is loaded we update the cart to get the current items
	componentDidMount() {
		this.updateCart()
	}

	async updateCart() {
		await GetCart(3).then((response) => {
			this.setState({
				cartProducts: response['products'],
			})
		})
	}

	//Increasing the total value to be displayed later (the reason I done this is because I don't want to
	//make extra calls to the API as that takes time and could be a worse experience for the user)
	increaseCartTotal(value) {
		this.setState({
			cartTotal: this.state.cartTotal + value,
		})
	}

	render() {
		return (
			// Background box
			<Box
				sx={{
					p: 2.5,
					width: '1/3',
					minHeight: '300px',
					borderRadius: '16px',
					backgroundColor: '#f5f5f5',
				}}
			>
				<div className='cart-title'>
					<h2>Shopping Cart</h2>
				</div>
				<Cart
					cartLength={
						this.state.cartProducts.length
					}
					cartProducts={this.state.cartProducts}
					increaseCartTotal={
						this.increaseCartTotal
					}
				/>
				<Divider variant='middle' sx={{ p: 3 }} />

				<Typography
					variant='h5'
					component='h2'
					sx={{ pt: 3 }}
				>
					Total: ${this.state.cartTotal}
				</Typography>
			</Box>
		)
	}
}

export default CartColumn
