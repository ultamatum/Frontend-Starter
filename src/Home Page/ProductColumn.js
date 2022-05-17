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

class SearchForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = { value: '', searchResults: [] }

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({ value: event.target.value })
	}

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

class ProductColumn extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			products: [],
			searchValue: '',
		}

		this.handleSearch = this.handleSearch.bind(this)
	}
	componentDidMount() {
		this.handleSearch('')
	}

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
