export const businessData = [
    {
      category: 'Restaurants',
      icon: '/assets/restaurant.png', // Use the category icon
      businesses: Array.from({ length: 20 }, (_, i) => ({
        id: `${i + 1}`,
        name: `Restaurant ${i + 1}`,
        rating: parseFloat((4 + Math.random()).toFixed(1)), // Random rating between 4.0 and 5.0
        logo: i % 2 === 0 ? '/assets/tatu-moto.png' : '/assets/larana Kitchen.png', // Alternating restaurant logos
        openingTime: `${7 + (i % 3)}am`,
        closingTime: `${8 + (i % 4)}pm`,
        address: `Location ${i + 1}`,
        heroImage: i % 2 === 0 ? '/assets/grilled.png' : '/assets/mango juice.png', // Alternating hero images
        reviews: Math.floor(Math.random() * 100 + 1), // Random number of reviews
        products: [
          { productName: 'Chicken Fry', price: '450/= ', image: '/assets/grilled.png' },
          { productName: 'Beef Fry', price: '400/= ', image: '/assets/beef-fry.png' },
        ],
      })),
    },
    {
      category: 'Barbershop',
      icon: '/assets/barbershop.png', // Use the category icon
      businesses: Array.from({ length: 20 }, (_, i) => ({
        id: `${i + 21}`,
        name: `Barbershop ${i + 1}`,
        rating: parseFloat((4 + Math.random()).toFixed(1)), // Random rating between 4.0 and 5.0
        logo: i % 2 === 0 ? '/assets/kims_barbershop.png' : '/assets/beauty-saloon.png', // Alternating barbershop logos
        openingTime: `${8 + (i % 2)}am`,
        closingTime: `${9 + (i % 3)}pm`,
        address: `Location ${i + 1}`,
        heroImage: i % 2 === 0 ? '/assets/nail.png' : '/assets/sallon.png', // Alternating hero images
        reviews: Math.floor(Math.random() * 50 + 1), // Random number of reviews
        products: [
          { productName: 'Haircut', price: '300/= ', image: '/assets/haircut.png' },
          { productName: 'Beard Trim', price: '150/= ', image: '/assets/beard-trim.png' },
        ],
      })),
    },
    {
      category: 'Shoes',
      icon: '/assets/shoes.png', // Use the category icon
      businesses: Array.from({ length: 20 }, (_, i) => ({
        id: `${i + 41}`,
        name: `Shoe Store ${i + 1}`,
        rating: parseFloat((4 + Math.random()).toFixed(1)), // Random rating between 4.0 and 5.0
        logo: '/assets/shoes.png', // Use the default shoe logo
        openingTime: `${9 + (i % 3)}am`,
        closingTime: `${6 + (i % 4)}pm`,
        address: `Location ${i + 1}`,
        heroImage: '/assets/tshirt.png', // Use the default hero image for shoes
        reviews: Math.floor(Math.random() * 200 + 1), // Random number of reviews
        products: [
          { productName: 'Running Shoes', price: '3,000/= ', image: '/assets/running-shoes.png' },
          { productName: 'Casual Sneakers', price: '2,500/= ', image: '/assets/casual-sneakers.png' },
        ],
      })),
    },
  ];
  