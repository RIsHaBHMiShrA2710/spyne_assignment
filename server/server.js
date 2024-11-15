const express = require('express');
const dotenv = require('dotenv');
const { swaggerDocs, swaggerUi } = require('./config/swaggerConfig');
const mongooseConnection = require('./config/mongooseConfig');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // If you need to send cookies or other credentials
  }));


app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`server is running of localhost://${PORT}`);
    mongooseConnection.once('open', () => {
        console.log('Connected to MongoDB');
    });
});
