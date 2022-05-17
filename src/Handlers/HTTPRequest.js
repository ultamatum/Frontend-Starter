// Handler class to manage any HTTP requests that may be needed

async function SendRequest(url) {
	const response = await fetch(
		`http://localhost:8080/${url}`
	)

	if (!response.ok) {
		throw new Error(
			`HTTP error! status: ${response.status}`
		)
	}

	const results = await response.json()

	return results
}

async function Search(searchTerm) {
	const results = await SendRequest(
		'products?q=' + searchTerm
	)

	return results
}

async function PaginateSearch(
	searchTerm,
	page,
	maxResults
) {
	const results = await Search(
		`${searchTerm}&_page=${page}&_limit=${maxResults}`
	)

	return results
}

async function GetReccommendeds() {
	const results = await SendRequest('recommendeds')

	return results
}

async function GetProduct(productId) {
	const result = await SendRequest(
		`products/${productId}`
	)

	return result
}

async function GetUser(userId) {
	const result = await SendRequest(`users/${userId}`)

	return result
}

async function GetCart(userId) {
	const result = await SendRequest(`carts/${userId}`)

	return result
}

export {
	Search,
	PaginateSearch,
	GetReccommendeds,
	GetProduct,
	GetUser,
	GetCart,
}
