/**
 * PreviewPanel.js
 * Renders live preview of text using the designed font characters
 */

class PreviewPanel {
    /**
     * Create a new preview panel
     * @param {HTMLCanvasElement} canvas - Preview canvas element
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Preview settings
        this.fontSize = 32; // Preview size in pixels
        this.text = 'The quick brown fox jumps over the lazy dog';
        this.characterMap = new Map();
        this.gridSize = 16;

        // Colors
        this.textColor = '#e0e0e0';
        this.backgroundColor = '#0f0f1e';
        this.missingCharColor = '#ef4444';

        this.render();
    }

    /**
     * Set the character map to preview
     * @param {Map} characterMap - Map of char codes to Character objects
     */
    setCharacterMap(characterMap) {
        this.characterMap = characterMap;
        this.render();
    }

    /**
     * Set the preview text
     * @param {string} text - Text to preview
     */
    setText(text) {
        this.text = text;
        this.render();
    }

    /**
     * Set the font size
     * @param {number} size - Font size in pixels
     */
    setFontSize(size) {
        this.fontSize = size;
        this.render();
    }

    /**
     * Set the grid size
     * @param {number} size - Grid size
     */
    setGridSize(size) {
        this.gridSize = size;
        this.render();
    }

    /**
     * Render the preview
     */
    render() {
        const ctx = this.ctx;

        // Calculate canvas size
        const lines = this.text.split('\n');
        const maxWidth = this.canvas.parentElement.clientWidth - 30;
        const lineHeight = this.fontSize * 1.5;

        // Wrap text to fit width
        const wrappedLines = [];
        lines.forEach(line => {
            const words = line.split(' ');
            let currentLine = '';

            words.forEach(word => {
                const testLine = currentLine + (currentLine ? ' ' : '') + word;
                const testWidth = this.measureText(testLine);

                if (testWidth > maxWidth && currentLine !== '') {
                    wrappedLines.push(currentLine);
                    currentLine = word;
                } else {
                    currentLine = testLine;
                }
            });

            if (currentLine) {
                wrappedLines.push(currentLine);
            }
        });

        // Set canvas size
        const canvasHeight = Math.max(100, wrappedLines.length * lineHeight + 20);
        this.canvas.width = maxWidth;
        this.canvas.height = canvasHeight;

        // Clear background
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Render each line
        let y = lineHeight;
        wrappedLines.forEach(line => {
            this.renderLine(line, 10, y);
            y += lineHeight;
        });
    }

    /**
     * Render a single line of text
     * @param {string} text - Text to render
     * @param {number} x - X position
     * @param {number} y - Y position (baseline)
     */
    renderLine(text, x, y) {
        // Safety check: ensure characterMap exists
        if (!this.characterMap) {
            return;
        }

        let currentX = x;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charCode = char.charCodeAt(0);

            if (charCode === 32) {
                // Space
                currentX += this.fontSize * 0.5;
                continue;
            }

            const character = this.characterMap.get(charCode);

            if (character && character.isDesigned()) {
                currentX += this.renderCharacter(character, currentX, y);
            } else {
                // Draw missing character indicator
                this.renderMissingChar(char, currentX, y);
                currentX += this.fontSize * 0.6;
            }

            // Add small spacing between characters
            currentX += this.fontSize * 0.1;
        }
    }

    /**
     * Render a single character
     * @param {Character} character - Character to render
     * @param {number} x - X position
     * @param {number} y - Y position (baseline)
     * @returns {number} Width of rendered character
     */
    renderCharacter(character, x, y) {
        const ctx = this.ctx;
        const gridSize = character.gridSize;
        const pixelSize = this.fontSize / gridSize;

        // Calculate baseline offset
        const baselineOffset = gridSize * 0.25; // 25% from bottom

        ctx.fillStyle = this.textColor;

        // Draw each pixel
        for (let gy = 0; gy < gridSize; gy++) {
            for (let gx = 0; gx < gridSize; gx++) {
                if (character.getPixel(gx, gy)) {
                    const px = x + gx * pixelSize;
                    const py = y - (gridSize - gy) * pixelSize + baselineOffset * pixelSize;

                    ctx.fillRect(Math.floor(px), Math.floor(py), Math.ceil(pixelSize), Math.ceil(pixelSize));
                }
            }
        }

        // Calculate actual width of character with proper spacing
        const bbox = PathConverter.getBoundingBox(character);
        // Add 2-3 pixels of spacing depending on grid size
        const spacing = gridSize <= 8 ? 2 : 3;
        const charWidth = (bbox.maxX - bbox.minX + spacing) * pixelSize;

        return charWidth;
    }

    /**
     * Render a missing character indicator
     * @param {string} char - The missing character
     * @param {number} x - X position
     * @param {number} y - Y position
     */
    renderMissingChar(char, x, y) {
        const ctx = this.ctx;
        const size = this.fontSize * 0.5;

        // Draw rectangle
        ctx.strokeStyle = this.missingCharColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y - size, size, size);

        // Draw X
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size, y);
        ctx.moveTo(x + size, y - size);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    /**
     * Measure text width
     * @param {string} text - Text to measure
     * @returns {number} Width in pixels
     */
    measureText(text) {
        let width = 0;

        // Safety check: ensure characterMap exists
        if (!this.characterMap) {
            return width;
        }

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const charCode = char.charCodeAt(0);

            if (charCode === 32) {
                width += this.fontSize * 0.5;
                continue;
            }

            const character = this.characterMap.get(charCode);

            if (character && character.isDesigned()) {
                const bbox = PathConverter.getBoundingBox(character);
                const gridSize = character.gridSize;
                // Add 2-3 pixels of spacing depending on grid size
                const spacing = gridSize <= 8 ? 2 : 3;
                const charWidth = (bbox.maxX - bbox.minX + spacing) * (this.fontSize / gridSize);
                width += charWidth;
            } else {
                width += this.fontSize * 0.6;
            }

            width += this.fontSize * 0.1; // Additional character spacing
        }

        return width;
    }

    /**
     * Update preview (call when character map changes)
     */
    update() {
        this.render();
    }

    /**
     * Export preview as PNG
     * @returns {string} Data URL of canvas
     */
    exportPreview() {
        return this.canvas.toDataURL('image/png');
    }
}
