const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/webapp';

// Tất cả sample products từ code
const sampleProducts = [
  // Gundam products
  {
    name: 'HG 1/144 GAIA\'S/ORTEGA\'S RICK DOM(GQ)',
    price: 850000,
    image: '/GAIA.png',
    category: 'gundam',
    brand: 'Bandai',
    manufacturer: 'Bandai',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 10,
    status: 'active'
  },
  {
    name: 'RG 1/144 WING GUNDAM ZERO',
    price: 1100000,
    image: '/wing.png',
    category: 'gundam',
    brand: 'Bandai',
    manufacturer: 'Bandai',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 15,
    status: 'active'
  },
  {
    name: 'MG 1/100 RX-178 Gundam Mk-II',
    price: 950000,
    image: '/mkII.png',
    category: 'gundam',
    brand: 'Bandai',
    manufacturer: 'Bandai',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 8,
    status: 'active'
  },
  {
    name: 'HGUC 1/144 ZAKU II KAI',
    price: 280000,
    image: '/zaku.png',
    category: 'gundam',
    brand: 'Bandai',
    manufacturer: 'Bandai',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 20,
    status: 'active'
  },
  {
    name: 'RG 1/144 SAZABI',
    price: 1200000,
    image: '/sazabi.png',
    category: 'gundam',
    brand: 'Bandai',
    manufacturer: 'Bandai',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 12,
    status: 'active'
  },
  {
    name: 'RG 40 RX-78-2 Ver 2.0 1/144 MS Gundam',
    price: 950000,
    image: '/78-2.png',
    category: 'gundam',
    brand: 'Bandai',
    manufacturer: 'Bandai',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 10,
    status: 'active'
  },
  {
    name: 'MG 1/100 FREEDOM GUNDAM 2.0',
    price: 1500000,
    image: '/freedom.png',
    category: 'gundam',
    brand: 'Bandai',
    manufacturer: 'Bandai',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 6,
    status: 'active'
  },
  {
    name: 'SD GUNDAM EX-STANDARD Astray Red Frame',
    price: 160000,
    image: '/astray sd.png',
    category: 'gundam',
    brand: 'Bandai',
    manufacturer: 'Bandai',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 25,
    status: 'active'
  },
  
  // Hot Wheels products
  {
    name: 'Hot Wheels Koenigsegg Agera',
    price: 279000,
    image: '/koenigsegg.png',
    category: 'hotwheel',
    brand: 'Hot Wheels',
    manufacturer: 'Mattel',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 30,
    status: 'active'
  },
  {
    name: 'Hot Wheels Premium Car 2',
    price: 280000,
    image: '',
    category: 'hotwheel',
    brand: 'Hot Wheels',
    manufacturer: 'Mattel',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 25,
    status: 'active'
  },
  {
    name: 'Hot Wheels Premium Car 3',
    price: 300000,
    image: '',
    category: 'hotwheel',
    brand: 'Hot Wheels',
    manufacturer: 'Mattel',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 20,
    status: 'active'
  },
  {
    name: 'Hot Wheels Premium Car 4',
    price: 320000,
    image: '',
    category: 'hotwheel',
    brand: 'Hot Wheels',
    manufacturer: 'Mattel',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 18,
    status: 'active'
  },
  
  // Figure products
  {
    name: 'Anime Figure 1',
    price: 1200000,
    image: '',
    category: 'figure',
    brand: 'Anime Figure',
    manufacturer: 'Various',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 5,
    status: 'active'
  },
  {
    name: 'Anime Figure 2',
    price: 1500000,
    image: '',
    category: 'figure',
    brand: 'Anime Figure',
    manufacturer: 'Various',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 4,
    status: 'active'
  },
  {
    name: 'Anime Figure 3',
    price: 1800000,
    image: '',
    category: 'figure',
    brand: 'Anime Figure',
    manufacturer: 'Various',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 3,
    status: 'active'
  },
  {
    name: 'Anime Figure 4',
    price: 2000000,
    image: '',
    category: 'figure',
    brand: 'Anime Figure',
    manufacturer: 'Various',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 2,
    status: 'active'
  },
  
  // Bandai products
  {
    name: 'Bandai Model Kit 1',
    price: 500000,
    image: '',
    category: 'bandai',
    brand: 'Bandai',
    manufacturer: 'Bandai',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 15,
    status: 'active'
  },
  {
    name: 'Bandai Model Kit 2',
    price: 600000,
    image: '',
    category: 'bandai',
    brand: 'Bandai',
    manufacturer: 'Bandai',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 12,
    status: 'active'
  },
  {
    name: 'Bandai Model Kit 3',
    price: 700000,
    image: '',
    category: 'bandai',
    brand: 'Bandai',
    manufacturer: 'Bandai',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 10,
    status: 'active'
  },
  {
    name: 'Bandai Model Kit 4',
    price: 800000,
    image: '',
    category: 'bandai',
    brand: 'Bandai',
    manufacturer: 'Bandai',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 8,
    status: 'active'
  },
  
  // Additional products from ProductGrid
  {
    name: 'Mô Hình Mobile Suit Gundam 45th Anniversary',
    price: 680000,
    image: '',
    category: 'gundam',
    brand: 'Bandai',
    manufacturer: 'Bandai',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 10,
    status: 'active'
  },
  {
    name: 'Mô Hình Hololive - Karasu - La+ Darkness',
    price: 550000,
    image: '',
    category: 'figure',
    brand: 'Hololive',
    manufacturer: 'Various',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 8,
    status: 'active'
  },
  {
    name: 'Mô Hình Demon Slayer - Kimetsu no Yaiba',
    price: 600000,
    image: '',
    category: 'figure',
    brand: 'Anime Figure',
    manufacturer: 'Various',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 7,
    status: 'active'
  },
  {
    name: 'Mô Hình Frieren: Beyond Journey\'s End',
    price: 690000,
    image: '',
    category: 'figure',
    brand: 'Anime Figure',
    manufacturer: 'Various',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 6,
    status: 'active'
  },
  {
    name: 'Mô Hình Dragon Ball Z - Grandista Goku II',
    price: 500000,
    image: '',
    category: 'figure',
    brand: 'Anime Figure',
    manufacturer: 'Various',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 9,
    status: 'active'
  },
  {
    name: 'Mô hình Date A Live - PenLife! - Kurumi',
    price: 340000,
    image: '',
    category: 'figure',
    brand: 'Anime Figure',
    manufacturer: 'Various',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 12,
    status: 'active'
  },
  {
    name: 'Mô hình One Piece - Monkey D. Luffy',
    price: 450000,
    image: '',
    category: 'figure',
    brand: 'Anime Figure',
    manufacturer: 'Various',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 11,
    status: 'active'
  },
  {
    name: 'HG 1/144 GAIA\'S/ORTEGA\'S RICK DOM',
    price: 380000,
    image: '/GAIA.png',
    category: 'gundam',
    brand: 'Bandai',
    manufacturer: 'Bandai',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 18,
    status: 'active'
  },
  {
    name: 'ACTION BASE 7 [CLEAR COLOR]',
    price: 120000,
    image: '',
    category: 'bandai',
    brand: 'Bandai',
    manufacturer: 'Bandai',
    badges: [
      { text: 'ĐỔI TRẢ LỖI NSX', type: 'return' },
      { text: 'SHIP HỎA TỐC', type: 'shipping' }
    ],
    stock: 30,
    status: 'active'
  }
];

