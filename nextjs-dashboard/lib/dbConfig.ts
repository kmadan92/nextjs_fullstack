import mongoose from 'mongoose';

async function connect() {
    try {
        // 1. Check if already connected (Prevents multiple connections)
        if (mongoose.connections[0].readyState) {
            return;
        }

        // 2. Connect
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        // 3. Event Listeners (Only set them up once)
        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            // process.exit(); // ⚠️ Don't do this in a web app, just log the error.
        });

    } catch (error: any) {
        console.log('Something went wrong!');
        console.log(error);
    }
}

// 4. EXPORT the function so others can use it
export default connect;