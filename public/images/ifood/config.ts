export const ifoodImages = {
  // Hero Section
  heroBg: {
    src: "/images/ifood/projeto-remover-fundo-11.png",
    alt: "Isometric restaurant illustration for hero section",
    width: 1514,
    height: 845,
    priority: true
  },

  // Header/Logo
  logo: {
    src: "/images/ifood/logo-ifood.svg",
    alt: "iFood logo",
    width: 55,
    height: 30
  },

  // Navigation Icons
  chevronDown: {
    src: "/images/ifood/icon-chevron.svg",
    alt: "Chevron down icon",
    width: 8,
    height: 16
  },
  chevronDownAlt: {
    src: "/images/ifood/icon-chevron-alt.svg",
    alt: "Chevron down icon alternative",
    width: 8,
    height: 16
  },

  // Stats Section
  statsImage: {
    src: "/images/ifood/image-23.png",
    alt: "Restaurant statistics visualization",
    width: 262,
    height: 245
  },

  // Product Cards
  cards: {
    crm360: {
      main: {
        src: "/images/ifood/image-1755.png",
        alt: "CRM 360 dashboard preview",
        width: 303,
        height: 303,
        priority: true
      },
      card1: {
        src: "/images/ifood/image-1756.png",
        alt: "Product card 1",
        width: 192,
        height: 331
      },
      card2: {
        src: "/images/ifood/image-1757.png",
        alt: "Product card 2",
        width: 192,
        height: 331
      },
      card3: {
        src: "/images/ifood/image-1758.png",
        alt: "Product card 3",
        width: 192,
        height: 331
      }
    }
  },

  // Testimonials
  testimonials: {
    avatar1: {
      src: "/images/ifood/oval-1.png",
      alt: "Gabriel from Pizza Prime",
      width: 109,
      height: 109
    },
    avatar1Icon: {
      src: "/images/ifood/image-1753.png",
      alt: "Gabriel profile icon",
      width: 56,
      height: 54
    },
    avatar2: {
      src: "/images/ifood/oval-2.png",
      alt: "Ana from Olive Garden",
      width: 109,
      height: 109
    },
    avatar2Image: {
      src: "/images/ifood/image-1759.png",
      alt: "Ana profile image",
      width: 50,
      height: 50
    },
    avatar3: {
      src: "/images/ifood/oval-3.png",
      alt: "Helena from Maní Manioca",
      width: 109,
      height: 109
    },
    avatar3Image: {
      src: "/images/ifood/image-1760.png",
      alt: "Helena profile image",
      width: 50,
      height: 50
    }
  },

  // Decorative Elements & SVGs
  decorative: {
    frame: {
      src: "/images/ifood/frame-decorative.svg",
      alt: "Decorative frame element",
      width: 110,
      height: 115
    },
    circleGroup: {
      src: "/images/ifood/group-1597888230.svg",
      alt: "Decorative circle group",
      width: 150,
      height: 150
    },
    vector: {
      src: "/images/ifood/vector-decoration.svg",
      alt: "Decorative vector",
      width: 100,
      height: 100
    },
    vectorGroup: {
      src: "/images/ifood/group-1597888227.svg",
      alt: "Decorative vector group",
      width: 100,
      height: 100
    },
    rectangle: {
      src: "/images/ifood/rectangle-34626385.svg",
      alt: "Rectangle mask element",
      width: 489,
      height: 331
    },
    imageMask: {
      src: "/images/ifood/image-1754.svg",
      alt: "Image mask element",
      width: 192,
      height: 331
    },
    oval: {
      src: "/images/ifood/oval-mask.svg",
      alt: "Oval mask",
      width: 81,
      height: 81
    },
    imageMask22: {
      src: "/images/ifood/image-22.svg",
      alt: "Image mask 22",
      width: 194,
      height: 50
    },
    lineCopy: {
      src: "/images/ifood/line-copy.svg",
      alt: "Decorative line",
      width: 1111,
      height: 2
    }
  },

  // Social Media Icons
  social: {
    facebook: {
      src: "/images/ifood/logo-facebook.svg",
      alt: "Facebook",
      width: 24,
      height: 24
    },
    instagram: {
      src: "/images/ifood/logo-instagram.svg",
      alt: "Instagram",
      width: 24,
      height: 24
    },
    linkedin: {
      src: "/images/ifood/logo-linkedin.svg",
      alt: "LinkedIn",
      width: 24,
      height: 24
    }
  },

  // Footer
  footerLogo: {
    src: "/images/ifood/logo-footer.svg",
    alt: "iFood footer logo",
    width: 28,
    height: 25
  }
};

// Helper function to get image with defaults
export function getImage(path: string) {
  const keys = path.split('.');
  let obj: any = ifoodImages;

  for (let key of keys) {
    obj = obj[key];
    if (!obj) return null;
  }

  return obj;
}
