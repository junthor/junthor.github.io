export const COLOR_PICKER_VARIABLES = {
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
        'Caption': '--legend-color',
        'Monster Block': '--monster-text-color',
    },
    'Backgrounds': {
        'Description': '--description-color',
        'Note': '--note-color',
        'Monster': '--monster-background-color',
        'Table Row (Even)': '--table-color',
        'Table Row (Odd)': '--secondary-color',
    }
};
export const available_fonts = [
    'Bookinsanity', 'Libre Baskerville', 'Martel Sans', 'Mr Eaves Small Caps',
    'Nodesto Caps Condensed', 'Overpass', 'Raleway', 'Scaly Sans', 'Scaly Sans Caps', 'Sedan',
    'Sovngarde', 'Zatanna Misdirection', 'Montserrat', 'JSL Blackletter', 'OldNewspaperTypes'
];
export const lettrine_fonts = [
    'Heavy Rain', 'Morris Jenson Initialen', 'Bookman Swash', 'Royal',
    'Solbera Imitation', 'Solbera Imitation Color', 'Zallman', 'Mr Eaves Small Caps', 'JSL Blackletter',
];
export const lettrine_definition = {
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
    'Royal': {
        '0.15em 0 0 -0.2em': ['D', 'E', 'L', 'M', 'S', 'W', 'X'],
        '0.15em 0 0 -0.1em': [
            'A', 'B', 'C', 'F', 'G', 'H', 'I', 'J', 'K',
            'N', 'O', 'P', 'Q', 'R', 'T', 'U', 'V', 'Y', 'Z'
        ]
    },
    'Bookman Swash': {
        '0.08em 0.05em -0.05em -0.5em': [
            'A', 'B', 'D', 'E', 'F', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'P', 'R', 'U', 'V', 'W', 'X', 'Y',
        ],
        '0.1em 0.05em 0.1em -0.1em': ['C', 'S', 'Q', 'Z'],
        '0.1em 0.05em 0.1em -0.5em': ['G'],
        '0.1em 0.05em -0.05em -0.1em': ['T', 'O']
    },
    'OPTIBookman': {
        '0 0.1em 0 -0.5em': [
            'A', 'B', 'D', 'E', 'F', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'P', 'R', 'T', 'U', 'V', 'W', 'X', 'Y',
        ],
        '0 0.1em 0 -0.1em': [
            'C', 'G', 'O', 'S', 'Q', 'Z'
        ]
    },
    'Zallman': {
        '-0.05em 0 0.1em -0.1em': [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ]
    },
    'Heavy Rain': {
        '0.2em 0 0.26em -0.1em': [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ]
    },
    'Morris Jenson Initialen': {
        '0.15em 0 0.05em -0.1em': [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ]
    },
    default: {
        '0 0 0 -0.1em': [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ]
    }
};
export const FONT_BARBER_VARIABLES = {
    'H1': {
        preview: '<h1>Page Title</h1>',
        family: '--h1-font',
        size: '--h1-size',
        weight: '--h1-weight',
        italic: '--h1-italic',
        options: available_fonts
    },
    'H2': {
        preview: '<h2>Section Title</h2>',
        family: '--h2-font',
        size: '--h2-size',
        weight: '--h2-weight',
        italic: '--h2-italic',
        options: available_fonts
    },
    'H3': {
        preview: '<h3>Subsection Title</h3>',
        family: '--h3-font',
        size: '--h3-size',
        weight: '--h3-weight',
        italic: '--h3-italic',
        options: available_fonts
    },
    'H4': {
        preview: '<h4>Paragraph Title</h4>',
        family: '--h4-font',
        size: '--h4-size',
        weight: '--h4-weight',
        italic: '--h4-italic',
        options: available_fonts
    },
    'H5': {
        preview: '<h5>Table Title</h5>',
        family: '--table-title-font',
        size: '--table-title-size',
        weight: '--table-title-weight',
        italic: '--table-title-italic',
        options: available_fonts
    },
    'Table': {
        preview: '<span style="font-size: var(--table-text-size); font-family: var(--table-font); color:var(--table-text-color)">Table Text</p>',
        family: '--table-font',
        size: '--table-text-size',
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
        preview: '<span style="font-size: var(--legend-size); font-family: var(--legend-font); color:var(--legend-color)">Caption</p>',
        family: '--legend-font',
        size: '--legend-size',
        options: available_fonts
    },
    'lettrine': {
        preview: '<span style="font-size: var(--lettrine-size); font-family: var(--lettrine-font); color:var(--text-color)">ABC</p>',
        family: '--lettrine-font',
        size: '--lettrine-size',
        options: lettrine_fonts
    },
};
const MONSTER_BLOCK_TEXT = "\n\n## Monster Name\n*Medium humanoid, any alignment*\n___\n**Armor Class** :: 10\n**Hit Points** :: 22 (5d8)\n**Speed** :: 30 ft.\n___\n|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |\n|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|\n|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|\n___\n**Senses** :: passive Perception 10\n**Languages** :: —\n**Challenge** :: 1 (200 XP)\n___\n***Feature 1*** Description.\n:\n***Feature 2*** Description. \n\n### Actions\n***Action 1*** Description.\n:\n***Action 2*** Description. \n\n";
const MONSTER_BLOCK_TEXT_24 = "\n\n## Monster Name\n*Medium humanoid, any alignment*\n\n**Armor Class** :: 10\n**Hit Points** :: 22 (5d8)\n**Speed** :: 30 ft.\n\n|     |     | Mod | Save |     |     | Mod | Save |     |     | Mod | Save |\n|:---:|:---:|:---:|:----:|:---:|:---:|:---:|:----:|:---:|:---:|:---:|:----:|\n| Str | 10  | 0   | 0    | Dex | 10  | 0   | 0    | Con | 10  | 0   | 0    |\n| Int | 10  | 0   | 0    | Wis | 10  | 0   | 0    | Cha | 10  | 0   | 0    |\n\n:\n\n**Senses** :: passive Perception 10\n**Languages** :: —\n**Challenge** :: 1 (200 XP)\n\n### Traits\n***Feature 1*** Description.\n:\n***Feature 2*** Description. \n\n### Actions\n***Action 1*** Description.\n:\n***Action 2*** Description. \n\n";
export const SNIPPETS = {
    Cover: [
        { container: 'block',
            title: "Cover",
            content: [
                ['D&D Cover', '[cover]\n\n# [s 0.15em]Title[/s]\n## [s 0.15em]Subtitle[/s]\n___\n\n[banner]HOMEBREW[/banner]\n\n[footer hide]\n[s 0.2em]Footnote[/s]\n[/footer]\n\n[/cover]'],
                ['D&D Inside Cover', '[cover inside]\n\n# Title\n## Subtitle\n___\n[/cover]'],
                ['D&D Back Cover', '[cover back]\n\n## Title\nText \n___\nText\n\n[/cover]'],
                ['Banner (D&D)', '[banner]BANNER[/banner]'],
                ['Banner (Simple)', '[banner simple]BANNER[/banner]'],
                ['Banner (Ribbon)', '[banner ribbon]BANNER[/banner]'],
            ]
        },
    ],
    Chapter: [
        { container: 'block',
            title: "Chapter",
            content: [
                ['Dungeon Master Guide', '[chapter]\n# Title\n[/chapter]'],
                ['Tasha\'s Cauldron of Everything', '[chapter tcoe decoration=1]\n# Title\n[/chapter]'],
                ['Xanathar\'s Guide to Everything', '[chapter xgte decoration=1]\n# Title\n[/chapter]'],
                ['Witchlight', '[chapter witch decoration=1]\n# Title\n[/chapter]'],
                ['Waterdeep: Mad Mage', '[chapter wmm decoration=1]\n# Title\n[/chapter]'],
                ['Waterdeep: Dragon Heist', '[chapter wdh decoration=1]\n# Title\n[/chapter]'],
            ],
        }
    ],
    Part: [
        { container: "block",
            title: "Part",
            content: [
                ['Dungeon Master Guide', '[part dmg]\n\n# Part 1\n## Subtitle\n\n[/part]'],
                ['Player Handbook', '[part phb]\n\n# Part 1\n## Subtitle\n\n[/part]'],
                ['Basic Ruleset', '[part brs]\n\n# Part 1\n## Subtitle\n\n[/part]']
            ]
        }
    ],
    Watercolor: [
        { container: "spoiler",
            title: "Watercolor (Bottom)",
            content: [
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
            ]
        },
        { container: "spoiler",
            title: "Watercolor (Corner)",
            content: [
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
            ]
        },
        { container: "spoiler",
            title: "Watercolor (Horizontal)",
            content: [
                ['Horizontal 1 (S)', '[watercolor bottom left mask=h-1 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Horizontal 2 (L)', '[watercolor bottom left mask=h-2 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Horizontal 3 (M)', '[watercolor bottom left mask=h-3 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Horizontal 4 (XXL)', '[watercolor bottom left mask=h-4 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
                ['Horizontal 5 (Diag)', '[watercolor bottom left mask=h-5 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Horizontal 6 (Diag)', '[watercolor bottom left mask=h-6 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Horizontal 7 (XXL)', '[watercolor bottom left mask=h-7 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Horizontal 8 (XL)', '[watercolor bottom left mask=h-8 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
                ['Horizontal 9 (S)', '[watercolor bottom left mask=h-9 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Horizontal 10 (XS)', '[watercolor bottom left mask=h-10 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Horizontal 11 (S)', '[watercolor bottom left mask=h-11 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Horizontal 12 (XL)', '[watercolor bottom left mask=h-12 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
            ]
        },
        { container: "spoiler",
            title: "Watercolor (Side)",
            content: [
                ['Side 1', '[watercolor bottom left mask=h-1 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 2', '[watercolor bottom left mask=l-2 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 3', '[watercolor bottom left mask=l-3 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 4', '[watercolor bottom left mask=l-4 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 5', '[watercolor bottom left mask=l-5 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 6', '[watercolor bottom left mask=l-6 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 7', '[watercolor bottom left mask=l-7 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 8', '[watercolor bottom left mask=l-8 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 9', '[watercolor bottom left mask=l-9 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 10', '[watercolor bottom left mask=l-10 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 11', '[watercolor bottom left mask=l-11 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 12', '[watercolor bottom left mask=l-12 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 13', '[watercolor bottom left mask=l-13 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 14', '[watercolor bottom left mask=l-14 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 15', '[watercolor bottom left mask=l-15 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 16', '[watercolor bottom left mask=l-16 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 17', '[watercolor bottom left mask=l-17 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 18', '[watercolor bottom left mask=l-18 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Side 19', '[watercolor bottom left mask=l-19 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
            ]
        },
        { container: "spoiler",
            title: "Watercolor (Center)",
            content: [
                ['Center 1', '[watercolor bottom left mask=v-1 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Center 2', '[watercolor bottom left mask=v-2 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Center 3', '[watercolor bottom left mask=v-3 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Center 4', '[watercolor bottom left mask=v-4 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
                ['Center 5', '[watercolor bottom left mask=v-5 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Center 6', '[watercolor bottom left mask=v-6 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Center 7', '[watercolor bottom left mask=v-7 x=0 y=0 color=#00000022]\n\n[/watercolor]'],
                ['Center 8', '[watercolor bottom left mask=v-8 x=0 y=0 size=100% color=#00000022]\n\n[/watercolor]'],
            ]
        },
    ],
    Blocks: [
        { container: "block",
            title: "Blocks",
            content: [
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
                ['Monster (PHB24)', `[monster phb24]${MONSTER_BLOCK_TEXT_24}[/monster]`, "block"],
            ]
        }
    ],
    Footer: [
        { container: "block",
            title: "Footers",
            content: [
                ['Player\'s Handbook', "[footer number phb]FOOTNOTE[/footer]"],
                ['Dungeon Master Guide', "[footer number dmg]FOOTNOTE[/footer]"],
                ['Evil Elemental', "[footer number ee]FOOTNOTE[/footer]"],
                ['Xanathar\'s Guide to Everything', "[footer number xgte]FOOTNOTE[/footer]"],
                ['Footer (MToF)', "[footer number mtof]FOOTNOTE[/footer]"],
                ['Draco', "[footer number draco]FOOTNOTE[/footer]"],
                ['Tales Curator', "[footer number curator]FOOTNOTE[/footer]"],
                ['Witchlight', "[footer number witch]FOOTNOTE[/footer]"],
                ['Tasha\'s Cauldron of Everything', "[footer number tcoe]FOOTNOTE[/footer]"],
                ['Tomb of Annihilation', "[footer number toa]FOOTNOTE[/footer]"],
                ['Only Number', "[footer hide number][/footer]"],
                ['Only Footnote', "[footer hide]FOOTNOTE[/footer]"],
            ]
        }
    ],
    Backgrounds: [
        { container: "block",
            title: "Backgrounds",
            content: [
                ['None', "", "page", "--page-background-image", "none"],
                ['Player Handbook', "[image link='./styles/backgrounds/PHB.png' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/PHB.png')"],
                ['Player Handbook 2024', "[image link='./styles/backgrounds/phb24l.jpg' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", ["url('../backgrounds/phb24l.jpg')", "url('../backgrounds/phb24r.jpg')"]],
                ['Elemental Evil', "[image link='./styles/backgrounds/EE.jpeg' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/EE.jpeg')"],
                ['Genesys', "[image link='./styles/backgrounds/Genesys.png' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/Genesys.png')"],
                ['Ice', "[image link='./styles/backgrounds/Ice.png' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/Ice.png')"],
                ['Ice 2', "[image link='./styles/backgrounds/Ice2.png' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/Ice2.png')"],
                ['Monster Manual', "[image link='./styles/backgrounds/MonsterManual.png' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/MonsterManual.png')"],
                ['SwordMeow', "[image link='./styles/backgrounds/White.png' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/White.png')"],
                ['Xanathar\'s Guide', "[image link='./styles/backgrounds/xgte.jpeg' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/xgte.jpeg')"],
                ['Dungeon Master', "[image link='./styles/backgrounds/DMG.jpeg' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/DMG.jpeg')"],
                ['Curator', "[image link='./styles/backgrounds/curator.jpg' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/curator.jpg')"],
                ['Witchlight', "[image link='./styles/backgrounds/witch.jpeg' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/witch.jpeg')"],
                ['Cauldron of Everything', "[image link='./styles/backgrounds/TCoE.jpeg' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/TCoE.jpeg')"],
                ['Tomb of Annihilation', "[image link='./styles/backgrounds/ToA.jpeg' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/ToA.jpeg')"],
                ['Descent into Avernus', "[image link='./styles/backgrounds/DiA.jpeg' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/DiA.jpeg')"],
                ['Waterdeep', "[image link='./styles/backgrounds/Waterdeep.jpeg' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/Waterdeep.jpeg')"],
                ['Warhammer', "[image link='./styles/backgrounds/wfrp.jpg' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/wfrp.jpg')"],
                ['Warhammer Letter', "[image link='./styles/backgrounds/wfrp-letter.jpg' absolute top=0 left=0 width=100% height=100%]", "page",
                    "--page-background-image", "url('../backgrounds/wfrp-letter.jpg')"],
            ]
        }
    ]
};
