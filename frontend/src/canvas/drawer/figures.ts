import {cursor, setColor, color, mode} from "./drawer";
import {sendPoints} from "./websocket";

addEventListener("resize", setSize);

let keys: Set<string> = new Set()
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let points: ({x: number, y: number} | null)[] = []
let circles: {x: number, y: number, r: number}[] = []
let drawer: HTMLCanvasElement

let flag = false
export function clearFigures() {
    points = []
    circles = []
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setSize() {
    let W = canvas.width, H = canvas.height
    let temp = ctx.getImageData(0, 0, W, H)
    canvas.height = drawer.height;
    canvas.width = drawer.width;

    console.log(canvas.height, canvas.width)
    canvas.style.top = drawer.offsetTop.toString() + "px"
    canvas.style.left = drawer.offsetLeft.toString() + "px"

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(temp, 0, 0)
}

function anim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    points.forEach((point, i) => {
        if (point == null) {
            ctx.closePath();
            return
        }
        ctx.beginPath()
        ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
        if (i == 0 || points[i - 1] == null) {
            ctx.moveTo(point.x, point.y)
            return;
        }
        ctx.beginPath();
        ctx.fillStyle = color
        ctx.strokeStyle = color
        ctx.lineWidth = 10
        ctx.moveTo(points[i - 1]!.x, points[i - 1]!.y)
        ctx.lineTo(point.x, point.y)
        ctx.stroke()
        ctx.closePath()
    })
    circles.forEach((circle, i) => {
        ctx.beginPath()
        ctx.lineWidth = 5
        ctx.strokeStyle = color
        ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.closePath()
        ctx.beginPath()
        ctx.arc(circle.x, circle.y, 7, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
        if (flag || i !== circles.length - 1) return
        ctx.beginPath()
        ctx.moveTo(circle.x, circle.y)
        ctx.lineTo(cursor.x, cursor.y)
        ctx.stroke()
        ctx.closePath()
    })
    sendPoints(1, points)
}




export function startFiguresDrawer(canvas_: HTMLCanvasElement, drawer_: HTMLCanvasElement) {

    drawer = drawer_
    canvas = canvas_
    canvas.addEventListener("click", () => {
        if (mode !== "points") return;
        points.push(structuredClone(cursor));

        requestAnimationFrame(anim);
    })
    canvas.addEventListener("contextmenu", (e) => {
        if (mode !== "points") return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        let nearest = points.reduce(
            (prev, curr) =>
                prev == null ? curr
                    : curr == null ? prev
                        : ((curr.x - cursor.x) ** 2 + (curr.y - cursor.y) ** 2) < ((prev.x - cursor.x) ** 2 + (prev.y - cursor.y) ** 2) ? curr : prev);

        if (nearest == null || ((nearest.x - cursor.x) ** 2 + (nearest.y - cursor.y) ** 2) > 169) return

        points[points.indexOf(nearest)] = null
        requestAnimationFrame(anim)
    })
    window.addEventListener("mousedown", () => {
        if (mode !== "circle") return;
        circles.push({...cursor, r: 0})
        flag = false
    })
    window.addEventListener("mouseup", () => {
        if (mode !== "circle") return;
        if (circles.length === 0) return;
        flag = true
        requestAnimationFrame(anim)
    })
    window.addEventListener("mousemove", () => {
        if (mode !== "circle") return;
        if (flag) return;
        if (circles.length === 0) return;
        let circle = circles[circles.length - 1]
        circle.r = Math.sqrt((circle.x - cursor.x) ** 2 + (circle.y - cursor.y) ** 2)
        if (keys.has("Shift")) circle.r = Math.floor(circle.r / 50) * 50
        circles[circles.length - 1] = circle
        requestAnimationFrame(anim)
    })
    window.addEventListener("keydown", (e) => {
        keys.add(e.key)
    })
    window.addEventListener("keyup", (e) => {
        keys.delete(e.key)
    })
    ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.5

    setSize();
    requestAnimationFrame(anim)
}