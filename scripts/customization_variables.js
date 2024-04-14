const COLOR_PICKER_VARIABLES = {
    'Colors': {
        'Page': '--page-background-color',
        'Title Underline': '--primary-color',
        'Monster Separator': '--monster-separator-color',
    },
    'Font': {
        'Text': '--text-color',
        'Table Text': '--table-text-color',
        'Heading': '--heading-color',
        'Table Heading': '--table-heading-color',
        'Lettrine': '--lettrine-color',
        'Item Name': '--item-name-color',
        'Monster Block': '--monster-text-color',
    },
    'Backgrounds': {
        'Description': '--description-color',
        'Note': '--note-color',
        'Monster': '--monster-background-color',
        'Table Row (Even)': '--table-color',
        'Table Row (Odd)': '--secondary-color',
    }
}

const available_fonts = [
    'Bookinsanity', 'Libre Baskerville', 'Martel Sans', 'Mr Eaves Small Caps', 
    'Nodesto Caps Condensed', 'Overpass', 'Raleway', 'Scaly Sans', 'Scaly Sans Caps',  'Sedan',
    'Sovngarde', 'Zatanna Misdirection', 
]

const lettrine_fonts = [
    'Heavy Rain', 'Morris Jenson Initialen', 'OPTIBookman',
    'Solbera Imitation', 'Solbera Imitation Color', 'Zallman'
]

