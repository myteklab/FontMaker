/**
 * FontMaker.js
 * Main application class that coordinates all components
 */

class FontMaker {
    constructor() {
        // Initialize data structures FIRST (before creating UI components)
        this.characterMap = new Map();
        this.currentChar = 'A';
        this.currentCharCode = 65;
        this.clipboard = null;

        // Settings
        this.settings = {
            fontName: 'MyPixelFont',
            gridSize: 16,
            charHeight: 16,
            unitsPerEm: 1000
        };

        // Initialize all printable ASCII characters
        this.initializeCharacters();

        // Initialize components (after characterMap exists)
        this.fontProject = new FontProject();

        this.gridEditor = new GridEditor(document.getElementById('grid-canvas'));
        this.previewPanel = new PreviewPanel(document.getElementById('preview-canvas'));
        this.templateManager = new TemplateManager(this);

        // Set initial character map in preview panel
        this.previewPanel.setCharacterMap(this.characterMap);

        // Create UIManager LAST (it will call showCharacterSet during setupEventListeners)
        this.uiManager = new UIManager(this);

        // Setup grid editor callback to mark dirty on changes
        this.gridEditor.onChange = () => {
            this.onCharacterModified();
        };

        // Select first character and highlight button in UI
        this.uiManager.selectCharacter('A');

        // Setup editable font name in header
        this.setupEditableFontName();

        // Expose serialize/load on window for platform adapter
        var self = this;
        window.serializeProjectData = function () {
            return JSON.stringify(self.fontProject.serializeProject(self.characterMap, self.settings));
        };

        window.loadProjectData = function (dataStr) {
            try {
                var projectData = typeof dataStr === 'string' ? JSON.parse(dataStr) : dataStr;
                var result = self.fontProject.deserializeProject(projectData);

                // Only load designed characters
                result.characterMap.forEach(function (character, charCode) {
                    if (character.isDesigned()) {
                        self.characterMap.set(charCode, character);
                    }
                });

                self.settings = result.settings;

                // Update UI
                self.uiManager.updateProjectName(result.settings.fontName);
                document.getElementById('input-font-name').value = result.settings.fontName;
                document.getElementById('select-grid-size').value = result.settings.gridSize;
                document.getElementById('input-char-height').value = result.settings.charHeight;

                // Refresh displays
                self.previewPanel.setCharacterMap(self.characterMap);
                self.previewPanel.setGridSize(result.settings.gridSize);
                self.gridEditor.updateGridSize(result.settings.gridSize);
                self.uiManager.selectCharacter('A');
            } catch (error) {
                console.error('Error loading project data:', error);
            }
        };
    }

    /**
     * Initialize character map with empty characters
     */
    initializeCharacters() {
        // ASCII printable characters (33-126) + space (32)
        for (let code = 32; code <= 126; code++) {
            const char = String.fromCharCode(code);
            this.characterMap.set(code, new Character(char, this.settings.gridSize));
        }
    }

    /**
     * Set current character to edit
     */
    setCurrentCharacter(char) {
        this.currentChar = char;
        this.currentCharCode = char.charCodeAt(0);

        let character = this.characterMap.get(this.currentCharCode);

        if (!character) {
            character = new Character(char, this.settings.gridSize);
            this.characterMap.set(this.currentCharCode, character);
        }

        this.gridEditor.setCharacter(character);
        this.uiManager.updateCharacterButtons();
    }

    /**
     * Called when current character is modified
     */
    onCharacterModified() {
        this.previewPanel.setCharacterMap(this.characterMap);
        this.uiManager.updateCharacterButtons();
    }

    setTool(tool) {
        this.gridEditor.setTool(tool);
    }

    clearCharacter() {
        this.gridEditor.saveState();
        this.gridEditor.character.clear();
        this.gridEditor.render();
        this.onCharacterModified();
        this.uiManager.showToast('Character cleared', 'success');
    }

    copyCharacter() {
        this.clipboard = this.gridEditor.character.clone();
        this.uiManager.showToast('Character copied to clipboard', 'success');
    }

    pasteCharacter() {
        if (!this.clipboard) {
            this.uiManager.showToast('Clipboard is empty', 'error');
            return;
        }

        this.gridEditor.saveState();
        const current = this.gridEditor.character;
        current.grid = this.clipboard.grid.map(row => [...row]);
        this.gridEditor.render();
        this.onCharacterModified();
        this.uiManager.showToast('Character pasted', 'success');
    }

    undo() { this.gridEditor.undo(); }
    redo() { this.gridEditor.redo(); }

    flipHorizontal() {
        this.gridEditor.saveState();
        this.gridEditor.character.flipHorizontal();
        this.gridEditor.render();
        this.onCharacterModified();
    }

    flipVertical() {
        this.gridEditor.saveState();
        this.gridEditor.character.flipVertical();
        this.gridEditor.render();
        this.onCharacterModified();
    }

    shiftLeft() {
        this.gridEditor.saveState();
        this.gridEditor.character.shift('left');
        this.gridEditor.render();
        this.onCharacterModified();
    }

