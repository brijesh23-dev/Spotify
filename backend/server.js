
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const connectDb = require('./db/db');
connectDb();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});