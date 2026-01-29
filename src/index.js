/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
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
		} else {
			return new Response('Hello World!', {
				headers: {
					'content-type': 'text/plain',
				},
			})
		}
	},
}
