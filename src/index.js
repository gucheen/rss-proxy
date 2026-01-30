import { traverse } from 'object-traversal'
import { parseXmlString } from './xml'

export default {
	/**
	 *
	 * @param {Request} request
	 * @param {*} env
	 * @param {*} ctx
	 * @returns
	 */
	async fetch(request, env, ctx) {
		const reqUrl = new URL(request.url)
		const rssUrl = reqUrl.searchParams.get('url')
		if (rssUrl) {
			const res = await fetch(rssUrl)
			const xml = await res.text()
			try {
				const data = parseXmlString(xml)
				traverse(data, ({ parent, key, value }) => {
					if (key === 'pubDate' && value) {
						parent.isoDate = new Date(value).toISOString()
					}
				})
				return new Response(JSON.stringify(data), {
					headers: {
						'content-type': 'application/json',
					},
				})
			} catch (error) {
				return new Response('Invalid RSS feed', {
					status: 400,
				})
			}
		} else {
			return new Response('Hello World!', {
				headers: {
					'content-type': 'text/plain',
				},
			})
		}
	},
}
