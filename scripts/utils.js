const DEFAULT_REGEX = {
  size: /((?:\d+(.\d+)?)(?:px|em|%|cm)\s*)+/i,
  position: /((\d+)(px|em|%)|0)/i,
  color: /#((?:[\d|a-f|A-F]{3}){1,2})/i,
  text: /(.*?)/i,
  link: /(.*)/i,
  text_align: /(left|right|justify|center)/i,
  align: /(left|right|center)/i,
  variant: /(small-caps|normal|initial|inherit)/i,
  float: /(1.0+|0.\d+)/i,
  degree: /((?:\d+))+/i,
};

const DEFAULT_PROPERTIES = {
  class: ['class', '', DEFAULT_REGEX["text"]],

  // DIMENSIONS
  width: ['style', 'width:', DEFAULT_REGEX["size"]],
  size: ['style', 'width:', DEFAULT_REGEX["size"]],
  height: ['style', 'height:', DEFAULT_REGEX["size"]],

  'z-index': ['style', 'z-index:', /\d+/],

  // STYLING
  bg: ['style', 'background-color:', DEFAULT_REGEX["color"]],
  fg: ['style', 'color:', DEFAULT_REGEX["color"]],
  color: ['style', 'background-color:', DEFAULT_REGEX["color"]],
  radius: ['style', 'border-radius:', DEFAULT_REGEX["size"]],
  border: ['style', 'border:', DEFAULT_REGEX["text"]],
  rotate: ['style', 'transform: rotate(', DEFAULT_REGEX["text"], 'deg)'],

  // FONT
  fg: ['style', 'color:', DEFAULT_REGEX["color"]],
  'font-color': ['style', 'color:', DEFAULT_REGEX["color"]],
  'font-size': ['style', 'font-size:', DEFAULT_REGEX["size"]],
  'font-family': ['style', 'font-family:', DEFAULT_REGEX["text"]],
  'text-align': ['style', 'text-align:', DEFAULT_REGEX["align"]],
  
  // POSITIONING
  align: ['style', 'float:', DEFAULT_REGEX["align"]],
  position: ['style', 'position:', /(relative|absolute|fixed)/i],
  top: ['style', 'top:', DEFAULT_REGEX["position"]],
  bottom: ['style', 'bottom:', DEFAULT_REGEX["position"]],
  left: ['style', 'left:', DEFAULT_REGEX["position"]],
  right: ['style', 'right:', DEFAULT_REGEX["position"]],

  margin: ['style', 'margin:', DEFAULT_REGEX["size"]],
  'margin-top': ['style', 'margin-top:', DEFAULT_REGEX["size"]],
  'margin-bottom': ['style', 'margin-bottom:', DEFAULT_REGEX["size"]],
  'margin-left': ['style', 'margin-left:', DEFAULT_REGEX["size"]],
  'margin-right': ['style', 'margin-right:', DEFAULT_REGEX["size"]],

  padding: ['style', 'padding:', DEFAULT_REGEX["size"]],
  'padding-top': ['style', 'padding-top:', DEFAULT_REGEX["size"]],
  'padding-bottom': ['style', 'padding-bottom:', DEFAULT_REGEX["size"]],
  'padding-left': ['style', 'padding-left:', DEFAULT_REGEX["size"]],
  'padding-right': ['style', 'padding-right:', DEFAULT_REGEX["size"]],
}

const SEPARATOR = {
  style: ';',
  class: ' ',
}

let DEBUG_COUNT = 0

