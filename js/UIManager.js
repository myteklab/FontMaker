/**
 * UIManager.js
 * Manages all UI interactions, buttons, and modals
 */

class UIManager {
    /**
     * Create a new UI manager
     * @param {FontMaker} app - Main application instance
     */
    constructor(app) {
        this.app = app;
        this.setupEventListeners();
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Header buttons
        document.getElementById('btn-export-ttf').addEventListener('click', () => this.app.exportTTF());
        document.getElementById('btn-template').addEventListener('click', () => this.app.templateManager.showTemplateModal());

        // Settings
        document.getElementById('input-font-name').addEventListener('input', (e) => {
            this.app.setFontName(e.target.value);
        });

        document.getElementById('select-grid-size').addEventListener('change', (e) => {
            this.app.setGridSize(parseInt(e.target.value));
        });

        document.getElementById('input-char-height').addEventListener('input', (e) => {
            this.app.setCharHeight(parseInt(e.target.value));
        });

        // Tools
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.app.setTool(btn.dataset.tool);
            });
        });

        // Actions
        document.getElementById('btn-undo').addEventListener('click', () => this.app.undo());
        document.getElementById('btn-redo').addEventListener('click', () => this.app.redo());
        document.getElementById('btn-clear-char').addEventListener('click', () => this.app.clearCharacter());
        document.getElementById('btn-copy-char').addEventListener('click', () => this.app.copyCharacter());
        document.getElementById('btn-paste-char').addEventListener('click', () => this.app.pasteCharacter());
        document.getElementById('btn-flip-h').addEventListener('click', () => this.app.flipHorizontal());
        document.getElementById('btn-flip-v').addEventListener('click', () => this.app.flipVertical());
        document.getElementById('btn-shift-left').addEventListener('click', () => this.app.shiftLeft());
        document.getElementById('btn-shift-right').addEventListener('click', () => this.app.shiftRight());
        document.getElementById('btn-shift-up').addEventListener('click', () => this.app.shiftUp());
        document.getElementById('btn-shift-down').addEventListener('click', () => this.app.shiftDown());
        document.getElementById('btn-center-h').addEventListener('click', () => this.app.centerHorizontal());
        document.getElementById('btn-center-v').addEventListener('click', () => this.app.centerVertical());
        document.getElementById('btn-center-both').addEventListener('click', () => this.app.centerBoth());

        // Grid controls
        document.getElementById('checkbox-show-grid').addEventListener('change', (e) => {
            this.app.toggleGrid(e.target.checked);
        });

        document.getElementById('checkbox-show-baseline').addEventListener('change', (e) => {
            this.app.toggleBaseline(e.target.checked);
        });

        document.getElementById('checkbox-mirror-mode').addEventListener('change', (e) => {
            this.app.toggleMirrorMode(e.target.checked);
        });

        document.getElementById('btn-zoom-in').addEventListener('click', () => this.app.zoomIn());
        document.getElementById('btn-zoom-out').addEventListener('click', () => this.app.zoomOut());

        // Character tabs
        document.querySelectorAll('.char-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.char-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.showCharacterSet(tab.dataset.charset);
            });
        });

        // Preview
        document.getElementById('input-preview-text').addEventListener('input', (e) => {
            this.app.setPreviewText(e.target.value);
        });

        document.getElementById('range-preview-size').addEventListener('input', (e) => {
            const size = parseInt(e.target.value);
            document.getElementById('preview-size-label').textContent = size + 'px';
            this.app.setPreviewSize(size);
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.modal').classList.remove('active');
            });
        });

        // Click outside modal to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // Baseline help icon
        document.getElementById('baseline-help-icon').addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('modal-baseline-help').classList.add('active');
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Initialize character grid
        this.showCharacterSet('uppercase');
    }

    /**
     * Handle keyboard shortcuts
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleKeyboard(e) {
        // Prevent shortcuts when typing in inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        // Ctrl/Cmd + Z: Undo
        if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') {
            e.preventDefault();
            this.app.undo();
        }

        // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y: Redo
        if ((e.ctrlKey || e.metaKey) && (e.shiftKey && e.key === 'z' || e.key === 'y')) {
            e.preventDefault();
            this.app.redo();
        }

        // Ctrl/Cmd + C: Copy character
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            e.preventDefault();
            this.app.copyCharacter();
        }

        // Ctrl/Cmd + V: Paste character
        if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
            e.preventDefault();
            this.app.pasteCharacter();
        }

        // Tool shortcuts
        if (e.key === 'p' || e.key === 'P') this.selectTool('pencil');
        if (e.key === 'e' || e.key === 'E') this.selectTool('eraser');
        if (e.key === 'f' || e.key === 'F') this.selectTool('fill');
        if (e.key === 'l' || e.key === 'L') this.selectTool('line');
        if (e.key === 'm' || e.key === 'M') this.selectTool('move');

        // Zoom
        if (e.key === '+' || e.key === '=') this.app.zoomIn();
        if (e.key === '-' || e.key === '_') this.app.zoomOut();

        // Arrow keys to switch characters
        if (e.key === 'ArrowLeft') this.selectPreviousCharacter();
        if (e.key === 'ArrowRight') this.selectNextCharacter();
    }

    /**
     * Select a tool
     * @param {string} tool - Tool name
     */
    selectTool(tool) {
        document.querySelectorAll('.tool-btn').forEach(btn => {
            if (btn.dataset.tool === tool) {
                btn.click();
            }
        });
    }

    /**
     * Show character set
     * @param {string} charset - Character set name
     */
    showCharacterSet(charset) {
        const grid = document.getElementById('character-grid');
        grid.innerHTML = '';

        let chars = [];

        switch (charset) {
            case 'uppercase':
                chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
                break;
            case 'lowercase':
                chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
                break;
            case 'numbers':
                chars = '0123456789'.split('');
                break;
            case 'symbols':
                chars = '!@#$%^&*()_+-=[]{}|;:\'",.<>?/\\`~'.split('');
                break;
        }

        chars.forEach(char => {
            const btn = document.createElement('button');
            btn.className = 'char-btn';
            btn.dataset.char = char;

            // Create container for canvas and fallback text
            const content = document.createElement('div');
            content.className = 'char-btn-content';

            // Add canvas for preview
            const canvas = document.createElement('canvas');
            canvas.className = 'char-preview-canvas';
            canvas.width = 24; // Small preview size
            canvas.height = 24;
            content.appendChild(canvas);

            // Add fallback text (shown when not designed)
            const text = document.createElement('span');
            text.className = 'char-btn-text';
            text.textContent = char;
            content.appendChild(text);

            btn.appendChild(content);

            btn.addEventListener('click', () => {
                this.selectCharacter(char);
            });

            grid.appendChild(btn);
        });

        this.currentCharset = charset;
        this.updateCharacterButtons();
    }

    /**
     * Select a character to edit
     * @param {string} char - Character to select
     */
    selectCharacter(char) {
        this.app.setCurrentCharacter(char);
        document.getElementById('current-char-display').textContent = char;

        // Update active button
        document.querySelectorAll('.char-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.char === char) {
                btn.classList.add('active');
            }
        });
    }

    /**
     * Select previous character
     */
    selectPreviousCharacter() {
        const buttons = Array.from(document.querySelectorAll('.char-btn'));
        const current = buttons.findIndex(btn => btn.classList.contains('active'));
        if (current > 0) {
            buttons[current - 1].click();
        }
    }

    /**
     * Select next character
     */
    selectNextCharacter() {
        const buttons = Array.from(document.querySelectorAll('.char-btn'));
        const current = buttons.findIndex(btn => btn.classList.contains('active'));
        if (current < buttons.length - 1) {
            buttons[current + 1].click();
        }
    }

    /**
     * Update character buttons to show which are designed
     */
    updateCharacterButtons() {
        // Safety check: ensure characterMap exists
        if (!this.app || !this.app.characterMap) {
            return;
        }

        document.querySelectorAll('.char-btn').forEach(btn => {
            const char = btn.dataset.char;
            const charCode = char.charCodeAt(0);
            const character = this.app.characterMap.get(charCode);

            const canvas = btn.querySelector('.char-preview-canvas');
            const text = btn.querySelector('.char-btn-text');

            if (character && character.isDesigned()) {
                btn.classList.add('designed');

                // Draw character preview on canvas
                if (canvas) {
                    this.drawCharacterPreview(canvas, character);
                    canvas.style.display = 'block';
                    text.style.display = 'none';
                }
            } else {
                btn.classList.remove('designed');

                // Show text instead of canvas
                if (canvas && text) {
                    canvas.style.display = 'none';
                    text.style.display = 'block';
                }
            }
        });

        this.updateProgressStats();
    }

    /**
     * Draw character preview on a small canvas
     * @param {HTMLCanvasElement} canvas - Canvas to draw on
     * @param {Character} character - Character to preview
     */
    drawCharacterPreview(canvas, character) {
        const ctx = canvas.getContext('2d');
        const gridSize = character.gridSize;
        const canvasSize = 24;
        const pixelSize = canvasSize / gridSize;

        // Clear canvas
        ctx.fillStyle = '#0f0f1e'; // Match background
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        // Draw pixels
        ctx.fillStyle = '#7c3aed'; // Purple color for pixels
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (character.getPixel(x, y)) {
                    ctx.fillRect(
                        Math.floor(x * pixelSize),
                        Math.floor(y * pixelSize),
                        Math.ceil(pixelSize),
                        Math.ceil(pixelSize)
                    );
                }
            }
        }
    }

    /**
     * Update progress statistics
     */
    updateProgressStats() {
        // Safety check: ensure characterMap exists
        if (!this.app || !this.app.characterMap) {
            return;
        }

        const stats = FontGenerator.getCharacterCoverage(this.app.characterMap);

        document.getElementById('stat-chars-designed').textContent = stats.designed;
        document.getElementById('stat-chars-total').textContent = stats.total;
        document.getElementById('progress-fill').style.width = stats.percentage + '%';
    }

    /**
     * Show toast notification
     * @param {string} message - Message to show
     * @param {string} type - Type (success, error, info)
     */
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast show ' + type;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    /**
     * Update project name in header
     * @param {string} name - Project name
     */
    updateProjectName(name) {
        document.getElementById('project-name').textContent = name;
        document.getElementById('input-font-name').value = name;
    }

    /**
     * Escape HTML to prevent XSS
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
