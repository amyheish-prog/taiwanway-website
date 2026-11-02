/* ── 資料型別 ── */
export type MenuItemData = {
  nameZh: string
  nameEn: string
  nameEs: string
  descZh?: string
  descEn?: string
  descEs?: string
  options?: string
  price?: string
}

export type MenuCategory = {
  id: string
  titleZh: string
  titleEn: string
  titleEs: string
  subtitleZh?: string
  subtitleEn?: string
  subtitleEs?: string
  image: string
  items: MenuItemData[]
}

/* ── 菜單資料 ── */
export const menuCategories: MenuCategory[] = [
  {
    id: 'signature',
    titleZh: '招牌推薦',
    titleEn: 'Signature',
    titleEs: 'Especialidades',
    subtitleZh: '經典必點',
    subtitleEn: 'Must-Try Classics',
    subtitleEs: 'Clásicos Imperdibles',
    image: '/images/signature-trio.jpg',
    items: [
      { nameZh: '台灣珍珠奶茶', nameEn: 'Signature Bubble Tea', nameEs: 'Té de Burbujas Especial', descZh: 'Q彈珍珠配濃郁奶香，經典臺灣味', descEn: 'Chewy tapioca pearls with rich milk tea, classic Taiwan flavor', descEs: 'Perlas de tapioca con té de leche', price: '6.85' },
      { nameZh: '紅燒牛肉麵', nameEn: 'Braised Beef Noodle Soup', nameEs: 'Sopa de Fideos con Res', descZh: '香濃湯頭，嫩滑牛肉，Q彈麵條', descEn: 'Rich broth with tender beef and springy noodles', descEs: 'Caldo con res y fideos al estilo tradicional', price: '$14.85 / $16.85' },
      { nameZh: '古早味滷肉飯', nameEn: 'Braised Pork Rice', nameEs: 'Arroz con Cerdo', descZh: '慢火燉煮，古早味入味白飯', descEn: 'Slow-braised pork over steamed rice', descEs: 'Cerdo estofado sobre arroz', price: '$11.45 / $13.45' },
    ],
  },
  {
    id: 'taiwanese-black-tea',
    titleZh: '台灣紅茶',
    titleEn: 'Taiwanese Black Tea',
    titleEs: 'Té Negro Taiwanés',
    subtitleZh: '在地茶香',
    subtitleEn: 'Local Tea Aroma',
    subtitleEs: 'Aroma del Té Local',
    image: '/images/honey-black-tea.png',
    items: [
      { nameZh: '台灣珍珠奶茶', nameEn: 'Signature Bubble Tea', nameEs: 'Té de Burbujas', options: '熱 / 冷', price: '6.85' },
      { nameZh: '台灣蜜香奶茶', nameEn: 'Taiwanese Milk Tea', nameEs: 'Té de Leche Taiwanés', options: '熱 / 冷', price: '6.25' },
      { nameZh: '古早味奶茶', nameEn: 'Classic Milk Tea', nameEs: 'Té con Leche Clásico', options: '熱 / 冷', price: '4.65' },
      { nameZh: '荔枝椰果紅茶', nameEn: 'Lychee Jelly Black Tea', nameEs: 'Té Negro con Gelatina de Lichi', options: '冷飲', price: '6.25' },
    ],
  },
  {
    id: 'coffee',
    titleZh: '咖啡專區',
    titleEn: 'Coffee',
    titleEs: 'Café',
    subtitleZh: '台灣法式深烘焙',
    subtitleEn: 'French Dark Roast, Imported from Taiwan',
    subtitleEs: 'Tueste Oscuro Francés, Importado de Taiwán',
    image: '/images/coffee-tab.jpg',
    items: [
      { nameZh: '美式咖啡', nameEn: 'Americano', nameEs: 'Americano', options: '熱 / 冷', price: '4.25' },
      { nameZh: '拿鐵', nameEn: 'Coffee Latte', nameEs: 'Café Latte', options: '熱 / 冷', price: '5.25' },
      { nameZh: '海鹽焦糖拿鐵', nameEn: 'Sea Salt Caramel Latte', nameEs: 'Latte de Caramelo con Sal de Mar', options: '熱 / 冷', price: '6.25' },
    ],
  },
  {
    id: 'caffeine-free',
    titleZh: '無咖啡因',
    titleEn: 'Caffeine Free',
    titleEs: 'Sin Cafeína',
    subtitleZh: '溫潤無負擔',
    subtitleEn: 'Gentle & Light',
    subtitleEs: 'Suave y Ligero',
    image: '/images/brown-sugar-milk.png',
    items: [
      { nameZh: '黑糖珍珠鮮奶', nameEn: 'Brown Sugar Pearl Fresh Milk', nameEs: 'Leche con Perlas de Azúcar Morena', options: '熱 / 冷', price: '6.85' },
      { nameZh: '芋香拿鐵', nameEn: 'Taro Latte', nameEs: 'Latte de Taro', options: '熱 / 冷', price: '6.25' },
      { nameZh: '冬瓜鮮奶', nameEn: 'Wintermelon Milk', nameEs: 'Leche con Melón de Invierno', options: '熱 / 冷', price: '5.85' },
    ],
  },
  {
    id: 'jasmine',
    titleZh: '茉莉綠茶',
    titleEn: 'Jasmine Green Tea',
    titleEs: 'Té Verde Jazmín',
    subtitleZh: '花香清新',
    subtitleEn: 'Floral Freshness',
    subtitleEs: 'Frescura Floral',
    image: '/images/jasmine-tea.png',
    items: [
      { nameZh: '蜂蜜綠茶', nameEn: 'Jasmine Honey Green Tea', nameEs: 'Té Verde Jazmín con Miel', options: '冷飲', price: '5.25' },
      { nameZh: '茉莉珍珠綠奶茶', nameEn: 'Jasmine Pearl Milk Green Tea', nameEs: 'Té Verde Jazmín con Perlas', options: '熱 / 冷', price: '6.85' },
      { nameZh: '茉莉奶綠', nameEn: 'Jasmine Green Milk Tea', nameEs: 'Té Verde de Jazmín con Leche', price: '6.25' },
      { nameZh: '桂花綠茶', nameEn: 'Osmanthus Green Tea', nameEs: 'Té Verde con Osmanto', options: '冷飲', price: '5.25' },
      { nameZh: '梅子綠茶', nameEn: 'Plum Jasmine Green Tea', nameEs: 'Té Verde Jazmín con Ciruela', options: '冷飲', price: '5.85' },
    ],
  },
  {
    id: 'oolong',
    titleZh: '台灣烏龍茶',
    titleEn: 'Taiwan Oolong',
    titleEs: 'Oolong Taiwanés',
    subtitleZh: '半發酵茶韻',
    subtitleEn: 'Semi-Fermented Elegance',
    subtitleEs: 'Elegancia Semi-Fermentada',
    image: '/images/oolong-tea.png',
    items: [
      { nameZh: '蜜香烏龍珍珠奶茶', nameEn: 'Honey Oolong Bubble Tea', nameEs: 'Oolong con Miel y Perlas', options: '熱 / 冷', price: '6.85' },
      { nameZh: '蜜香烏龍奶茶', nameEn: 'Honey Oolong Milk Tea', nameEs: 'Oolong con Miel y Leche', options: '熱 / 冷', price: '6.25' },
    ],
  },
  {
    id: 'matcha',
    titleZh: '京都抹茶',
    titleEn: 'Kyoto Matcha',
    titleEs: 'Matcha de Kioto',
    subtitleZh: '茶道之美',
    subtitleEn: 'Beauty of Tea Ceremony',
    subtitleEs: 'Belleza de la Ceremonia',
    image: '/images/matcha-latte.png',
    items: [
      { nameZh: '抹茶拿鐵', nameEn: 'Matcha Latte', nameEs: 'Latte de Matcha', options: '熱 / 冷', price: '6.25' },
    ],
  },
  {
    id: 'pot-brewed',
    titleZh: '現沖高山茶',
    titleEn: 'Pot-Brewed Tea',
    titleEs: 'Té de Tetera',
    subtitleZh: '壺泡原味',
    subtitleEn: 'Authentic Pot-Brewed',
    subtitleEs: 'Auténtico de Tetera',
    image: '/images/pot-brewed-tea.png',
    items: [
      { nameZh: '冬片', nameEn: 'Winter Harvest', nameEs: 'Cosecha de Invierno', options: '熱飲', price: '5' },
      { nameZh: '春茶', nameEn: 'Spring Tea', nameEs: 'Té de Primavera', options: '熱飲', price: '5' },
      { nameZh: '金萱', nameEn: 'Jin Xuan', nameEs: 'Jin Xuan', options: '熱飲', price: '5' },
      { nameZh: '鐵觀音', nameEn: 'Tieguanyin', nameEs: 'Tieguanyin', options: '熱飲', price: '6' },
      { nameZh: '阿里山紅茶', nameEn: 'Alishan Black Tea', nameEs: 'Té Negro Alishan', options: '熱飲', price: '5' },
    ],
  },
  {
    id: 'appetizers',
    titleZh: '開胃小點',
    titleEn: 'Side Dishes',
    titleEs: 'Entrantes',
    subtitleZh: '經典台式小菜',
    subtitleEn: 'Classic Taiwanese Small Bites',
    subtitleEs: 'Bocados Clásicos Taiwaneses',
    image: '/images/taiwanese-kimchi-v3.jpg',
    items: [
      { nameZh: '蟹殼黃', nameEn: 'Flaky Sesame Pastry', nameEs: 'Pastelito de Sésamo Hojaldrado', descZh: '金黃芝麻酥皮，層層酥脆（1 個 / 2 個）', descEn: 'Golden sesame crust with delicate, flaky layers (1 pc / 2 pcs)', descEs: 'Corteza dorada de sésamo con capas hojaldradas (1 / 2 piezas)', price: '$3.50 / $7.00' },
      { nameZh: '台式泡菜', nameEn: 'Taiwanese Kimchi', nameEs: 'Kimchi Taiwanés', descZh: '微酸微甜的台式醃高麗菜', descEn: 'Tangy-sweet Taiwanese-style pickled cabbage', descEs: 'Col encurtida taiwanesa agridulce', price: '4.95' },
      { nameZh: '炒酸菜', nameEn: 'Stir-Fried Pickled Mustard Greens', nameEs: 'Mostaza Encurtida Salteada', descZh: '4 oz，手炒酸菜，配麵配飯都對味', descEn: '4 oz, wok-tossed pickled mustard greens, great with noodles or rice', descEs: '4 oz, mostaza encurtida salteada, ideal con fideos o arroz', price: '2.85' },
      { nameZh: '手炒辣椒醬', nameEn: 'House-Made Chili Sauce', nameEs: 'Salsa de Chile Casera', descZh: '4 oz，店內手炒辣椒醬', descEn: '4 oz, our own wok-fried chili sauce', descEs: '4 oz, nuestra salsa de chile salteada', price: '4.85' },
      { nameZh: '滷蛋', nameEn: 'Braised Egg', nameEs: 'Huevo Estofado', descZh: '入味滷蛋，配主餐剛好', descEn: 'A savory braised egg to complete your meal', descEs: 'Huevo estofado para acompañar tu plato', price: '2.00' },
      { nameZh: '肉燥', nameEn: 'Braised Pork Topping', nameEs: 'Cerdo Estofado (Topping)', descZh: '4 oz，加在飯或麵上', descEn: '4 oz, a savory braised pork topping for rice or noodles', descEs: '4 oz, cerdo estofado para arroz o fideos', price: '3.50' },
    ],
  },
  {
    id: 'main-dishes',
    titleZh: '主餐',
    titleEn: 'Main Dishes',
    titleEs: 'Platos Principales',
    subtitleZh: '道地臺灣味',
    subtitleEn: 'Authentic Taiwanese Flavor',
    subtitleEs: 'Sabor Auténtico',
    image: '/images/beef-noodle.png',
    items: [
      { nameZh: '紅燒牛肉麵', nameEn: 'Braised Beef Noodle Soup', nameEs: 'Sopa de Fideos con Res', descZh: '香濃湯頭，嫩滑牛肉，Q彈麵條', descEn: 'Rich broth, tender beef, springy noodles', descEs: 'Caldo, res tierna, fideos al estilo tradicional', price: '$14.85 / $16.85' },
      { nameZh: '麻醬牛肉乾麵', nameEn: 'Sesame Beef Noodles', nameEs: 'Fideos Secos con Res y Sésamo', descZh: 'Q彈麵條淋上芝麻醬，配滷牛肉與青菜', descEn: 'Chewy noodles tossed in fragrant sesame sauce with braised beef and greens', descEs: 'Fideos con salsa de sésamo, res estofada y verduras', price: '$14.85 / $16.85' },
      { nameZh: '古早味滷肉飯', nameEn: 'Braised Pork Rice', nameEs: 'Arroz con Cerdo', descZh: '入味滷肉，搭配香Q白飯', descEn: 'Savory braised pork over steamed rice', descEs: 'Cerdo estofado sobre arroz', price: '$11.45 / $13.45' },
      { nameZh: '雞肉飯', nameEn: 'Chicken Rice', nameEs: 'Arroz con Pollo', descZh: '雞胸肉絲，搭配油蔥與醬汁', descEn: 'Shredded chicken breast with fried shallots and sauce', descEs: 'Pechuga de pollo desmenuzada con chalotes fritos y salsa', price: '$11.45 / $13.45' },
      { nameZh: '櫻花蝦米糕', nameEn: 'Sakura Shrimp Sticky Rice', nameEs: 'Arroz Glutinoso con Camarón Sakura', descZh: '糯米蒸煮，拌入櫻花蝦、香菇與油蔥', descEn: 'Savory glutinous rice steamed with sakura shrimp, mushrooms & crispy shallots', descEs: 'Arroz glutinoso al vapor con camarón sakura, setas y chalotes', price: '13.45' },
    ],
  },
  {
    id: 'desserts',
    titleZh: '甜點',
    titleEn: 'Desserts',
    titleEs: 'Postres',
    subtitleZh: '甜蜜收尾',
    subtitleEn: 'Sweet Endings',
    subtitleEs: 'Finales Dulces',
    image: '/images/pineapple-cake.png',
    items: [
      { nameZh: '台灣鳳梨酥', nameEn: 'Taiwan Pineapple Cake', nameEs: 'Pastel de Piña', descZh: '酥脆外皮包裹鳳梨內餡，每日現作', descEn: 'Buttery pastry with pineapple filling, freshly made daily', descEs: 'Pastel de mantequilla con piña, hecho diariamente', price: '3.25' },
      { nameZh: '每日現做各式起司蛋糕', nameEn: 'Daily Fresh Assorted Cheesecakes', nameEs: 'Variedad de Pasteles de Queso del Día', descZh: '每日現烤，多種口味輪替', descEn: 'Freshly baked daily, rotating flavors', descEs: 'Recién horneado cada día, sabores rotativos' },
      { nameZh: '戚風蛋糕', nameEn: 'Chiffon Cake', nameEs: 'Pastel Chifón', descZh: '蓬鬆綿密，手工現做', descEn: 'Light, airy, handmade fresh', descEs: 'Ligero y esponjoso, hecho a mano' },
    ],
  },
  {
    id: 'summer',
    titleZh: '夏季限定',
    titleEn: 'Summer Specials',
    titleEs: 'Especiales de Verano',
    subtitleZh: '清爽消暑',
    subtitleEn: 'Refreshing & Cool',
    subtitleEs: 'Refrescante y Fresco',
    image: '/images/summer-tab.jpg',
    items: [
      { nameZh: '蘋果玉露青茶', nameEn: 'Apple Jade Dew Green Tea', nameEs: 'Té Verde Jade Dew con Manzana', options: '冷飲', price: '6.25' },
      { nameZh: '香橙茉莉綠茶', nameEn: 'Orange Jasmine Green Tea', nameEs: 'Té Verde Jazmín con Naranja', options: '冷飲', price: '6.25' },
      { nameZh: '冬瓜檸檬', nameEn: 'Wintermelon Lemonade', nameEs: 'Limonada de Melón de Invierno', options: '冷飲', price: '6.25' },
      { nameZh: '百香綠茶', nameEn: 'Passionfruit Green Tea', nameEs: 'Té Verde con Maracuyá', options: '冷飲', price: '5.85' },
    ],
  },
  {
    id: 'winter',
    titleZh: '冬季限定',
    titleEn: 'Winter Specials',
    titleEs: 'Especiales de Invierno',
    subtitleZh: '溫暖回甘',
    subtitleEn: 'Warm & Comforting',
    subtitleEs: 'Cálido y Reconfortante',
    image: '/images/oolong-tea.png',
    items: [
      { nameZh: '黑糖薑汁鮮奶', nameEn: 'Brown Sugar Ginger Milk', nameEs: 'Leche con Jengibre y Azúcar Morena', price: '6.25' },
      { nameZh: '黑糖桂圓紅棗茶', nameEn: 'Brown Sugar Jujube Tea', nameEs: 'Té de Azufaifa y Longan con Azúcar Morena', price: '5.85' },
      { nameZh: '黑糖桂圓紅棗奶茶', nameEn: 'Brown Sugar Jujube Milk Tea', nameEs: 'Té con Leche de Azufaifa y Longan', price: '6.85' },
      { nameZh: '印度香料奶茶', nameEn: 'Chai Tea Latte', nameEs: 'Chai Latte', price: '5.85' },
    ],
  },
]