const BBCODE_TAGS = {
  stroke: {
    full_tag: true,
    regex: {
      "<div style='-webkit-text-stroke:$1 #$3; position:relative'>$4<span class='text-stroke'>$4</span></div>":
      /\[stroke ((?:\d+(.\d+)?)(?:px|em|%)\s*)+ #((?:[\d|a-f|A-F]{3}){1,2})\](.*?)\[\/stroke\]/gi,
      "<div style='-webkit-text-stroke:$3 #$1; position:relative'>$4<span class='text-stroke'>$4</span></div>":
      /\[stroke #((?:[\d|a-f|A-F]{3}){1,2}) ((?:\d+(.\d+)?)(?:px|em|%)\s*)+\](.*?)\[\/stroke\]/gi,
    }
  },
  p: {
    tag: 'p',
    params: {
      color: DEFAULT_PROPERTIES["fg"],
      size: DEFAULT_PROPERTIES["font-size"],
      bg: DEFAULT_PROPERTIES["bg"],
      transform: ['style', 'font-variant:', DEFAULT_REGEX["variant"]],
    },
    keywords: {
      center: ['style', 'text-align: center'],
      left: ['style', 'text-align: left'],
      right: ['style', 'text-align: right'],
      justify: ['style', 'text-align: justify'],
      smallcaps: ['style', 'font-variant: smallcaps'],
      italic: ['style', 'font-style: italic'],
      bold: ['style', 'font-weight: bold'],
    }
  },
  text: {
    tag: 'span',
    params: {
      color: DEFAULT_PROPERTIES["fg"],
      size: DEFAULT_PROPERTIES["font-size"],
      bg: DEFAULT_PROPERTIES["bg"],
      transform: ['style', 'font-variant:', DEFAULT_REGEX["variant"]]
    },
    keywords: {
      smallcaps: ['style', 'font-variant: smallcaps'],
      italic: ['style', 'font-style: italic'],
      bold: ['style', 'font-weight: bold'],
    }
  },
  t: { alias: 'text' },
  fill: {
    full_tag: false,
    regex: {
      "<div class='fill' style='background-color:#$1; width: 100%; height: 100%;'>": /\[fill #([\da-f]+)\](\s*)/gi,
    }
  },
  url: {
    full_tag: true,
    regex: {
      "<a href='$1' title='$1'>$2</a>": /\[url link=(.*?)\](.*?)\[\/url\]/gi,
      "<a href='http://$1' title='$1'>$1</a>": /\[url](.*?)\[\/url]/gi,
    }
  },
  goto: {
    full_tag: true,
    regex: {
      "<a href='$1' title='$1'>$2</a>": /\[goto (.*?)\](.*?)\[\/goto\]/gi,
    }
  },
  link: {
    full_tag: true,
    regex: {
      "<a href='$1' title='$1'>$2</a>": /\[link (.*?)\](.*?)\[\/link\]/gi,
    }
  },
  color: {
    full_tag: false,
    regex: {
      "<span style='color:#$1'>": /\[color #([\da-f]+)\]/gi,
    }
  },
  image: {
    tag: 'img',
    self_closing: true,
    params: {
      src: ['src', '', DEFAULT_REGEX["text"]],
      link: ['src', '', DEFAULT_REGEX["text"]],
      opacity: ['style', 'opacity:', DEFAULT_REGEX["float"]],

      width: DEFAULT_PROPERTIES["width"],
      size: DEFAULT_PROPERTIES["width"],
      height: DEFAULT_PROPERTIES["height"],
      align: DEFAULT_PROPERTIES["align"],
      position: DEFAULT_PROPERTIES["position"],
      top: DEFAULT_PROPERTIES["top"],
      bottom: DEFAULT_PROPERTIES["bottom"],
      left: DEFAULT_PROPERTIES["left"],
      right: DEFAULT_PROPERTIES["right"],
      class: DEFAULT_PROPERTIES["class"],

      'z-index': DEFAULT_PROPERTIES['z-index'],

      padding: DEFAULT_PROPERTIES["padding"],
      'padding-top': DEFAULT_PROPERTIES["padding-top"],
      'padding-bottom': DEFAULT_PROPERTIES["padding-bottom"],
      'padding-left': DEFAULT_PROPERTIES["padding-left"],
      'padding-right': DEFAULT_PROPERTIES["padding-right"],

      margin: DEFAULT_PROPERTIES["margin"],
      'margin-top': DEFAULT_PROPERTIES["margin-top"],
      'margin-bottom': DEFAULT_PROPERTIES["margin-bottom"],
      'margin-left': DEFAULT_PROPERTIES["margin-left"],
      'margin-right': DEFAULT_PROPERTIES["margin-right"],
    },
    keywords: {
      left: ['style', 'float: left'],
      right: ['style', 'float: right'],
      multiply: ['style', 'mix-blend-mode: multiply'],
      absolute: ['style', 'position:absolute'],
      front: ['style', 'z-index:1'],
    }
  },
  block: {
    tag: 'div',
    params: DEFAULT_PROPERTIES,
    keywords: {
      left: ['style', 'float: left'],
      right: ['style', 'float: right'],
      multiply: ['style', 'mix-blend-mode: multiply'],
      absolute: ['style', 'position:absolute'],
      wide: ['class', "wide"]
    }
  },
  column: {
    tag: 'div',
    params: {
      size: ['style', 'flex-grow:0;flex-shrink:0;width:', DEFAULT_REGEX["size"]],
      min: ['style', 'flex-shrink:1;min-width:', DEFAULT_REGEX["size"]],
    },
    keywords: {
      center: ['class', 'ccolumn'],
      end: ['class', 'ecolumn'],
      nowrap: ['style', 'flex-wrap:nowrap']
    },
    auto_params: {
      class: 'column'
    }
  }, 

  vspace: {
    full_tag: false,
    regex: {
      "<div style='margin-top:$1'></div>": /\[vspace ((?:\d+(.\d+)?)(?:px|em|%|cm)\s*)+\]/gi,
    }
  },
  hspace: {
    full_tag: false,
    regex: {
      "<div style='display:inline-block;width:$1'></div>": /\[hspace ((?:\d+(.\d+)?)(?:px|em|%|cm)\s*)+\]/gi,
    }
  },

  row: {
    tag: 'div',
    params: {
      size: ['style', 'flex-grow: 0;flex-shrink: 0;height:', DEFAULT_REGEX["size"]],
      min: ['style', 'min-height:', DEFAULT_REGEX["size"]],

      class: DEFAULT_PROPERTIES["class"],
      bg: DEFAULT_PROPERTIES["bg"],
      padding: DEFAULT_PROPERTIES["padding"],
      'padding-top': DEFAULT_PROPERTIES["padding-top"],
      'padding-bottom': DEFAULT_PROPERTIES["padding-bottom"],
      'padding-left': DEFAULT_PROPERTIES["padding-left"],
      'padding-right': DEFAULT_PROPERTIES["padding-right"],

      margin: DEFAULT_PROPERTIES["margin"],
      'margin-top': DEFAULT_PROPERTIES["margin-top"],
      'margin-bottom': DEFAULT_PROPERTIES["margin-bottom"],
      'margin-left': DEFAULT_PROPERTIES["margin-left"],
      'margin-right': DEFAULT_PROPERTIES["margin-right"],
    },
    keywords: {
      nowrap: ['class', 'nowrap']
    },
    auto_params: {
      class: 'row text'
    }
  }, 

};

const BBCODE_TAGS_STATIC = {
  "[part]": "<div class='part wide'>",
  "[/part]": "</div>",
  "[cover]": "<div class='cover wide'>",
  "[/cover]": "</div>",
  "[h1]": "<h1>",
  "[/h1]": "</h1>",
  "[h2]": "<h2>",
  "[/h2]": "</h2>",
  "[h3]": "<h3>",
  "[/h3]": "</h3>",

  "[wide]": '<div class="wide">',
  "[/wide]": "</div>",
  "[block]": "<div>",
  "[/block]": "</div>",
  "[newcolumn]": '<div class="column-break"></div>',
  "[nextcolumn]": '<div class="column-break"></div>',
  "[columnbreak]": '<div class="column-break"></div>',
  

  "[newpage num]": '[newpage]<div class="page-number"></div>',
  "[newpage number]": '[newpage]<div class="page-number"></div>',
  "[newpage empty]": '[newpage]<div class="empty"></div>',

  "[page number]": '<div class="page-number"></div>',
  "[page num]": '<div class="page-number"></div>',
  "[nofooter]": '<div class="empty"></div>',


  "[text]": "<span>", "[/text]": "</span>",
  "[/t]": "</span>",
  "[p]": "<p>",
  "[/p]": "</p>",

  "[left]": '<p style="text-align:left;">',
  "[/left]": "</p>",
  "[right]": '<p style="text-align:right;">',
  "[/right]": "</p>",
  "[center]": '<p style="text-align:center;">',
  "[/center]": "</p>",
  "[justify]": '<p style="text-align:justify;">',
  "[/justify]": "</p>",

  "[columns]": '<div class="columns text">',
  "[/columns]": "</div>",
  "[column]": '<div class="column">',
  "[/column]": "</div>",
  "[row]": '<div class="row text">',
  "[/row]": "</div>",
  "[/fill]": "</div>",

  "[b]": "<strong>",
  "[/b]": "</strong>",
  "[i]": "<i>",
  "[/i]": "</i>",
  "[u]": "<u>",
  "[/u]": "</u>",
  "[break]": "<br>",
  "[br]": "<br>",
  "[newline]": "<br>",
  "[nl]": "<br>",

  "[list unordered]": "<ul>",
  "[/list unordered]": "</ul>",
  "[list]": "<ul>",
  "[/list]": "</ul>",
  "[ul]": "<ul>",
  "[/ul]": "</ul>",

  "[list ordered]": "<ol>",
  "[/list ordered]": "</ol>",
  "[ol]": "<ol>",
  "[/ol]": "</ol>",
  "[list_item]": "<li>",
  "[/list_item]": "</li>",
  "[li]": "<li>",
  "[/li]": "</li>",

  "[red]": '<span style="color:red">',
  "[/red]": "</span>",
  "[blue]": '<span style="color:dodgerblue">',
  "[/blue]": "</span>",
  "[green]": '<span style="color:green">',
  "[/green]": "</span>",
  "[/color]": "</span>",
  "[/size]": "</span>",

  "[big]": '<span style="font-size: 125%">',
  "[/big]": "</span>",
  "[small]": '<span style="font-size: 75%">',
  "[/small]": "</span>",

  "[*]": "<li>",
  "[/*]": "</li>",
  "[-]": "<li>",
  "[/-]": "</li>",
  "[code]": "<code>",
  "[/code]": "</code>",

  "[pre]": "<pre>",
  "[/pre]": "</pre>",

  "[quote]": '<blockquote>',
  "[/quote]": "</blockquote>",

  "[note]": "<div class='note'>",
  "[/note]": "</div>",
  "[description]": "<div class='description'>",
  "[/description]": "</div>",

  "[monster]": "<div class='monster'><div class='border'></div><div class='monster-content'>",
  "[/monster]": "</div><div class='border'></div></div>",
  "[monster wide]": "<div class='monster wide'><div class='border'></div><div class='monster-content'>",

  "[monster notop]": "<div class='monster'><div class='monster-content'>",
  "[/monster nobottom]": "</div></div>",

  "[splootch]": "<div class='splootch'>",
  "[/splootch]": "</div>",

  "[separator diamond]": "<img src='./styles/diamond_title.svg' class='cover-diamond' />",

  "[hspace]": "<div style='width:1em; display: inline-block'></div>",
  "[vspace]": "<div style='height:1em;'></div>"
};