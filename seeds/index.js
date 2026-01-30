const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const { createClient } = require('pexels');

// Initialize Pexels client with your API key
const client = createClient(process.env.PEXELS_API_KEY);

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    // Fetch camping images from Pexels
    let campingPhotos = [];
    try {
        const searchResults = await client.photos.search({
            query: 'camping',
            per_page: 80,
            orientation: 'landscape'
        });
        campingPhotos = searchResults.photos;
        console.log(`Fetched ${campingPhotos.length} camping images from Pexels`);
    } catch (error) {
        console.log('Error fetching images from Pexels:', error.message);
        console.log('Using fallback image URLs');
    }

    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const imageUrl = campingPhotos.length > 0
            ? campingPhotos[i % campingPhotos.length].src.large
            : 'https://source.unsplash.com/collection/483251';

        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: imageUrl,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.',
            price: Math.floor(Math.random() * 20) + 10
        });
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
});

