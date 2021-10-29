require('dotenv').config();

const express = require('express');
const cors = require('cors');

const apiRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { PORT } = process.env;

app.use('/api', apiRoutes);


app.listen(PORT, () => console.log(`server is running on port ${PORT}`));