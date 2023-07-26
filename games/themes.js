export const themes = {
  colorful: {
    2: {background: '#FFD700', text: '#333333'}, // Gold
    4: {background: '#FF1493', text: '#FFFFFF'}, // Deep Pink
    8: {background: '#00FF00', text: '#333333'}, // Lime Green
    16: {background: '#1E90FF', text: '#FFFFFF'}, // Dodger Blue
    32: {background: '#FF4500', text: '#FFFFFF'}, // Orange Red
    64: {background: '#FF69B4', text: '#FFFFFF'}, // Hot Pink
    128: {background: '#FFA500', text: '#333333'}, // Orange
    256: {background: '#FFC0CB', text: '#333333'}, // Pink
    512: {background: '#00FFFF', text: '#333333'}, // Cyan
    1024: {background: '#FF00FF', text: '#FFFFFF'}, // Magenta
    2048: {background: '#FFD700', text: '#333333'}, // Gold (same as 2, to provide a sense of completion)
    4096: {background: '#FFFF00', text: '#333333'}, // Yellow
    8192: {background: '#00FF00', text: '#333333'}, // Lime Green (same as 8, to provide a sense of completion)
    16384: {background: '#1E90FF', text: '#FFFFFF'}, // Dodger Blue (same as 16, to provide a sense of completion)
    32768: {background: '#FF4500', text: '#FFFFFF'}, // Orange Red (same as 32, to provide a sense of completion)
  },
  rainbow: {
    2: {background: '#FFD1D1', text: '#333333'}, // Light Red
    4: {background: '#FFAAAA', text: '#333333'}, // Red
    8: {background: '#FF7F7F', text: '#333333'}, // Dark Red
    16: {background: '#FFEDCC', text: '#333333'}, // Light Orange
    32: {background: '#FFD699', text: '#333333'}, // Orange
    64: {background: '#FFC266', text: '#333333'}, // Dark Orange
    128: {background: '#FFFFCC', text: '#333333'}, // Light Yellow
    256: {background: '#FFFF99', text: '#333333'}, // Yellow
    512: {background: '#FFFF66', text: '#333333'}, // Dark Yellow
    1024: {background: '#CCFFCC', text: '#333333'}, // Light Green
    2048: {background: '#99FF99', text: '#333333'}, // Green
    4096: {background: '#66FF66', text: '#333333'}, // Dark Green
    8192: {background: '#CCE5FF', text: '#333333'}, // Light Blue
    16384: {background: '#99CCFF', text: '#333333'}, // Blue
    32768: {background: '#6699FF', text: '#333333'}, // Dark Blue
  },
  classic: {
    2: {background: '#EEE4DA'},
    4: {background: '#EDE0C8'},
    8: {background: '#F2B179'},
    16: {background: '#F59563'},
    32: {background: '#F67C5F'},
    64: {background: '#F65E3B'},
    128: {background: '#EDCF72'},
    256: {background: '#EDCC61'},
    512: {background: '#EDC850'},
    1024: {background: '#EDC53F'},
    2048: {background: '#EDC22E'},
    4096: {background: '#F3B581'},
    8192: {background: '#F39663'},
    16384: {background: '#F37C44'},
    32768: {background: '#F36024'},
  },
  forest: {
    2: {background: '#C7E5C2', text: '#333333'},
    4: {background: '#A1D9A0', text: '#333333'},
    8: {background: '#7BCF7D', text: '#333333'},
    16: {background: '#57C85B', text: '#FFFFFF'},
    32: {background: '#32BF3A', text: '#FFFFFF'},
    64: {background: '#0EAF17', text: '#FFFFFF'},
    128: {background: '#00A40A', text: '#FFFFFF'},
    256: {background: '#009705', text: '#FFFFFF'},
    512: {background: '#008200', text: '#FFFFFF'},
    1024: {background: '#006D00', text: '#FFFFFF'},
    2048: {background: '#005900', text: '#FFFFFF'},
    4096: {background: '#004500', text: '#FFFFFF'},
    8192: {background: '#003100', text: '#FFFFFF'},
    16384: {background: '#001D00', text: '#FFFFFF'},
    32768: {background: '#000900', text: '#FFFFFF'},
  },
  //   red: {
  //     2: {background: '#FFD1D1', text: '#333333'},
  //     4: {background: '#FFAAAA', text: '#333333'},
  //     8: {background: '#FF7F7F', text: '#333333'},
  //     16: {background: '#FF5959', text: '#FFFFFF'},
  //     32: {background: '#FF3333', text: '#FFFFFF'},
  //     64: {background: '#FF0D0D', text: '#FFFFFF'},
  //     128: {background: '#FF0000', text: '#FFFFFF'},
  //     256: {background: '#CC0000', text: '#FFFFFF'},
  //     512: {background: '#990000', text: '#FFFFFF'},
  //     1024: {background: '#660000', text: '#FFFFFF'},
  //     2048: {background: '#330000', text: '#FFFFFF'},
  //     4096: {background: '#990000', text: '#FFFFFF'},
  //     8192: {background: '#660000', text: '#FFFFFF'},
  //     16384: {background: '#330000', text: '#FFFFFF'},
  //     32768: {background: '#000000', text: '#FFFFFF'},
  //   },
  //   orange: {
  //     2: {background: '#FFE5D1', text: '#333333'},
  //     4: {background: '#FFD1AA', text: '#333333'},
  //     8: {background: '#FFBD7F', text: '#333333'},
  //     16: {background: '#FFA959', text: '#FFFFFF'},
  //     32: {background: '#FF9433', text: '#FFFFFF'},
  //     64: {background: '#FF7E0D', text: '#FFFFFF'},
  //     128: {background: '#FF6900', text: '#FFFFFF'},
  //     256: {background: '#CC5200', text: '#FFFFFF'},
  //     512: {background: '#993C00', text: '#FFFFFF'},
  //     1024: {background: '#662500', text: '#FFFFFF'},
  //     2048: {background: '#331000', text: '#FFFFFF'},
  //     4096: {background: '#662500', text: '#FFFFFF'},
  //     8192: {background: '#331000', text: '#FFFFFF'},
  //     16384: {background: '#190500', text: '#FFFFFF'},
  //     32768: {background: '#000000', text: '#FFFFFF'},
  //   },
  //   yellow: {
  //     2: {background: '#FFF8D1', text: '#333333'},
  //     4: {background: '#FFEEAA', text: '#333333'},
  //     8: {background: '#FFE57F', text: '#333333'},
  //     16: {background: '#FFDB59', text: '#333333'},
  //     32: {background: '#FFD133', text: '#FFFFFF'},
  //     64: {background: '#FFC80D', text: '#FFFFFF'},
  //     128: {background: '#FFBF00', text: '#FFFFFF'},
  //     256: {background: '#CC9E00', text: '#FFFFFF'},
  //     512: {background: '#997D00', text: '#FFFFFF'},
  //     1024: {background: '#664C00', text: '#FFFFFF'},
  //     2048: {background: '#331B00', text: '#FFFFFF'},
  //     4096: {background: '#664C00', text: '#FFFFFF'},
  //     8192: {background: '#331B00', text: '#FFFFFF'},
  //     16384: {background: '#190D00', text: '#FFFFFF'},
  //     32768: {background: '#000000', text: '#FFFFFF'},
  //   },
  //   blue: {
  //     2: {background: '#D1D1FF', text: '#333333'},
  //     4: {background: '#AAAAFF', text: '#333333'},
  //     8: {background: '#7F7FFF', text: '#333333'},
  //     16: {background: '#5959FF', text: '#333333'},
  //     32: {background: '#3333FF', text: '#333333'},
  //     64: {background: '#0D0DFF', text: '#FFFFFF'},
  //     128: {background: '#0000FF', text: '#FFFFFF'},
  //     256: {background: '#0000CC', text: '#FFFFFF'},
  //     512: {background: '#000099', text: '#FFFFFF'},
  //     1024: {background: '#000066', text: '#FFFFFF'},
  //     2048: {background: '#000033', text: '#FFFFFF'},
  //     4096: {background: '#000033', text: '#FFFFFF'},
  //     8192: {background: '#000019', text: '#FFFFFF'},
  //     16384: {background: '#00000D', text: '#FFFFFF'},
  //     32768: {background: '#000000', text: '#FFFFFF'},
  //   },
  pink: {
    2: {background: '#FFD1D1', text: '#333333'}, // Light Pink
    4: {background: '#FFAAAA', text: '#333333'}, // Pink
    8: {background: '#FF7F7F', text: '#333333'}, // Dark Pink
    16: {background: '#FF5959', text: '#333333'}, // Light Pinkish Red
    32: {background: '#FF3333', text: '#FFFFFF'}, // Pinkish Red
    64: {background: '#FF0D0D', text: '#FFFFFF'}, // Dark Pinkish Red
    128: {background: '#FF007F', text: '#FFFFFF'}, // Magenta
    256: {background: '#CC0066', text: '#FFFFFF'}, // Deep Magenta
    512: {background: '#99004C', text: '#FFFFFF'}, // Dark Magenta
    1024: {background: '#660033', text: '#FFFFFF'}, // Very Dark Magenta
    2048: {background: '#330019', text: '#FFFFFF'}, // Super Dark Magenta
    4096: {background: '#19000D', text: '#FFFFFF'}, // Extremely Dark Magenta
    8192: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 8192)
    16384: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 16384)
    32768: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 32768)
  },
  //   purple: {
  //     2: {background: '#E5D1FF', text: '#333333'}, // Light Purple
  //     4: {background: '#D1AAFF', text: '#333333'}, // Purple
  //     8: {background: '#BD7FFF', text: '#333333'}, // Dark Purple
  //     16: {background: '#A959FF', text: '#333333'}, // Light Bluish Purple
  //     32: {background: '#9433FF', text: '#FFFFFF'}, // Bluish Purple
  //     64: {background: '#7E0DFF', text: '#FFFFFF'}, // Dark Bluish Purple
  //     128: {background: '#6900FF', text: '#FFFFFF'}, // Blue Purple
  //     256: {background: '#5200CC', text: '#FFFFFF'}, // Deep Blue Purple
  //     512: {background: '#3C0099', text: '#FFFFFF'}, // Dark Blue Purple
  //     1024: {background: '#250066', text: '#FFFFFF'}, // Very Dark Blue Purple
  //     2048: {background: '#0E0019', text: '#FFFFFF'}, // Super Dark Blue Purple
  //     4096: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 4096)
  //     8192: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 8192)
  //     16384: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 16384)
  //     32768: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 32768)
  //   },
  //   blackAndWhite: {
  //     2: {background: '#FFFFFF', text: '#333333'}, // White
  //     4: {background: '#000000', text: '#FFFFFF'}, // Light Gray
  //     8: {background: '#FFFFFF', text: '#333333'}, // Gray
  //     16: {background: '#000000', text: '#FFFFFF'}, // Dark Gray
  //     32: {background: '#FFFFFF', text: '#333333'}, // Even Darker Gray
  //     64: {background: '#000000', text: '#FFFFFF'}, // Almost Black
  //     128: {background: '#FFFFFF', text: '#333333'}, // Dark Grayish Black
  //     256: {background: '#000000', text: '#FFFFFF'}, // Darker Grayish Black
  //     512: {background: '#FFFFFF', text: '#333333'}, // Black
  //     1024: {background: '#000000', text: '#FFFFFF'}, // Even Darker Black
  //     2048: {background: '#FFFFFF', text: '#333333'}, // Pitch Black
  //     4096: {background: '#000000', text: '#FFFFFF'}, // Pitch Black (for better contrast with tile 4096)
  //     8192: {background: '#FFFFFF', text: '#333333'}, // Pitch Black (for better contrast with tile 8192)
  //     16384: {background: '#000000', text: '#FFFFFF'}, // Pitch Black (for better contrast with tile 16384)
  //     32768: {background: '#FFFFFF', text: '#333333'}, // Pitch Black (for better contrast with tile 32768)
  //   },
  gray: {
    2: {background: '#FFFFFF', text: '#333333'}, // White
    4: {background: '#E6E6E6', text: '#333333'}, // Light Gray
    8: {background: '#CCCCCC', text: '#333333'}, // Gray
    16: {background: '#B3B3B3', text: '#333333'}, // Dark Gray
    32: {background: '#999999', text: '#333333'}, // Even Darker Gray
    64: {background: '#808080', text: '#FFFFFF'}, // Almost Black
    128: {background: '#666666', text: '#FFFFFF'}, // Dark Grayish Black
    256: {background: '#4D4D4D', text: '#FFFFFF'}, // Darker Grayish Black
    512: {background: '#333333', text: '#FFFFFF'}, // Black
    1024: {background: '#1A1A1A', text: '#FFFFFF'}, // Even Darker Black
    2048: {background: '#000000', text: '#FFFFFF'}, // Pitch Black
    4096: {background: '#000000', text: '#FFFFFF'}, // Pitch Black (for better contrast with tile 4096)
    8192: {background: '#000000', text: '#FFFFFF'}, // Pitch Black (for better contrast with tile 8192)
    16384: {background: '#000000', text: '#FFFFFF'}, // Pitch Black (for better contrast with tile 16384)
    32768: {background: '#000000', text: '#FFFFFF'}, // Pitch Black (for better contrast with tile 32768)
  },
  fire: {
    2: {background: '#FFC8C8', text: '#333333'}, // Light Red
    4: {background: '#FFB1B1', text: '#333333'}, // Red
    8: {background: '#FF9999', text: '#333333'}, // Dark Red
    16: {background: '#FF8080', text: '#333333'}, // Reddish Pink
    32: {background: '#FF6666', text: '#FFFFFF'}, // Pink
    64: {background: '#FF4D4D', text: '#FFFFFF'}, // Dark Pink
    128: {background: '#FF3333', text: '#FFFFFF'}, // Hot Pink
    256: {background: '#FF1A1A', text: '#FFFFFF'}, // Scarlet
    512: {background: '#FF0000', text: '#FFFFFF'}, // Fire Engine Red
    1024: {background: '#CC0000', text: '#FFFFFF'}, // Fire Brick Red
    2048: {background: '#990000', text: '#FFFFFF'}, // Dark Reddish Brown
    4096: {background: '#660000', text: '#FFFFFF'}, // Very Dark Reddish Brown
    8192: {background: '#330000', text: '#FFFFFF'}, // Super Dark Reddish Brown
    16384: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 16384)
    32768: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 32768)
  },
  ice: {
    2: {background: '#E5F3FF', text: '#333333'}, // Light Blue
    4: {background: '#B3E0FF', text: '#333333'}, // Sky Blue
    8: {background: '#80CCFF', text: '#333333'}, // Light Cerulean
    16: {background: '#4DB8FF', text: '#333333'}, // Cornflower Blue
    32: {background: '#1A94FF', text: '#333333'}, // Dark Cerulean
    64: {background: '#0080FF', text: '#333333'}, // Royal Blue
    128: {background: '#0066CC', text: '#FFFFFF'}, // Dark Cornflower Blue
    256: {background: '#004D99', text: '#FFFFFF'}, // Dark Blue
    512: {background: '#003366', text: '#FFFFFF'}, // Deep Blue
    1024: {background: '#001A33', text: '#FFFFFF'}, // Navy Blue
    2048: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 2048)
    4096: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 4096)
    8192: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 8192)
    16384: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 16384)
    32768: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 32768)
  },
  lime: {
    2: {background: '#F0FFF0', text: '#333333'}, // Honeydew
    4: {background: '#E0EEE0', text: '#333333'}, // Light Greenish Gray
    8: {background: '#D1EFD1', text: '#333333'}, // Light Greenish White
    16: {background: '#C1ECC1', text: '#333333'}, // Light Greenish Ivory
    32: {background: '#B1EBB1', text: '#333333'}, // Light Greenish Yellow
    64: {background: '#A1E8A1', text: '#333333'}, // Light Greenish Lime
    128: {background: '#90E590', text: '#333333'}, // Light Greenish Pale
    256: {background: '#80E280', text: '#333333'}, // Light Greenish Yellowish
    512: {background: '#70E070', text: '#333333'}, // Light Greenish Soft
    1024: {background: '#60DD60', text: '#333333'}, // Light Greenish
    2048: {background: '#50D150', text: '#FFFFFF'}, // Lime
    4096: {background: '#40D740', text: '#FFFFFF'}, // Dark Lime
    8192: {background: '#30D330', text: '#FFFFFF'}, // Deep Lime
    16384: {background: '#20CF20', text: '#FFFFFF'}, // Forest Green
    32768: {background: '#10CC10', text: '#FFFFFF'}, // Dark Forest Green
  },
  //   ocean: {
  //     2: {background: '#E6F5FF', text: '#333333'}, // Light Blue
  //     4: {background: '#CCEBFF', text: '#333333'}, // Light Sky Blue
  //     8: {background: '#B3E0FF', text: '#333333'}, // Light Blue Sky
  //     16: {background: '#99D6FF', text: '#333333'}, // Light Sky Blue
  //     32: {background: '#80CCFF', text: '#333333'}, // Light Cerulean
  //     64: {background: '#66C2FF', text: '#333333'}, // Very Light Azure
  //     128: {background: '#4DB8FF', text: '#333333'}, // Cornflower Blue
  //     256: {background: '#33ADFF', text: '#FFFFFF'}, // Light Cornflower Blue
  //     512: {background: '#1A99FF', text: '#FFFFFF'}, // Deep Sky Blue
  //     1024: {background: '#0085FF', text: '#FFFFFF'}, // Light Deep Sky Blue
  //     2048: {background: '#006BCC', text: '#FFFFFF'}, // Dark Blue
  //     4096: {background: '#005199', text: '#FFFFFF'}, // Dark Blue (for better contrast with tile 4096)
  //     8192: {background: '#003D66', text: '#FFFFFF'}, // Dark Blue (for better contrast with tile 8192)
  //     16384: {background: '#002933', text: '#FFFFFF'}, // Very Dark Blue
  //     32768: {background: '#001400', text: '#FFFFFF'}, // Super Dark Blue
  //   },
  //   automn: {
  //     2: {background: '#FFEDCC', text: '#333333'}, // Light Orange
  //     4: {background: '#FFDB99', text: '#333333'}, // Light Sand
  //     8: {background: '#FFC966', text: '#333333'}, // Light Goldenrod
  //     16: {background: '#FFB33D', text: '#333333'}, // Dark Goldenrod
  //     32: {background: '#FFA500', text: '#333333'}, // Orange
  //     64: {background: '#FF9426', text: '#333333'}, // Dark Orange
  //     128: {background: '#FF8519', text: '#333333'}, // Halloween Orange
  //     256: {background: '#FF7512', text: '#333333'}, // Carrot Orange
  //     512: {background: '#FF6600', text: '#333333'}, // Deep Orange
  //     1024: {background: '#E65C00', text: '#FFFFFF'}, // Burnt Orange
  //     2048: {background: '#CC5200', text: '#FFFFFF'}, // Earthy Orange
  //     4096: {background: '#B34700', text: '#FFFFFF'}, // Sienna
  //     8192: {background: '#993D00', text: '#FFFFFF'}, // Dark Sienna
  //     16384: {background: '#803300', text: '#FFFFFF'}, // Rust
  //     32768: {background: '#662900', text: '#FFFFFF'}, // Dark Rust
  //   },
  //   summer: {
  //     2: {background: '#FFF3CC', text: '#333333'}, // Light Yellow
  //     4: {background: '#FFEB99', text: '#333333'}, // Light Sun Yellow
  //     8: {background: '#FFE066', text: '#333333'}, // Light Sunglow
  //     16: {background: '#FFD633', text: '#333333'}, // Sunglow
  //     32: {background: '#FFCC00', text: '#333333'}, // Gold
  //     64: {background: '#FFB31A', text: '#333333'}, // Dark Gold
  //     128: {background: '#FFA500', text: '#333333'}, // Orange
  //     256: {background: '#FF9900', text: '#333333'}, // Vivid Orange
  //     512: {background: '#FF851A', text: '#333333'}, // Light Vivid Orange
  //     1024: {background: '#FF7519', text: '#333333'}, // Dark Vivid Orange
  //     2048: {background: '#FF6600', text: '#FFFFFF'}, // Deep Orange
  //     4096: {background: '#FF4C00', text: '#FFFFFF'}, // Vermilion
  //     8192: {background: '#FF3300', text: '#FFFFFF'}, // Tomato Red
  //     16384: {background: '#FF1A00', text: '#FFFFFF'}, // Candy Apple Red
  //     32768: {background: '#FF0000', text: '#FFFFFF'}, // Red
  //   },
  //   metal: {
  //     2: {background: '#F2F2F2', text: '#333333'}, // Light Gray
  //     4: {background: '#E6E6E6', text: '#333333'}, // Gray
  //     8: {background: '#CCCCCC', text: '#333333'}, // Dark Gray
  //     16: {background: '#BFBFBF', text: '#333333'}, // Very Dark Gray
  //     32: {background: '#A6A6A6', text: '#333333'}, // Light Gunmetal
  //     64: {background: '#8C8C8C', text: '#333333'}, // Gunmetal
  //     128: {background: '#737373', text: '#333333'}, // Dark Gunmetal
  //     256: {background: '#595959', text: '#FFFFFF'}, // Silver
  //     512: {background: '#404040', text: '#FFFFFF'}, // Dark Silver
  //     1024: {background: '#262626', text: '#FFFFFF'}, // Charcoal
  //     2048: {background: '#0D0D0D', text: '#FFFFFF'}, // Very Dark Gray (for better contrast with tile 2048)
  //     4096: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 4096)
  //     8192: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 8192)
  //     16384: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 16384)
  //     32768: {background: '#000000', text: '#FFFFFF'}, // Black (for better contrast with tile 32768)
  //   },
  royal: {
    2: {background: '#CCCCFF', text: '#333333'}, // Light Lavender
    4: {background: '#B2B2FF', text: '#333333'}, // Lavender
    8: {background: '#9999FF', text: '#333333'}, // Dark Lavender
    16: {background: '#7F7FFF', text: '#333333'}, // Lilac
    32: {background: '#6666FF', text: '#FFFFFF'}, // Light Purple
    64: {background: '#4C4CFF', text: '#FFFFFF'}, // Royal Purple
    128: {background: '#3333FF', text: '#FFFFFF'}, // Dark Royal Purple
    256: {background: '#1919FF', text: '#FFFFFF'}, // Deep Blue Purple
    512: {background: '#0000E5', text: '#FFFFFF'}, // Sapphire
    1024: {background: '#0000CC', text: '#FFFFFF'}, // Deep Sapphire
    2048: {background: '#0000B2', text: '#FFFFFF'}, // Dark Sapphire
    4096: {background: '#000099', text: '#FFFFFF'}, // Bright Blue
    8192: {background: '#000080', text: '#FFFFFF'}, // Royal Blue
    16384: {background: '#000066', text: '#FFFFFF'}, // Dark Royal Blue
    32768: {background: '#000033', text: '#FFFFFF'}, // Super Dark Royal Blue
  },
  //   newroyal: {
  //     2: {background: '#F0F0F0', text: '#333333'}, // White
  //     4: {background: '#CCCCFF', text: '#333333'}, // Light Lavender
  //     8: {background: '#B2B2FF', text: '#333333'}, // Lavender
  //     16: {background: '#9999FF', text: '#333333'}, // Dark Lavender
  //     32: {background: '#7F7FFF', text: '#333333'}, // Lilac
  //     64: {background: '#FFD700', text: '#333333'}, // Gold
  //     128: {background: '#A0A0A0', text: '#333333'}, // Silver
  //     256: {background: '#FFA500', text: '#333333'}, // Orange
  //     512: {background: '#0000E5', text: '#FFFFFF'}, // Sapphire
  //     1024: {background: '#0000CC', text: '#FFFFFF'}, // Deep Sapphire
  //     2048: {background: '#0000B2', text: '#FFFFFF'}, // Dark Sapphire
  //     4096: {background: '#000099', text: '#FFFFFF'}, // Bright Blue
  //     8192: {background: '#000080', text: '#FFFFFF'}, // Royal Blue
  //     16384: {background: '#000066', text: '#FFFFFF'}, // Dark Royal Blue
  //     32768: {background: '#000033', text: '#FFFFFF'}, // Super Dark Royal Blue
  //   },
  //   gold: {
  //     2: {background: '#FFEECC', text: '#333333'}, // Light Gold
  //     4: {background: '#FFDD99', text: '#333333'}, // Gold
  //     8: {background: '#FFCC66', text: '#333333'}, // Deep Gold
  //     16: {background: '#FFBB33', text: '#333333'}, // Dark Gold
  //     32: {background: '#FFAA00', text: '#333333'}, // Goldenrod
  //     64: {background: '#FF9900', text: '#333333'}, // Dark Goldenrod
  //     128: {background: '#FF8800', text: '#333333'}, // Deep Goldenrod
  //     256: {background: '#FF7700', text: '#333333'}, // Golden Yellow
  //     512: {background: '#FF6600', text: '#FFFFFF'}, // Deep Orange (for better contrast with tile 512)
  //     1024: {background: '#FF5500', text: '#FFFFFF'}, // Dark Deep Orange
  //     2048: {background: '#FF4400', text: '#FFFFFF'}, // Rich Orange
  //     4096: {background: '#FF3300', text: '#FFFFFF'}, // Bright Orange
  //     8192: {background: '#FF2200', text: '#FFFFFF'}, // Fire Orange
  //     16384: {background: '#FF1100', text: '#FFFFFF'}, // Lava Orange
  //     32768: {background: '#FF0000', text: '#FFFFFF'}, // Red (for better contrast with tile 32768)
  //   },
};
