import * as React from 'react'
import {
	Box,
	Paper,
	InputBase,
	IconButton,
	FormControl,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {
	GetReccommendeds,
	PaginateSearch,
} from './../Handlers/HTTPRequest'
import ProductView from './ProductView'

// Class to manage searching
class SearchForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = { value: '', searchResults: [] }

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	//Whenever the search bar is changed, this function is called updating the module state
	handleChange(event) {
		this.setState({ value: event.target.value })
	}

	// When the search button is clicked we send the information up to the main class, the preventDefault prevents the page from refreshing
	handleSubmit(event) {
		event.preventDefault()

		this.props.handleSearch(this.state.value)
	}

	render() {
		return (
			<FormControl>
				<Paper
					component='form'
					sx={{
						p: '2px 4px',
						display: 'flex',
						alignItems: 'center',
						width: 400,
					}}
				>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder='Search Products'
						onChange={this.handleChange}
						inputProps={{
							'aria-label':
								'search google maps',
						}}
					/>
					<IconButton
						type='submit'
						sx={{ p: '10px' }}
						aria-label='search'
						onClick={this.handleSubmit}
					>
						<SearchIcon />
					</IconButton>
				</Paper>
			</FormControl>
		)
	}
}

//Simple banner currently, can easily be replaced with an image or carousel if reqquired
class Banner extends React.Component {
	render() {
		return (
			<Box
				className='banner'
				sx={{
					height: '60px',
					mb: '20px',
					borderRadius: '16px',
					backgroundColor: '#00aae7',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<h1>News / Products</h1>
			</Box>
		)
	}
}

//The left side of the site, containing an advertising banner, search bar and the product list
class ProductColumn extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			products: [],
			searchValue: '',
		}

		this.handleSearch = this.handleSearch.bind(this)
	}

	//Load products when the page first loads
	componentDidMount() {
		this.handleSearch('')
	}

	//Update the products when the search bar is updated, if there is no search value we just get the reccomended products
	async handleSearch(searchText) {
		this.setState({ searchValue: searchText })

		if (searchText.length > 0) {
			await PaginateSearch(searchText, 1, 9).then(
				(response) => {
					this.setState({ products: response })
				}
			)
		} else {
			await GetReccommendeds().then((response) => {
				this.setState({ products: response })
			})
		}
	}

	//Simple rendering of a 2/3rds size box with contents
	render() {
		return (
			<Box
				maxWidth={true}
				sx={{
					p: 2.5,
					width: '2/3',
					minHeight: '300px',
					borderRadius: '16px',
					backgroundColor: '#f5f5f5',
				}}
			>
				<Banner />
				<SearchForm
					handleSearch={this.handleSearch}
				/>
				<ProductView
					products={this.state.products}
				/>
			</Box>
		)
	}
}

export default ProductColumn
