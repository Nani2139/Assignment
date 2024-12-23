const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', routes); // Use the routes under the `/api` prefix

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
