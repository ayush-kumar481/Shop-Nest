require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const Product = require("../model/Product");
const Order = require("../model/Order");
const connectDB = require("../config/db");

const products = [
  {
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Immersive sound experience with advanced active noise cancellation.",
    price: 2299.99,
    category: "Electronics",
    stock: 15,
    imageUrl: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    rating: 4.8,
    numReviews: 24,
  },
  {
    name: "Minimalist Modern Chair",
    description:
      "A stylish and comfortable addition to any contemporary living room.",
    price: 1149.99,
    category: "Furniture",
    stock: 30,
    imageUrl: [
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    rating: 4.2,
    numReviews: 12,
  },
  {
    name: "Professional DSLR Camera",
    description:
      "Capture stunning moments with high-resolution clarity and speed.",
    price: 131199.99,
    category: "Electronics",
    stock: 8,
    imageUrl: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    rating: 4.9,
    numReviews: 50,
  },
  {
    name: "Classic White Sneakers",
    description: "Versatile and comfortable, a staple for any casual outfit.",
    price: 8499.99,
    category: "Clothing",
    stock: 50,
    imageUrl: [
      "https://images.unsplash.com/photo-1695073621086-aa692bc32a3d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    ],
    rating: 4.5,
    numReviews: 89,
  },
  {
    name: "Ceramic Pour-Over Coffee Set",
    description:
      "A thoughtfully made ceramic dripper and mug set for a slow, satisfying morning coffee ritual.",
    price: 1999.99,
    category: "Home & Kitchen",
    stock: 22,
    imageUrl: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    rating: 4.7,
    numReviews: 31,
  },
  {
    name: "Everyday Canvas Tote Bag",
    description:
      "A durable, roomy cotton canvas tote for errands, books, and daily essentials.",
    price: 2229.0,
    category: "Clothing",
    stock: 45,
    imageUrl: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    rating: 4.6,
    numReviews: 18,
  },
  {
    name: "Portable Bluetooth Speaker",
    description:
      "A compact wireless speaker with rich sound, simple controls, and all-day battery life.",
    price: 499.99,
    category: "Electronics",
    stock: 19,
    imageUrl: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    rating: 4.5,
    numReviews: 42,
  },
  {
    name: "Linen Table Lamp",
    description:
      "A warm, minimal bedside lamp with a natural linen shade and a solid wood base.",
    price: 1000.0,
    category: "Home & Kitchen",
    stock: 14,
    imageUrl: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    rating: 4.8,
    numReviews: 27,
  },
  {
    name: "Stainless Steel Water Bottle",
    description:
      "A reusable insulated bottle that keeps drinks cold or hot while you are on the move.",
    price: 899.99,
    category: "Outdoor",
    stock: 60,
    imageUrl: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    rating: 4.4,
    numReviews: 36,
  },
  {
    name: "Walnut Desk Organizer",
    description:
      "Keep pens, notes, and small desk essentials tidy with a clean-lined walnut organizer.",
    price: 1139.0,
    category: "Office",
    stock: 26,
    imageUrl: [
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    rating: 4.6,
    numReviews: 15,
  },
  {
    name: "Soft Knit Throw Blanket",
    description:
      "A cozy textured throw for reading corners, cool evenings, and relaxed weekends.",
    price: 559.99,
    category: "Home & Kitchen",
    stock: 17,
    imageUrl: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    rating: 4.9,
    numReviews: 22,
  },
  {
    name: "Everyday Running Shoes",
    description:
      "Lightweight cushioned running shoes made for daily walks and easy training sessions.",
    price: 1299.99,
    category: "Clothing",
    stock: 33,
    imageUrl: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    rating: 4.5,
    numReviews: 48,
  },
];

const importData = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash("password123", 10);
    await User.findOneAndUpdate(
      { email: "admin@shopnest.com" },
      {
        $setOnInsert: {
          name: "Admin User",
          email: "admin@shopnest.com",
          password: hashedPassword,
          role: "admin",
          verified: true,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    const customer = await User.findOneAndUpdate(
      { email: "demo@shopnest.com" },
      {
        $setOnInsert: {
          name: "Demo Customer",
          email: "demo@shopnest.com",
          password: hashedPassword,
          role: "user",
          verified: true,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    const seededProducts = [];
    for (const product of products) {
      seededProducts.push(
        await Product.findOneAndUpdate(
          { name: product.name },
          { $set: product },
          {
            upsert: true,
            returnDocument: "after",
            runValidators: true,
            setDefaultsOnInsert: true,
          },
        ),
      );
    }

    const headphones = seededProducts[0];
    const chair = seededProducts[1];
    const sneakers = seededProducts[3];
    const demoAddress = {
      fullName: customer.name,
      street: "123 Demo Street",
      city: "Mumbai",
      postCode: "400001",
      country: "India",
    };

    const sampleOrders = [
      {
        paymentId: "seed-order-demo-001",
        user: customer._id,
        items: [
          { productId: headphones._id, qty: 1, price: headphones.price },
          { productId: chair._id, qty: 1, price: chair.price },
        ],
        totalAmount: headphones.price + chair.price,
        address: demoAddress,
        status: "delivered",
      },
      {
        paymentId: "seed-order-demo-002",
        user: customer._id,
        items: [{ productId: sneakers._id, qty: 2, price: sneakers.price }],
        totalAmount: sneakers.price * 2,
        address: {
          ...demoAddress,
          street: "45 Sample Road",
          city: "Pune",
          postCode: "411001",
        },
        status: "pending",
      },
    ];

    for (const order of sampleOrders) {
      const { paymentId, ...orderData } = order;
      await Order.findOneAndUpdate(
        { paymentId },
        { $set: orderData, $setOnInsert: { paymentId } },
        {
          upsert: true,
          returnDocument: "after",
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      );
    }

    console.log(
      "Seed data imported successfully. Existing users and other products were preserved.",
    );
    console.log("Demo admin: admin@shopnest.com / password123");
    console.log("Demo customer: demo@shopnest.com / password123");
    console.log(`Sample orders created or updated: ${sampleOrders.length}`);
  } catch (error) {
    console.error("Error importing seed data:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

importData();
