export const Guide = {
    content: "[cover]\n\n[vspace 10em]\n\n# [s 0.15em]The Tales Curator[/s]\n## [s 0.15em]Homebrew Editor[/s]\n___\n\n[banner]HOMEBREW[/banner]\n\n[footer hide]\n[s 0.2em]A Comprehensive Guide[/s]\n[s 0.2em]Trying my best to make it simple![/s]\n[/footer]\n\n[/cover]\n\n[image link='https://cdnb.artstation.com/p/assets/images/images/033/846/361/large/hilary-purnamasari-oldlibrarian-001.jpg' absolute top=0 left=-12cm height=100%]\n\n[name absolute bottom=6cm right=1cm]\"Old Librarian\"<br>By Hilary Purnamasari[/name]\n\n[newpage]\n\n# The Curator Greets You\n\nWelcome, young adventurer! I see you've found my library. Follow me; I will show you around. You see, this library holds many secrets. Do not worry, as this journey will be without danger — at least as long as you stay close to me.\n\nFollow along to discover the secrets of the library!\n\n## Why Use This Editor?\n\nThis editor was made with compatibility in mind. You can use this editor with any *modern* web browser and obtain *similar* results. Why similar? Because the \"save as PDF\" operation depends on the built-in PDF converter of the web browser, which may vary depending on which browser you use. I tried my best to ensure minimal inconsistencies.\n\nMoreover, I try to make it as easy as possible, by doing three things:\n\n- Sticking as much as possible to the syntax of other homebrew editors, using [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) as the base.\n- Adding tags to hide all the HTML/CSS stuff behind a curtain.\n- Adding \"easy customization\" tools.\n\n[vspace]\n\nAre you interested in seeing more? Good, let's continue then.\n\n\n## Syntax\nIn this section, I will quickly go over the most important part of the syntax. Assuming you already know Markdown, let's jump right into the *specific syntax* of this editor.\n\n### Tags\nTags are the most important aspect of this editor. They allow you to perform complex operations by just using keywords.\nThe syntax of tags is simple: `[tag]` when not using any parameters, and `[tag key=value keyword]` when using parameters. Most tags must be closed using `[/tag]`, with `tag` being the corresponding name to the opening tag.\n\n#### Images\nYou can use the `[image]` tag to incorporate an image into your brew. Here are the parameters of an image. An image tag can take multiple parameters and keywords. The most important one is, of course, the `link` (or `src`) parameter to specify the link to the image you want to show. You can also specify its size by using the `size` parameter; by default, this tag refers to the **width** of the image — but you can also specify its `height`.  \nIf you want to position the image anywhere on the page (and not where the tag is), you can use the `absolute` keyword. This will make the position of the image depend on the page. You can then use the `top`, `bottom`, `left`, and `right` parameters to specify its position (`top=0 left=0` will have the image on the top left of the page). If you want your image to blend into the page, you can use the `multiply` keyword.\n\n\n#### Spaces\n\nTo manage the space of the page, you can use two tags: `vspace` (vertical space) and `hspace` (horizontal space). You can specify a size as a parameter to determine the size of the space created. For instance, `[vspace 20px]` will create a vertical space of 20px.  \nWhen used without a value (i.e., `[hspace]`), the value used is 1em (which corresponds to a line for vertical space, and an indentation for horizontal space).\n\n#### Blocks\nMany blocks are proposed in order to mimic the appearance of a genuine D&D document. I invite you to open the **Snippets Sailor** on the right toolbar (the magic wand on top of the editor). You will have a preview of the different blocks proposed by this editor.\n\n[note]\n##### Note\nFor instance, this is a note!\n[/note]\n\n[description]\n##### Description\nAnd this a description!\n[/description]\n\nThese blocks can take some parameters: `size` to specify the size of the text, `color` to specify the color of the text, and `bg` to specify the color of the block.\n\n[description bg=#f8d4fc]\nI'm a pink description!\n[/description]\n\nAlternatively, most blocks accept the `wide` keyword, making it span over the whole page instead of only one column.\n\n\n#### Footer\n\nYou can specify the footer you want to use for each page. With the `number` parameter, you can choose which number is shown at the bottom of the page. If you use `number` as a keyword (without value), then the number will be set automatically.  \nThere are various styles available out-of-the-box. The `phb` and `dmg` styles can take an extra keyword corresponding to a color. Available colors are:\n\n[columns 3 padding=10px]\n\n- Blue\n- Green\n- Purple\n- Red\n- Teal\n- Yellow\n\n[/columns]\n\nFor instance, this page uses a `phb green number` footer. The footer automatically places itself on the right or the left depending on the page.\nIf you want to show the footnote or the number without showing the \"footer image\", you can use the `hide` keyword.\n\n[footer phb green number]GUIDE TO THE TALES CURATOR[/footer]\n\n[newpage]\n\n## Watercoloring\nWatercolors are a feature greatly appreciated, but difficult to manage properly. Well, not anymore!\n\nYou can directly inject watercolors inside your document by selecting one in the **Snippets Sailor**!  \nOnce the tag is inserted, you can simply add the image inside the watercolor tag and position it as you would normally do with any image.\n\n[watercolor tr mask=c-14 size=58%]\n[image link='./styles/bird.png' width=100% absolute right=-150px top=-80px]\n[/watercolor]\n\n[name absolute right=1cm top=8cm fg=#fff radius=8px text-align=center][s 0.3em]AI Generated by<br>Firefly[/s][/name]\n\nThe `watercolor` tag accepts some parameters and keywords (of course!). First of all, the `size` parameter allows you to set the size of the watercolor, and the `x` and `y` parameters allow you to position the watercolor. You can also specify its opacity with the `opacity` parameter, and the color using the `color` (or `bg`) parameter (in case you want a stained effect).\n\nMore importantly, the watercolor also takes some keywords that modify its position. By default, the watercolor is positioned to the bottom left of the page. You can change its anchor by specifying it using the `top` and `right` keywords. You can also use the shortcuts `tr, tl, br, bl` for top right, top left, bottom right, and bottom left respectively.  \nFor instance, the watercolor on the right is defined as `[watercolor tr mask=c-14 size=58%]`.\n\nThe `mask` keyword is reserved for the predefined templates. If you want to use your own mask, you can specify it using the `link` parameter instead.  [vspace]  \n\nFinally, you can use the `reverse` keyword if you want the masked region to be the ***opposite*** of the current region!\n\n## Monster Stats\n\n[monster classic]\n## Monster Name\n*Medium humanoid, any alignment*\n___\n**Armor Class** :: 10\n**Hit Points** :: 22 (5d8)\n**Speed** :: 30 ft.\n___\n|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |\n|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|\n|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|\n___\n**Senses** :: passive Perception 10\n**Languages** :: —\n**Challenge** :: 1 (200 XP)\n___\n***Feature 1*** Description. [vspace]\n***Feature 2*** Description. \n\n### Actions\n***Action 1*** Description. [vspace]\n***Action 2*** Description. \n[/monster]\n\n[newcolumn]\n\n[vspace 11cm]\n\n[monster brs]\n## Monster Name\n*Medium humanoid, any alignment*\n___\n**Armor Class** :: 10\n**Hit Points** :: 22 (5d8)\n**Speed** :: 30 ft.\n___\n|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |\n|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|\n|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|\n___\n**Senses** :: passive Perception 10\n**Languages** :: —\n**Challenge** :: 1 (200 XP)\n___\n***Feature 1*** Description. [vspace]\n***Feature 2*** Description. \n\n### Actions\n***Action 1*** Description. [vspace]\n***Action 2*** Description. \n[/monster]\n\nThere are multiple templates to build a monster block. On the left, you can see the *classic* monster block, and above, the monster block found in the basic rules `brs`.  \nTo switch between styles, add the appropriate keyword to the `[monster]` tag.  \nAdditionally, you can remove the frame from the monster block by using the `noframe` keyword.\n\n[footer number xgte]GUIDE TO THE TALES CURATOR[/footer]\n\n\n[newpage]\n\n[part brs]\n\n# Easy\n## Customization\n\n[/part]\n\n[watercolor tr mask=c-9 x=0 y=0 color=#fff size=100% front]\n[image link='./styles/owl.jpg' height=100% width=100%]\n[/watercolor]\n\n[newpage]\n\n## Customization Tools\n\nThere are four different tools available to ease the customization of the document. Please note that these modifications are *global*, which means that *all* elements of the type you modify will be affected. You can still use tags to locally change the properties.\n\n\n[vspace]\n\n<i class=\"fa-solid fa-palette\"></i> **Color Captain** :: Allows you to pick the colors for the different elements of the page. You can easily change the font color of the titles, the text, the background of the note block, etc. The changes are *global*, which means that you are setting the *default* color.\n\n[vspace]\n\n<i class=\"fa-solid fa-pen-nib\"></i> **Text Tailor** :: Allows you to change the text appearance of various elements. You can change the font family and the size. Currently, the tool does not support custom fonts. If you want to have a custom font, you will have to do it the old-fashioned CSS way.\n\n[vspace]\n\n<i class=\"fa-solid fa-wand-magic-sparkles\"></i> **Snippets Sailor** :: Allows you to directly insert full elements by simply clicking on them. The different snippets are sorted by categories. There is a \"real-time\" preview of the snippet when you hover your mouse over it.\n\n[vspace]\n\n<i class=\"fa-solid fa-bolt\"></i> **Quick Snippets** :: Same as the **Snippets Sailor**, but quicker and less extensive. It features the \"most useful\" snippets for most D&D brews.\n\n\n## Frames\n\nFrames are just like blocks, but they have a *fancier* appearance.\n:\n\n[frame]\nThis is the classic frame. It is notably used for big tables. It comes with a white background.\n[/frame]\n\n[frame simple]\nThis is a simpler frame. It has a transparent background. It uses the `simple` keyword.\n[/frame]\n\n[frame small]\nThis is another frame that uses the `small` keyword. You might notice that the border of the frame can vary depending on the amount of text inside the frame.  \nThat's because the border shrinks when the size of the box is smaller than the minimal size of the border. Hope it makes sense!\n[/frame]\n\n[frame card]\nThe final frame available, and it uses the `card` keyword.  \nContrary to the others, it is compatible with background change! (Long story short: because the border is *inside* the block).\n[/frame]\n\n[newcolumn]\n\nWhen using the *classic* frame or the *card* frame, you can add an extra decoration by using the `decoration` keyword. By default, the decorations are added to the top and the bottom of the frame. If you want to only display the top, add the `top` keyword (or the `bottom` if you only want to use the bottom). **Warning**: it will hide both if you use both keywords.\n\nYou can get pretty creative with the usage of frames. I find it pretty nice to use frames to display items. But you can also use them to display any kind of information, or even a monster block stats (best used with the `noframe` keyword on said monster block!).\n::\n\n[frame card]\n#### Name of the item\n*My item rarity and other information*\n[/frame]\n\n[frame card decoration]\n:\nThis is a frame using the decoration features. As you can see, the decoration extends a bit far, so the bigger the frame is, the better it looks. I added some spaces to cheat a bit! This might be the description of the item.\n::\n[/frame]\n\n[frame card]\nFinal frame! Maybe additional information, or an image.\n[/frame]\n\n:\nI plan on adding even more frames, like a paper frame, or a post-it frame, or even a stone frame.\n\n## Columns\n\nYou can define your own column block by using the `[columns]` tag. You can define the number of columns by using the `n` parameter and the gap between columns with the `gap` parameter. By default, there are two columns with a 1cm gap.\nYou can use this feature to define a split table, for instance.\n\n[vs 2em]\n[columns gap=0.5cm]\n\n##### Left Table\n| Column 1 | Column 2 |\n|----------|----------|\n| Value 1  | Value 2  |\n\n##### Right Table\n| Column 1 | Column 2 |\n|----------|----------|\n| Value 1  | Value 2  |\n\n[/columns][vs 2em]\n\nThis result was obtained by using the following tag: `[columns gap=0.5cm]`, and by placing two tables inside.\n\n\n[footer show number teal phb][/footer]\n\n[newpage]\n\n## Page Format & Printing\n\nTo switch the format of the page, click on the gray button located on the top left of the preview window, right to the save button. You currently have the choice between A4 and Letter (US).\n\nTo print the document, click on the red button located on the top right of the preview window. It will open a new window containing the pages to print. It can happen that the print window shows up before the page finishes loading. In this case, simply close and then reopen the popup window (Ctrl+P by default on most browsers).  \nBe sure to select the correct format, set margins to none, and print background images. This should be it.\n\n\n## What's Next?\n\nI plan on adding *at least* the following:\n\n[vspace]\n\n**Document's Variables** :: Variables would allow you to store a value and use the variable instead of the value inside the editor. Then, during compilation, the variable would be converted to its value.<br>The syntax should be something like {{my-variable}}.\n\n[vspace]\n\n**Custom CSS Editor** :: The idea is to separate the content from the appearance to keep things neat. I don't know yet if I should let you import the property of an item by clicking on it or simply dump all the rules. The latter should certainly be easier for me!\n\n[vspace]\n\n**More Theme** :: Adding support for other RPGs, like WFRP for instance, and, of course, having more themes available for every *main template*.\n\n[vspace]\n\n**More Vectorization** :: Footers, headers, borders... you name it. The more, the better, as images are lighter and of infinitely better quality!\n\n## Thanks\nThis tool was made using:\n  -  [Ace](https://github.com/ajaxorg/ace) as its editor\n  -  [Marked](https://github.com/markedjs/marked) (modified) as its markdown parser\n  -  [Solbera D&D Fonts](https://github.com/jonathonf/solbera-dnd-fonts) for the *free* version of the fonts\n  -  [The Homebrewery](https://github.com/naturalcrit/homebrewery) for some images\n  -  [Sovngarde Font](https://www.nexusmods.com/skyrimspecialedition/mods/386) for the subtitles of the part. I like this font.\n  -  [Jared Ondricek](https://watercolors.giantsoup.com/) for the watercolors. I took some and transformed them into masks.\n\n\n[newcolumn]\n\n## Disclaimer\nI drew inspiration for the syntax from [The Homebrewery](https://github.com/naturalcrit/homebrewery) and [GMBinder](https://www.gmbinder.com/), although I want to clarify that I haven't directly copied or used any of their code or scripts. However, I may have utilized some CSS properties for reference.\n\nThis tool is still in its early stages of development, and I've shared it on GitHub for testing purposes. The code may be messy for now, but I plan to clean it up later. I welcome any suggestions regarding any aspect of the tool.\n\nFeel free to take and reuse my code as you see fit. Additionally, you're welcome to use any images I've taken the time to vectorize by hand.\n\n\n## Known Issues\n\nSome SVGs are rendered as static images when saving as PDF, which makes the whole idea of using an SVG pointless. This is notably the case with the \"frame decoration\".\n:\nFor security reasons, you can't use a local image as a mask.\n:\nFor security reasons, browsers don't allow applications and pages to automatically save to and load from local files. Therefore, there are no automatic saves! *(At least not until a server version of this editor)*.\n:\nImages using the `multiply` keyword do not render properly when saved as PDF through a Mozilla-based browser (i.e. Firefox or LibreWolf).\n:\nInternal links do not work when saving as PDF.\n:\nPrinting with Safari does not work. This is due to how the printer works, there is nothing I can do about it.\n\n\n[watercolor br mask=b-4 x=0 y=-500px size=100% color=#00000022]\n[image link='./styles/dragon.jpg' width=100% absolute]\n[/watercolor]\n\n[footer number dmg red][/footer]\n\n[newpage]\n\n[cover back]\n\n## Final Words\nIf you have any ideas on how to improve this editor, what you would like to see, or what's wrong with the current state of the tool, don't hesitate to reach out to me.\n  \nAlso, I used some assets that I scraped from around the web and had saved on my computer. If you are the original creator of one of these assets and are not okay with their use here, send me a message and I will remove them immediately.\n\n___\n\nThis editor was created by me alone. Please understand that there may be some bugs present.\nIt is free and always will be.\n\nThank you for your time.\n\n\n[/cover]",
    css: '/* CSS */\n',
    style: {
        template: ["5e.css"],
        style: {
            ":root": {
                "--page-width": "215.9mm",
                "--page-height": "279.4mm",
                "--page-margin-left": "1.4cm",
                "--page-margin-right": "1.4cm",
                "--page-margin-top": "1.4cm",
                "--page-margin-bottom": "1.6cm",
                "--text-color": "#231f20",
                "--heading-color": "#58180D",
                "--table-heading-color": "#231f20",
                "--table-text-color": "#231f20",
                "--primary-color": "#C9AD6A",
                "--secondary-color": "#E0E5C1",
                "--table-color": "#ffffff00",
                "--description-color": "#f8f1da",
                "--note-color": "#f8f1da",
                "--monster-text-color": "#58180D",
                "--monster-separator-color": "#9c2b1b",
                "--monster-background-color": "#fbf8f4",
                "--item-name-color": "#766649",
                "--page-background-color": "#ffffff",
                "--page-background-image": "url('../backgrounds/curator.jpg')",
                "--lettrine-color": "#231f20",
                "--lettrine-font": "Solbera Imitation",
                "--text-font": "Bookinsanity",
                "--cover-font": "Nodesto Caps Condensed",
                "--cover-subtitle-font": "Overpass",
                "--title-font": "Mr Eaves Small Caps",
                "--h1-font": "Mr Eaves Small Caps",
                "--h2-font": "Mr Eaves Small Caps",
                "--h3-font": "Mr Eaves Small Caps",
                "--h4-font": "Mr Eaves Small Caps",
                "--table-font": "Scaly Sans",
                "--table-title-font": "Scaly Sans Caps",
                "--item-name-font": "Zatanna Misdirection",
                "--quote-font": "Sedan",
                "--cover-title-size": "60pt",
                "--cover-subtitle-size": "24pt",
                "--text-size": "9.6pt",
                "--h1-size": "24pt",
                "--h2-size": "22pt",
                "--h3-size": "15pt",
                "--h4-size": "14pt",
                "--table-title-size": "13pt",
                "--table-text-size": "8.5pt",
                "--note-text-size": "9pt",
                "--quote-size": "10pt",
                "--lettrine-size": "95pt",
                "--item-name-size": "14pt",
                "--space-between": "10px",
                "--space-after-heading": "4px",
                "--lettrine-letter-A": "0 0 0 -0.1em",
                "--lettrine-letter-B": "0 0 0 -0.1em",
                "--lettrine-letter-C": "0 0 0 -0.1em",
                "--lettrine-letter-D": "0 0 0 -0.1em",
                "--lettrine-letter-F": "0 0 0 -0.1em",
                "--lettrine-letter-G": "0 0 0 -0.1em",
                "--lettrine-letter-I": "0 0 0 -0.1em",
                "--lettrine-letter-L": "0 0 0 -0.1em",
                "--lettrine-letter-N": "0 0 0 -0.1em",
                "--lettrine-letter-O": "0 0 0 -0.1em",
                "--lettrine-letter-P": "0 0 0 -0.1em",
                "--lettrine-letter-R": "0 0 0 -0.1em",
                "--lettrine-letter-S": "0 0 0 -0.1em",
                "--lettrine-letter-T": "0 0 0 -0.1em",
                "--lettrine-letter-U": "0 0 0 -0.1em",
                "--lettrine-letter-V": "0 0 0 -0.1em",
                "--lettrine-letter-W": "0 0 0 -0.1em",
                "--lettrine-letter-Y": "0 0 0 -0.1em",
                "--lettrine-letter-Z": "0 0 0 -0.1em",
                "--lettrine-letter-H": "0 0 0 -0.2em",
                "--lettrine-letter-K": "0 0 0 -0.2em",
                "--lettrine-letter-E": "0 0 0 -0.2em",
                "--lettrine-letter-Q": "0 0 0 -0.2em",
                "--lettrine-letter-J": "0 0 0 -0.2em",
                "--lettrine-letter-M": "0 0 0 -0.3em",
                "--lettrine-letter-X": "0 0 0 -0.3em",
            },
        },
    },
};
