/**
 * FontProject.js
 * Handles serialization and deserialization of font project data
 */

class FontProject {
    constructor() {
        // No-op — platform handles save/load
    }

    /**
     * Serialize project data to JSON
     * @param {Map} characterMap - Map of characters
     * @param {Object} settings - Font settings
     * @returns {Object} Serialized project data
     */
    serializeProject(characterMap, settings) {
        const characters = {};

        characterMap.forEach((character, charCode) => {
            if (character.isDesigned()) {
                characters[charCode] = character.toJSON();
            }
        });

        return {
            version: '1.0',
            fontName: settings.fontName,
            gridSize: settings.gridSize,
            charHeight: settings.charHeight,
            characters: characters,
            created: new Date().toISOString(),
            characterCount: Object.keys(characters).length
        };
    }

    /**
     * Deserialize project data from JSON
     * @param {Object} projectData - Serialized project data
     * @returns {Object} Deserialized data {characterMap, settings}
     */
    deserializeProject(projectData) {
        const characterMap = new Map();

        if (projectData.characters) {
            Object.keys(projectData.characters).forEach(charCode => {
                const charData = projectData.characters[charCode];
                const character = Character.fromJSON(charData);
                characterMap.set(parseInt(charCode), character);
            });
        }

        return {
            characterMap: characterMap,
            settings: {
                fontName: projectData.fontName || 'Untitled Font',
                gridSize: projectData.gridSize || 16,
                charHeight: projectData.charHeight || 16
            }
        };
    }
}
