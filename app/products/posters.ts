/**
 * 有精緻直式海報的商品（slug → 海報路徑）
 * 商品列表卡、詳情頁主圖、Product 結構化資料共用。
 */
export const POSTERS: Record<string, string> = {
  'honey-aroma-oolong-tea': '/images/products/honey-aroma-oolong-tea.png',
  'dong-pian-oolong-tea': '/images/products/dong-pian-oolong-tea.png',
  'taiwan-roasted-black-bean-tea-15bags': '/images/products/taiwan-roasted-black-bean-tea-15bags.jpg',
  'fullten-dried-guava': '/images/products/fullten-dried-guava.jpg',
  'taiwan-osmanthus-plum': '/images/products/taiwan-osmanthus-plum.png',
  'taiwan-perilla-plum': '/images/products/taiwan-perilla-plum.png',
  'jin-he-tai-dried-roselle': '/images/products/jin-he-tai-dried-roselle.png',
  'liao-hsin-lan-dried-tofu-shacha': '/images/products/liao-hsin-lan-dried-tofu-shacha.png',
  'sun-moon-lake-stewed-mushrooms': '/images/products/sun-moon-lake-stewed-mushrooms.png',
  'freshly-baked-pineapple-cake-gift-box': '/images/products/freshly-baked-pineapple-cake-gift-box.jpg',
  'plums-honey-dried-plum-seedless': '/images/products/plums-honey-dried-plum-seedless.jpg',
  'jin-he-tai-traditional-handmade-plum-cakes': '/images/products/jin-he-tai-traditional-handmade-plum-cakes.jpg',
  'jin-he-tai-sugar-kumquat-candy': '/images/products/jin-he-tai-sugar-kumquat-candy.jpg',
  'tang-ding-brown-sugar-longan-red-date': '/images/products/tang-ding-brown-sugar-longan-red-date.jpg',
  'huixiang-red-date-chips': '/images/products/huixiang-red-date-chips.jpg',
  'jin-he-tai-licorice-preserved-plum': '/images/products/jin-he-tai-licorice-preserved-plum.jpg',
};

/** 橫式 3:2 情境照：不論在哪個分類都用橫式卡片（品名寫在照片下方） */
export const LANDSCAPE = new Set([
  'plums-honey-dried-plum-seedless',
  'jin-he-tai-traditional-handmade-plum-cakes',
  'jin-he-tai-sugar-kumquat-candy',
  'tang-ding-brown-sugar-longan-red-date',
  'huixiang-red-date-chips',
  'taiwan-roasted-black-bean-tea-15bags',
]);
