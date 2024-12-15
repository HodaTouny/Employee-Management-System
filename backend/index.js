const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const route = require('./routes/route');
route(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
