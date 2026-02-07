/**
 * PathConverter.js
 * Converts pixel grid data to vector paths for font generation
 */

class PathConverter {
    /**
     * Convert a character's pixel grid to an opentype.js path
     * @param {Character} character - Character with pixel data
     * @param {number} unitsPerEm - Font units per em (typically 1000)
     * @returns {opentype.Path} Vector path for the character
     */
    static characterToPath(character, unitsPerEm = 1000) {
        const path = new opentype.Path();

        if (!character.isDesigned()) {
            return path; // Return empty path for undesigned characters
        }

        const gridSize = character.gridSize;
        const scale = unitsPerEm / gridSize;

        // Convert each filled pixel to a square path
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (character.getPixel(x, y)) {
                    // Add a square for this pixel
                    // Note: In fonts, Y increases upward, so we flip it
                    const x1 = x * scale;
                    const y1 = (gridSize - y - 1) * scale;
                    const x2 = (x + 1) * scale;
                    const y2 = (gridSize - y) * scale;

                    this.addSquare(path, x1, y1, x2, y2);
                }
            }
        }

        return path;
    }

    /**
     * Add a square to the path
     * @param {opentype.Path} path - Path to add to
     * @param {number} x1 - Left edge
     * @param {number} y1 - Bottom edge
     * @param {number} x2 - Right edge
     * @param {number} y2 - Top edge
     */
    static addSquare(path, x1, y1, x2, y2) {
        path.moveTo(x1, y1);
        path.lineTo(x2, y1);
        path.lineTo(x2, y2);
        path.lineTo(x1, y2);
        path.close();
    }

    /**
     * Convert character grid to optimized path (merges adjacent pixels)
     * This creates fewer path commands for better performance
     * @param {Character} character - Character with pixel data
     * @param {number} unitsPerEm - Font units per em
     * @returns {opentype.Path} Optimized vector path
     */
    static characterToOptimizedPath(character, unitsPerEm = 1000) {
        const path = new opentype.Path();

        if (!character.isDesigned()) {
            return path;
        }

        const gridSize = character.gridSize;
        const scale = unitsPerEm / gridSize;

        // Create a copy of the grid to track processed pixels
        const processed = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));

        // Find rectangles of filled pixels
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (character.getPixel(x, y) && !processed[y][x]) {
                    // Find the width of horizontal run
                    let width = 1;
                    while (x + width < gridSize &&
                           character.getPixel(x + width, y) &&
                           !processed[y][x + width]) {
                        width++;
                    }

                    // Find height of rectangle (all rows must have same width)
                    let height = 1;
                    let canExpand = true;
                    while (y + height < gridSize && canExpand) {
                        for (let i = 0; i < width; i++) {
                            if (!character.getPixel(x + i, y + height) ||
                                processed[y + height][x + i]) {
                                canExpand = false;
                                break;
                            }
                        }
                        if (canExpand) height++;
                    }

                    // Mark pixels as processed
                    for (let dy = 0; dy < height; dy++) {
                        for (let dx = 0; dx < width; dx++) {
                            processed[y + dy][x + dx] = true;
                        }
                    }

                    // Add rectangle to path
                    const x1 = x * scale;
                    const y1 = (gridSize - y - height) * scale;
                    const x2 = (x + width) * scale;
                    const y2 = (gridSize - y) * scale;

                    this.addSquare(path, x1, y1, x2, y2);
                }
            }
        }

        return path;
    }

    /**
     * Convert character to SVG path string (for debugging/preview)
     * @param {Character} character - Character with pixel data
     * @param {number} scale - Scale factor
     * @returns {string} SVG path data
     */
    static characterToSVG(character, scale = 10) {
        if (!character.isDesigned()) {
            return '';
        }

        const gridSize = character.gridSize;
        let pathData = '';

        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (character.getPixel(x, y)) {
                    const x1 = x * scale;
                    const y1 = y * scale;
                    const size = scale;

                    pathData += `M${x1},${y1} h${size} v${size} h-${size} z `;
                }
            }
        }

        return pathData.trim();
    }

    /**
     * Calculate optimal advance width for a character
     * This determines how much the cursor moves after drawing the character
     * @param {Character} character - Character to analyze
     * @param {number} unitsPerEm - Font units per em
     * @returns {number} Advance width in font units
     */
    static calculateAdvanceWidth(character, unitsPerEm = 1000) {
        if (!character.isDesigned()) {
            return Math.floor(unitsPerEm * 0.5); // Default spacing for empty chars
        }

        const gridSize = character.gridSize;
        const scale = unitsPerEm / gridSize;

        // For pixel fonts, use the full grid width as advance width
        // This ensures consistent spacing and prevents overlap for centered characters
        // The 1-pixel spacing between characters looks professional for pixel fonts
        return Math.ceil(gridSize * scale);
    }

    /**
     * Calculate bounding box for character
     * @param {Character} character - Character to analyze
     * @returns {Object} Bounding box {minX, minY, maxX, maxY}
     */
    static getBoundingBox(character) {
        let minX = character.gridSize;
        let minY = character.gridSize;
        let maxX = 0;
        let maxY = 0;

        for (let y = 0; y < character.gridSize; y++) {
            for (let x = 0; x < character.gridSize; x++) {
                if (character.getPixel(x, y)) {
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                }
            }
        }

        // If no pixels, return default box
        if (minX > maxX) {
            return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
        }

        return { minX, minY, maxX, maxY };
    }
}
