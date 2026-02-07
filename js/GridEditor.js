/**
 * GridEditor.js
 * Handles the pixel grid canvas and drawing interactions
 */

class GridEditor {
    /**
     * Create a new grid editor
     * @param {HTMLCanvasElement} canvas - The canvas element
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Grid settings
        this.gridSize = 16;
        this.pixelSize = 20; // Size of each pixel in screen pixels
        this.showGrid = true;
        this.showBaseline = true;
        this.baselineY = Math.floor(this.gridSize * 0.75); // Baseline at 75% from top

        // Current character
        this.character = new Character('A', this.gridSize);

        // Drawing state
        this.isDrawing = false;
        this.currentTool = 'pencil'; // pencil, eraser, fill, line, move
        this.lineStart = null;
        this.tempLine = null;
        this.isRightClick = false;
        this.mirrorMode = false; // Vertical mirror mode

        // Move tool state
        this.moveStart = null;
        this.moveOffset = { x: 0, y: 0 };

        // Undo/Redo stacks
        this.undoStack = [];
        this.redoStack = [];
        this.maxUndoSteps = 50; // Limit undo history to prevent memory issues

        // Zoom
        this.zoomLevel = 1.0;

        // Initialize canvas
        this.updateCanvasSize();
        this.setupEventListeners();
        this.render();
    }

    /**
     * Update canvas size based on grid and zoom
     */
    updateCanvasSize() {
        const size = this.gridSize * this.pixelSize * this.zoomLevel;
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style.width = size + 'px';
        this.canvas.style.height = size + 'px';
    }

    /**
     * Setup mouse event listeners
     */
    setupEventListeners() {
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseUp.bind(this));

