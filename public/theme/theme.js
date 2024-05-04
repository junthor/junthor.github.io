const DND5E = {
    template: ['5e.css'],
    style: {
        ":root": {
            '--page-width': '215.9mm',
            '--page-height': '279.4mm',
            '--page-margin-left': '1.4cm',
            '--page-margin-right': '1.4cm',
            '--page-margin-top': '1.4cm',
            '--page-margin-bottom': '1.6cm',
            '--column-count': '2',
            // COLORS
            '--text-color': '#000000',
            '--heading-color': '#58180D',
            '--table-heading-color': '#000000',
            '--table-text-color': '#000000',
            '--primary-color': '#C9AD6A',
            '--secondary-color': '#e4d6af',
            '--table-color': '#ffffff00',
            '--description-color': '#e4d6af',
            '--note-color': '#e4d6af',
            '--monster-text-color': '#58180D',
            '--monster-separator-color': '#9c2b1b',
            '--monster-background-color': '#fbf8f4',
            '--legend-color': '#766649',
            '--page-background-color': '#ffffff',
            '--page-background-image': 'none',
            '--lettrine-color': '#000000',
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
            '--legend-font': 'Zatanna Misdirection',
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
            '--legend-size': '14pt',
            // SPACES
            '--space-between': '10px',
            '--space-after-heading': '4px',
        }
    }
};
const PHB = {
    template: ['5e.css'],
    keyword: "phb",
    load: [DND5E],
    style: {
        ":root": {
            // COLORS
            '--page-background-image': 'url("../backgrounds/phb.png")',
        },
    }
};
const CURATOR = {
    template: ['5e.css'],
    load: [DND5E],
    keyword: 'curator',
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
            '--column-count': '3',
        },
    }
};
const XGTE = {
    template: ['5e.css'],
    keyword: "xgte",
    load: [DND5E],
    style: {
        ":root": {
            // COLORS
            '--page-background-image': 'url("../backgrounds/xgte.jpeg")',
            '--secondary-color': '#dbdbe1',
            '--note-color': '#f2e5ba',
            '--lettrine-size': '110pt',
        },
    }
};
const MTOF = {
    template: ['5e.css'],
    keyword: "mtof",
    load: [DND5E],
    style: {
        ":root": {
            // COLORS
            '--secondary-color': '#d9ebe7',
            '--note-color': '#e7f3f1',
            '--lettrine-size': '110pt',
        },
    }
};
const TCOE = {
    template: ['5e.css'],
    keyword: "tcoe",
    load: [DND5E],
    style: {
        ":root": {
            // COLORS
            '--page-background-image': 'url("../backgrounds/tcoe.jpeg")',
            '--lettrine-font': 'Bookman Swash',
            '--lettrine-size': '55pt',
            '--lettrine-color': '#3e3a64',
            '--note-color': '#dbc4e3',
            '--description-color': '#e4dbeb',
            '--secondary-color': '#c5d7e8',
            '--quote-font': "'Delicious Handrawn', cursive",
            '--quote-size': "13pt"
        },
        '.chapter + p::first-letter, h1 + p::first-letter': {
            'text-shadow': '0 0 2px #d1d7cb'
        },
        'blockquote': {
            'position': "relative",
            'background-image': "url('./styles/assets/TCoE/desc-bg.jpeg')",
            'background-size': "cover",
            'box-shadow': "3px 2px 3px #ababab",
            'margin-left': "-8px",
            'width': "calc(100% + 16px)",
            'font-style': "normal",
            'padding': "18px 10px 18px 36px",
            'overflow': "hidden"
        },
        'blockquote::before': {
            'background-image': "url('./styles/assets/TCoE/tasha-icon.png')",
            'background-repeat': "no-repeat",
            'background-size': "contain",
            'position': "absolute",
            'top': "0",
            'left': "0",
            'opacity': "10%",
            'width': "46px",
            'height': "70px",
            'content': "''",
        },
        'blockquote li': {
            'font-family': "var(--quote-font)",
            'font-weight': "bold",
            'text-transform': "uppercase",
        },
        'blockquote li::before': { 'content': "''" },
    }
};
const BRS = {
    template: ['5e.css'],
    load: [DND5E],
    keyword: 'brs',
    style: {
        ":root": {
            // COLORS
            '--page-background-image': 'none',
            '--page-background-color': '#ffffff',
            '--page-margin-left': '1.8cm',
            '--page-margin-right': '1.8cm',
            '--page-margin-top': '1.4cm',
            '--page-margin-bottom': '1.6cm',
            '--secondary-color': '#efede5',
            '--table-heading-color': '#231f20',
            '--table-text-color': '#231f20',
            '--text-color': '#231f20',
            '--lettrine-color': '#231f20',
            // TEXT SIZE
            '--cover-title-size': '60pt',
            '--cover-subtitle-size': '30pt',
            '--h1-size': '24pt',
            '--h2-size': '23pt',
            '--h3-size': '16pt',
            '--h4-size': '14pt',
            '--table-title-size': '12pt',
            '--table-text-size': '9pt',
            '--text-size': '9.2pt',
            '--note-text-size': '9.5pt',
            '--quote-size': '11pt',
        },
        'p': {
            'line-height': '1.2',
        }
    }
};
const SHADOW = {
    template: ['shadowdark.css'],
    style: {
        ":root": {
            '--page-width': '148mm',
            '--page-height': '210mm',
            '--page-margin-left': '1.2cm',
            '--page-margin-right': '1.2cm',
            '--page-margin-top': '1.2cm',
            '--page-margin-bottom': '1.2cm',
            '--column-count': '2',
            // COLORS
            '--text-color': '#000000',
            '--heading-color': '#000000',
            '--table-heading-color': '#000000',
            '--table-text-color': '#000000',
            '--primary-color': '#000000',
            '--secondary-color': '#000000',
            '--table-color': '#ffffff00',
            '--description-color': '#f8f1da',
            '--note-color': '#f8f1da',
            '--monster-text-color': '#58180D',
            '--monster-separator-color': '#9c2b1b',
            '--monster-background-color': '#fbf8f4',
            '--legend-color': '#766649',
            '--page-background-color': '#ffffff',
            '--page-background-image': 'none',
            '--lettrine-color': '#000000',
            // FONTS
            '--text-font': 'Montserrat',
            '--cover-font': 'JSL Blackletter',
            '--lettrine-font': 'JSL Blackletter',
            '--cover-subtitle-font': 'Montserrat',
            '--title-font': 'JSL Blackletter',
            '--h1-font': 'JSL Blackletter',
            '--h2-font': 'Montserrat',
            '--h3-font': 'Montserrat',
            '--h4-font': 'Montserrat',
            '--table-font': 'Montserrat',
            '--table-title-font': 'Montserrat',
            '--legend-font': 'Montserrat',
            '--quote-font': 'Montserrat',
            // TEXT SIZE
            '--cover-title-size': '60pt',
            '--cover-subtitle-size': '24pt',
            '--text-size': '10pt',
            '--h1-size': '22pt',
            '--h2-size': '14pt',
            '--h2-weight': 'bold',
            '--h3-size': '14pt',
            '--h3-weight': 'bold',
            '--h4-size': '11pt',
            '--h4-weight': 'bold',
            '--table-title-size': '13pt',
            '--table-text-size': '8.5pt',
            '--note-text-size': '9pt',
            '--quote-size': '10pt',
            '--lettrine-size': '60pt',
            '--legend-size': '14pt',
            // SPACES
            '--space-between': '10px',
            '--space-after-heading': '4px',
        }
    }
};
const WITCHLIGHT = {
    template: ['5e.css'],
    keyword: "witch",
    load: [DND5E],
    style: {
        ":root": {
            // COLORS
            '--page-background-image': 'url("../backgrounds/witch.jpeg")',
            '--secondary-color': '#d1dac9',
            '--note-color': '#ffe1b3',
            '--description-color': '#dbd0dd',
            '--lettrine-color': '#4e2d4a',
            '--lettrine-size': '60pt',
            '--lettrine-font': 'Mr Eaves Small Caps',
        },
        ".lettrine": {
            'padding': "4px"
        }
    }
};
export const THEMES = {
    "Dungeons & Dragons": {
        DND5E: ["Default", DND5E],
        PHB: ["Player's Handbook", PHB],
        MToF: ["Mordenkainen's Tome of Foes", MTOF],
        XGtE: ["Xanathar's Guide to Everything", XGTE],
        TCoE: ["Tasha's Cauldron of Everything", TCOE],
        Witch: ["Witchlight", WITCHLIGHT],
        BRS: ["Basic Rules", BRS],
    },
    "Shadowdark": {
        SHADOWDARK: ["Default", SHADOW],
    }
};
