const DEFAULT_SIZE = 16
const DEFAULT_MODE = 'color'
const DEFAULT_COLOR = '#66fcf1'

let currentSize = DEFAULT_SIZE
let currentMode = DEFAULT_MODE
let currentColor = DEFAULT_COLOR

function setSize(newSize) {
	currentSize = newSize
}

function setMode(newMode) {
	activateButton(newMode)
	currentMode = newMode
}

function setColor(newColor) {
	currentColor = newColor
}

const colorPicker = document.getElementById("colorPicker") 
const colorBtn = document.getElementById("colorBtn")
const rainbowBtn = document.getElementById("rainbowBtn")
const eraserBtn = document.getElementById("eraserBtn")
const clearBtn = document.getElementById("clearBtn")
const sizeValue = document.getElementById("sizeValue")
const sizeSlider = document.getElementById("sizeSlider") 
const grid = document.getElementById("grid")

colorPicker.oninput = (e) => setColor(e.target.value)
colorBtn.onclick = () => setMode('color')
rainbowBtn.onclick = () => setMode('rainbow')
eraserBtn.onclick = () => setMode('eraser')
clearBtn.onclick = () => resetGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function updateSizeValue(val) {
	sizeValue.innerHTML = `${val} x ${val}`
}

function changeSize(val) {
	setSize(val)
	updateSizeValue(val)
	resetGrid()
}

function resetGrid() {
	clearGrid()
	setupGrid(currentSize)
}

function clearGrid() {
	grid.innerHTML = ''
}

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
	// e.preventDefault() //don't need since disabled user-select in css
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

function activateButton(newMode) {
	rainbowBtn.classList.remove('active')
	colorBtn.classList.remove('active')
	eraserBtn.classList.remove('active')

	if(newMode === 'rainbow') {
		rainbowBtn.classList.add('active')
	} else if(newMode === 'color') {
		colorBtn.classList.add('active')
	} else if(newMode === 'eraser') {
		eraserBtn.classList.add('active')
	}
}

window.onload = () => {
	setupGrid(DEFAULT_SIZE)
	activateButton(DEFAULT_MODE)
}