        // Prevent context menu on right-click
        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
    }

    /**
     * Get grid coordinates from mouse event
     * @param {MouseEvent} e - Mouse event
     * @returns {Object} Grid coordinates {x, y}
     */
    getGridCoords(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / (this.pixelSize * this.zoomLevel));
        const y = Math.floor((e.clientY - rect.top) / (this.pixelSize * this.zoomLevel));
        return { x, y };
    }

    /**
     * Mouse down event handler
     */
    onMouseDown(e) {
        e.preventDefault();
        this.isDrawing = true;
        this.isRightClick = (e.button === 2); // Right mouse button
        const { x, y } = this.getGridCoords(e);

        if (this.currentTool === 'fill' && !this.isRightClick) {
            this.saveState(); // Save before fill
            this.character.floodFill(x, y);
            this.render();
            this.onChange();
        } else if (this.currentTool === 'line' && !this.isRightClick) {
            this.lineStart = { x, y };
            this.tempLine = null;
            // Don't save state yet - wait until line is completed
        } else if (this.currentTool === 'move' && !this.isRightClick) {
            this.moveStart = { x, y };
            this.moveOffset = { x: 0, y: 0 };
            // Don't save state yet - wait until move is completed
        } else {
            // Save state before starting to draw
            if (!this.savedDrawingState) {
                this.saveState();
                this.savedDrawingState = true;
            }
            this.drawPixel(x, y);
        }
    }

    /**
     * Mouse move event handler
     */
    onMouseMove(e) {
        if (!this.isDrawing) return;

        const { x, y } = this.getGridCoords(e);

        if (this.currentTool === 'line' && this.lineStart) {
            // Show temporary line preview
            this.tempLine = { x, y };
            this.render();
        } else if (this.currentTool === 'move' && this.moveStart) {
            // Calculate offset from start position
            this.moveOffset = {
                x: x - this.moveStart.x,
                y: y - this.moveStart.y
            };
            this.render();
        } else if (this.currentTool !== 'fill') {
            this.drawPixel(x, y);
        }
    }

    /**
     * Mouse up event handler
     */
    onMouseUp(e) {
        if (this.isDrawing && this.currentTool === 'line' && this.lineStart && !this.isRightClick) {
            const { x, y } = this.getGridCoords(e);
            const value = this.currentTool !== 'eraser';

            this.saveState(); // Save before drawing line

            // Draw main line
            this.character.drawLine(this.lineStart.x, this.lineStart.y, x, y, value);

            // Draw mirrored line if mirror mode is enabled
            if (this.mirrorMode) {
                const mirrorStartX = this.gridSize - 1 - this.lineStart.x;
                const mirrorEndX = this.gridSize - 1 - x;
                this.character.drawLine(mirrorStartX, this.lineStart.y, mirrorEndX, y, value);
            }

            this.lineStart = null;
            this.tempLine = null;
            this.render();
            this.onChange();
        } else if (this.isDrawing && this.currentTool === 'move' && this.moveStart && !this.isRightClick) {
            // Apply the move if there was any offset
            if (this.moveOffset.x !== 0 || this.moveOffset.y !== 0) {
                this.saveState(); // Save before moving
                this.applyMove(this.moveOffset.x, this.moveOffset.y);
                this.onChange();
            }

            this.moveStart = null;
            this.moveOffset = { x: 0, y: 0 };
            this.render();
        }

        this.isDrawing = false;
        this.isRightClick = false;
        this.savedDrawingState = false; // Reset for next drawing operation
    }

    /**
     * Draw or erase a pixel
     * @param {number} x - Grid X coordinate
     * @param {number} y - Grid Y coordinate
     */
    drawPixel(x, y) {
        if (x < 0 || x >= this.gridSize || y < 0 || y >= this.gridSize) return;

        // Right-click always erases, left-click uses current tool
        const value = this.isRightClick ? false : (this.currentTool === 'pencil');

        // Draw main pixel
        this.character.setPixel(x, y, value);

        // Draw mirrored pixel if mirror mode is enabled
        if (this.mirrorMode) {
            const mirrorX = this.gridSize - 1 - x;
            this.character.setPixel(mirrorX, y, value);
        }

        this.render();
        this.onChange();
    }

    /**
     * Set the current character to edit
     * @param {Character} character - Character to edit
     */
    setCharacter(character) {
        this.character = character;

        // Update grid size if different
        if (this.gridSize !== character.gridSize) {
            this.gridSize = character.gridSize;
            this.baselineY = Math.floor(this.gridSize * 0.75);
            this.updateCanvasSize();
        }

        // Clear undo/redo stacks when switching characters
        this.undoStack = [];
        this.redoStack = [];
        this.updateUndoRedoButtons();

        this.render();
    }

    /**
     * Set the current drawing tool
     * @param {string} tool - Tool name ('pencil', 'eraser', 'fill', 'line', 'move')
     */
    setTool(tool) {
        this.currentTool = tool;
        this.lineStart = null;
        this.tempLine = null;
        this.moveStart = null;
        this.moveOffset = { x: 0, y: 0 };

        // Update cursor
        if (tool === 'fill') {
            this.canvas.style.cursor = 'pointer';
        } else if (tool === 'move') {
            this.canvas.style.cursor = 'move';
        } else {
            this.canvas.style.cursor = 'crosshair';
        }
    }

    /**
     * Toggle grid visibility
     */
    toggleGrid() {
        this.showGrid = !this.showGrid;
        this.render();
    }

    /**
     * Toggle baseline visibility
     */
    toggleBaseline() {
        this.showBaseline = !this.showBaseline;
        this.render();
    }

    /**
     * Toggle vertical mirror mode
     */
    toggleMirrorMode() {
        this.mirrorMode = !this.mirrorMode;
        this.render();
        return this.mirrorMode;
    }

    /**
     * Set mirror mode
     * @param {boolean} enabled - Enable mirror mode
     */
    setMirrorMode(enabled) {
        this.mirrorMode = enabled;
        this.render();
    }

    /**
     * Apply move offset to the character
     * @param {number} offsetX - Horizontal offset
     * @param {number} offsetY - Vertical offset
     */
    applyMove(offsetX, offsetY) {
        // Create a new grid with moved pixels
        const newGrid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(false));

        // Copy pixels to new positions
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                if (this.character.grid[y][x]) {
                    const newX = x + offsetX;
                    const newY = y + offsetY;

                    // Only copy if new position is within bounds
                    if (newX >= 0 && newX < this.gridSize && newY >= 0 && newY < this.gridSize) {
                        newGrid[newY][newX] = true;
                    }
                }
            }
        }

        // Apply the new grid
        this.character.grid = newGrid;
    }

    /**
     * Zoom in
     */
    zoomIn() {
        this.zoomLevel = Math.min(this.zoomLevel + 0.2, 3.0);
        this.updateCanvasSize();
        this.render();
    }

    /**
     * Zoom out
     */
    zoomOut() {
        this.zoomLevel = Math.max(this.zoomLevel - 0.2, 0.5);
        this.updateCanvasSize();
        this.render();
    }

    /**
     * Render the grid and character
     */
    render() {
        const ctx = this.ctx;
        const ps = this.pixelSize * this.zoomLevel; // Pixel size with zoom

        // Clear canvas
        ctx.fillStyle = '#0f0f1e';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw baseline
        if (this.showBaseline) {
            ctx.strokeStyle = '#7c3aed';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(0, this.baselineY * ps);
            ctx.lineTo(this.canvas.width, this.baselineY * ps);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Draw mirror line
        if (this.mirrorMode) {
            const centerX = (this.gridSize / 2) * ps;
            ctx.strokeStyle = '#10b981'; // Green color for mirror line
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, this.canvas.height);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Draw pixels
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                if (this.character.getPixel(x, y)) {
                    ctx.fillStyle = '#e0e0e0';
                    ctx.fillRect(x * ps, y * ps, ps, ps);
                }
            }
        }

        // Draw temporary line preview
        if (this.tempLine && this.lineStart) {
            ctx.fillStyle = 'rgba(124, 58, 237, 0.5)';
            const tempChar = this.character.clone();
            tempChar.drawLine(this.lineStart.x, this.lineStart.y, this.tempLine.x, this.tempLine.y, true);
            for (let y = 0; y < this.gridSize; y++) {
                for (let x = 0; x < this.gridSize; x++) {
                    if (tempChar.getPixel(x, y) && !this.character.getPixel(x, y)) {
                        ctx.fillRect(x * ps, y * ps, ps, ps);
                    }
                }
            }
        }

        // Draw move preview
        if (this.currentTool === 'move' && this.moveStart && (this.moveOffset.x !== 0 || this.moveOffset.y !== 0)) {
            // Draw preview of moved pixels with semi-transparent color
            ctx.fillStyle = 'rgba(124, 58, 237, 0.6)';
            for (let y = 0; y < this.gridSize; y++) {
                for (let x = 0; x < this.gridSize; x++) {
                    if (this.character.getPixel(x, y)) {
                        const newX = x + this.moveOffset.x;
                        const newY = y + this.moveOffset.y;

                        // Draw preview pixel at new position if within bounds
                        if (newX >= 0 && newX < this.gridSize && newY >= 0 && newY < this.gridSize) {
                            ctx.fillRect(newX * ps, newY * ps, ps, ps);
                        }
                    }
                }
            }

            // Draw original pixels with reduced opacity to show they're moving
            ctx.fillStyle = 'rgba(224, 224, 224, 0.3)';
            for (let y = 0; y < this.gridSize; y++) {
                for (let x = 0; x < this.gridSize; x++) {
                    if (this.character.getPixel(x, y)) {
                        ctx.fillRect(x * ps, y * ps, ps, ps);
                    }
                }
            }
        }

        // Draw grid lines
        if (this.showGrid) {
            ctx.strokeStyle = '#2d2d44';
            ctx.lineWidth = 1;

            for (let i = 0; i <= this.gridSize; i++) {
                // Vertical lines
                ctx.beginPath();
                ctx.moveTo(i * ps, 0);
                ctx.lineTo(i * ps, this.canvas.height);
                ctx.stroke();

                // Horizontal lines
                ctx.beginPath();
                ctx.moveTo(0, i * ps);
                ctx.lineTo(this.canvas.width, i * ps);
                ctx.stroke();
            }
        }

        // Draw border
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Callback when character is modified
     * Override this in the main application
     */
    onChange() {
        // To be overridden
    }

    /**
     * Update grid size
     * @param {number} size - New grid size
     */
    updateGridSize(size) {
        this.gridSize = size;
        this.baselineY = Math.floor(this.gridSize * 0.75);

        // Create new character with new size
        const newChar = new Character(this.character.char, size);

        // Copy existing pixels (centered)
        const oldSize = this.character.gridSize;
        const offset = Math.floor((size - oldSize) / 2);

        if (size > oldSize) {
            // Growing - copy to center
            for (let y = 0; y < oldSize; y++) {
                for (let x = 0; x < oldSize; x++) {
                    if (this.character.getPixel(x, y)) {
                        newChar.setPixel(x + offset, y + offset, true);
                    }
                }
            }
        } else {
            // Shrinking - crop from center
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    if (this.character.getPixel(x - offset, y - offset)) {
                        newChar.setPixel(x, y, true);
                    }
                }
            }
        }

        this.character = newChar;
        this.updateCanvasSize();
        this.render();
        this.onChange();
    }

    /**
     * Save current state to undo stack
     */
    saveState() {
        // Deep copy the current grid state
        const state = this.character.grid.map(row => [...row]);

        // Add to undo stack
        this.undoStack.push(state);

        // Limit stack size
        if (this.undoStack.length > this.maxUndoSteps) {
            this.undoStack.shift(); // Remove oldest state
        }

        // Clear redo stack when new action is performed
        this.redoStack = [];

        this.updateUndoRedoButtons();
    }

    /**
     * Undo last action
     */
    undo() {
        if (this.undoStack.length === 0) return;

        // Save current state to redo stack
        const currentState = this.character.grid.map(row => [...row]);
        this.redoStack.push(currentState);

        // Restore previous state
        const previousState = this.undoStack.pop();
        this.character.grid = previousState.map(row => [...row]);

        this.render();
        this.onChange();
        this.updateUndoRedoButtons();
    }

    /**
     * Redo last undone action
     */
    redo() {
        if (this.redoStack.length === 0) return;

        // Save current state to undo stack
        const currentState = this.character.grid.map(row => [...row]);
        this.undoStack.push(currentState);

        // Restore next state
        const nextState = this.redoStack.pop();
        this.character.grid = nextState.map(row => [...row]);

        this.render();
        this.onChange();
        this.updateUndoRedoButtons();
    }

    /**
     * Update undo/redo button states
     */
    updateUndoRedoButtons() {
        const undoBtn = document.getElementById('btn-undo');
        const redoBtn = document.getElementById('btn-redo');

        if (undoBtn) {
            undoBtn.disabled = this.undoStack.length === 0;
        }

        if (redoBtn) {
            redoBtn.disabled = this.redoStack.length === 0;
        }
    }
}
