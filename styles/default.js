const DEFAULT_STYLE = {
    ":root": {
        '--text-color': '#231f20',
        '--heading-color': '#570303',
        '--table-heading-color': '#231f20',
        '--table-text-color': '#231f20',
        '--primary-color': '#c5ab6e',
        '--secondary-color': '#e9e9e1',
        '--table-color': '#ffffff00',
        '--description-color': '#FAF7EA',
        '--note-color': '#f8f1da',

        '--lettrine-font': 'Solbera Imitation Color, Solbera Imitation, sans-serif',
        '--text-font': 'Bookinsanity, sans-serif',
        '--title-font': 'Nodesto Caps Condensed, sans-serif',
        '--heading-font': 'Mr Eaves Small Caps, sans-serif',
        '--table-font': 'Scaly Sans, sans-serif',
        '--table-heading-font': 'Scaly Sans Caps, sans-serif',
        '--h1-stroke': '',
        
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

        '--space-between': '10px',
        '--space-after-heading': '4px',
        '--br-space': '6px',
        '--page-background': 'white',
    },
    ".page": {
        'font-size': 'var(--text-size)',
        'color': 'var(--text-color)',
        'font-family': 'var(--text-font)',
        'line-height': '1.1',
        'background': 'var(--page-background)',
        'background-size': '100% 100%'
    },

    "h1, h2, h3, h4, h5": {
        'margin-top': '0',
        'margin-bottom': 'var(--space-after-heading)',
        'color': 'var(--heading-color)',
        'font-family': 'var(--heading-font)',
        //'text-shadow': '0 1px 0 #00000022, 1px 0 0 #00000022'
    },

    ".cover-diamond": {
        'margin': "0 10%",
        'width': '80%',
    },

    ".splootch": {
        'display': 'flex',
        'flex-flow': 'column nowrap',
        'justify-content': 'center',
        'width': '300px',
        'height': '100px',

        'background-image': "url('./styles/splootch.png')",
        'background-size': "contain",
        'background-repeat': "no-repeat",
        'background-position': "center left",

        'position': 'absolute',
        'left': '0',
        'bottom': '150px',

        'font-family': 'var(--title-font)',
        'color': 'white',
        'font-size': '22px',
        'font-weight': 'bold',
        'padding-top': '4px',
        'padding-left': '60px',
    },

    "ul, ol": {
        "padding-left": "1em"
    },
    
    // LETTRINES
    ".page h1 + p::first-line": {
        'font-family': 'var(--heading-font)',
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
        // "margin-top": "var(--br-space)",
    },
    // TODO: hack!!
    "p br": {
        //'display': 'block',
        //"content": "' '",
        //"margin-bottom": "var(--br-space)",
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
        'font-size': 'var(--h1-size)',
        'font-weight': 'normal',
        'text-shadow': '0 1px 0px #cbd0c5',
        '-webkit-text-stroke': '0.012em #cbd0c5',
    },

    ".cover h1": {
        'font-family': 'var(--title-font)',
        'font-size': 'var(--cover-text-size)',
        'text-align': 'center',
        'letter-spacing': '-0.05em',
        'line-height': '0.9em',
        'text-transform': 'uppercase',
        'text-shadow': '0 0 4px #00000099',
        'color': 'white',
        '-webkit-text-stroke': '2px black',
        '-webkit-text-fill-color': 'white',
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
        'z-index': "1"
    },

    ".part h1": {
        'margin-top': '10px',
        'font-family': 'var(--title-font)',
        'font-size': '2.3cm',
        'text-align': 'center',
        'letter-spacing': '-0.05em',
    },

    ".part h2": {
        'font-family': 'Sovngarde',
        'line-height': '0.8',
        'font-size': '0.7cm',
        'text-align': 'center',
        'font-weight': 'bold',
        'width': '300px',
        'margin': '-0.3cm auto 0!important'
    },

    "h2": {
        'font-size': 'var(--h2-size)',
        'font-weight': 'normal',
    },

    "h3": {
        'font-size': 'var(--h3-size)',
        'font-weight': 'normal',
        'border-bottom': '2px solid var(--primary-color)',
        'padding-bottom': '-2px',
    },

    "h4": {
        'font-size': 'var(--h4-size)',
        'font-weight': 'normal',
        'margin-bottom': 'var(--space-after-heading)',
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
        'border-image-outset': '4px',
        'box-shadow': '0 0 6px var(--description-color)',
    },

}


const BLUE_STYLE = {
    ":root": {
        "--text-color": "blue",
    },
}