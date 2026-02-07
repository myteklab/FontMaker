/**
 * TemplateManager.js
 * Manages loading and applying font templates
 */

class TemplateManager {
    constructor(fontMaker) {
        this.fontMaker = fontMaker;
        this.availableTemplates = [
            {
                id: 'basic-16x16-complete',
                name: 'Basic Pixel Font (Complete)',
                description: 'A simple, clean pixel font with all characters designed',
                gridSize: 16,
                file: 'templates/basic-16x16-complete.json'
            }
        ];
    }

    /**
     * Get list of available templates
     */
    getTemplates() {
        return this.availableTemplates;
    }

    /**
     * Load a template from the server
     */
    async loadTemplate(templateId) {
        const template = this.availableTemplates.find(t => t.id === templateId);
        if (!template) {
            throw new Error('Template not found');
        }

        try {
            const response = await fetch(template.file);
            if (!response.ok) {
                throw new Error(`Failed to load template: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error loading template:', error);
            throw error;
        }
    }

    /**
     * Apply a template to the current font
     */
    async applyTemplate(templateId, confirmCallback) {
        try {
            // Confirm with user if they have existing work
            const hasWork = this.fontMaker.hasUnsavedChanges();
            if (hasWork) {
                const confirmed = await confirmCallback(
                    'Loading a template will replace your current work. Are you sure?'
                );
                if (!confirmed) {
                    return false;
                }
            }

            // Load the template data
            const templateData = await this.loadTemplate(templateId);

            // Validate template
            if (!templateData.characters || !templateData.gridSize) {
                throw new Error('Invalid template format');
            }

            // Check if grid size matches
            if (templateData.gridSize !== this.fontMaker.settings.gridSize) {
                const changeSize = await confirmCallback(
                    `This template uses a ${templateData.gridSize}×${templateData.gridSize} grid. ` +
                    `Your current grid is ${this.fontMaker.settings.gridSize}×${this.fontMaker.settings.gridSize}. ` +
                    `Change grid size to load template?`
                );

                if (changeSize) {
                    // Change grid size
                    this.fontMaker.setGridSize(templateData.gridSize);
                } else {
                    return false;
                }
            }

            // Apply font name if provided
            if (templateData.name) {
                this.fontMaker.settings.fontName = templateData.name;
                document.getElementById('input-font-name').value = templateData.name;
            }

            // Load all characters from template
            let loadedCount = 0;
            for (const [char, pixelData] of Object.entries(templateData.characters)) {
                const charCode = char.charCodeAt(0);
                if (this.fontMaker.characterMap.has(charCode)) {
                    const character = this.fontMaker.characterMap.get(charCode);
                    // Convert pixelData (0s and 1s) to boolean grid
                    character.grid = pixelData.map(row => row.map(pixel => pixel === 1));
                    loadedCount++;
                }
            }

            // Update the UI
            this.fontMaker.gridEditor.render();
            this.fontMaker.previewPanel.setCharacterMap(this.fontMaker.characterMap);
            this.fontMaker.uiManager.updateProgressStats();

            // Show success message
            this.fontMaker.uiManager.showToast(
                `✅ Loaded template: ${templateData.name} - ${loadedCount} characters loaded`,
                'success'
            );

            return true;
        } catch (error) {
            console.error('Error applying template:', error);
            this.fontMaker.uiManager.showToast(`❌ Failed to load template: ${error.message}`, 'error');
            return false;
        }
    }

    /**
     * Show template selection modal
     */
    showTemplateModal() {
        const modal = document.getElementById('modal-template');
        if (!modal) {
            console.error('Template modal not found');
            return;
        }

        // Populate template list
        const list = document.getElementById('template-list');
        list.innerHTML = '';

        this.availableTemplates.forEach(template => {
            const card = document.createElement('div');
            card.className = 'template-card';
            card.innerHTML = `
                <h3>${template.name}</h3>
                <p>${template.description}</p>
                <div class="template-meta">
                    <span>📏 ${template.gridSize}×${template.gridSize}</span>
                </div>
                <button class="btn btn-primary" data-template-id="${template.id}">
                    Load Template
                </button>
            `;

            // Add click handler
            const button = card.querySelector('button');
            button.addEventListener('click', async () => {
                modal.classList.remove('active');

                const success = await this.applyTemplate(
                    template.id,
                    (message) => {
                        return new Promise((resolve) => {
                            if (confirm(message)) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        });
                    }
                );

                if (success) {
                    console.log('Template loaded successfully');
                }
            });

            list.appendChild(card);
        });

        modal.classList.add('active');
    }
}
