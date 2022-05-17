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

class CartItems extends React.Component {
	render() {
		console.log(this.props.products)
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
					component='img'
					src='https://i.imgur.com/U6nF1pz.png'
				/>
			)
		}
	}
}

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

	increaseCartTotal(value) {
		this.setState({
			cartTotal: this.state.cartTotal + value,
		})
	}

	render() {
		return (
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
