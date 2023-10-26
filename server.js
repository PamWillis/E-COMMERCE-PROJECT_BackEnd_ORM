const express = require('express');
const sequelize =require('./config/connection');

const apiRoutes = require('./routes')


const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//define api routes
app.use(apiRoutes)

// sync sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
