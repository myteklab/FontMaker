/**
 * Character.js
 * Represents a single character in the font with its pixel grid data
 */

class Character {
    /**
     * Create a new character
     * @param {string} char - The character (e.g., 'A', 'b', '1', '!')
     * @param {number} gridSize - Size of the grid (e.g., 16 for 16x16)
     */
    constructor(char, gridSize = 16) {
        this.char = char;
        this.charCode = char.charCodeAt(0);
        this.gridSize = gridSize;

        // Initialize empty grid (2D array of booleans)
        this.grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));

        // Metadata
        this.advanceWidth = gridSize; // How much to move cursor after this character
        this.leftBearing = 0; // Space before character starts
        this.rightBearing = 0; // Space after character ends
    }

    /**
     * Set a pixel in the grid
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {boolean} value - Pixel state (true = filled, false = empty)
     */
    setPixel(x, y, value) {
        if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
            this.grid[y][x] = value;
        }
    }

    /**
     * Get a pixel from the grid
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @returns {boolean} Pixel state
     */
    getPixel(x, y) {
        if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
            return this.grid[y][x];
        }
        return false;
    }

    /**
     * Clear all pixels in the grid
     */
    clear() {
        this.grid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(false));
    }

    /**
     * Check if character has any pixels drawn
     * @returns {boolean} True if character has been designed
     */
    isDesigned() {
        return this.grid.some(row => row.some(pixel => pixel === true));
    }

    /**
     * Flip character horizontally
     */
    flipHorizontal() {
        this.grid = this.grid.map(row => row.reverse());
    }

    /**
     * Flip character vertically
     */
    flipVertical() {
        this.grid.reverse();
    }

    /**
     * Shift all pixels in a direction
     * @param {string} direction - 'left', 'right', 'up', or 'down'
     */
    shift(direction) {
        const newGrid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(false));

        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                if (this.grid[y][x]) {
                    let newX = x;
                    let newY = y;

                    switch(direction) {
                        case 'left':
                            newX = x - 1;
                            break;
                        case 'right':
                            newX = x + 1;
                            break;
                        case 'up':
                            newY = y - 1;
                            break;
                        case 'down':
                            newY = y + 1;
                            break;
                    }

                    if (newX >= 0 && newX < this.gridSize && newY >= 0 && newY < this.gridSize) {
                        newGrid[newY][newX] = true;
                    }
                }
            }
        }

        this.grid = newGrid;
    }

    /**
     * Center character horizontally
     */
    centerHorizontal() {
        // Find leftmost and rightmost filled pixels
        let leftmost = this.gridSize;
        let rightmost = -1;

        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                if (this.grid[y][x]) {
                    leftmost = Math.min(leftmost, x);
                    rightmost = Math.max(rightmost, x);
                }
            }
        }

        // If character is empty, do nothing
        if (leftmost === this.gridSize) return;

        // Calculate center offset
        const charWidth = rightmost - leftmost + 1;
        const gridCenter = Math.floor(this.gridSize / 2);
        const charCenter = leftmost + Math.floor(charWidth / 2);
        const offset = gridCenter - charCenter;

        // Apply offset using shift
        if (offset > 0) {
            for (let i = 0; i < offset; i++) {
                this.shift('right');
            }
        } else if (offset < 0) {
            for (let i = 0; i < Math.abs(offset); i++) {
                this.shift('left');
            }
        }
    }

    /**
     * Center character vertically
     */
    centerVertical() {
        // Find topmost and bottommost filled pixels
        let topmost = this.gridSize;
        let bottommost = -1;

        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                if (this.grid[y][x]) {
                    topmost = Math.min(topmost, y);
                    bottommost = Math.max(bottommost, y);
                }
            }
        }

        // If character is empty, do nothing
        if (topmost === this.gridSize) return;

        // Calculate center offset
        const charHeight = bottommost - topmost + 1;
        const gridCenter = Math.floor(this.gridSize / 2);
        const charCenter = topmost + Math.floor(charHeight / 2);
        const offset = gridCenter - charCenter;

        // Apply offset using shift
        if (offset > 0) {
            for (let i = 0; i < offset; i++) {
                this.shift('down');
            }
        } else if (offset < 0) {
            for (let i = 0; i < Math.abs(offset); i++) {
                this.shift('up');
            }
        }
    }

    /**
     * Center character both horizontally and vertically
     */
    centerBoth() {
        this.centerHorizontal();
        this.centerVertical();
    }

    /**
     * Create a copy of this character
     * @returns {Character} New character instance with copied data
     */
    clone() {
        const copy = new Character(this.char, this.gridSize);
        copy.grid = this.grid.map(row => [...row]);
        copy.advanceWidth = this.advanceWidth;
        copy.leftBearing = this.leftBearing;
        copy.rightBearing = this.rightBearing;
        return copy;
    }

    /**
     * Export character data to JSON
     * @returns {Object} Character data
     */
    toJSON() {
        return {
            char: this.char,
            charCode: this.charCode,
            gridSize: this.gridSize,
            grid: this.grid,
            advanceWidth: this.advanceWidth,
            leftBearing: this.leftBearing,
            rightBearing: this.rightBearing
        };
    }

    /**
     * Import character data from JSON
     * @param {Object} data - Character data
     * @returns {Character} New character instance
     */
    static fromJSON(data) {
        const char = new Character(data.char, data.gridSize);
        char.grid = data.grid;
        char.advanceWidth = data.advanceWidth || data.gridSize;
        char.leftBearing = data.leftBearing || 0;
        char.rightBearing = data.rightBearing || 0;
        return char;
    }

    /**
     * Fill a region using flood fill algorithm
     * @param {number} x - Starting X coordinate
     * @param {number} y - Starting Y coordinate
     */
    floodFill(x, y) {
        const targetValue = this.getPixel(x, y);
        const replacementValue = !targetValue;

        if (targetValue === replacementValue) return;

        const stack = [[x, y]];

        while (stack.length > 0) {
            const [cx, cy] = stack.pop();

            if (cx < 0 || cx >= this.gridSize || cy < 0 || cy >= this.gridSize) continue;
            if (this.getPixel(cx, cy) !== targetValue) continue;

            this.setPixel(cx, cy, replacementValue);

            stack.push([cx + 1, cy]);
            stack.push([cx - 1, cy]);
            stack.push([cx, cy + 1]);
            stack.push([cx, cy - 1]);
        }
    }

    /**
     * Draw a line between two points using Bresenham's algorithm
     * @param {number} x0 - Start X
     * @param {number} y0 - Start Y
     * @param {number} x1 - End X
     * @param {number} y1 - End Y
     * @param {boolean} value - Pixel value to set
     */
    drawLine(x0, y0, x1, y1, value = true) {
        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = x0 < x1 ? 1 : -1;
        const sy = y0 < y1 ? 1 : -1;
        let err = dx - dy;

        while (true) {
            this.setPixel(x0, y0, value);

            if (x0 === x1 && y0 === y1) break;

            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
    }
}