    shiftRight() {
        this.gridEditor.saveState();
        this.gridEditor.character.shift('right');
        this.gridEditor.render();
        this.onCharacterModified();
    }

    shiftUp() {
        this.gridEditor.saveState();
        this.gridEditor.character.shift('up');
        this.gridEditor.render();
        this.onCharacterModified();
    }

    shiftDown() {
        this.gridEditor.saveState();
        this.gridEditor.character.shift('down');
        this.gridEditor.render();
        this.onCharacterModified();
    }

    centerHorizontal() {
        this.gridEditor.saveState();
        this.gridEditor.character.centerHorizontal();
        this.gridEditor.render();
        this.onCharacterModified();
        this.uiManager.showToast('Character centered horizontally', 'success');
    }

    centerVertical() {
        this.gridEditor.saveState();
        this.gridEditor.character.centerVertical();
        this.gridEditor.render();
        this.onCharacterModified();
        this.uiManager.showToast('Character centered vertically', 'success');
    }

    centerBoth() {
        this.gridEditor.saveState();
        this.gridEditor.character.centerBoth();
        this.gridEditor.render();
        this.onCharacterModified();
        this.uiManager.showToast('Character centered', 'success');
    }

    toggleGrid(show) {
        this.gridEditor.showGrid = show;
        this.gridEditor.render();
    }

    toggleBaseline(show) {
        this.gridEditor.showBaseline = show;
        this.gridEditor.render();
    }

    toggleMirrorMode(enabled) {
        this.gridEditor.setMirrorMode(enabled);
    }

    zoomIn() { this.gridEditor.zoomIn(); }
    zoomOut() { this.gridEditor.zoomOut(); }

    setFontName(name) {
        this.settings.fontName = name;
        this.uiManager.updateProjectName(name);
    }

    setGridSize(size) {
        if (size === this.settings.gridSize) return;

        let designedCount = 0;
        this.characterMap.forEach(char => {
            if (char.isDesigned()) designedCount++;
        });

        if (designedCount > 0) {
            const oldSize = this.settings.gridSize;
            const willLoseData = size < oldSize;

            let message = `You have ${designedCount} designed character${designedCount > 1 ? 's' : ''}.\n\n`;

            if (willLoseData) {
                message += `WARNING: Changing from ${oldSize}x${oldSize} to ${size}x${size} will CROP your characters and LOSE data outside the ${size}x${size} area!\n\n`;
            } else {
                message += `Changing from ${oldSize}x${oldSize} to ${size}x${size} will preserve your characters, but they'll appear smaller on the larger grid.\n\n`;
            }

            message += `Do you want to continue?`;

            if (!confirm(message)) {
                document.getElementById('select-grid-size').value = oldSize;
                return;
            }
        }

        const oldSize = this.settings.gridSize;
        this.settings.gridSize = size;
        this.settings.charHeight = size;
        document.getElementById('input-char-height').value = size;

        this.gridEditor.updateGridSize(size);
        this.previewPanel.setGridSize(size);

        this.characterMap.forEach((char, code) => {
            if (char.gridSize !== size && char.isDesigned()) {
                const newChar = new Character(char.char, size);
                const copySize = Math.min(oldSize, size);
                for (let y = 0; y < copySize; y++) {
                    for (let x = 0; x < copySize; x++) {
                        if (char.getPixel(x, y)) {
                            newChar.setPixel(x, y, true);
                        }
                    }
                }
                this.characterMap.set(code, newChar);
            } else if (char.gridSize !== size) {
                const newChar = new Character(char.char, size);
                this.characterMap.set(code, newChar);
            }
        });

        const currentChar = this.characterMap.get(this.currentCharCode);
        if (currentChar) {
            this.gridEditor.setCharacter(currentChar);
        }

        this.uiManager.updateCharacterButtons();

        if (size < oldSize) {
            this.uiManager.showToast(`Grid size changed to ${size}x${size} - some data may be lost`, 'warning');
        } else {
            this.uiManager.showToast(`Grid size changed to ${size}x${size} - data preserved`, 'success');
        }
    }

    setCharHeight(height) {
        this.settings.charHeight = height;
    }

    setPreviewText(text) {
        this.previewPanel.setText(text);
    }

    setPreviewSize(size) {
        this.previewPanel.setFontSize(size);
    }

