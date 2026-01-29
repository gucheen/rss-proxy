import { parseXml, XmlNode } from '@rgrove/parse-xml'
export function parseXmlString(xmlString) {
	const xml = parseXml(xmlString)
	const loop = (node) => {
		if (node.type === XmlNode.TYPE_TEXT) {
			return node.value
		}
		if (Array.isArray(node.children)) {
			if (node.children.length === 1 && node.children.at(0).type === XmlNode.TYPE_TEXT) {
				return node.children.at(0).text
			}
			const nodeData = Object.assign({}, node.attributes)
			node.children.forEach((child) => {
				if (typeof child.name === 'string') {
					if (nodeData[child.name]) {
						if (Array.isArray(nodeData[child.name])) {
							nodeData[child.name] = nodeData[child.name].concat(loop(child))
						}
						else {
							nodeData[child.name] = [nodeData[child.name], loop(child)]
						}
					}
					else {
						nodeData[child.name] = loop(child)
					}
				}
			})
			return nodeData
		}
	}
	const data = xml.toJSON().children.reduce((obj, node) => {
		if (typeof node.name === 'string') {
			if (obj[node.name]) {
				if (Array.isArray(obj[node.name])) {
					obj[node.name] = obj[node.name].concat(loop(node))
				}
				else {
					obj[node.name] = [obj[node.name], loop(node)]
				}
			}
			else {
				obj[node.name] = loop(node)
			}
		}
		return obj
	}, {})
	return data
}