const importProducts = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB');

    console.log(`\nStarting import of ${sampleProducts.length} products...`);
    
    let created = 0;
    let skipped = 0;
    let errors = 0;

    for (const productData of sampleProducts) {
      try {
        // Check if product already exists by name
        const existingProduct = await Product.findOne({ name: productData.name });
        
        if (existingProduct) {
          console.log(`Skipped: "${productData.name}" (already exists)`);
          skipped++;
          continue;
        }

        // Create product without badges first
        const productDataClean = {
          name: productData.name,
          price: productData.price,
          image: productData.image || '',
          description: productData.description || '',
          manufacturer: productData.manufacturer || '',
          brand: productData.brand || '',
          category: productData.category || '',
          productType: productData.productType || '',
          stock: productData.stock || 0,
          status: productData.status || 'active'
        };
        
        const product = new Product(productDataClean);
        await product.save();
        
        // Skip badges update for now - can be added later via API
        console.log(`Created: "${productData.name}"`);
        created++;
      } catch (error) {
        console.error(`Error creating "${productData.name}":`, error.message);
        errors++;
      }
    }

    console.log('\nImport Summary:');
    console.log(`   Created: ${created}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Total: ${sampleProducts.length}`);

    // Show total products in database
    const totalProducts = await Product.countDocuments({ status: 'active' });
    console.log(`\nTotal active products in database: ${totalProducts}`);

    await mongoose.connection.close();
    console.log('\nImport completed!');
    process.exit(0);
  } catch (error) {
    console.error('Import error:', error);
    process.exit(1);
  }
};

importProducts();