    /**
     * Export font as TTF file
     * Uses Platform.uploadAsset when embedded, downloads to computer otherwise
     */
    async exportTTF() {
        const stats = FontGenerator.getCharacterCoverage(this.characterMap);

        if (stats.designed === 0) {
            this.uiManager.showToast('Please design at least one character before exporting', 'error');
            return;
        }

        // Show modal with font name form
        const modal = document.getElementById('modal-export');
        const exportForm = document.getElementById('export-form');
        const exportProgressContainer = document.getElementById('export-progress-container');
        const exportFontNameInput = document.getElementById('export-font-name');
        const confirmBtn = document.getElementById('btn-confirm-export');

        // Reset modal state
        exportForm.style.display = 'block';
        exportProgressContainer.style.display = 'none';

        const lastExportName = localStorage.getItem('fontmaker_last_export_name') || this.settings.fontName;
        exportFontNameInput.value = lastExportName;

        modal.classList.add('active');

        setTimeout(() => {
            exportFontNameInput.focus();
            exportFontNameInput.select();
        }, 100);

        const self = this;

        const handleConfirm = async () => {
            confirmBtn.removeEventListener('click', handleConfirm);

            const exportFontName = exportFontNameInput.value.trim() || 'MyPixelFont';
            localStorage.setItem('fontmaker_last_export_name', exportFontName);

            exportForm.style.display = 'none';
            exportProgressContainer.style.display = 'block';

            const statusDiv = document.getElementById('export-status');
            const progressBar = document.getElementById('export-progress');

            statusDiv.innerHTML = '';
            progressBar.style.width = '0%';

            try {
                statusDiv.innerHTML = '<p style="color: #7c3aed;">Generating TTF font...</p>';
                progressBar.style.width = '30%';

                await new Promise(resolve => setTimeout(resolve, 200));

                const font = FontGenerator.generateFont(self.characterMap, {
                    fontName: exportFontName,
                    gridSize: self.settings.gridSize,
                    unitsPerEm: self.settings.unitsPerEm
                });

                progressBar.style.width = '60%';

                const filename = exportFontName.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.ttf';

                // Platform.uploadAsset when embedded, download otherwise
                if (window.Platform && Platform.isEmbedded) {
                    statusDiv.innerHTML = '<p style="color: #7c3aed;">Exporting to your files...</p>';
                    await new Promise(resolve => setTimeout(resolve, 100));

                    const arrayBuffer = font.toArrayBuffer();
                    const blob = new Blob([arrayBuffer], { type: 'font/ttf' });

                    // Convert blob to data URL for Platform.uploadAsset
                    const dataUrl = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });

                    await Platform.uploadAsset(dataUrl, filename, 'font/ttf');

                    progressBar.style.width = '100%';
                    statusDiv.innerHTML = `
                        <p style="color: #10b981;">TTF font exported to your files!</p>
                        <p style="color: #a0a0a0; font-size: 13px; margin-top: 10px;">
                            Font Family: ${exportFontName}
                        </p>
                        <p style="color: #a0a0a0; font-size: 13px;">
                            File: ${filename}
                        </p>
                        <p style="color: #a0a0a0; font-size: 13px;">
                            Characters: ${stats.designed} / ${stats.total} (${stats.percentage}%)
                        </p>
                    `;
                } else {
                    statusDiv.innerHTML = '<p style="color: #7c3aed;">Downloading TTF...</p>';
                    await new Promise(resolve => setTimeout(resolve, 100));

                    FontGenerator.downloadTTF(font, filename);

                    progressBar.style.width = '100%';
                    statusDiv.innerHTML = `
                        <p style="color: #10b981;">TTF font downloaded!</p>
                        <p style="color: #a0a0a0; font-size: 13px; margin-top: 10px;">
                            Font Family: ${exportFontName}
                        </p>
                        <p style="color: #a0a0a0; font-size: 13px;">
                            File: ${filename}
                        </p>
                        <p style="color: #a0a0a0; font-size: 13px;">
                            Characters: ${stats.designed} / ${stats.total} (${stats.percentage}%)
                        </p>
                    `;
                }

                setTimeout(() => {
                    modal.classList.remove('active');
                }, 3000);

            } catch (error) {
                console.error('Export error:', error);
                statusDiv.innerHTML = `<p style="color: #ef4444;">Export failed: ${error.message}</p>`;
                progressBar.style.width = '0%';
            }
        };

        confirmBtn.addEventListener('click', handleConfirm);

        const handleEnter = (e) => {
            if (e.key === 'Enter') {
                exportFontNameInput.removeEventListener('keypress', handleEnter);
                handleConfirm();
            }
        };
        exportFontNameInput.addEventListener('keypress', handleEnter);
    }

    hasUnsavedChanges() {
        for (const [code, character] of this.characterMap) {
            if (character.isDesigned()) {
                return true;
            }
        }
        return false;
    }

    /**
     * Setup editable font name in header
     */
    setupEditableFontName() {
        const projectNameSpan = document.getElementById('project-name');
        const projectNameInput = document.getElementById('project-name-input');

        projectNameSpan.addEventListener('click', () => {
            projectNameSpan.style.display = 'none';
            projectNameInput.style.display = 'inline-block';
            projectNameInput.value = this.settings.fontName;
            projectNameInput.focus();
            projectNameInput.select();
        });

        const saveFontName = () => {
            const newName = projectNameInput.value.trim();
            if (newName && newName !== '') {
                this.setFontName(newName);
            }
            projectNameInput.style.display = 'none';
            projectNameSpan.style.display = 'inline-block';
            projectNameSpan.textContent = this.settings.fontName;
        };

        projectNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveFontName();
            }
        });

        projectNameInput.addEventListener('blur', saveFontName);

        projectNameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                projectNameInput.style.display = 'none';
                projectNameSpan.style.display = 'inline-block';
            }
        });
    }
}
