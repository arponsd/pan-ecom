// Demo product photography. All images are openly licensed (CC0 / CC BY / CC BY-SA) and
// were resized for the web; credits are listed on /credits. Products without an entry fall
// back to the striped colour placeholder from the design.

export interface Photo {
  src: string;
  width: number;
  height: number;
  credit: {
    title: string;
    author: string;
    license: 'CC0 1.0' | 'CC BY 4.0' | 'CC BY-SA 3.0' | 'CC BY-SA 2.0';
    licenseUrl: string;
    sourceUrl: string;
  };
}

const CC0 = { license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' } as const;
const BY4 = { license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/' } as const;
const BYSA3 = { license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' } as const;
const BYSA2 = { license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/' } as const;

/** Keyed by product id. */
export const PRODUCT_PHOTOS: Record<number, Photo> = {
  1: {
    src: '/products/1.jpg',
    width: 789,
    height: 1400,
    credit: { title: 'Eri Silk Handloom Kurta', author: 'Gautam Daniel', ...BY4, sourceUrl: 'https://commons.wikimedia.org/w/index.php?curid=162125684' },
  },
  2: {
    src: '/products/2.jpg',
    width: 484,
    height: 1024,
    credit: { title: 'Kurta', author: 'The Metropolitan Museum of Art (via rawpixel)', ...CC0, sourceUrl: 'https://www.rawpixel.com/image/8090646/kurta' },
  },
  3: {
    src: '/products/3.jpg',
    width: 600,
    height: 800,
    credit: { title: 'Blue khadi kurta', author: 'Purva4u', ...BYSA3, sourceUrl: 'https://commons.wikimedia.org/w/index.php?curid=41827963' },
  },
  4: {
    src: '/products/4.jpg',
    width: 637,
    height: 1024,
    credit: { title: 'Kurta', author: 'The Metropolitan Museum of Art (via rawpixel)', ...CC0, sourceUrl: 'https://www.rawpixel.com/image/8090512/kurta' },
  },
  6: {
    src: '/products/6.jpg',
    width: 1050,
    height: 1400,
    credit: {
      title: 'A yellow cotton kurta with traditional design elements',
      author: 'পাপৰি বৰা',
      ...BY4,
      sourceUrl: 'https://commons.wikimedia.org/w/index.php?curid=180359541',
    },
  },
  7: {
    src: '/products/7.jpg',
    width: 1024,
    height: 709,
    credit: { title: 'Kurta', author: 'quinn.anya', ...BYSA2, sourceUrl: 'https://www.flickr.com/photos/53326337@N00/8974673246' },
  },
  8: {
    src: '/products/8.jpg',
    width: 754,
    height: 1024,
    credit: { title: 'Traditional white embroidered kurta', author: 'Art Institute of Chicago (via rawpixel)', ...CC0, sourceUrl: 'https://www.rawpixel.com/image/9004113/coat' },
  },
  10: {
    src: '/products/10.jpg',
    width: 675,
    height: 526,
    credit: { title: 'Saraiki Kurta', author: 'Pakwaseb', ...BYSA3, sourceUrl: 'https://commons.wikimedia.org/w/index.php?curid=22706078' },
  },
  13: {
    src: '/products/13.jpg',
    width: 500,
    height: 558,
    credit: { title: 'Handloom Cotton Kurta in Tea Dyed', author: 'Gautam Daniel', ...BY4, sourceUrl: 'https://commons.wikimedia.org/w/index.php?curid=162124336' },
  },
  14: {
    src: '/products/14.jpg',
    width: 500,
    height: 750,
    credit: { title: 'Kurta, India, 20th century, cotton blend', author: 'Wikimedia Commons contributor', ...CC0, sourceUrl: 'https://commons.wikimedia.org/w/index.php?curid=40301837' },
  },
  15: {
    src: '/products/15.jpg',
    width: 1024,
    height: 683,
    credit: { title: 'Peacock shirt', author: 'quinn.anya', ...BYSA2, sourceUrl: 'https://www.flickr.com/photos/53326337@N00/26759167353' },
  },
  16: {
    src: '/products/16.jpg',
    width: 602,
    height: 1024,
    credit: { title: 'Kurta', author: 'The Metropolitan Museum of Art (via rawpixel)', ...CC0, sourceUrl: 'https://www.rawpixel.com/image/8087734/kurta' },
  },
};

export const HERO_PHOTO: Photo = {
  src: '/images/hero.jpg',
  width: 863,
  height: 1400,
  credit: { title: 'Handloom Kurta in Muga Silk Stripes', author: 'Gautam Daniel', ...BY4, sourceUrl: 'https://commons.wikimedia.org/w/index.php?curid=162124333' },
};

/** Representative product photo per home-page category tile. */
export const CATEGORY_PHOTO_PRODUCT: Partial<Record<'everyday' | 'eid' | 'printed' | 'kids', number>> = {
  everyday: 3,
  eid: 8,
  printed: 7,
};

export const ALL_PHOTOS: Photo[] = [HERO_PHOTO, ...Object.values(PRODUCT_PHOTOS)];
