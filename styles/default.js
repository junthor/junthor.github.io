const DND5E = {
    template: [ '5e.css' ],
    style: {
        ":root": {
            '--page-width': '210mm',
            '--page-height': '297mm',
            '--page-margin-left': '1.4cm',
            '--page-margin-right': '1.4cm',
            '--page-margin-top': '1.4cm',
            '--page-margin-bottom': '1.6cm',

            // COLORS
            '--text-color': '#231f20',
            '--heading-color': '#58180D',
            '--table-heading-color': '#231f20',
            '--table-text-color': '#231f20',
            '--primary-color': '#C9AD6A',
            '--secondary-color': '#E0E5C1',
            '--table-color': '#ffffff00',
            '--description-color': '#f8f1da',
            '--note-color': '#f8f1da',
            '--monster-text-color': '#58180D',
            '--monster-separator-color': '#9c2b1b',
            '--monster-background-color': '#fbf8f4',
            '--item-name-color': '#766649',
            '--page-background-color': '#ffffff',
            '--page-background-image': 'none',
            '--lettrine-color': '#231f20',

            // FONTS
            '--lettrine-font': 'Solbera Imitation',
            '--text-font': 'Bookinsanity',
            '--cover-font': 'Nodesto Caps Condensed',
            '--cover-subtitle-font': 'Overpass',
            '--title-font': 'Mr Eaves Small Caps',
            '--h1-font': 'Mr Eaves Small Caps',
            '--h2-font': 'Mr Eaves Small Caps',
            '--h3-font': 'Mr Eaves Small Caps',
            '--h4-font': 'Mr Eaves Small Caps',
            '--table-font': 'Scaly Sans',
            '--table-title-font': 'Scaly Sans Caps',
            '--item-name-font': 'Zatanna Misdirection',
            '--quote-font': 'Sedan',
            
            // TEXT SIZE
            '--cover-title-size': '60pt',
            '--cover-subtitle-size': '24pt',
            '--text-size': '9pt',
            '--h1-size': '24pt',
            '--h2-size': '22pt',
            '--h3-size': '15pt',
            '--h4-size': '14pt',
            '--table-title-size': '13pt',
            '--table-text-size': '8.5pt',
            '--note-text-size': '9pt',
            '--quote-size': '10pt',
            '--lettrine-size': '95pt',
            '--item-name-size': '14pt',

            // SPACES
            '--space-between': '10px',
            '--space-after-heading': '4px',
        }
    }
}

const CURATOR = {
    template: [ '5e.css' ],
    load: [ DND5E ],
    style: {
        ":root": {
            // COLORS
            '--page-background-image': 'url("../backgrounds/curator.jpg")',
            
            // TEXT SIZE
            '--text-size': '9.6pt',
            '--lettrine-size': '80pt',
            '--lettrine-font': 'Zallman',
            '--lettrine-color': '#9c693f',
            '--heading-color': '#9c693f',
        },

        '.footer': { 
            'background-image': "url('../footers/curator.svg')", 
            'color': "#9f968b", 
            
            'background-size': "calc(0.8 * var(--page-width))",
            '--b': "calc(0.0119 * var(--page-width))",
            'background-position': "bottom var(--b) right var(--b)",
            'filter': "drop-shadow(0 0 2px white)",
        },
        '.footer::after': { 
            'bottom': "calc(0.0286 * var(--page-width))", 
            'right': "calc(0.015 * var(--page-width))",
        },
        '.footnote': {
            'bottom': "calc(0.0428 * var(--page-width))",
            'right': "calc(0.0905 * var(--page-width))",
        },
        '.cover .footer': {
            'filter': "unset",
        }

    }
}

const XGTE = {
    template: [ '5e.css' ],
    load: [ DND5E ],
    style: {
        ":root": {
            // COLORS
            '--heading-color': '#034957',
            '--page-background-image': 'url("../backgrounds/xgte.jpeg")',
            
            // TEXT SIZE
            '--cover-title-size': '60pt',
            '--cover-subtitle-size': '30pt',
            '--text-size': '9.6pt',
            '--h1-size': '24pt',
            '--h2-size': '23pt',
            '--h3-size': '16pt',
            '--h4-size': '14pt',
            '--table-title-size': '13pt',
            '--table-text-size': '8pt',
            '--note-text-size': '9pt',
            '--quote-size': '10pt',
            '--lettrine-size': '110pt',
            '--item-name-size': '14pt',
        },

        '.footer': {
            'background-image':  "url('../footers/XgtE.png')",
            'background-position':  "bottom -0.5cm right -0.4cm",
            'color':  "#808080",
        },
        '.footer::after': { 'right': "0.35cm", 'bottom': "0.80cm" }

    }
}