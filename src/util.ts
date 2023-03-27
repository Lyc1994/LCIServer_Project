export function send(route: string, res: any, response: any = { code: 0, message: 'success' }) {
    res.send(response)
    log(`S ===> C method:POST route:${route}\nresponse:${JSON.stringify(response)}`)
}

export function log(message: any) {
    console.log(message)
}

let baseData: any = {}
export function getBaseData(key: string) {
    return baseData[key]
}

export function setBaseData(key: string, model: any) {
    baseData[key] = model
}

export function random(min: number = 0, max: number = 1) {
    min = Math.min(min, max)
    max = Math.max(min, max)

    return Math.random() * (max - min) + min
}