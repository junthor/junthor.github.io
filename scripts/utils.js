const DEFAULT_REGEX = {
  number: /(\d+)/i,
  size: /((?:\d+(.\d+)?)(?:px|em|%|cm|rem|pt)\s*)+/i,
  position: /((\d+)(px|em|%|cm|rem|pt)|0)/i,
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

  part: {
    tag: 'div',
    params: {
      margin: DEFAULT_PROPERTIES["margin"],
      'margin-top': DEFAULT_PROPERTIES["margin-top"],
      'margin-bottom': DEFAULT_PROPERTIES["margin-bottom"],
      'margin-left': DEFAULT_PROPERTIES["margin-left"],
      'margin-right': DEFAULT_PROPERTIES["margin-right"],
    },
    keywords: {
      dmg: ['class', 'dmg'],
      phb: ['class', 'phb'],
      brs: ['class', 'brs'],
    },
    auto_params: {
      class: 'part wide'
    }
  }, 

  stroke: {
    full_tag: true,
    regex: {
      "<div style='-webkit-text-stroke:$1 #$3; position:relative'>$4<span class='text-stroke'>$4</span></div>":
      /\[stroke ((?:\d+(.\d+)?)(?:px|em|%|pt|rem)\s*)+ #((?:[\d|a-f|A-F]{3}){1,2})\](.*?)\[\/stroke\]/gi,
      "<div style='-webkit-text-stroke:$3 #$1; position:relative'>$4<span class='text-stroke'>$4</span></div>":
      /\[stroke #((?:[\d|a-f|A-F]{3}){1,2}) ((?:\d+(.\d+)?)(?:px|em|%|pt|rem)\s*)+\](.*?)\[\/stroke\]/gi,
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
      smallcaps: ['style', 'font-variant: small-caps'],
      italic: ['style', 'font-style: italic'],
      bold: ['style', 'font-weight: bold'],
    }
  },
  
  text: {
    tag: 'span',
    params: {
      color: DEFAULT_PROPERTIES["fg"],
      size: DEFAULT_PROPERTIES["font-size"],
      font: DEFAULT_PROPERTIES["font-family"],
      bg: DEFAULT_PROPERTIES["bg"],
      transform: ['style', 'font-variant:', DEFAULT_REGEX["variant"]]
    },
    keywords: {
      smallcaps: ['style', 'font-variant: small-caps'],
      italic: ['style', 'font-style: italic'],
      bold: ['style', 'font-weight: bold'],
    }
  },
  t: { alias: 'text' },

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

  watercolor: {
    tag: 'div',
    add_start: '<div class="wc-container">',
    add_end: '</div>',
    params: {
      mask: ['style', "mask-image: url('https://junthor.github.io/styles/watercolor/", DEFAULT_REGEX["text"], ".png'), linear-gradient(#fff, #fff)"],
      link: ['style', "mask-image: url('", DEFAULT_REGEX["text"], "')"],
      size: ['style', "mask-size:", DEFAULT_REGEX["size"]],
      bg: DEFAULT_PROPERTIES['bg'],
      color: DEFAULT_PROPERTIES['bg'],
      x: ['style', "--wc-x:", DEFAULT_REGEX["size"]],
      y: ['style', "--wc-y: calc(-1 * ", DEFAULT_REGEX["size"], ")"],
      'z-index': DEFAULT_PROPERTIES['z-index'],
      opacity: ['style', 'opacity:', DEFAULT_REGEX["float"]],
    },
    keywords: {
      top: ['class', 'top'],
      right: ['class', 'right'],
      tl: ['class', 'top'],
      br: ['class', 'right'],
      tr: ['class', 'top right'],
      front: ['style', 'z-index: 2'],
      reverse: ['style', 'mask-composite:exclude']
    },
    auto_params: {
      class: 'watercolor'
    }
  },

  name: {
    tag: 'div',
    params: DEFAULT_PROPERTIES,
    keywords: {
      absolute: ['style', 'position:absolute']
    },
    auto_params: {
      class: 'name'
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

  note: {
    tag: 'div',
    params: {
      size: ['style', 'font-size:', DEFAULT_REGEX['size']],
      color: DEFAULT_PROPERTIES['font-color'],
      bg: DEFAULT_PROPERTIES['bg']
    },
    keywords: {
      wide: ['class', "wide"]
    },
    auto_params: {
      class: 'note'
    }
  },

  description: {
    tag: 'div',
    params: {
      size: ['style', 'font-size:', DEFAULT_REGEX['size']],
      color: DEFAULT_PROPERTIES['font-color'],
      bg: DEFAULT_PROPERTIES['bg']
    },
    keywords: {
      wide: ['class', "wide"]
    },
    auto_params: {
      class: 'description'
    }
  },

  frame: {
    tag: 'div',
    params: DEFAULT_PROPERTIES,
    keywords: {
      left: ['style', 'float: left'],
      right: ['style', 'float: right'],
      multiply: ['style', 'mix-blend-mode: multiply'],
      absolute: ['style', 'position:absolute'],
      wide: ['class', "wide"],
      simple: ['class', "simple"],
      small: ['class', "small"],
    },
    auto_params: {
      'class': 'frame'
    }
  },

  monster: {
    tag: 'div',
    params: DEFAULT_PROPERTIES,
    keywords: {
      wide: ['class', "wide"],
      brs: ['class', "brs"],
    },
    auto_params: {
      'class': 'monster'
    } 
  },

  columns: {
    tag: 'div',
    params: {
      size: ['style', 'columns:', DEFAULT_REGEX["number"]],
      gap: ['style', 'column-gap:', DEFAULT_REGEX["size"]],
    },
    keywords: {
      wide: ['class', 'wide'],
      2: ['style', 'columns:2'],
      3: ['style', 'columns:3'],
    },
    auto_params: {
      class: 'column'
    }
  }, 

  banner: {
    tag: 'div',
    params: {},
    keywords: {
      simple: ['class', 'simple'],
      ribbon: ['class', 'ribbon'],
      noshadow: ['style', 'filter: none'],
    },
    auto_params: { class: 'banner' }
  },

  footer: {
    tag: 'div',
    add_start: '<div class="footnote">',
    add_end: '</div>',
    params: {
      color: DEFAULT_PROPERTIES['fg'],
      number: ['style', "--footer-number: '", /\d+/, "'"]
    },
    keywords: {
      number: ['style', '--footer-number: counter(number-of-page)'],
      hide: ['style', 'background:none'],
      phb: ['class', 'phb'],
      draco: ['class', 'draco'],
      xgte: ['class', 'xgte'],
      ee: ['class', 'ee'],
      mtof: ['class', 'mtof'],
      dmg: ['class', 'dmg'],
      // Variants
      blue: ['class', 'blue'],
      green: ['class', 'green'],
      purple: ['class', 'purple'],
      red: ['class', 'red'],
      teal: ['class', 'teal'],
      yellow: ['class', 'yellow'],
    },
    auto_params: { class: 'footer' }
  },

  vspace: {
    full_tag: false,
    regex: {
      "<div style='margin-top:$1'></div>": /\[vspace ((?:\d+(.\d+)?)(?:px|em|%|cm|pt|rem)\s*)+\]/gi,
    }
  },

  hspace: {
    full_tag: false,
    regex: {
      "<div style='display:inline-block;width:$1'></div>": /\[hspace ((?:\d+(.\d+)?)(?:px|em|%|cm|pt|rem)\s*)+\]/gi,
    }
  },

};

const BBCODE_TAGS_STATIC = {
  "[toc]": "<div id='auto-generated-toc'></div>",
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

  "[newcolumn]": '<div class="column-break"></div>',
  "[nextcolumn]": '<div style="display:inline-block"></div><div class="column-break"></div>',
  "[columnbreak]": '<div style="display:inline-block"></div><div class="column-break"></div>',
  "[/monster]": "</div>",

  "[left]": '<p style="text-align:left;">',
  "[/left]": "</p>",
  "[right]": '<p style="text-align:right;">',
  "[/right]": "</p>",
  "[center]": '<p style="text-align:center;">',
  "[/center]": "</p>",
  "[justify]": '<p style="text-align:justify;">',
  "[/justify]": "</p>",

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

  "[big]": '<span style="font-size: 125%">',
  "[/big]": "</span>",
  "[small]": '<span style="font-size: 75%">',
  "[/small]": "</span>",

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

  "[separator diamond]": "<img src='./styles/diamond_title.svg' class='cover-diamond' />",

  "[hspace]": "<div style='width:1em; display: inline-block'></div>",
  "[vspace]": "<div style='height:1em;'></div>"
};