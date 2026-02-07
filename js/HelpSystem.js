/**
 * HelpSystem.js
 * Educational help system for FontMaker
 * Provides contextual help for learning about font creation
 */

class HelpSystem {
    constructor() {
        this.helpContent = {
            intro: {
                title: '⚡ Welcome to FontMaker!',
                content: `
                    <h3>🎯 What is a Font?</h3>
                    <p>A <strong>font</strong> (also called a <strong>typeface</strong>) is a set of characters - letters, numbers, and symbols - designed in a consistent style. Every piece of text you read on a screen or in print uses a font!</p>

                    <h3>📖 A Brief History</h3>
                    <ul>
                        <li><strong>1440s:</strong> Johannes Gutenberg invents movable type printing - each letter was a physical metal piece!</li>
                        <li><strong>1980s:</strong> Digital fonts emerge with personal computers</li>
                        <li><strong>1990s:</strong> Pixel fonts dominate early video games and computer graphics</li>
                        <li><strong>Today:</strong> Thousands of fonts exist, from elegant scripts to blocky pixels!</li>
                    </ul>

                    <h3>🎮 Why Pixel Fonts?</h3>
                    <p>Pixel fonts have a special place in digital culture:</p>
                    <ul>
                        <li><strong>Retro Gaming:</strong> Classic games used pixel fonts (think Super Mario, Zelda, Minecraft)</li>
                        <li><strong>Low Resolution:</strong> Perfect for small screens, LED displays, embedded systems</li>
                        <li><strong>Artistic Style:</strong> The "8-bit" aesthetic is timeless and nostalgic</li>
                        <li><strong>Learning Tool:</strong> Creating pixel fonts teaches design fundamentals!</li>
                    </ul>

                    <h3>💻 Where Are Fonts Used?</h3>
                    <p>Fonts are everywhere in digital and print media:</p>
                    <ul>
                        <li><strong>Websites:</strong> Every webpage uses fonts to display text</li>
                        <li><strong>Video Games:</strong> UI text, dialogue, menus</li>
                        <li><strong>Apps:</strong> Mobile and desktop applications</li>
                        <li><strong>Documents:</strong> Word processors, PDFs, presentations</li>
                        <li><strong>Art & Design:</strong> Posters, logos, branding</li>
                        <li><strong>Electronics:</strong> Calculator displays, smartwatches, appliances</li>
                    </ul>

                    <h3>🎨 What Makes a Good Font?</h3>
                    <p>Professional fonts share these qualities:</p>
                    <ul>
                        <li><strong>Readability:</strong> Easy to read, even at small sizes</li>
                        <li><strong>Consistency:</strong> All letters share a unified style</li>
                        <li><strong>Spacing:</strong> Letters are properly spaced when used together</li>
                        <li><strong>Completeness:</strong> Includes all necessary characters</li>
                        <li><strong>Purpose:</strong> Designed for its intended use (display vs. body text)</li>
                    </ul>

                    <h3>🛠️ What is FontMaker?</h3>
                    <p><strong>FontMaker is a pixel font editor</strong> that lets you create your own custom fonts!</p>
                    <ul>
                        <li><strong>Draw characters:</strong> Use a grid to design each letter pixel-by-pixel</li>
                        <li><strong>Export as TTF:</strong> Save your font to use in any program!</li>
                        <li><strong>Learn design:</strong> Understand typography and font creation</li>
                        <li><strong>Express yourself:</strong> Create fonts that match your style</li>
                    </ul>

                    <h3>🎓 What You'll Learn</h3>
                    <p>Creating fonts teaches valuable skills:</p>
                    <ul>
                        <li><strong>Typography:</strong> The art and technique of arranging type</li>
                        <li><strong>Visual Consistency:</strong> Making elements work together as a system</li>
                        <li><strong>Pixel Art:</strong> Working with grid-based graphics</li>
                        <li><strong>Problem Solving:</strong> Designing readable characters within constraints</li>
                        <li><strong>Attention to Detail:</strong> Small changes make big differences!</li>
                    </ul>

                    <h3>🚀 Getting Started</h3>
                    <ol>
                        <li><strong>Choose a grid size:</strong> 16×16 is great for beginners</li>
                        <li><strong>Pick a style:</strong> Blocky? Rounded? Futuristic? Decide your aesthetic</li>
                        <li><strong>Start with "I":</strong> It's the simplest letter - just a vertical line!</li>
                        <li><strong>Design uppercase first:</strong> These establish your font's personality</li>
                        <li><strong>Test frequently:</strong> Use the Preview panel to see how letters look together</li>
                        <li><strong>Save often:</strong> FontMaker auto-saves, but Ctrl+S is your friend!</li>
                    </ol>

                    <h3>💡 Pro Tips for Beginners</h3>
                    <ul>
                        <li><strong>Study existing fonts:</strong> Look at classic pixel fonts for inspiration</li>
                        <li><strong>Keep it simple:</strong> Your first font doesn't need to be perfect</li>
                        <li><strong>Use the baseline:</strong> It's your most important alignment guide</li>
                        <li><strong>Mirror mode is magic:</strong> Use it for symmetrical letters (A, H, M, etc.)</li>
                        <li><strong>Copy/Paste strategically:</strong> Many letters are variations of others</li>
                        <li><strong>Have fun!</strong> Font creation is creative and rewarding!</li>
                    </ul>

                    <h3>🌟 Famous Pixel Fonts</h3>
                    <p>Get inspired by these legendary pixel fonts:</p>
                    <ul>
                        <li><strong>Press Start 2P:</strong> Classic arcade game style</li>
                        <li><strong>VT323:</strong> Terminal/command line aesthetic</li>
                        <li><strong>Minecraft Font:</strong> Blocky and bold</li>
                        <li><strong>Chicago:</strong> Original Macintosh system font</li>
                        <li><strong>Commodore 64:</strong> Iconic 8-bit computer font</li>
                    </ul>

                    <h3>🎯 Your Mission</h3>
                    <p>Ready to create your own font? Click the <strong>❓</strong> icons throughout the interface to learn about each tool and feature. Start small, think big, and most importantly - <strong>have fun creating!</strong></p>

                    <p style="text-align: center; margin-top: 20px; color: #7c3aed; font-size: 16px;"><strong>Let's make something awesome! 🚀</strong></p>
                `
            },

            settings: {
                title: '⚙️ Font Settings',
                content: `
                    <h3>🎯 What Are These Settings?</h3>
                    <p>These settings control the overall properties of your font and how it will look when exported.</p>

                    <h3>📝 Font Name</h3>
                    <p>This is the name of your font family. When you export your font as a TTF file, this is what it will be called on your computer.</p>
                    <ul>
                        <li><strong>Examples:</strong> "MyPixelFont", "RetroGaming", "8BitAdventure"</li>
                        <li><strong>Tip:</strong> Choose a descriptive name that reflects your font's style!</li>
                    </ul>

                    <h3>📐 Grid Size</h3>
                    <p>This determines how many pixels wide and tall each character is. Bigger grids = more detail!</p>
                    <ul>
                        <li><strong>5×5:</strong> Ultra tiny, minimalist fonts (great for small displays)</li>
                        <li><strong>8×8:</strong> Classic retro game style (think NES, Commodore 64)</li>
                        <li><strong>16×16:</strong> Standard pixel font size (most popular!)</li>
                        <li><strong>32×32:</strong> High detail pixel art fonts</li>
                    </ul>
                    <p><strong>💡 Pro Tip:</strong> Odd-numbered grids (7×7, 9×9, etc.) have a center pixel, making it easier to create symmetrical characters!</p>

                    <h3>📏 Character Height</h3>
                    <p>This is a technical setting that tells the TTF file how tall characters should be rendered. For most projects, matching your grid size works great!</p>
                    <ul>
                        <li><strong>What it does:</strong> Affects spacing and size when your font is used in other programs</li>
                        <li><strong>Typical value:</strong> Same as your grid size (16 for 16×16 grid)</li>
                    </ul>

                    <h3>🎨 Design Philosophy</h3>
                    <p>Pixel fonts are about <strong>working within constraints</strong> to create clear, readable characters. The grid size you choose affects your entire design approach - smaller grids require more creativity and simplification!</p>
                `
            },

            tools: {
                title: '🎨 Drawing Tools',
                content: `
                    <h3>🎯 Your Creative Toolkit</h3>
                    <p>These tools help you draw and edit your pixel characters. Each tool has a keyboard shortcut for quick access!</p>

                    <h3>✏️ Pencil Tool (P)</h3>
                    <p><strong>Your main drawing tool!</strong> Click to draw individual pixels.</p>
                    <ul>
                        <li><strong>Click:</strong> Draw a single pixel</li>
                        <li><strong>Click + Drag:</strong> Draw multiple pixels in a row</li>
                        <li><strong>Best for:</strong> Detailed work, outlines, fine-tuning</li>
                    </ul>

                    <h3>🧹 Eraser Tool (E)</h3>
                    <p>Remove pixels you don't want. Works just like the pencil but clears pixels instead!</p>
                    <ul>
                        <li><strong>Click:</strong> Erase a single pixel</li>
                        <li><strong>Click + Drag:</strong> Erase multiple pixels</li>
                        <li><strong>Tip:</strong> Great for cleaning up mistakes or creating negative space</li>
                    </ul>

                    <h3>🪣 Fill Tool (F)</h3>
                    <p>Fill entire areas with pixels - super fast for solid shapes!</p>
                    <ul>
                        <li><strong>Click:</strong> Fill an enclosed area with pixels</li>
                        <li><strong>How it works:</strong> Fills until it hits existing pixels (like paint bucket in Photoshop)</li>
                        <li><strong>Best for:</strong> Filling in letters quickly, creating solid backgrounds</li>
                    </ul>

                    <h3>📏 Line Tool (L)</h3>
                    <p>Draw perfectly straight lines between two points.</p>
                    <ul>
                        <li><strong>Click first point:</strong> Start of line</li>
                        <li><strong>Click second point:</strong> End of line</li>
                        <li><strong>Best for:</strong> Straight edges, crossbars (like in "A", "E", "T")</li>
                    </ul>

                    <h3>✋ Move Tool (M)</h3>
                    <p>Pan around the canvas to see different areas of your character.</p>
                    <ul>
                        <li><strong>Click + Drag:</strong> Move the view around</li>
                        <li><strong>When to use:</strong> When zoomed in and you need to see other parts</li>
                    </ul>

                    <h3>💡 Workflow Tips</h3>
                    <ul>
                        <li><strong>Start with Pencil:</strong> Draw the outline of your character first</li>
                        <li><strong>Use Fill:</strong> Quickly fill in solid areas</li>
                        <li><strong>Clean up with Eraser:</strong> Remove any stray pixels</li>
                        <li><strong>Line Tool for straight edges:</strong> Perfect for geometric characters</li>
                    </ul>
                `
            },

            actions: {
                title: '⚡ Action Buttons',
                content: `
                    <h3>🎯 Powerful Editing Actions</h3>
                    <p>These buttons help you modify and manipulate your characters in different ways. Master these to speed up your workflow!</p>

                    <h3>↩️ Undo & ↪️ Redo</h3>
                    <p><strong>Made a mistake? No problem!</strong></p>
                    <ul>
                        <li><strong>Undo (Ctrl+Z):</strong> Go back one step</li>
                        <li><strong>Redo (Ctrl+Y):</strong> Move forward one step</li>
                        <li><strong>Unlimited history:</strong> You can undo as many times as you need!</li>
                    </ul>

                    <h3>🗑️ Clear Character</h3>
                    <p>Erase the entire character and start fresh. Great when you want to completely redesign a letter!</p>

                    <h3>📋 Copy & 📄 Paste</h3>
                    <p><strong>Reuse your work!</strong> Super useful for creating similar characters.</p>
                    <ul>
                        <li><strong>Copy:</strong> Save the current character to clipboard</li>
                        <li><strong>Paste:</strong> Apply the copied design to a different character</li>
                        <li><strong>Example:</strong> Design "C", then paste to "G" and add the horizontal bar</li>
                        <li><strong>Pro Tip:</strong> Use for creating variations - copy "O" to make "Q", copy "b" to make "d"!</li>
                    </ul>

                    <h3>↔️ Flip Horizontal & ↕️ Flip Vertical</h3>
                    <p><strong>Mirror your characters!</strong> Create symmetrical designs instantly.</p>
                    <ul>
                        <li><strong>Horizontal:</strong> Flip left-to-right (great for "p" → "q", "b" → "d")</li>
                        <li><strong>Vertical:</strong> Flip top-to-bottom</li>
                        <li><strong>Time saver:</strong> Design one character, flip to create its mirror!</li>
                    </ul>

                    <h3>⬆️⬇️⬅️➡️ Shift Buttons</h3>
                    <p><strong>Nudge your character in any direction.</strong> Fine-tune positioning!</p>
                    <ul>
                        <li><strong>What it does:</strong> Moves all pixels one space in that direction</li>
                        <li><strong>When to use:</strong> Fine adjustments, baseline alignment</li>
                        <li><strong>Tip:</strong> Shift up/down to adjust how the character sits on the baseline</li>
                    </ul>

                    <h3>↔️📐 ↕️📐 🎯 Center Buttons</h3>
                    <p><strong>Automatically center your character!</strong> Perfect alignment in one click.</p>
                    <ul>
                        <li><strong>Center Horizontal (↔️📐):</strong> Centers character left-to-right</li>
                        <li><strong>Center Vertical (↕️📐):</strong> Centers character top-to-bottom</li>
                        <li><strong>Center Both (🎯):</strong> Centers in both directions at once</li>
                    </ul>

                    <h3>💡 When to Use Centering</h3>
                    <ul>
                        <li><strong>Symmetrical letters:</strong> A, H, I, M, O, T, U, V, W, X, Y - should be perfectly centered</li>
                        <li><strong>Numbers:</strong> 0, 1, 2, 3, etc. - look better centered</li>
                        <li><strong>Symbols:</strong> +, =, *, -, / - centering creates professional appearance</li>
                        <li><strong>Quick alignment:</strong> Instead of manually shifting multiple times, center in one click!</li>
                    </ul>

                    <h3>⚠️ Centering vs. Baseline</h3>
                    <p><strong>Important:</strong> Vertical centering may move characters off the baseline!</p>
                    <ul>
                        <li><strong>For uppercase/numbers:</strong> Use horizontal centering + manual vertical positioning</li>
                        <li><strong>For symbols:</strong> Center both ways is usually perfect</li>
                        <li><strong>After centering:</strong> Use Shift buttons for fine baseline adjustments</li>
                    </ul>

                    <h3>🎓 Learning Path</h3>
                    <ol>
                        <li><strong>Experiment with Flip:</strong> See how many characters are just mirrors of each other!</li>
                        <li><strong>Use Copy/Paste:</strong> Speed up creating similar letters</li>
                        <li><strong>Try Centering:</strong> Let the tool do the math for perfect alignment!</li>
                        <li><strong>Don't fear Clear:</strong> Starting over is often faster than fixing mistakes</li>
                        <li><strong>Master Shift:</strong> Perfect positioning makes fonts look professional</li>
                    </ol>
                `
            },

            characters: {
                title: '🔤 Character Selection',
                content: `
                    <h3>🎯 Your Character Set</h3>
                    <p>A complete font needs many characters! This panel helps you navigate and track which ones you've designed.</p>

                    <h3>📑 Character Tabs</h3>
                    <p>Characters are organized into groups for easy access:</p>
                    <ul>
                        <li><strong>A-Z:</strong> Uppercase letters (26 characters)</li>
                        <li><strong>a-z:</strong> Lowercase letters (26 characters)</li>
                        <li><strong>0-9:</strong> Numbers (10 characters)</li>
                        <li><strong>!@#:</strong> Symbols & punctuation (33 characters)</li>
                    </ul>
                    <p><strong>Total: 95 characters</strong> for a complete font!</p>

                    <h3>💚 Green Dots = Designed</h3>
                    <p>Characters with a <span style="color: #10b981;">●</span> green dot have been designed. Characters without a dot are empty.</p>
                    <ul>
                        <li><strong>Your goal:</strong> Get all 95 dots green!</li>
                        <li><strong>Don't worry:</strong> Your font will work even if you only design some characters</li>
                        <li><strong>Tip:</strong> Start with the most common letters: E, T, A, O, I, N</li>
                    </ul>

                    <h3>🎨 Design Strategy</h3>
                    <p><strong>Where to start?</strong> Here's a recommended order:</p>
                    <ol>
                        <li><strong>Uppercase basics:</strong> A, E, F, H, I, L, T (establish your style with simple shapes)</li>
                        <li><strong>Curves & rounds:</strong> O, C, G, Q, D (nail down your curve style)</li>
                        <li><strong>Diagonals:</strong> V, W, M, N, X, Y, Z (practice angles)</li>
                        <li><strong>Complex letters:</strong> B, K, P, R, S (combine techniques)</li>
                        <li><strong>Numbers:</strong> 0-9 (usually same height as uppercase)</li>
                        <li><strong>Lowercase:</strong> Similar to uppercase but shorter</li>
                        <li><strong>Symbols:</strong> Last priority, but adds polish!</li>
                    </ol>

                    <h3>⚠️ CRITICAL: Character Positioning</h3>
                    <p style="background: #2d2d44; padding: 10px; border-left: 3px solid #ef4444;">
                        <strong>⚡ Important Spacing Tip:</strong> Position characters based on their width!
                    </p>
                    <ul>
                        <li><strong>Narrow characters (i, l, j, !, ., I):</strong> Position on the <strong>LEFT side</strong> of the grid with 1-2 pixels of padding</li>
                        <li><strong>Medium characters (most letters):</strong> Use the middle portion of the grid</li>
                        <li><strong>Wide characters (m, w, M, W):</strong> Use most or all of the grid width</li>
                    </ul>
                    <p><strong>❌ Common Mistake:</strong> Centering narrow characters like "i" and "l" creates awkward spacing in the final font!</p>
                    <p><strong>✅ Correct Approach:</strong> Left-align narrow characters so they sit naturally next to other letters.</p>
                    <p style="background: #0f0f1e; padding: 8px; border-left: 3px solid #10b981; margin-top: 10px;">
                        <strong>Example:</strong> For "i" on a 16×16 grid, place it at pixels 1-3 or 2-4 (left side), not 7-9 (centered).
                    </p>

                    <h3>⚖️ Consistency is Key</h3>
                    <p>Your font will look professional when all characters share common traits:</p>
                    <ul>
                        <li><strong>Line thickness:</strong> Keep vertical and horizontal strokes the same width</li>
                        <li><strong>Height:</strong> All uppercase should be the same height</li>
                        <li><strong>Baseline:</strong> Letters should sit consistently on the baseline</li>
                        <li><strong>Style:</strong> If "A" is rounded, make all curves rounded. If "A" is angular, keep that style!</li>
                    </ul>

                    <h3>🔤 Descenders (Important!)</h3>
                    <p>Some lowercase letters have "tails" that go below the baseline:</p>
                    <ul>
                        <li><strong>Letters with descenders:</strong> g, j, p, q, y</li>
                        <li><strong>Rule:</strong> Let the tails drop into the bottom 25% of the grid</li>
                        <li><strong>Why it matters:</strong> Proper descenders make your font readable!</li>
                    </ul>

                    <h3>💡 Pro Tips</h3>
                    <ul>
                        <li><strong>Design in context:</strong> Switch between characters to check consistency</li>
                        <li><strong>Test words:</strong> Use the Preview panel to see how letters look together</li>
                        <li><strong>Common letter pairs:</strong> Make sure "rn" doesn't look like "m"!</li>
                        <li><strong>Check spacing:</strong> Type "iiiii" and "lllll" in preview to verify narrow character spacing looks good</li>
                    </ul>
                `
            },

            preview: {
                title: '👁️ Live Preview',
                content: `
                    <h3>🎯 See Your Font in Action!</h3>
                    <p>The preview panel shows how your font looks as actual text. This is where you see if your letters work together!</p>

                    <h3>📝 Preview Text</h3>
                    <p>Type any text to see it rendered in your font.</p>
                    <ul>
                        <li><strong>Default:</strong> "The quick brown fox jumps over the lazy dog" (contains all letters!)</li>
                        <li><strong>Try words:</strong> Type your name, test common words</li>
                        <li><strong>Test spacing:</strong> See how letters sit next to each other</li>
                    </ul>

                    <h3>🔍 Preview Size</h3>
                    <p>Adjust the size to see your font at different scales.</p>
                    <ul>
                        <li><strong>Small (12-24px):</strong> See how readable your font is at small sizes</li>
                        <li><strong>Medium (32-48px):</strong> Normal viewing size</li>
                        <li><strong>Large (48-72px):</strong> Spot imperfections and asymmetry</li>
                    </ul>

                    <h3>✅ What to Look For</h3>
                    <p>Use the preview to check for common issues:</p>
                    <ul>
                        <li><strong>Spacing:</strong> Are letters too close or too far apart?</li>
                        <li><strong>Baseline alignment:</strong> Do all letters sit at the same level?</li>
                        <li><strong>Consistency:</strong> Do letters share the same visual weight?</li>
                        <li><strong>Readability:</strong> Can you easily tell letters apart? (o vs 0, l vs I)</li>
                    </ul>

                    <h3>🎨 Testing Strategies</h3>
                    <p><strong>Try these test phrases:</strong></p>
                    <ul>
                        <li><strong>"Hamburgefonstiv"</strong> - Tests most letter shapes and spacing</li>
                        <li><strong>"rn vs m"</strong> - Make sure these don't look identical!</li>
                        <li><strong>"il1|" or "O0o"</strong> - Check confusable characters</li>
                        <li><strong>"AVAWVWAW"</strong> - Tests diagonal spacing</li>
                        <li><strong>"gjpqy"</strong> - Tests descenders together</li>
                    </ul>

                    <h3>💡 Design Workflow</h3>
                    <ol>
                        <li><strong>Design a character</strong> in the editor</li>
                        <li><strong>Type it in preview</strong> next to others</li>
                        <li><strong>Compare and adjust</strong> if it doesn't fit the style</li>
                        <li><strong>Test in words</strong> to see real-world usage</li>
                        <li><strong>Iterate!</strong> Font design is all about refinement</li>
                    </ol>

                    <h3>🎯 Professional Touch</h3>
                    <p>Great fonts are tested extensively! Try your font with:</p>
                    <ul>
                        <li>Real sentences and paragraphs</li>
                        <li>Different sizes (especially small sizes)</li>
                        <li>All caps vs mixed case</li>
                        <li>Common word patterns in your language</li>
                    </ul>
                `
            },

            progress: {
                title: '📊 Font Progress Tracker',
                content: `
                    <h3>🎯 Track Your Journey</h3>
                    <p>Creating a complete font is a big project! This tracker shows how far you've come.</p>

                    <h3>📈 Characters Completed</h3>
                    <p>The counter shows: <strong>Designed / Total</strong></p>
                    <ul>
                        <li><strong>Designed:</strong> Characters you've drawn (have at least one pixel)</li>
                        <li><strong>Total:</strong> 95 characters in a complete font</li>
                        <li><strong>Progress bar:</strong> Visual representation of completion</li>
                    </ul>

                    <h3>🎓 Milestones</h3>
                    <p>Celebrate your progress at each milestone!</p>
                    <ul>
                        <li><strong>26/95 (27%):</strong> Full uppercase alphabet complete! 🎉</li>
                        <li><strong>52/95 (55%):</strong> All letters (upper + lower) done! 🎊</li>
                        <li><strong>62/95 (65%):</strong> Letters + numbers complete! 🔢</li>
                        <li><strong>95/95 (100%):</strong> Complete professional font! 🏆</li>
                    </ul>

                    <h3>⏱️ Time Investment</h3>
                    <p>How long does it take to create a font?</p>
                    <ul>
                        <li><strong>Quick font (26 uppercase):</strong> 1-2 hours</li>
                        <li><strong>Basic font (52 letters + numbers):</strong> 3-5 hours</li>
                        <li><strong>Complete font (all 95):</strong> 6-10 hours</li>
                        <li><strong>Polished font:</strong> 15-20 hours with refinement</li>
                    </ul>
                    <p><em>Don't worry - you can save and come back anytime!</em></p>

                    <h3>🎯 Minimum Viable Font</h3>
                    <p>Don't need all 95? Here are useful subsets:</p>
                    <ul>
                        <li><strong>Display font:</strong> Just uppercase (26) - great for titles!</li>
                        <li><strong>Gaming font:</strong> Uppercase + numbers + basic symbols (~35)</li>
                        <li><strong>Text font:</strong> All letters + numbers + common punctuation (~70)</li>
                        <li><strong>Full font:</strong> Everything (95) - most professional</li>
                    </ul>

                    <h3>💡 Motivation Tips</h3>
                    <ul>
                        <li><strong>Set small goals:</strong> "Finish uppercase this week"</li>
                        <li><strong>Work in batches:</strong> Design similar letters together</li>
                        <li><strong>Take breaks:</strong> Fresh eyes catch mistakes!</li>
                        <li><strong>Export early:</strong> Test your font in real programs for motivation</li>
                        <li><strong>Celebrate milestones:</strong> Each character is an achievement!</li>
                    </ul>

                    <h3>🎨 Design Philosophy</h3>
                    <p><em>"A font is never truly finished, only released."</em> - Every font designer</p>
                    <p>Don't aim for perfection! Ship your font when it's <strong>good enough</strong>, then create version 2.0 with improvements!</p>
                `
            },

            mirror: {
                title: '↔️ Mirror Mode',
                content: `
                    <h3>🎯 What is Mirror Mode?</h3>
                    <p><strong>Draw on one side, automatically copy to the other!</strong> Mirror mode helps create perfectly symmetrical characters.</p>

                    <h3>✨ How It Works</h3>
                    <ul>
                        <li><strong>Enable:</strong> Check the "Mirror Mode" box</li>
                        <li><strong>Draw:</strong> Every pixel you draw appears on both sides</li>
                        <li><strong>Erase:</strong> Erasing on one side erases on both sides too</li>
                        <li><strong>Center line:</strong> Pixels on the exact center stay single (not mirrored)</li>
                    </ul>

                    <h3>🔤 Best Characters for Mirror Mode</h3>
                    <p><strong>Symmetrical uppercase letters:</strong></p>
                    <ul>
                        <li><strong>Perfect symmetry:</strong> A, H, I, M, O, T, U, V, W, X, Y</li>
                        <li><strong>Numbers:</strong> 0, 3, 8</li>
                        <li><strong>Symbols:</strong> +, =, *, (, ), [, ]</li>
                    </ul>

                    <h3>❌ When NOT to Use Mirror Mode</h3>
                    <p>These characters are NOT symmetrical:</p>
                    <ul>
                        <li><strong>Asymmetric letters:</strong> B, C, D, E, F, G, J, K, L, N, P, Q, R, S, Z</li>
                        <li><strong>Lowercase:</strong> Most lowercase letters (a, b, d, g, p, q, etc.)</li>
                        <li><strong>Numbers:</strong> 1, 2, 4, 5, 6, 7, 9</li>
                    </ul>

                    <h3>💡 Pro Workflow</h3>
                    <ol>
                        <li><strong>Start with center:</strong> Draw the center vertical line (if any)</li>
                        <li><strong>Enable mirror mode:</strong> Check the box</li>
                        <li><strong>Draw one half:</strong> Just focus on the left or right side</li>
                        <li><strong>Watch it mirror:</strong> Other side updates automatically!</li>
                        <li><strong>Disable when done:</strong> Make final adjustments</li>
                    </ol>

                    <h3>⚡ Speed Benefits</h3>
                    <p>Mirror mode is a huge time saver!</p>
                    <ul>
                        <li><strong>50% less work:</strong> Only draw half the character</li>
                        <li><strong>Perfect symmetry:</strong> No need to count pixels on both sides</li>
                        <li><strong>Quick corrections:</strong> Fix one side, both sides update</li>
                    </ul>

                    <h3>🎨 Design Tips</h3>
                    <ul>
                        <li><strong>Works best with odd grids:</strong> 7×7, 9×9, 11×11, etc. have a true center</li>
                        <li><strong>Even grids:</strong> Still works! Mirror line is between two columns</li>
                        <li><strong>Combine with other tools:</strong> Mirror mode works with Fill, Line, and Eraser too!</li>
                    </ul>

                    <h3>🎓 Learning Challenge</h3>
                    <p>Try this exercise:</p>
                    <ol>
                        <li>Enable mirror mode</li>
                        <li>Design the letter "A" (perfectly symmetrical!)</li>
                        <li>Disable mirror mode</li>
                        <li>Try designing "R" without mirror mode</li>
                        <li>Notice how mirror mode saves time for symmetrical characters!</li>
                    </ol>
                `
            },

            'ttf-export': {
                title: '📥 How TTF Export Works',
                content: `
                    <h3>🎯 From Pixels to Professional Font</h3>
                    <p>Ever wonder how your pixel art becomes a real font file that works in Word, Photoshop, or any program? Let's explore the technical magic behind TTF export!</p>

                    <h3>📊 Step 1: Pixel Grid Representation</h3>
                    <p><strong>Starting Point:</strong> Your character data</p>
                    <ul>
                        <li>Each character is stored as a <strong>2D grid</strong> (like a spreadsheet of pixels)</li>
                        <li>Every cell is either <code>true</code> (filled) or <code>false</code> (empty)</li>
                        <li>Example: A 16×16 grid = 256 cells of on/off data</li>
                        <li><strong>Memory efficient:</strong> Only ~32 bytes per character!</li>
                    </ul>
                    <p style="background: #2d2d44; padding: 10px; border-left: 3px solid #7c3aed; font-family: monospace; font-size: 13px;">
                        <strong>Technical:</strong> This is called a <em>bitmap representation</em> - the simplest way to store pixel art.
                    </p>

                    <h3>🔲 Step 2: Converting Pixels to Vector Shapes</h3>
                    <p><strong>The Problem:</strong> Fonts aren't made of pixels - they're made of <em>vector paths</em> (mathematical shapes)</p>
                    <p><strong>The Solution:</strong> Convert each filled pixel into a tiny square shape:</p>
                    <ul>
                        <li>Each pixel becomes a <strong>rectangle</strong> with 4 corners</li>
                        <li>Coordinates are calculated: <code>(x, y)</code> to <code>(x+1, y+1)</code></li>
                        <li>A <strong>path</strong> is drawn connecting the 4 corners</li>
                        <li><strong>Why vectors?</strong> They scale infinitely without getting blurry!</li>
                    </ul>
                    <p style="background: #2d2d44; padding: 10px; border-left: 3px solid #10b981; font-family: monospace; font-size: 13px;">
                        <strong>Example:</strong> If pixel at (5, 10) is filled:<br>
                        Path = moveTo(5,10) → lineTo(6,10) → lineTo(6,11) → lineTo(5,11) → close()
                    </p>

                    <h3>⚡ Step 3: Path Optimization (Smart!)</h3>
                    <p><strong>Challenge:</strong> A 16×16 character could have 256 tiny squares - that's a LOT of data!</p>
                    <p><strong>Solution:</strong> The <em>Rectangle Merging Algorithm</em> combines adjacent pixels:</p>
                    <ol>
                        <li><strong>Scan horizontally:</strong> Find runs of filled pixels in a row</li>
                        <li><strong>Check vertically:</strong> Can we extend this into a taller rectangle?</li>
                        <li><strong>Merge:</strong> Combine all adjacent pixels into ONE bigger shape</li>
                        <li><strong>Result:</strong> Fewer shapes = smaller file size + faster rendering!</li>
                    </ol>
                    <p style="background: #2d2d44; padding: 10px; border-left: 3px solid #7c3aed; font-family: monospace; font-size: 13px;">
                        <strong>Optimization Impact:</strong> Letter "I" might go from 50 tiny squares → just 2 rectangles! 96% reduction!
                    </p>

                    <h3>📐 Step 4: Font Coordinate System</h3>
                    <p><strong>The Twist:</strong> Font coordinates work differently than pixel coordinates!</p>
                    <ul>
                        <li><strong>Units Per Em (UPEm):</strong> Fonts use 1000 "font units" as the standard height</li>
                        <li><strong>Scaling:</strong> Your 16px grid is scaled up to 1000 units (×62.5 scale factor)</li>
                        <li><strong>Y-axis flip:</strong> In fonts, Y increases <em>upward</em> (opposite of screen coordinates!)</li>
                        <li><strong>Ascender/Descender:</strong> 80% above baseline, 20% below (for descenders like 'g', 'y')</li>
                    </ul>
                    <p style="background: #2d2d44; padding: 10px; border-left: 3px solid #10b981; font-family: monospace; font-size: 13px;">
                        <strong>Why 1000 units?</strong> This standard was chosen so fonts can scale to any size (12pt, 72pt, 300pt) with mathematical precision!
                    </p>

                    <h3>🔤 Step 5: Creating Glyphs</h3>
                    <p><strong>What's a Glyph?</strong> The technical term for a single character in a font.</p>
                    <p>Each glyph needs:</p>
                    <ul>
                        <li><strong>Name:</strong> "A", "exclam" (!), "dollar" ($) - standard naming convention</li>
                        <li><strong>Unicode:</strong> The character code (65 for 'A', 33 for '!')</li>
                        <li><strong>Path Data:</strong> The vector shapes we created in steps 2-3</li>
                        <li><strong>Advance Width:</strong> How far to move the cursor after drawing this letter</li>
                    </ul>
                    <p><strong>Smart Spacing:</strong> The advance width is calculated by finding your character's rightmost pixel + adding spacing (2-3 pixels depending on grid size). This prevents letters from touching!</p>

                    <h3>🎁 Step 6: Font Assembly</h3>
                    <p><strong>Building the complete font:</strong></p>
                    <ul>
                        <li><strong>Required glyphs:</strong> Must include ".notdef" (shown for missing characters) and "space"</li>
                        <li><strong>Your characters:</strong> All your designed letters, numbers, symbols</li>
                        <li><strong>Font metadata:</strong> Family name, style (Regular), designer info</li>
                        <li><strong>Font metrics:</strong> Line height, baseline position, spacing rules</li>
                    </ul>
                    <p>Everything is packaged together using the <strong>opentype.js</strong> library - an open-source JavaScript implementation of the OpenType font format!</p>

                    <h3>💾 Step 7: Binary Format Conversion</h3>
                    <p><strong>The Final Transformation:</strong> Converting human-readable data to computer-readable format</p>
                    <ul>
                        <li><strong>TTF Format:</strong> TrueType Font - created by Apple in 1980s, now universal standard</li>
                        <li><strong>Binary encoding:</strong> All data (glyphs, metrics, names) packed into efficient binary format</li>
                        <li><strong>Tables:</strong> TTF files contain multiple "tables" - sections for different data:
                            <ul>
                                <li><code>glyf</code> - Glyph outlines (your character shapes!)</li>
                                <li><code>head</code> - Font header (version, dates, bounding boxes)</li>
                                <li><code>name</code> - Font name and metadata</li>
                                <li><code>cmap</code> - Character to glyph mapping (Unicode → shape)</li>
                                <li><code>hmtx</code> - Horizontal metrics (spacing, widths)</li>
                            </ul>
                        </li>
                        <li><strong>Checksums:</strong> Each table has a checksum to detect file corruption</li>
                    </ul>
                    <p style="background: #2d2d44; padding: 10px; border-left: 3px solid #7c3aed; font-family: monospace; font-size: 13px;">
                        <strong>Fun Fact:</strong> TTF files are essentially small databases! Each "table" is like a database table with specific data.
                    </p>

                    <h3>⬇️ Step 8: File Download</h3>
                    <p><strong>Getting the font to your computer:</strong></p>
                    <ol>
                        <li><strong>ArrayBuffer:</strong> Binary data created in browser memory</li>
                        <li><strong>Blob:</strong> Data wrapped in a "Blob" (Binary Large Object) with MIME type <code>font/ttf</code></li>
                        <li><strong>Object URL:</strong> Browser creates temporary URL pointing to the blob</li>
                        <li><strong>Download link:</strong> Invisible link clicked programmatically to trigger download</li>
                        <li><strong>Cleanup:</strong> URL revoked to free memory</li>
                    </ol>

                    <h3>🖥️ What Happens After Download?</h3>
                    <p>Once installed on your system:</p>
                    <ul>
                        <li><strong>Font manager:</strong> OS registers the font in its font database</li>
                        <li><strong>Available everywhere:</strong> All programs can now use your font!</li>
                        <li><strong>Rendering:</strong> When you type, programs use your vector paths to draw letters at any size</li>
                        <li><strong>Pixel-perfect:</strong> Even though it's vectors, your pixel aesthetic is preserved!</li>
                    </ul>

                    <h3>🎓 Why This Matters</h3>
                    <p>Understanding this process teaches several computer science concepts:</p>
                    <ul>
                        <li><strong>Data structures:</strong> 2D arrays, trees, binary formats</li>
                        <li><strong>Algorithms:</strong> Rectangle merging, path optimization</li>
                        <li><strong>Coordinate systems:</strong> Transformations, scaling, flipping</li>
                        <li><strong>File formats:</strong> Binary encoding, tables, checksums</li>
                        <li><strong>Web APIs:</strong> Blobs, object URLs, downloads</li>
                    </ul>

                    <h3>💡 Advanced Topics</h3>
                    <p>Want to go deeper?</p>
                    <ul>
                        <li><strong>OpenType:</strong> Modern extension of TTF with advanced typography features</li>
                        <li><strong>Hinting:</strong> Instructions for rendering fonts beautifully at small sizes</li>
                        <li><strong>Kerning:</strong> Adjusting spacing between specific letter pairs (like "AV")</li>
                        <li><strong>Ligatures:</strong> Special combined characters (like "fi" → "ﬁ")</li>
                        <li><strong>Variable fonts:</strong> One file with multiple weights/styles!</li>
                    </ul>

                    <h3>🚀 Try It!</h3>
                    <p>Now that you know the magic behind TTF export:</p>
                    <ol>
                        <li>Design a few characters</li>
                        <li>Click "Export TTF"</li>
                        <li>Install your font</li>
                        <li>Type with YOUR creation in any program!</li>
                    </ol>
                    <p style="text-align: center; margin-top: 20px; color: #7c3aed; font-size: 16px;"><strong>You're not just making pixel art - you're building typography! 🎨</strong></p>
                `
            }
        };

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Handle all help icon clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('help-icon') || e.target.closest('.help-icon')) {
                const icon = e.target.classList.contains('help-icon') ? e.target : e.target.closest('.help-icon');
                const helpType = icon.dataset.help;

                if (helpType && this.helpContent[helpType]) {
                    this.showHelp(helpType);
                }
            }
        });
    }

    showHelp(helpType) {
        const content = this.helpContent[helpType];
        if (!content) return;

        const modal = document.getElementById('modal-help');
        const title = document.getElementById('help-modal-title');
        const body = document.getElementById('help-modal-body');

        title.textContent = content.title;
        body.innerHTML = content.content;

        modal.classList.add('active');
    }
}

// Initialize help system when page loads
document.addEventListener('DOMContentLoaded', () => {
    new HelpSystem();
});
