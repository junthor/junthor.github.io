const COLOR_PICKER_VARIABLES = {
    'Colors': {
        'Page': '--page-background-color',
        'Title Underline': '--primary-color',
        'Monster Separator': '--monster-separator-color',
    },
    'Font': {
        'Text': '--text-color',
        'Heading': '--heading-color',
        'Table Text': '--table-text-color',
        'Table Heading': '--table-heading-color',
        'Monster Stats': '--monster-text-color',
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
    'Bookinsanity', 'Dungeon Drop Case', 'Mr Eaves Small Caps', 
    'Nodesto Caps Condensed', 'Scaly Sans', 'Scaly Sans Caps', 
    'Solbera Imitation', 'Sovngarde', 'Zatanna Misdirection'
]

const SNIPPETS = {
    Cover: [
        ['D&D Cover', '[cover]\n\n# Title\n\n[splootch]\n\tHOMEBREW\n[/splootch]\n\n[/cover]'],
    ],
    Part: [
        ['Dungeon Master Guide', '[part dmg]\n\n# Part 1\n## Subtitle\n\n[/part]'],
        ['Player Handbook', '[part phb]\n\n# Part 1\n## Subtitle\n\n[/part]'],
        ['Basic Ruleset', '[part brs]\n\n# Part 1\n## Subtitle\n\n[/part]']
    ],
    Watercolor: [
        ['b-1', '[watercolor bottom left mask=b-1]\n\n[/watercolor]'],
        ['b-2', '[watercolor bottom left mask=b-2]\n\n[/watercolor]'],
        ['b-3', '[watercolor bottom left mask=b-3]\n\n[/watercolor]'],
        ['b-4', '[watercolor bottom left mask=b-4]\n\n[/watercolor]'],
        ['b-5', '[watercolor bottom left mask=b-5]\n\n[/watercolor]'],
        ['b-6', '[watercolor bottom left mask=b-6]\n\n[/watercolor]'],
        ['b-7', '[watercolor bottom left mask=b-7]\n\n[/watercolor]'],
        ['b-8', '[watercolor bottom left mask=b-8]\n\n[/watercolor]'],
        ['b-9', '[watercolor bottom left mask=b-9]\n\n[/watercolor]'],
        ['b-10', '[watercolor bottom left mask=b-10]\n\n[/watercolor]'],
        ['b-11', '[watercolor bottom left mask=b-11]\n\n[/watercolor]'],
        ['b-12', '[watercolor bottom left mask=b-12]\n\n[/watercolor]'],
        ['b-13', '[watercolor bottom left mask=b-13]\n\n[/watercolor]'],
        ['b-14', '[watercolor bottom left mask=b-14]\n\n[/watercolor]'],
        ['b-15', '[watercolor bottom left mask=b-15]\n\n[/watercolor]'],
        ['b-16', '[watercolor bottom left mask=b-16]\n\n[/watercolor]'],
        ['b-17', '[watercolor bottom left mask=b-17]\n\n[/watercolor]'],
        ['b-18', '[watercolor bottom left mask=b-18]\n\n[/watercolor]'],
        ['b-19', '[watercolor bottom left mask=b-19]\n\n[/watercolor]'],
        ['b-20', '[watercolor bottom left mask=b-20]\n\n[/watercolor]'],
        ['b-21', '[watercolor bottom left mask=b-21]\n\n[/watercolor]'],
        
        ['c-1', '[watercolor bottom left mask=c-1]\n\n[/watercolor]'],
        ['c-2', '[watercolor bottom left mask=c-2]\n\n[/watercolor]'],
        ['c-3', '[watercolor bottom left mask=c-3]\n\n[/watercolor]'],
        ['c-4', '[watercolor bottom left mask=c-4]\n\n[/watercolor]'],
        ['c-5', '[watercolor bottom left mask=c-5]\n\n[/watercolor]'],
        ['c-6', '[watercolor bottom left mask=c-6]\n\n[/watercolor]'],
        ['c-7', '[watercolor bottom left mask=c-7]\n\n[/watercolor]'],
        ['c-8', '[watercolor bottom left mask=c-8]\n\n[/watercolor]'],
        ['c-9', '[watercolor bottom left mask=c-9]\n\n[/watercolor]'],
        ['c-10', '[watercolor bottom left mask=c-10]\n\n[/watercolor]'],
        ['c-11', '[watercolor bottom left mask=c-11]\n\n[/watercolor]'],
        ['c-12', '[watercolor bottom left mask=c-12]\n\n[/watercolor]'],
        ['c-13', '[watercolor bottom left mask=c-13]\n\n[/watercolor]'],
        ['c-14', '[watercolor bottom left mask=c-14]\n\n[/watercolor]'],
        ['c-15', '[watercolor bottom left mask=c-15]\n\n[/watercolor]'],
        ['c-16', '[watercolor bottom left mask=c-16]\n\n[/watercolor]'],
    ],
    Blocks: [
        ['Note', '[note]\n\n##### Note\nText\n\n[/note]', 'block'],
        ['Description', '[description]\n\n##### Description\nText\n\n[/description]', 'block'],
        ['Quote', '\n\n > Text\n> - Author Name, *Source*', 'block'],
        ['Frame', '[frame]\nText\n[/frame]', 'block'],
        ['Frame (Simple)', '[frame simple]\nText\n[/frame]', 'block'],
        ['Monster', 
        "[monster]\n\n## Monster Name\n*Medium humanoid, any alignment*\n___\n**Armor Class** :: 10\n**Hit Points** :: 22 (5d8)\n**Speed** :: 30 ft.\n___\n|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |\n|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|\n|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|\n___\n**Senses** :: passive Perception 10\n**Languages** :: —\n**Challenge** :: 1 (200 XP)\n___\n***Feature 1*** Description. [vspace]\n***Feature 2*** Description. \n\n### Actions\n***Action 1*** Description. [vspace]\n***Action 2*** Description. \n\n[/monster]", 
        "block"],
        ['Monster (BRS)', 
        "[monster brs]\n\n## Monster Name\n*Medium humanoid, any alignment*\n___\n**Armor Class** :: 10\n**Hit Points** :: 22 (5d8)\n**Speed** :: 30 ft.\n___\n|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |\n|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|\n|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|\n___\n**Senses** :: passive Perception 10\n**Languages** :: —\n**Challenge** :: 1 (200 XP)\n___\n***Feature 1*** Description. [vspace]\n***Feature 2*** Description. \n\n### Actions\n***Action 1*** Description. [vspace]\n***Action 2*** Description. \n\n[/monster]",
        "block"],
    ],
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
        options: available_fonts
    },
}