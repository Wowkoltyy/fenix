
let ws: WebSocket
let canvas: HTMLCanvasElement
export let loading: boolean = true
let opened = false

export function closeWebsocket() {
    if (ws != undefined) ws.close()
}

export function createConnection(canvas_: HTMLCanvasElement) {
    canvas = canvas_
    ws = new WebSocket("ws://fenix.local/ws")
    while (ws == undefined) {
    }
    ws.onopen = () => {
        opened = true
        loading = false
    }
}

export function sendData(mode: number, data: number[]) {
    if (ws == undefined) return
    if (!opened) return;
    ws.send(new Uint8Array([mode, ...data]))
}

export function sendSpeed(speed: number) {
    if (ws == undefined) return
    if (!opened) return;
    let x1 = Math.floor(speed / 256)
    let x2 = speed % 256
    console.log(x1, x2)
    ws.send(new Uint8Array([255, x1, x2]))
}

export function sendPoints(mode: number, points: ({x: number, y: number} | null)[]) {
    if (ws == undefined) return
    if (!opened) return;

    let res: number[] = [mode]
    points.forEach((p, i) => {
        if (p == null) return
        let m = Math.max(canvas.width, canvas.height)
        res.push(Math.floor(p.x / m * 255), Math.floor(p.y / m * 255))
        if (i == 0) res.push(1);
        else if (points[i - 1] == null) res.push(0)
        else res.push(1)
    })

    console.log(res)
    ws.send(new Uint8Array(res))
}

export function sendPoint(mode: number, point: {x: number, y: number, m: number}) {
    if (ws == undefined) return
    if (!opened) return;

    let m = Math.max(canvas.width, canvas.height)
    let x = Math.floor(point.x / m * 255), y = Math.floor(point.y / m * 255)
    let xc = Math.floor(point.x / canvas.width * 255), yc = Math.floor(point.y / canvas.height * 255)
    console.log(xc, yc)
    if (xc > 255 || yc > 255 || yc < 0 || xc < 0) return
    console.log(new Uint8Array([mode, x, y, point.m]))
    ws.send(new Uint8Array([mode, x, y, point.m]))
}

export class checkConnection {
}