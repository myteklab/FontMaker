/**
 * FontGenerator.js
 * Generates TTF/OTF font files from character data using opentype.js
 */

class FontGenerator {
    /**
     * Generate a font from character map
     * @param {Map} characterMap - Map of char codes to Character objects
     * @param {Object} options - Font options
     * @returns {opentype.Font} Generated font object
     */
    static generateFont(characterMap, options = {}) {
        const fontName = options.fontName || 'MyPixelFont';
        const unitsPerEm = options.unitsPerEm || 1000;
        const gridSize = options.gridSize || 16;

        // Calculate font metrics
        const ascender = Math.floor(unitsPerEm * 0.8);
        const descender = Math.floor(unitsPerEm * -0.2);

        // Create notdef glyph (shown for missing characters)
        const notdefPath = new opentype.Path();
        const notdefSize = unitsPerEm * 0.7;
        notdefPath.moveTo(50, 0);
        notdefPath.lineTo(notdefSize, 0);
        notdefPath.lineTo(notdefSize, notdefSize);
        notdefPath.lineTo(50, notdefSize);
        notdefPath.close();

        const notdefGlyph = new opentype.Glyph({
            name: '.notdef',
            unicode: 0,
            advanceWidth: Math.floor(unitsPerEm * 0.8),
            path: notdefPath
        });

        // Create space glyph
        const spaceGlyph = new opentype.Glyph({
            name: 'space',
            unicode: 32,
            advanceWidth: Math.floor(unitsPerEm * 0.5),
            path: new opentype.Path()
        });

        // Start with required glyphs
        const glyphs = [notdefGlyph, spaceGlyph];

        // Convert characters to glyphs
        characterMap.forEach((character, charCode) => {
            if (charCode === 32) return; // Skip space, already added

            const path = PathConverter.characterToOptimizedPath(character, unitsPerEm);
            const advanceWidth = PathConverter.calculateAdvanceWidth(character, unitsPerEm);

            const glyph = new opentype.Glyph({
                name: this.getGlyphName(character.char),
                unicode: charCode,
                advanceWidth: advanceWidth,
                path: path
            });

            glyphs.push(glyph);
        });

        // Create the font
        const font = new opentype.Font({
            familyName: fontName,
            styleName: 'Regular',
            unitsPerEm: unitsPerEm,
            ascender: ascender,
            descender: descender,
            glyphs: glyphs
        });

        return font;
    }

    /**
     * Get glyph name for a character
     * @param {string} char - The character
     * @returns {string} Glyph name
     */
    static getGlyphName(char) {
        const code = char.charCodeAt(0);

        // Standard names for common characters
        const names = {
            33: 'exclam',
            34: 'quotedbl',
            35: 'numbersign',
            36: 'dollar',
            37: 'percent',
            38: 'ampersand',
            39: 'quotesingle',
            40: 'parenleft',
            41: 'parenright',
            42: 'asterisk',
            43: 'plus',
            44: 'comma',
            45: 'hyphen',
            46: 'period',
            47: 'slash',
            58: 'colon',
            59: 'semicolon',
            60: 'less',
            61: 'equal',
            62: 'greater',
            63: 'question',
            64: 'at',
            91: 'bracketleft',
            92: 'backslash',
            93: 'bracketright',
            94: 'asciicircum',
            95: 'underscore',
            96: 'grave',
            123: 'braceleft',
            124: 'bar',
            125: 'braceright',
            126: 'asciitilde'
        };

        if (names[code]) return names[code];
        if (code >= 48 && code <= 57) return char; // 0-9
        if (code >= 65 && code <= 90) return char; // A-Z
        if (code >= 97 && code <= 122) return char; // a-z

        return `uni${code.toString(16).toUpperCase().padStart(4, '0')}`;
    }

    /**
     * Export font as TTF file and trigger download
     * @param {opentype.Font} font - Font to export
     * @param {string} filename - Filename for download
     */
    static downloadTTF(font, filename = 'font.ttf') {
        const arrayBuffer = font.toArrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'font/ttf' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        URL.revokeObjectURL(url);
    }

    /**
     * Export font as OTF file and trigger download
     * @param {opentype.Font} font - Font to export
     * @param {string} filename - Filename for download
     */
    static downloadOTF(font, filename = 'font.otf') {
        // opentype.js generates OTF format by default
        const arrayBuffer = font.toArrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'font/otf' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        URL.revokeObjectURL(url);
    }

    /**
     * Get font file as base64 string for saving to server
     * @param {opentype.Font} font - Font to convert
     * @returns {Promise<string>} Base64 encoded font data
     */
    static async getFontBase64(font) {
        const arrayBuffer = font.toArrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'font/ttf' });

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    /**
     * Validate character coverage
     * @param {Map} characterMap - Map of characters
     * @returns {Object} Coverage statistics
     */
    static getCharacterCoverage(characterMap) {
        const stats = {
            total: 0,
            designed: 0,
            uppercase: 0,
            lowercase: 0,
            numbers: 0,
            symbols: 0,
            missing: []
        };

        // Safety check: ensure characterMap exists
        if (!characterMap) {
            return stats;
        }

        // Check standard ASCII printable characters (33-126)
        for (let code = 33; code <= 126; code++) {
            stats.total++;

            const char = characterMap.get(code);
            if (char && char.isDesigned()) {
                stats.designed++;

                if (code >= 65 && code <= 90) stats.uppercase++;
                else if (code >= 97 && code <= 122) stats.lowercase++;
                else if (code >= 48 && code <= 57) stats.numbers++;
                else stats.symbols++;
            } else {
                stats.missing.push(String.fromCharCode(code));
            }
        }

        stats.percentage = Math.round((stats.designed / stats.total) * 100);

        return stats;
    }

    /**
     * Generate preview text showing font capabilities
     * @param {Map} characterMap - Map of characters
     * @returns {string} Preview text using available characters
     */
    static generatePreviewText(characterMap) {
        const samples = [
            'The quick brown fox jumps over the lazy dog',
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            'abcdefghijklmnopqrstuvwxyz',
            '0123456789',
            '!@#$%^&*()_+-=[]{}|;:,.<>?'
        ];

        return samples.join('\n');
    }
}
