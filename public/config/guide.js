export const Guide = {
    content: "[cover]\n\n[vspace 10em]\n\n# [s 0.15em]THE TALES CURATOR[/s]\n## [s 0.15em]Homebrew Editor[/s]\n___\n\n[banner]HOMEBREW[/banner]\n\n[footer hide]\n[s 0.2em]A Comprehensive Guide[/s]\n[s 0.2em]Trying my best to make it simple![/s]\n[/footer]\n\n[/cover]\n\n[image link='https://cdnb.artstation.com/p/assets/images/images/033/846/361/large/hilary-purnamasari-oldlibrarian-001.jpg' absolute top=0 left=-12cm height=100%]\n\n[caption absolute bottom=6cm right=1cm]\"Old Librarian\"<br>By Hilary Purnamasari[/caption]\n\n[newpage]\n\n\n[cover inside]\n# THE TALES CURATOR\n## Homebrew Editor\n___\n[/cover]\n\n[toc 2]\n\n# Table of Content\n\n- Basic Syntax :: 4\n\t- Headings :: 4\n\t- Text :: 4\n\t\t- Paragraphs :: 4\n\t\t- Styling :: 4\n\t- Images :: 4\n\t\t- Source :: 4\n\t\t- Dimensions :: 4\n\t\t- Position :: 4\n\t\t- Margins :: 4\n\t- Tables :: 5\n\t\t- Markdown Syntax :: 5\n\t\t- LaTeX-Inspired Syntax :: 5\n\t- Lists :: 5\n\t\t- Ordered & Unordered Lists :: 5\n\t\t- Definitions :: 5\n- Blocks :: 6\n\t- Global Parameters :: 6\n\t- Quotes :: 6\n\t- Columns :: 6\n\t- Notes and Description :: 6\n\t- Watercoloring :: 7\n\t- Monster Stats :: 7\n\t- Captions :: 8\n\t- Chapter & Parts :: 8\n\t\t- Chapters :: 8\n\t\t- Parts :: 8\n\t- Footers :: 8\n\t- Spaces :: 8\n\t- Frames :: 8\n\t- Customization Apps :: 10\n\t- Page Format & Printing :: 10\n- Last Words :: 11\n\t- What's Next? :: 11\n\t- Known Issues :: 11\n\t- Disclaimer :: 11\n\t- Thanks :: 11\n\t- Final Words :: 12\n\n[/toc]\n\n[newpage]\n\n[part brs]\n\n# part 1\n## Syntax\n\n[/part]\n\n\n[newpage]\n\n[chapter decoration colored yellow]\n# Basic Syntax\n[/chapter]\n\nThe core of the redaction is done using Markdown.\nMarkdown is a syntax designed to be easily readable from its source code form. It is widely used and, as such, a lot of documentation and guide can be found online on how to use Markdown. If you want to learn more about Markdown, I recommend checking [Markdown Guide](https://www.markdownguide.org/).  \nIn this section, we'll cover the main tools that you will need to properly write a Homebrew.\n\n## Headings\nHeadings in Markdown are straightforward: simply add the # symbol in front of a text. This should be done at the start of the line and cannot span on multiple lines. The number of # symbols determine the level of the heading. There are 6 differents levels available.\n\nThe styling of the different headings depends on the theme you are using.\n\n\n## Text\n\n### Paragraphs\nIn Markdown, a paragraph is a section of compact text, i.e. that is not separated by a blank line.\n\n:\n\nBecause Markdown allows you to break a line in the middle of a sentence to allows for better\nreadability inside the editor, you must use a double white space at the end of the line to break\nthe line. Alternatively, you can use a backslash character `\\`, or a tag `[br]` (or HTML equivalent `<br>`).\n\n:\n\nBy default, the number of blank lines you add between paragraphs has no effect on the space between paragraphs.\nIn order to properly add a separation, you should either use multiple `[br]` *or* use the shortcut  `:`. If you decide to use the latter, there should not be any character before (i.e. on a new line).\nThis alternative syntax was taken from Homebrewery.\n\n### Styling\nYou can apply different styling to your text by surrounding it with special characters. Please not that there should not be spaces between the symbols and the first and last words. Markdown does not support by default underline text: therefore, you should use the `[u]` tag.\n\n- **Bold**:  `**Bold**`.\n- *Italic*:  `*Italic*`.\n- ***Bold Italic***:  `***Bold Italic***`.\n- ~Strike Through~:  `~Strike Through~`.\n- [u]Underline[/u]: `[u]Underline[/u]`.\n- ^{sup text}: `^{sup text}`.\n- _{sub text}: `_{sub text}`.\n\n[newcolumn]\n\n## Images\nTo add an image to your document, use the `[image]` tag. In this section, we will see the different parameters that this tag can receive.\n\n### Source\nTo show an image, you should of course provide a link to this image. You can do so by using the `link` or `src` parameter. Note that the link to the image should be surrounded by `'` or `\"`.\n\n\n### Dimensions\nYou can specify the dimensions of an image by using `height` or `width` as parameters. By default, the image will retains its initial proportions if you only specify one of the two.\n`[image width=1cm]` will set the image width to 1cm. Alternatively, if you use a percentage, the size of the image will depends on the size of its parent (by default: the column).\n\n### Position\nThere are two ways to position an image:\n\n**Relative Positioning** :: The image remains in the normal document flow. Its position depends on the previous element.\n**Absolute Positioning** :: The image is outside the normal document flow. Its position depends on the page.\n\nBy default, an image is considered relative. To set an image to absolute, use the `absolute` keyword inside the tag.\n\n:\n\nThe element on which the position of the image depends will be refered as the *anchor*.\nTo change the position of the image, use either `top`, `right`, `bottom` or `left` as parameters, followed by the distance.\n`[image top=1cm]` will place the top of the image 1cm below its anchor. \n\n### Margins\nYou can also add margins to an image by using the `margin-*` parameter (`*` should be replaced with top, left, bottom or right). Note that it is useless to add margins to an absolute image.  \nIt is possible to specify all margins at once using the `margin` keywords.\n\n- `margin=x` will set all margins to x.\n- `margin='x y'` will respectively set vertical (top and bottom) margins to x and horizontal (left and right) margins to y.\n- `margin='w x y z'` will respectively set the top, right, bottom and left margin to w, x, y and z. (clockwork rotation).\n\n**KEYWORDS**: `absolute, multiply, front`\n**PARAMETERS**: `padding*, margin*, zIndex, width, height`\n\n[footer number]BASIC SYNTAX[/footer]\n\n[newpage]\n\n\n\n## Tables\nThis editor provides two ways to create a table: one using the classical Markdown Syntax, and another one using a LaTeX-inspired syntax.\n\n### Markdown Syntax\nIn a Markdown table, cells are separated by a pipe `|` and rows are separated by a line break. The first row (headers) must be followed by cells containing a serie of `---` (at least 3). You can use the `:` symbol at either extremity to determine the alignment of the cells.\n\n| Left    | Center  | Right   |\n|:------- |:-------:| -------:|\n| Cell 1  | Cell 2  | Cell 3  |\n\n```\n| Left    | Center  | Right   |\n|:------- |:-------:| -------:|\n| Cell 1  | Cell 2  | Cell 3  |\n```\n\nFor more details, please refer to [this section of Markdown Guide](https://www.markdownguide.org/extended-syntax/#tables).\n\n### LaTeX-Inspired Syntax\nAnother way to create a table is to use the `[table]` tag.  \nFor those who are familiar with it, the `[table]` tag uses a similar syntax to the LaTeX tabular.  \n\nYou can define how many columns the table will have by using the `mode` parameter.  \nFor instance, `[table mode='ccc']` will create a table with 3 columns. The character used represent the alignment of the cell: `c` for centered, `l` for left-aligned, and `r` for right-aligned. Anything else will be treated as default (centered header and left-aligned cells).\n\nAdditionally, you can define the vertical alignment of the cells by using `^` for top, `-` for middle and `_` for bottom. As an example, `[table mode='l^c_r-']` will have 3 columns, with the first one being top-left aligned, the second one bottom-centered, and the last one middle-right aligned.\n\n:\n\n[table mode='l^c_r-']\nLeft Top | Center Bottom | Right Middle \\\\\n\nCell 1-1 [br] With a long line | \nCell 1-2 & 1-3 {2}\\\\ \n\nCell 2-1 |\nCell 2-2 [br] With a long line |\nCell 2-3 \n[/table]\n:\n\nTo separate cells, use the `|` symbol. To separate rows, use `\\\\`.\nThe above table was created using this code:\n```\n[table mode='l^c_r-']\nLeft Top | Center Bottom | Right Middle \\\\\n\nCell 1-1 [br] With a long line | \nCell 1-2 & 1-3 {2}\\\\ \n\nCell 2-1 |\nCell 2-2 [br] With a long line |\nCell 2-3 \n[/table]\n```\n\nThis syntax is of course less readable than the default's Markdown one, but is far more flexible. If you plan to create big complex tables, then it might be preferable to use this syntax.\n\n\n\n## Lists\n\n### Ordered & Unordered Lists\nTo create a list, simply put a symbol before each item. If you want an unordered list, then you can use either `-` or `*` before each item. On the contrary, if you want an ordered list, simply put the number followed by a dot: `x.`.\n\n0. This is\n1. an ordered\n2. list\n\n```\n0. This is\n1. an ordered\n2. list\n```\n\n- This is\n* an unordered\n- list\n\n```\n- This is\n- an unordered\n- list\n```\n\n### Definitions\nDefinitions are another type of lists, but not *classical lists*.\nThis type of list should be reserved lists that are under the format `keyword: definition`. Simply use a double `:` symbol to separate the keyword from the definition. Once again, this syntaxic rule was taken from the Homebrewery.\n\n**Keyword**:: This is the text of the definition. As you can see, the formatting is particular: the text of the definition is indented except the first line. Also, there is a small gap between the keyword and the text of definition.\n\nThe syntax does not currently support multiple lines per keyword.\n\n[footer number]Tables & Lists[/footer]\n\n[newpage]\n\n[chapter colored green decoration]\n# Blocks\n[/chapter]\n\nBlocks are predefined elements that provide a special formatting and layout for anything inside of them. For instance, a table inside a monster block should look different than a table outside it.  \nIn this section, we will see the different kind of blocks this editor propose.\n\n#### Foreword\nAll blocks are available inside the Snippets App. For more information about the different apps, please refer to the appropriate section of this guide.\n\n## Global Parameters\nMost of the blocks accept some parameters. Among these parameters, some are *reserved* to a specific block and some are *global*. Here is a list of all global parameters.\n::\nI will use the notation `keyword*` as a shortcut to: `keyword, keyword-top, keyword-left, keyword-right, keyword-bottom`\n\n- `margin*` : The space around the block.\n- `padding*` : The space inside the block.\n- `fs` : The font size\n- `ff` : The font family\n- `fg` : The color of the text (foreground)\n- `bg` : The color of the background\n- `zIndex` : The z-index of the block (to position in front or behind other elements).\n\nNote that `margin-top`, `margin-bottom` etc... can be reduced to `mt`, `mb` etc... (same with padding).\n\n## Quotes\n\nQuotes are simply defined by using the `>` symbol at the start of each line of the quote. To set the author of the quote, use the `> -` before the name of the author.\n\n> This is a simple quote\n> - Author\n\n\n## Columns\n\nYou can define your own column block by using the `[columns]` tag. You can define the number of columns by using the `n` parameter and the gap between columns with the `gap` parameter. By default, there are two columns with a 1cm gap.\nYou can use this feature to define a split table, for instance.\n\n[newcolumn]\n\n[columns gap=0.5cm]\n\n##### Left Table\n| Column 1 | Column 2 |\n|----------|----------|\n| Value 1  | Value 2  |\n\n##### Right Table\n| Column 1 | Column 2 |\n|----------|----------|\n| Value 1  | Value 2  |\n\n[/columns]\n:\n\nThis result was obtained by using the following tag: `[columns gap=0.5cm]`, and by placing two tables inside.\n\n::\n**KEYWORDS**: `wide`  \n**PARAMETERS**: `n, gap, margin*, padding*, ff, fs`  \n:\n## Notes and Description\nYou can simply define notes and descriptions by using the appropriate tag, `[note]` or `[description]`.\n\n[note]\n##### Note\nThis is a note\n```\n[note]\n##### Note\nThis is a note\n[/note]\n```\n[/note]\n\n[description]\n##### Description\nThis is a description\n```\n[description]\n##### Description\nThis is a description\n[/description]\n```\n[/description]\n\n[description bg=#f8d4fc fs=14pt]\nI'm a pink description!\n```\n[description bg=#f8d4fc fs=14pt]\nI'm a pink description!\n[/description]\n```\n[/description]\n\n[footer number]Chapter 2: Blocks[/footer]\n\n[newpage]\n\n## Watercoloring\nWatercolors are a feature greatly appreciated, but difficult to manage properly. Well, not anymore!\n\nYou can directly inject watercolors inside your document by selecting one in the **Snippets Sailor**!  \nOnce the tag is inserted, you can simply add the image inside the watercolor tag and position it as you would normally do with any image.\n\n[watercolor tr mask=c-14 size=58%]\n[image link='./styles/bird.png' width=100% absolute right=-150px top=-80px]\n[/watercolor]\n\n[caption absolute right=1cm top=8cm fg=#fff radius=8px text-align=center][s 0.3em]AI Generated by<br>Firefly[/s][/caption]\n\nThe `watercolor` tag accepts some parameters and keywords (of course!). First of all, the `size` parameter allows you to set the size of the watercolor, and the `x` and `y` parameters allow you to position the watercolor. You can also specify its opacity with the `opacity` parameter, and the color using the `color` (or `bg`) parameter (in case you want a stained effect).\n\nMore importantly, the watercolor also takes some keywords that modify its position. By default, the watercolor is positioned to the bottom left of the page. You can change its anchor by specifying it using the `top` and `right` keywords. You can also use the shortcuts `tr, tl, br, bl` for top right, top left, bottom right, and bottom left respectively.  \nFor instance, the watercolor on the right is defined as `[watercolor tr mask=c-14 size=58%]`.\n\nThe `mask` keyword is reserved for the predefined templates. If you want to use your own mask, you can specify it using the `link` parameter instead.  [vspace]  \n\nFinally, you can use the `reverse` keyword if you want the masked region to be the ***opposite*** of the current region!\n\n## Monster Stats\n\n[monster classic]\n## Monster Name\n*Medium humanoid, any alignment*\n___\n**Armor Class** :: 10\n**Hit Points** :: 22 (5d8)\n**Speed** :: 30 ft.\n___\n|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |\n|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|\n|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|\n___\n**Senses** :: passive Perception 10\n**Languages** :: —\n**Challenge** :: 1 (200 XP)\n___\n***Feature 1*** Description. [vspace]\n***Feature 2*** Description. \n\n### Actions\n***Action 1*** Description. [vspace]\n***Action 2*** Description. \n[/monster]\n\n[newcolumn]\n\n[vspace 10cm]\n\n[monster brs]\n## Monster Name\n*Medium humanoid, any alignment*\n___\n**Armor Class** :: 10\n**Hit Points** :: 22 (5d8)\n**Speed** :: 30 ft.\n___\n|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |\n|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|\n|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|10 (+0)|\n___\n**Senses** :: passive Perception 10\n**Languages** :: —\n**Challenge** :: 1 (200 XP)\n___\n***Feature 1*** Description. [vspace]\n***Feature 2*** Description. \n\n### Actions\n***Action 1*** Description. [vspace]\n***Action 2*** Description. \n[/monster]\n\nThere are multiple templates to build a monster block. On the left, you can see the *classic* monster block, and above, the monster block found in the basic rules `brs`.  \nTo switch between styles, add the appropriate keyword to the `[monster]` tag.  \nAdditionally, you can remove the frame from the monster block by using the `noframe` keyword.  \n:\n**KEYWORDS**: `classic, brs, notitle`  \n\n[footer number xgte]Watercolor[/footer]\n\n\n[newpage]\n\n## Captions\nCaptions are generally used in combination with images, to credit the artist or to *caption* the image.  \nCaptions are positioned the same as images, with the `absolute` or `relative` keywords, and access to `top`, `bottom`...\n::\n\n[caption]This is a caption[/caption]\n\n## Chapter & Parts\n\n### Chapters\nYou can define a chapter by using the `[chapter]` tag. By default, it will add \"Chapter X:\" before the title of the chapter. This depends on the theme you applied.  \nYou can change this by using the `prefix` parameter if you still wish to conserve the numbering, or by using the `title` to remove it. If you don't want anything at all before the title, you can use the `notitle` keyword.  \n\n```\n[chapter prefix=\"Level\"]\n# My Chapter\n[/chapter]\n```\nYou can apply a theme by using the keyword of the theme inside the chapter tag. \nSome themes support the `decoration=x` parameter, with x being a number (if there are different styles). By using the colored keyword, it makes the next lettrine uses a gradiant color. You can change this color by using a color as keyword.\n::\n**KEYWORDS**: `notitle, colored, *theme*`  \n**PARAMETERS**: `decoration, prefix, title, margin*`\n\n### Parts\nSimilarly to chapters, part are defined using the `[part]` tag and are sensible to themes.\n::\n**KEYWORDS**: `*theme*`  \n**PARAMETERS**: `margin*`\n\n## Footers\nFooters are disabled by default. In order to show it, you have to manually add it to the page by using the `[footer]` tag. You can use the `number` parameter to set the number showing -- if you don't give any value, it will use the automatic counter. If you still want the number or the footnote text to show but don't want the decoration, you can use the `hide` keyword.  \nNote: the footer automatically changes side depending on the page.\n::\n**KEYWORDS**: `*theme*, hide`  \n**PARAMETERS**: `fg, number`\n\n\n## Spaces\nIt is possible to add blank spaces of any size to help you better control the layout.  \n`[vspace]` (or `[vp]`) and `[hspace]` (or `[hs]`) allows to add respectively a vertical and horizontal space. You can define the size of the space as `[vs size]`.  \n**Example:** `[vs 1em]` or `[hs 1.2cm]`.\n\n## Frames\n\nFrames are blocks with a fancy border.\n:\n\n[frame]\nThis is the classic frame. It is notably used for big tables. It comes with a white background.\n[/frame]\n\n[frame simple]\nThis is a simpler frame. It has a transparent background. It uses the `simple` keyword.\n[/frame]\n\n[frame small]\nThis is another frame that uses the `small` keyword.\n[/frame]\n\n[frame card]\nThe final frame available, and it uses the `card` keyword. Contrary to the others, it is compatible with background change.\n[/frame]\n:\n\nWhen using the *classic* frame or the *card* frame, you can add an extra decoration by using the `decoration` keyword. By default, the decorations are added to the top and the bottom of the frame. If you want to only display the top, add the `top` keyword (or the `bottom` if you only want to use the bottom). **Warning**: it will hide both if you use both keywords.\n\nYou can get pretty creative with the usage of frames.\n::\n\n[frame card]\n#### Name of the item\n*My item rarity and other information*\n[/frame]\n\n[frame card decoration]\n:\nThis is a frame using the decoration features. As you can see, the decoration extends a bit far, so the bigger the frame is, the better it looks. I added some spaces to cheat a bit! This might be the description of the item.\n::\n[/frame]\n\n[frame card]\nFinal frame! Maybe additional information, or an image.\n[/frame]\n\n[footer number]Footer Demonstration[/footer]\n\n[newpage]\n\n[part brs]\n\n# Part 2\n## The Editor Interface\n\n[/part]\n\n[footer number][/footer]\n\n[newpage]\n\n## Customization Apps\n\nThere are 5 different apps available to ease the customization of the document. Please note that these modifications are *global*, which means that *all* elements of the type you modify will be affected. You can still use tags to locally change the properties.  \n:\n\n[i fa-solid fa-gear][/i] **Document Settings** :: Allows you to change the document's title, as well as the **theme**, the page layout (number of columns) and the margins.  \nYou can also decide whether or not you want certain symbols to be replaced by simply checking the box next to the line.\n:\n\n[i fa-solid fa-fill-drip][/i] **Colors** :: Allows you to pick the colors for the different elements of the page. You can easily change the font color of the titles, the text, the background of the note block, etc. The changes are *global*, which means that you are setting the *default* color.  \n:\n\n[i fa-solid fa-pen-nib][/i] **Fonts** :: Allows you to change the text appearance of various elements. You can change the font family and the size. Currently, the tool does not support custom fonts. If you want to have a custom font, you will have to do it the old-fashioned CSS way.  \n:\n\n[i fa-solid fa-wand-magic-sparkles][/i] **Snippets** :: Allows you to directly insert full elements by simply clicking on them. The different snippets are sorted by categories. There is a \"real-time\" preview of the snippet when you hover your mouse over it.  \n:\n\n[i fa-solid fa-bolt][/i] **Quick Snippets** :: Same as **Snippets**, but quicker and less extensive. It features the \"most useful\" snippets for most D&D brews.\n:\n\n\n## Page Format & Printing\n\nTo switch the format of the page, click on the gray button located on the top left of the preview window, right to the save button. You currently have the choice between A4, A5 and Letter (US).\n\nTo print the document, click on the red button located on the top right of the preview window. It will open a new window containing the pages to print. It can happen that the print window shows up before the page finishes loading. In this case, simply close and then reopen the popup window (Ctrl+P by default on most browsers).  \nBe sure to select the correct format, set margins to none, and print background images. This should be it.\n::\n\n## REDACTION IN PROGRESS \n\n[footer show number teal phb][/footer]\n\n[newpage]\n\n[chapter decoration notitle]\n# Last Words\n[/chapter]\n\n\n## What's Next?\n\nI plan on adding *at least* the following:\n\n[vspace]\n\n**Document's Variables** :: Variables would allow you to store a value and use the variable instead of the value inside the editor. Then, during compilation, the variable would be converted to its value.<br>The syntax should be something like {{my-variable}}.\n\n[vspace]\n\n**More Theme** :: Adding support for other RPGs, like WFRP for instance, and, of course, having more themes available for every *main template*.\n\n[vspace]\n\n**More Vectorization** :: Footers, headers, borders... you name it. The more, the better, as images are lighter and of infinitely better quality!\n:\n\n## Known Issues\n\n\n- Some SVGs are rendered as static images when saving as PDF, which makes the whole idea of using an SVG pointless. This is notably the case with the \"frame decoration\".\n::\n- For security reasons, you can't use a local image as a mask.\n::\n- For security reasons, browsers don't allow applications and pages to automatically save to and load from local files. Therefore, there are no automatic saves! *(At least not until a server version of this editor)*.\n::\n- Images using the `multiply` keyword do not render properly when saved as PDF through a Mozilla-based browser (i.e. Firefox or LibreWolf).\n::\n- Internal links do not work when saving as PDF.\n::\n- Printing with Safari does not work. This is due to how the printer works, there is nothing I can do about it.\n\n\n\n[newcolumn]\n\n## Disclaimer\nI drew inspiration for the syntax from [The Homebrewery](https://github.com/naturalcrit/homebrewery) and [GMBinder](https://www.gmbinder.com/), although I want to clarify that I haven't directly copied or used any of their code or scripts. However, I may have utilized some CSS properties for reference.\n\nThis tool is still in its early stages of development, and I've shared it on GitHub for testing purposes. The code may be messy for now, but I plan to clean it up later. I welcome any suggestions regarding any aspect of the tool.\n\nFeel free to take and reuse my code as you see fit. Additionally, you're welcome to use any images I've taken the time to vectorize by hand.\n\n## Thanks\nThis tool was made using:\n  -  [Ace](https://github.com/ajaxorg/ace) as its editor\n  -  [Marked](https://github.com/markedjs/marked) (modified) as its markdown parser\n  -  [Solbera D&D Fonts](https://github.com/jonathonf/solbera-dnd-fonts) for the *free* version of the fonts\n  -  [The Homebrewery](https://github.com/naturalcrit/homebrewery) for some images\n  -  [Sovngarde Font](https://www.nexusmods.com/skyrimspecialedition/mods/386) for the subtitles of the part. I like this font.\n  -  [Jared Ondricek](https://watercolors.giantsoup.com/) for the watercolors. I took some and transformed them into masks.\n  -  [Kaiburr](https://ko-fi.com/kaiburrkathhound) for their work on D&D themes. I took some assets or used their template as inspiration.\n\n[watercolor br mask=b-4 x=0 y=-400px size=100% color=#00000022]\n[image link='./styles/dragon.jpg' width=100% absolute top=100px]\n[/watercolor]\n\n[footer number dmg red][/footer]\n\n[newpage]\n\n[cover back]\n\n## Final Words\nIf you have any ideas on how to improve this editor, what you would like to see, or what's wrong with the current state of the tool, don't hesitate to reach out to me.\n  \nAlso, I used some assets that I scraped from around the web and had saved on my computer. If you are the original creator of one of these assets and are not okay with their use here, send me a message and I will remove them immediately.\n\n___\n\nThis editor was created by me alone. Please understand that there may be some bugs present.\nIt is free and always will be.\n\nThank you for your time.\n\n\n[/cover]",
    css: "/* CSS */",
    title: "The Tales Curator Guide",
    style: {
        template: ["5e.css"],
        keyword: "phb",
        style: {
            ":root": {
                "--page-width": "215.9mm",
                "--page-height": "279.4mm",
                "--page-margin-left": "1.8cm",
                "--page-margin-right": "1.8cm",
                "--page-margin-top": "1.4cm",
                "--page-margin-bottom": "1.6cm",
                "--column-count": "2",
                "--text-color": "#231f20",
                "--heading-color": "#58180D",
                "--table-heading-color": "#231f20",
                "--table-text-color": "#231f20",
                "--primary-color": "#C9AD6A",
                "--secondary-color": "#d9dea9",
                "--table-color": "#ffffff00",
                "--description-color": "#f8f1da",
                "--note-color": "#f8f1da",
                "--monster-text-color": "#58180D",
                "--monster-separator-color": "#9c2b1b",
                "--monster-background-color": "#fbf8f4",
                "--legend-color": "#766649",
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
                "--legend-font": "Zatanna Misdirection",
                "--quote-font": "Sedan",
                "--cover-title-size": "60pt",
                "--cover-subtitle-size": "30pt",
                "--text-size": "9.2pt",
                "--h1-size": "24pt",
                "--h2-size": "23pt",
                "--h3-size": "16pt",
                "--h4-size": "14pt",
                "--table-title-size": "12pt",
                "--table-text-size": "9pt",
                "--note-text-size": "9.5pt",
                "--quote-size": "11pt",
                "--lettrine-size": "95pt",
                "--legend-size": "14pt",
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
            p: { "line-height": "1.2" },
        },
    },
};
