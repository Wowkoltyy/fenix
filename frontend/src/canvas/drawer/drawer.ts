import {sendPoint, sendPoints} from "./websocket";
import {draw} from "svelte/transition";

export const cursor = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};

let drownPoints: ({x: number, y: number} | null)[] = [null]

export function clearDrawer() {
    drownPoints = [null]
    sendPoints(3, [])
    ctx.fillStyle = `rgb(${background.slice(0, -1).join(',')})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}



addEventListener(
    "touchmove",
    (e) => {
        e.preventDefault();
        cursor.x = e.touches[0].clientX;
        cursor.y = e.touches[0].clientY;
    },
    {passive: false},
);

addEventListener("resize", setSize);

function generateParticles(amount: number) {
    for (let i = 0; i < amount; i++) {
        particles[i] = new Particle(innerWidth / 2, innerHeight / 2, 10, color);
    }
}

let accuracy = 0.01;
export function setAccuracy(a: number) {
    accuracy = a / 200
}

function setSize() {
    let W = canvas.width, H = canvas.height
    let temp = ctx.getImageData(0, 0, W, H)
    canvas.height = canvas.getBoundingClientRect().height;
    canvas.width = canvas.getBoundingClientRect().width;

    ctx.fillStyle = `rgb(${background.slice(0, -1).join(',')})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(temp, 0, 0)
}

class Particle {
    x: number
    y: number
    particleTrailWidth: number
    strokeColor: string
    // rotateSpeed: number
    // theta: number
    // t: number

    constructor(x: number, y: number, particleTrailWidth: number, strokeColor: string,) {
        this.x = x;
        this.y = y;
        this.particleTrailWidth = particleTrailWidth;
        this.strokeColor = strokeColor;
        // this.theta = Math.random() * Math.PI * 2;
        // this.rotateSpeed = rotateSpeed;
        // this.t = Math.random() * 150;
    }

    tick() {


        const ls = {
            x: this.x,
            y: this.y,
        };
        // this.theta += this.rotateSpeed;
        this.x = cursor.x//+ Math.cos(this.theta) * this.t;
        this.y = cursor.y //+ Math.sin(this.theta) * this.t;
        if (!pressed) return
        let point = structuredClone(cursor)
        if (mode == "draw"){
            if (drownPoints.length == 1) {
                drownPoints.push(point)
                sendPoint(1, {...point, m: 0})
            }
            else {
                let latest = drownPoints[drownPoints.length - 1] ?? drownPoints[drownPoints.length - 2]!
                if (((latest.x - point.x) ** 2 + (latest.y - point.y) ** 2) > (accuracy * innerWidth) ** 2) {
                    if (drownPoints[drownPoints.length - 1] == null) sendPoint(1, {...point, m: 0})
                    else sendPoint(1, {...point, m: 1})
                    drownPoints.push(point)
                    // console.log(drownPoints, drownPoints.length)
                }
            }
        }
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.lineWidth = this.particleTrailWidth;
        ctx.strokeStyle = color;
        ctx.moveTo(ls.x, ls.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke()
        ctx.strokeStyle = color;
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.particleTrailWidth / 2, 0, Math.PI * 2)
        ctx.fill()
        if (mode == "draw_realtime") return sendPoint(0, {...point, m: 1})
    }
}

function anim() {
    requestAnimationFrame(anim);

    ctx.fillStyle = `rgba(${background.join(',')})`;
    if (mode === "draw_realtime") ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (mode === "draw" || mode === "draw_realtime") particles.forEach((particle) => particle.tick());
}


let pressed = false
window.addEventListener("mousedown", () => {
    pressed = true
})
window.addEventListener("mouseup", () => {
    if (drownPoints.length !== 0 && drownPoints[drownPoints.length - 1] != null) drownPoints.push(null)
    pressed = false
})

let particles: Particle[] = [];


let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
export let color: string
let background: number[]
type Modes = "draw" | "draw_realtime" | "points" | "circle" | "animation"
export let mode: Modes = "draw";

export function startDrawer(canvas_: HTMLCanvasElement, color_: string, background_: number[]) {

    canvas = canvas_
    addEventListener("mousemove", (e) => {
        if (canvas == undefined) return
        let rect = canvas.getBoundingClientRect()

        cursor.x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        cursor.y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    });
    background = background_
    setColor(color_)
    ctx = canvas.getContext("2d")!;
    ctx.fillStyle = `rgb(${background.slice(0, -1).join(',')})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.5


    generateParticles(1);
    setSize();
    requestAnimationFrame(anim)
}

export function setColor(color_: string) {
    color = color_
}

export function setDrawMode(mode_: Modes) {
    mode = mode_
}
