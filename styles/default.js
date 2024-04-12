const DEFAULT_STYLE = {
    ":root": {
        '--page-width': '210mm',
        '--page-height': '297mm',
        '--page-margin-left': '1.4cm',
        '--page-margin-right': '1.4cm',
        '--page-margin-top': '1.4cm',
        '--page-margin-bottom': '1.6cm',

        // COLORS
        '--text-color': '#231f20',
        '--heading-color': '#570303',
        '--table-heading-color': '#231f20',
        '--table-text-color': '#231f20',
        '--primary-color': '#c5ab6e',
        '--secondary-color': '#e9e9e1',
        '--table-color': '#ffffff00',
        '--description-color': '#f8f1da',
        '--note-color': '#f8f1da',
        '--monster-text-color': '#550e10',
        '--monster-separator-color': '#ab2b1b',
        '--monster-background-color': '#fbf8f4',
        '--item-name-color': '#766649',
        '--page-background-color': '#ffffff',
        '--page-background-image': 'none',

        // FONTS
        '--lettrine-font': 'Solbera Imitation',
        '--text-font': 'Bookinsanity',
        '--cover-font': 'Nodesto Caps Condensed',
        '--title-font': 'Mr Eaves Small Caps',
        '--h1-font': 'Mr Eaves Small Caps',
        '--h2-font': 'Mr Eaves Small Caps',
        '--h3-font': 'Mr Eaves Small Caps',
        '--h4-font': 'Mr Eaves Small Caps',
        '--table-font': 'Scaly Sans',
        '--table-title-font': 'Scaly Sans Caps',
        '--item-name-font': 'Zatanna Misdirection',
        
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
        '--quote-text-size': '10pt',
        '--lettrine-size': '110pt',
        '--item-name-size': '14pt',
/*
        '--cover-text-size': '80px',
        '--text-size': '0.34cm',
        '--h1-size': '0.85cm',
        '--h2-size': '0.80cm',
        '--h3-size': '0.55cm',
        '--h4-size': '0.50cm',
        '--table-title-size': '0.45cm',
        '--table-text-size': '0.29cm',
        '--note-text-size': '0.3175cm',
        '--quote-text-size': '0.37cm',
        '--lettrine-size': '4cm',
        '--item-name-size': '0.5cm', */

        // SPACES
        '--space-between': '10px',
        '--space-after-heading': '4px',
    },
    ".page": {
        'font-size': 'var(--text-size)',
        'color': 'var(--text-color)',
        'font-family': 'var(--text-font)',
        'line-height': '1.1',
        'background-color': 'var(--page-background-color)',
        'background-image': 'var(--page-background-image)',
        'background-size': '100% 100%'
    },

    "h1, h2, h3, h4, h5": {
        'margin-top': '0',
        'margin-bottom': 'var(--space-after-heading)',
        'color': 'var(--heading-color)',
        //'text-shadow': '0 1px 0 #00000022, 1px 0 0 #00000022'
    },

    
    ".cover-diamond": {
        'margin': "0 10%",
        'width': '80%',
        'filter': 'drop-shadow(2px 0px 2px #000000aa)',
    },

    ".banner": {
        'display': 'flex',
        'flex-flow': 'column nowrap',
        'justify-content': 'center',
        'width': '300px',
        'height': '100px',

        'background-image': "url('./styles/banner.svg')",
        'background-size': "contain",
        'background-repeat': "no-repeat",
        'background-position': "center left",

        'position': 'absolute',
        'left': '0',
        'bottom': '150px',

        'font-family': 'var(--cover-font)',
        'color': 'white',
        'font-size': '22px',
        'font-weight': 'bold',
        'padding-top': '4px',
        'padding-left': '60px',
        'filter': 'drop-shadow(2px 0px 2px #000000aa)',
    },
    ".banner.simple": { 'background-image': "url('./styles/banner_simple.svg')" },
    ".banner.ribbon": { 'background-image': "url('./styles/banner_ribbon.svg')" },

    "ul, ol": {
        "padding-left": "1em"
    },
    
    // LETTRINES
    ".page h1 + p::first-line": {
        'font-family': 'var(--h1-font)',
        'font-size': '140%',
        'line-height': '0.8',
    },
    ".page h1 + p::first-letter": {
        'float': 'left',
        'font-family': 'var(--lettrine-font)',
        'font-size': 'var(--lettrine-size)',
        'color': '#222',
        'line-height': '.8em',
        'margin': '0 0 0 -0.1em',
    },
    "p.H:first-letter, p.K:first-letter, p.E:first-letter, p.Q:first-letter, p.J:first-letter": { 'margin': '0 0 0 -0.2em!important' },
    "p.M:first-letter, p.X:first-letter": { 'margin': '0 0 0 -0.3em!important' },


    "p + p": {
        "text-indent": "1em",
    },

    "* + h2, * + h3, * + h4, * + h5": {
        'margin-top': 'var(--space-between)',
    },

    "h1 + h2, h1 + h3, h1 + h4, h1 + h5": {
        'margin-top': '0!important',
    },

    ".wide + h2, .wide + h3, .wide + h4, .wide + h5": {
        'margin-top': '0!important',
    },

    "h1": {
        'font-family': 'var(--h1-font)',
        'font-size': 'var(--h1-size)',
        'font-weight': 'normal',
        'text-shadow': '0 1px 0px #cbd0c5',
        '-webkit-text-stroke': '0.012em #cbd0c5',
    },

    ".cover h1, .cover h2": {
        'font-family': 'var(--cover-font)',
        'font-size': 'var(--cover-title-size)',
        'text-align': 'center',
        'letter-spacing': '-0.05em',
        'line-height': '0.9em',
        'text-transform': 'uppercase',
        'text-shadow': '0 0 4px #00000099',
        'color': 'white',
        '-webkit-text-stroke': '0.025em black',
        '-webkit-text-fill-color': 'white',
    },

    ".cover h2": {
        'font-size': 'var(--cover-subtitle-size)',
        'text-transform': 'none',
    },

    ".part": {
        'width': "100%",
        'height': '100%',
        'background-image': "url('./styles/headers/part-round.png')",
        'background-position': "top center",
        'background-repeat': "no-repeat",
        'background-size': 'contain',
        'position': "absolute",
        'top': "0",
        'left': "0",
        'z-index': "-1"
    },
    ".part.dmg": {
        'background-image': "url('./styles/headers/part-rect.png')",
    },

    ".part.brs": {
        'background-image': "url('./styles/borders/part.svg')",
        'background-position': "center 1cm",
        'background-size': "90%",
    },
    ".part.brs h1": { 'margin-top': 'calc(var(--page-width) * 0.8 + 1cm)', },
    ".part.brs h2": { 
        'margin-top': '-0.1em!important', 
        'width': '100%',
        'height': '100%',
        'background-image': "url('./styles/borders/part-bottom.svg')",
        'background-position': "center 1.1em",
        'background-size': '40%',
        'background-repeat': 'no-repeat'
    },
    ".part.brs h2, .part.brs h1": {
        'font-family': 'var(--h1-font)',
        'font-size': '1cm',
        'font-weight': 'normal',
        'text-shadow': '0 1px 0px #cbd0c5',
        '-webkit-text-stroke': '0.012em #cbd0c5',
    },

    ".part h1": {
        'margin-top': '0px',
        'font-family': 'var(--cover-font)',
        'font-size': '2.3cm',
        'text-align': 'center',
        'letter-spacing': '-0.05em',
        'text-shadow': 'none',
        '-webkit-text-stroke': '0',
    },

    ".part h2": {
        'font-family': 'Sovngarde',
        'line-height': '0.8',
        'font-size': '0.6cm',
        'text-align': 'center',
        'font-weight': 'bold',
        'width': '300px',
        'margin': '0cm auto 0!important'
    },

    "h2": {
        'font-family': 'var(--h2-font)',
        'font-size': 'var(--h2-size)',
        'font-weight': 'normal',
    },

    "h3": {
        'font-family': 'var(--h3-font)',
        'font-size': 'var(--h3-size)',
        'font-weight': 'normal',
        'border-bottom': '2px solid var(--primary-color)',
        'padding-bottom': '-2px',
    },

    "h4": {
        'font-family': 'var(--h4-font)',
        'font-size': 'var(--h4-size)',
        'font-weight': 'normal',
        'margin-bottom': '0',
    },

    "h5, h6": {
        'font-size': 'var(--table-title-size)',
        'color': 'var(--table-text-color)',
        'font-family': 'var(--table-font)',
        'font-variant': 'small-caps',
        'margin-bottom': '3px',
        'letter-spacing': '0.05em'
    },

    "table": {
        "font-size": "var(--table-text-size)",
        'color': 'var(--table-text-color)',
    },

    "th": { 
        'font-family': 'var(--table-font)',
        'padding': '2px 4px',
    },
    "td": { 
        'font-family': 'var(--table-font)',
        'padding': '2px 4px',
    },

    "p": {
        "margin": "0",
    },

    ".text": {
        "margin": "0",
        "padding": "0",
        "text-align": "justify",
    },

    ".page:nth-child(odd) .page-number": {
        "right": "20px",
        "left": "unset"
    },

    ".page-number": {
        "position": "absolute",
        "left": "20px",
        "bottom": "30px",
        "text-align": "center",
    },
    "* + .note": {
        'margin-top': 'calc(var(--space-between) * 2)!important',
    },
    ".note": {
        'break-inside': 'avoid',
        'padding': '4px 12px 8px 12px',
        'margin': 'var(--space-between) 0',
        'background-color': 'var(--note-color)',
        'box-sizing': 'border-box',
        'font-family': 'var(--table-font)',
        'font-size': 'var(--note-text-size)',
        'border-width': '1px',
        'border-image': "url('./styles/borders/note.svg') 20% stretch",
        'border-image-width': '11px',
        'border-image-outset': '9px 0px',
        'box-shadow': '1px 4px 14px #888',
        
    },
    ".description": {
        'break-inside': 'avoid',
        'padding': '8px',
        'margin': 'var(--space-between) 0',
        'background-color': 'var(--description-color)',
        'box-sizing': 'border-box',
        'font-family': 'var(--table-font)',
        'border-style': 'solid',
        'border-width': '7px',
        'border-image': 'url("./styles/borders/description.svg") 24% 17.5% stretch',
        'border-image-outset': '3px',
        'box-shadow': '0 0 6px var(--description-color)',
    },

    // QUOTES
    'blockquote': {
        'font-family':  "'Mrs Eaves XL', var(--text-font), serif",
        'font-style':  "italic",
        'margin':  "var(--space-between) 0",
        'font-size':  "var(--quote-text-size)",
        'line-height':  "1.4",
        'width':  "100%",
        'box-sizing':  "border-box",
        'display':  "inline-block",
    },
    'blockquote li': {
        'float':  "right",
        'font-family':  "var(--text-font)",
        'font-style':  "normal",
    },
    'blockquote ul': {
        'list-style-type': "none",
        'margin-top':  "0.4em",
    },
    'blockquote li::before': {
        'content':  "'— '",
    },
    '.name': {
        'font-family': 'var(--item-name-font)',
        'color': 'var(--item-name-color)',
        'font-size': 'var(--item-name-size)',
    }

}


const BLUE_STYLE = {
    ":root": {
        "--text-color": "blue",
    },
}