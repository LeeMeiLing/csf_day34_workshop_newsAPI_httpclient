export const COUNTRIES = [ 'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn',
	'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in',
	'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl',
	'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us',
	've', 'za' ]

export const NEWS_URL = 'https://newsapi.org/v2/top-headlines'

export const SOURCE_URL = 'https://newsapi.org/v2/top-headlines/sources'

export const NEWS_API_KEY = 'ADD NEWS API KEY HERE!!!'

export interface Source{
	
	id: string,
	name: string,
	description: string,
	url: string,
	category: string,
	language: string,
	country: string
	
}

export interface Source{
	id:string,
	name: string
}

export interface Article{

		source: Source,
		author: string,
		title: string,
		description: string,
		urlToImage: string,
		content: string

}