const lettrine_definition = {
    'Solbera Imitation': {
        '0 0 0 -0.1em': ['A', 'B', 'C', 'D', 'F', 'G', 'I', 'L', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'],
        '0 0 0 -0.2em': ['H', 'K', 'E', 'Q', 'J'],
        '0 0 0 -0.3em': ['M', 'X'],
    },
    'Solbera Imitation Color': {
        '0 0 0 -0.1em': ['A', 'B', 'C', 'D', 'F', 'G', 'I', 'L', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'],
        '0 0 0 -0.2em': ['H', 'K', 'E', 'Q', 'J'],
        '0 0 0 -0.3em': ['M', 'X'],
    },
    default: { 
        '0 0 0 -0.1em' : [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ] 
    } 
}

const MONSTER_BLOCK_TEXT = "\n\n## Monster Name\n*Medium humanoid, any alignment*\n___\n**Armor Class** :: 10\n**Hit Points** :: 22 (5d8)\n**Speed** :: 30 ft.\n___\n|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |\n|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|\n|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|\n___\n**Senses** :: passive Perception 10\n**Languages** :: —\n**Challenge** :: 1 (200 XP)\n___\n***Feature 1*** Description.\n:\n***Feature 2*** Description. \n\n### Actions\n***Action 1*** Description.\n:\n***Action 2*** Description. \n\n"

const SNIPPETS = {
    Cover: [
        ['D&D Cover', '[cover]\n\n# [s 0.15em]Title[/s]\n## [s 0.15em]Subtitle[/s]\n___\n\n[banner]HOMEBREW[/banner]\n\n[footer hide]\n[s 0.2em]Footnote[/s]\n[/footer]\n\n[/cover]'],
        ['D&D Back Cover', '[cover back]\n\n## Title\nText \n___\nText\n\n[/cover]'],
        ['Banner (D&D)', '[banner]BANNER[/banner]'],
        ['Banner (Simple)', '[banner simple]BANNER[/banner]'],
        ['Banner (Ribbon)', '[banner ribbon]BANNER[/banner]'],
    ],
    Part: [
        ['Dungeon Master Guide', '[part dmg]\n\n# Part 1\n## Subtitle\n\n[/part]'],
        ['Player Handbook', '[part phb]\n\n# Part 1\n## Subtitle\n\n[/part]'],
        ['Basic Ruleset', '[part brs]\n\n# Part 1\n## Subtitle\n\n[/part]']
    ],
    Watercolor: [
        ['Bottom 1', '[watercolor bottom left mask=b-1 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 2', '[watercolor bottom left mask=b-2 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 3', '[watercolor bottom left mask=b-3 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 4', '[watercolor bottom left mask=b-4 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 5', '[watercolor bottom left mask=b-5 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 6', '[watercolor bottom left mask=b-6 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 7', '[watercolor bottom left mask=b-7 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 8', '[watercolor bottom left mask=b-8 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 9', '[watercolor bottom left mask=b-9 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 10', '[watercolor bottom left mask=b-10 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 11', '[watercolor bottom left mask=b-11 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 12', '[watercolor bottom left mask=b-12 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 13', '[watercolor bottom left mask=b-13 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 14', '[watercolor bottom left mask=b-14 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 15', '[watercolor bottom left mask=b-15 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 16', '[watercolor bottom left mask=b-16 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 17', '[watercolor bottom left mask=b-17 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 18', '[watercolor bottom left mask=b-18 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 19', '[watercolor bottom left mask=b-19 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 20', '[watercolor bottom left mask=b-20 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Bottom 21', '[watercolor bottom left mask=b-21 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],

        ['Corner 1', '[watercolor bottom left mask=c-1 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
        ['Corner 2', '[watercolor bottom left mask=c-2 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
        ['Corner 3', '[watercolor bottom left mask=c-3 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
        ['Corner 4', '[watercolor bottom left mask=c-4 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Corner 5', '[watercolor bottom left mask=c-5 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
        ['Corner 6', '[watercolor bottom left mask=c-6 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
        ['Corner 7', '[watercolor bottom left mask=c-7 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
        ['Corner 8', '[watercolor bottom left mask=c-8 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
        ['Corner 9', '[watercolor bottom left mask=c-9 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
        ['Corner 10', '[watercolor bottom left mask=c-10 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
        ['Corner 11', '[watercolor bottom left mask=c-11 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
        ['Corner 12', '[watercolor bottom left mask=c-12 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
        ['Corner 13', '[watercolor bottom left mask=c-13 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
        ['Corner 14', '[watercolor bottom left mask=c-14 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
        ['Corner 15', '[watercolor bottom left mask=c-15 x=0 y=0 size="100% 100%" color=#00000022]\n\n[/watercolor]'],
        ['Corner 16', '[watercolor bottom left mask=c-16 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
    ],
    Blocks: [
        ['Note', '[note]\n\n##### Note\nText\n\n[/note]', 'block'],
        ['Description', '[description]\n\n##### Description\nText\n\n[/description]', 'block'],
        ['Quote', '\n\n > Text\n> - Author Name, *Source*', 'block'],
        ['Frame', '[frame]\nText\n[/frame]', 'block'],
        ['Frame (Simple)', '[frame simple]\nText\n[/frame]', 'block'],
        ['Frame (Small)', '[frame small]\nText\n[/frame]', 'block'],
        ['Frame (Card)', '[frame card]\nText\n[/frame]', 'block'],
        ['Monster', `[monster]${MONSTER_BLOCK_TEXT}[/monster]`, "block"],
        ['Monster (BRS)', `[monster brs]${MONSTER_BLOCK_TEXT}[/monster]`, "block"],
        ['Monster (Unframed)', `[monster noframe]${MONSTER_BLOCK_TEXT}[/monster]`, "block"],
    ],
    Footer: [
        ['Footer (PHB)', "[footer number phb]FOOTNOTE[/footer]"],
        ['Footer (DMG)', "[footer number dmg]FOOTNOTE[/footer]"],
        ['Footer (EE)', "[footer number ee]FOOTNOTE[/footer]"],
        ['Footer (XGtE)', "[footer number xgte]FOOTNOTE[/footer]"],
        ['Footer (MToF)', "[footer number mtof]FOOTNOTE[/footer]"],
        ['Footer (Draco)', "[footer number draco]FOOTNOTE[/footer]"],
        ['Only Number', "[footer hide number][/footer]"],
        ['Only Footnote', "[footer hide]FOOTNOTE[/footer]"],
    ],
    Backgrounds: [
        ['None', "", "page", "--page-background-image", "none"],
        ['Player Handbook', "[image link='./styles/backgrounds/PHB.png' absolute top=0 left=0 width=100% height=100%]", "page", 
        "--page-background-image", "url('./styles/backgrounds/PHB.png')"],
        ['Elemental Evil', "[image link='./styles/backgrounds/EE.jpeg' absolute top=0 left=0 width=100% height=100%]", "page", 
        "--page-background-image", "url('./styles/backgrounds/EE.jpeg')"],
        ['Genesys', "[image link='./styles/backgrounds/Genesys.png' absolute top=0 left=0 width=100% height=100%]", "page", 
        "--page-background-image", "url('./styles/backgrounds/Genesys.png')"],
        ['Ice', "[image link='./styles/backgrounds/Ice.png' absolute top=0 left=0 width=100% height=100%]", "page", 
        "--page-background-image", "url('./styles/backgrounds/Ice.png')"],
        ['Ice 2', "[image link='./styles/backgrounds/Ice2.png' absolute top=0 left=0 width=100% height=100%]", "page", 
        "--page-background-image", "url('./styles/backgrounds/Ice2.png')"],
        ['Monster Manual', "[image link='./styles/backgrounds/MonsterManual.png' absolute top=0 left=0 width=100% height=100%]", "page", 
        "--page-background-image", "url('./styles/backgrounds/MonsterManual.png')"],
        ['SwordMeow', "[image link='./styles/backgrounds/White.png' absolute top=0 left=0 width=100% height=100%]", "page", 
        "--page-background-image", "url('./styles/backgrounds/White.png')"],
        ['XGtE', "[image link='./styles/backgrounds/XGTE.png' absolute top=0 left=0 width=100% height=100%]", "page", 
        "--page-background-image", "url('./styles/backgrounds/XGTE.png')"],
    ]
}

const FONT_BARBER_VARIABLES = {
    'H1': {
        preview: '<h1>Page Title</h1>',
        family: '--h1-font',
        size: '--h1-size',
        options: available_fonts
    }, 
    'H2': {
        preview: '<h2>Section Title</h2>',
        family: '--h2-font',
        size: '--h2-size',
        options: available_fonts
    }, 
    'H3': {
        preview: '<h3>Subsection Title</h3>',
        family: '--h3-font',
        size: '--h3-size',
        options: available_fonts
    }, 
    'H4': {
        preview: '<h4>Paragraph Title</h4>',
        family: '--h4-font',
        size: '--h4-size',
        options: available_fonts
    }, 
    'H5': {
        preview: '<h5>Table Title</h5>',
        family: '--table-font',
        size: '--table-title-size',
        options: available_fonts
    },
    'P': {
        preview: '<span style="font-size: var(--text-size); font-family: var(--text-font); color:var(--text-color)">Text</p>',
        family: '--text-font',
        size: '--text-size',
        options: available_fonts
    },
    'quote': {
        preview: '<span style="font-size: var(--quote-size); font-family: var(--quote-font); color:var(--text-color)">Quote</p>',
        family: '--quote-font',
        size: '--quote-size',
        options: available_fonts
    },
    'name': {
        preview: '<span style="font-size: var(--item-name-size); font-family: var(--item-name-font); color:var(--item-name-color)">Item Name</p>',
        family: '--item-name-font',
        size: '--item-name-size',
        options: available_fonts
    },
    'lettrine': {
        preview: '<span style="font-size: var(--lettrine-size); font-family: var(--lettrine-font); color:var(--text-color)">ABC</p>',
        family: '--lettrine-font',
        size: '--lettrine-size',
        options: lettrine_fonts
    },
}