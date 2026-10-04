export interface FloatingElement {
  id: string;
  name: string;
  image: string;
  className: string;
  layer: 'front' | 'back';
  floatConfig: {
    xRange: [number, number, number];
    yRange: [number, number, number];
    rotateRange: [number, number, number];
    duration: number;
    delay: number;
  };
  size: {
    width: string;
    height: string;
  };
}

export interface SlideData {
  id: string;
  number: string;
  title: string;
  titleLeft: string;
  titleRight: string;
  description: string;
  subDescription: string;
  bgColor: string;
  bgGradient: string;
  textColColor: string;
  bottleImage: string;
  bottleAlt: string;
  badge: string;
  floatingElements: FloatingElement[];
  accordion: {
    consume: {
      title: string;
      headline: string;
      body: string;
      tips: string[];
    };
    benefits: {
      title: string;
      headline: string;
      body: string;
      bullets: string[];
    };
    buying: {
      title: string;
      headline: string;
      options: Array<{
        id: string;
        name: string;
        volume: string;
        price: number;
        originalPrice?: number;
        popular?: boolean;
        description: string;
      }>;
    };
  };
  bottomSection: {
    type: 'bundle' | 'ingredients';
    title: string;
    subtitle?: string;
    bundle?: {
      name: string;
      price: number;
      originalPrice: number;
      discountText: string;
      description: string;
      items: Array<{
        name: string;
        bottleImg: string;
        volume: string;
        highlight: string;
      }>;
    };
    ingredients?: Array<{
      name: string;
      subtitle: string;
      image: string;
      badge: string;
      description: string;
    }>;
  };
}

