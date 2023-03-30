const DEFAULT_SIZE = 16
const DEFAULT_MODE = 'color'
const DEFAULT_COLOR = '#66fcf1'

let currentSize = DEFAULT_SIZE
let currentMode = DEFAULT_MODE
let currentColor = DEFAULT_COLOR

const grid = document.getElementById("grid")

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function setupGrid(size) {
	grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
	grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

	for (let i = 0; i < size * size; i++) {
		const gridElement = document.createElement('div')
		gridElement.classList.add('grid-element')
		gridElement.addEventListener('mouseover', changeColor)
		gridElement.addEventListener('mousedown', changeColor)
		grid.appendChild(gridElement)
	}
}

function changeColor(e) {
	if (e.type === 'mouseover' && !mouseDown) return
	if (currentMode === 'color') {
		e.target.style.backgroundColor = currentColor
	} else if (currentMode === 'eraser') {
		e.target.style.backgroundColor = '#0B0C10'
	} else if (currentMode === 'rainbow') {
		let randomR = Math.floor(Math.random() * 256)
		let randomG = Math.floor(Math.random() * 256)
		let randomB = Math.floor(Math.random() * 256)
		e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
	}
}

window.onload = () => {
	setupGrid(DEFAULT_SIZE)
	// activateButton(DEFAULT_MODE)
}
