import { UAParser } from "ua-parser-js"

export const formatUserAgent = (userAgent: string) => { 
    const parser = new UAParser(userAgent)
    const { browser: { name, version }, os, device } = parser.getResult()
    return `${name} ${version} en ${os.name} ${device.model}`
}