export const SLIDES: SlideData[] = [
  {
    id: '01',
    number: '01',
    title: 'RENEW',
    titleLeft: 'RE',
    titleRight: 'NEW',
    description: 'The perfect combination of fresh ingredients to spice up your morning',
    subDescription: 'Hand-pressed cold extraction with cold-pressed Valencia oranges, red Fuji apples, ginger rhizome, and adaptogenic sea buckthorn.',
    bgColor: '#2762ea',
    bgGradient: 'from-[#2b69f0] via-[#245ee6] to-[#1c50cb]',
    textColColor: '#88f0cf',
    bottleImage: '/assets/bottle-3.png',
    bottleAlt: 'Domingo 01 Renew Cold Pressed Elixir Amber Bottle',
    badge: 'Morning Boost · Electrolyte Balance',
    floatingElements: [
      {
        id: 'red-apple-01',
        name: 'Whole Crisp Red Apple',
        image: '/assets/cutouts/red_apple.png',
        className: 'left-[-20px] sm:left-[-35px] md:left-[-45px] top-[22%] md:top-[24%]',
        layer: 'back',
        size: { width: 'w-18 sm:w-22 md:w-28 lg:w-32', height: 'h-auto' },
        floatConfig: {
          xRange: [-8, 6, -8],
          yRange: [-10, 10, -10],
          rotateRange: [-5, 5, -5],
          duration: 4.8,
          delay: 0,
        },
      },
      {
        id: 'orange-slice-01',
        name: 'Fresh Juicy Valencia Orange Slice',
        image: '/assets/cutouts/orange_slice.png',
        className: 'right-[-20px] sm:right-[-30px] md:right-[-40px] bottom-[26%] md:bottom-[24%]',
        layer: 'front',
        size: { width: 'w-22 sm:w-28 md:w-36 lg:w-40', height: 'h-auto' },
        floatConfig: {
          xRange: [10, -6, 10],
          yRange: [12, -10, 12],
          rotateRange: [6, -4, 6],
          duration: 5.4,
          delay: 0.4,
        },
      },
    ],
    accordion: {
      consume: {
        title: 'How to consume',
        headline: 'Optimal Absorption Protocol',
        body: 'Best enjoyed chilled straight from the ice bath. Gently invert bottle twice to blend natural pectin sediments without introducing aeration.',
        tips: [
          'Drink first thing in the morning 20 minutes before breakfast.',
          'Savor in slow sips to activate salivary digestive enzymes.',
          'Keep stored below 4°C / 39°F for maximum raw enzyme viability.',
        ],
      },
      benefits: {
        title: 'Benefits',
        headline: 'Natural Vitality & Hydration',
        body: 'A potent synergistic cocktail of natural Vitamin C, cold-pressed citrus bioflavonoids, and organic gingerols.',
        bullets: [
          '340% Daily Recommended Vitamin C per serving',
          'Accelerated digestive spark and morning metabolic wake-up',
          'Zero added water, refined sugars, or thermal pasteurization',
        ],
      },
      buying: {
        title: 'Buying options',
        headline: 'Select Your Ritual',
        options: [
          {
            id: 'renew-single',
            name: 'Single Bottle',
            volume: '330 ml',
            price: 6.5,
            description: 'Individual daily dose in frosted UV-shield glass',
          },
          {
            id: 'renew-6pack',
            name: 'Weekly 6-Pack',
            volume: '6 x 330 ml',
            price: 36.0,
            originalPrice: 39.0,
            popular: true,
            description: 'Mon–Sat morning reset with complimentary cold bag',
          },
          {
            id: 'renew-monthly',
            name: 'Monthly Cleanse',
            volume: '24 x 330 ml',
            price: 132.0,
            originalPrice: 156.0,
            description: 'Weekly scheduled cold-chain delivery · Save 15%',
          },
        ],
      },
    },
    bottomSection: {
      type: 'bundle',
      title: 'Our daily bundles',
      subtitle: 'Synchronized morning, midday, and evening elixirs',
      bundle: {
        name: 'The Domingo Daily Trio Cleanse',
        price: 48.0,
        originalPrice: 62.0,
        discountText: 'Save 22%',
        description: 'Complete 3-step circadian rhythm formula designed by master herbalists for all-day peak performance.',
        items: [
          {
            name: '01 RENEW',
            bottleImg: '/assets/bottle-3.png',
            volume: '330ml · Morning Ignition',
            highlight: 'Orange, Fuji Apple & Ginger',
          },
          {
            name: '02 REVIVE',
            bottleImg: '/assets/bottle-2.png',
            volume: '330ml · Midday Clarity',
            highlight: 'Green Apple, Blueberry & Matcha',
          },
          {
            name: '03 REFUEL',
            bottleImg: '/assets/bottle-1.png',
            volume: '330ml · Evening Repair',
            highlight: 'Golden Turmeric, Cacao & Protein',
          },
        ],
      },
    },
  },
  {
    id: '02',
    number: '02',
    title: 'REVIVE',
    titleLeft: 'RE',
    titleRight: 'VIVE',
    description: 'A fresh punch of tangy green apple and tart blueberry to jolt your senses back to life',
    subDescription: 'Wild Nordic bilberries, crisp Granny Smith apples, Japanese ceremonial grade matcha, and cold-steeped peppermint.',
    bgColor: '#b8735b',
    bgGradient: 'from-[#c27c64] via-[#b66f57] to-[#a86149]',
    textColColor: '#f7d3c3',
    bottleImage: '/assets/bottle-2.png',
    bottleAlt: 'Domingo 02 Revive Cobalt Blue Elixir Bottle',
    badge: 'Midday Focus · High Antioxidant',
    floatingElements: [
      {
        id: 'green-apple-02',
        name: 'Crisp Granny Smith Apple Slices',
        image: '/assets/cutouts/green_apple.png',
        className: 'left-[-20px] sm:left-[-35px] md:left-[-45px] top-[26%] md:top-[28%]',
        layer: 'back',
        size: { width: 'w-20 sm:w-24 md:w-32 lg:w-36', height: 'h-auto' },
        floatConfig: {
          xRange: [-10, 8, -10],
          yRange: [-10, 10, -10],
          rotateRange: [-6, 4, -6],
          duration: 5.1,
          delay: 0.2,
        },
      },
      {
        id: 'blueberries-02',
        name: 'Fresh Wild Nordic Blueberries',
        image: '/assets/cutouts/blueberries.png',
        className: 'right-[-15px] sm:right-[-25px] md:right-[-32px] top-[32%] md:top-[34%]',
        layer: 'front',
        size: { width: 'w-16 sm:w-20 md:w-26 lg:w-30', height: 'h-auto' },
        floatConfig: {
          xRange: [8, -8, 8],
          yRange: [10, -10, 10],
          rotateRange: [5, -6, 5],
          duration: 4.6,
          delay: 0.5,
        },
      },
    ],
    accordion: {
      consume: {
        title: 'How to consume',
        headline: 'The 2:00 PM Mental Reset',
        body: 'Engineered specifically to break through the afternoon brain fog without caffeine jitter or insulin spike.',
        tips: [
          'Drink at 2:00 PM or whenever afternoon concentration dips.',
          'Pairs exceptionally well with clean almonds or light hydration.',
          'Swirl before drinking to re-suspend micro-ground ceremonial matcha.',
        ],
      },
      benefits: {
        title: 'Benefits',
        headline: 'Cognitive Sharpness & Polyphenols',
        body: 'Contains rich anthocyanins from wild blueberries paired with L-theanine from first-harvest matcha.',
        bullets: [
          'Calm, jitter-free alpha wave cognitive state',
          'Over 4,500 ORAC units of wild berry cellular protection',
          'Refreshing tart palate cleanse that curbs afternoon sugar cravings',
        ],
      },
      buying: {
        title: 'Buying options',
        headline: 'Select Your Pack',
        options: [
          {
            id: 'revive-single',
            name: 'Single Bottle',
            volume: '330 ml',
            price: 6.75,
            description: 'Cobalt UV-blocking glass bottle',
          },
          {
            id: 'revive-6pack',
            name: 'Weekly 6-Pack',
            volume: '6 x 330 ml',
            price: 37.5,
            originalPrice: 40.5,
            popular: true,
            description: '6 bottles chilled in insulated recyclable container',
          },
          {
            id: 'revive-monthly',
            name: 'Monthly Cleanse',
            volume: '24 x 330 ml',
            price: 138.0,
            originalPrice: 162.0,
            description: 'Auto-shipped fresh every Monday morning',
          },
        ],
      },
    },
    bottomSection: {
      type: 'ingredients',
      title: 'Our ingredients are',
      subtitle: 'Pure single-origin botanicals harvested at peak potency',
      ingredients: [
        {
          name: 'Ceremonial Uji Matcha',
          subtitle: 'Shade-grown in Kyoto',
          image: '/assets/cutouts/matcha_powder.png',
          badge: 'High L-Theanine',
          description: 'Stone-milled tencha leaves delivering sustained cognitive calm and clean antioxidants without caffeine jitters.',
        },
        {
          name: 'Wild Nordic Bilberry',
          subtitle: 'Hand-picked in Lapland',
          image: '/assets/cutouts/blueberries.png',
          badge: 'Anthocyanin Rich',
          description: 'Dense dark purple pigments proven to support microvascular eye health and combat oxidative stress.',
        },
        {
          name: 'Crisp Green Apple',
          subtitle: 'Orchard cold-pressed',
          image: '/assets/cutouts/green_apple.png',
          badge: 'Pure Malic Acid',
          description: 'Natural malic acid gently cleanses the liver and delivers an exhilarating tart taste profile.',
        },
      ],
    },
  },
  {
    id: '03',
    number: '03',
    title: 'REFUEL',
    titleLeft: 'RE',
    titleRight: 'FUEL',
    description: 'Naturally sourced protein power to give you all the energy you need in your workout',
    subDescription: 'Organic raw Peruvian cacao, cold-milled golden turmeric, biodynamic sprouted hemp protein, and Sri Lankan Ceylon cinnamon.',
    bgColor: '#34b788',
    bgGradient: 'from-[#38bf8f] via-[#2fae80] to-[#24986e]',
    textColColor: '#2b44de',
    bottleImage: '/assets/bottle-1.png',
    bottleAlt: 'Domingo 03 Refuel Clear Elixir Bottle with Gold Foil Cap',
    badge: 'Recovery & Protein · Anti-Inflammatory',
    floatingElements: [
      {
        id: 'dark-chocolate-03',
        name: 'Artisan Dark Chocolate & Raw Cacao Shards',
        image: '/assets/cutouts/dark_chocolate.png?v=3',
        className: 'right-[-20px] sm:right-[-30px] md:right-[-38px] top-[18%] md:top-[20%]',
        layer: 'front',
        size: { width: 'w-24 sm:w-30 md:w-38 lg:w-42', height: 'h-auto' },
        floatConfig: {
          xRange: [10, -8, 10],
          yRange: [-12, 10, -12],
          rotateRange: [-7, 5, -7],
          duration: 5.6,
          delay: 0.1,
        },
      },
    ],
    accordion: {
      consume: {
        title: 'How to consume',
        headline: 'Post-Workout Anabolic Window',
        body: 'Formulated to replenish glycogen stores and initiate rapid muscle protein synthesis within 45 minutes of training.',
        tips: [
          'Consume within 45 minutes following high-intensity workout or endurance runs.',
          'Shake vigorously to blend micro-milled raw cacao and plant protein solids.',
          'Also functions as an exquisite guilt-free dessert or protein breakfast bowl base.',
        ],
      },
      benefits: {
        title: 'Benefits',
        headline: 'Muscular Repair & Inflammation Relief',
        body: 'High bio-available plant peptides combined with high-curcuminoid turmeric and natural magnesium.',
        bullets: [
          '18g raw cold-sprouted bioavailable plant protein',
          '95% standard curcuminoids to soothe delayed-onset muscle soreness',
          'Rich in magnesium, iron, and cardiovascular theobromine from raw cacao',
        ],
      },
      buying: {
        title: 'Buying options',
        headline: 'Select Your Pack',
        options: [
          {
            id: 'refuel-single',
            name: 'Single Bottle',
            volume: '330 ml',
            price: 7.0,
            description: 'Clear apothecary glass with hermetic gold seal',
          },
          {
            id: 'refuel-6pack',
            name: 'Weekly 6-Pack',
            volume: '6 x 330 ml',
            price: 39.0,
            originalPrice: 42.0,
            popular: true,
            description: '6 recovery doses for your training week',
          },
          {
            id: 'refuel-monthly',
            name: 'Monthly Cleanse',
            volume: '24 x 330 ml',
            price: 144.0,
            originalPrice: 168.0,
            description: 'Continuous fresh supply with sports shaker bonus',
          },
        ],
      },
    },
    bottomSection: {
      type: 'ingredients',
      title: 'Our ingredients are',
      subtitle: 'Nutrient-dense powerhouses backed by clinical athletics science',
      ingredients: [
        {
          name: 'Organic Golden Turmeric',
          subtitle: 'Alleppey High Curcumin',
          image: '/assets/cutouts/turmeric_powder.png',
          badge: 'Curcumin Active',
          description: 'Potent natural anti-inflammatory rhizome ground fresh to suppress post-exercise inflammatory markers.',
        },
        {
          name: 'Raw Criollo Cacao',
          subtitle: 'Peruvian Rainforest Direct',
          image: '/assets/cutouts/dark_chocolate.png?v=3',
          badge: 'Magnesium & Theobromine',
          description: 'Cold-pressed unroasted cacao beans loaded with vital electrolytes, heart-healthy flavanols, and mood boosters.',
        },
        {
          name: 'Sprouted Hemp & Pea Peptides',
          subtitle: 'European Bio-Certified',
          image: '/assets/bottle-1.png',
          badge: '18g Complete Amino Acid',
          description: 'Hypoallergenic complete protein profile rich in BCAAs (Leucine, Isoleucine, Valine) for cellular repair.',
        },
      ],
    },
  },
];
