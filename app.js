const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const EmployeeRouter = require('./src/routes/employees');
const ReviewRouter = require('./src/routes/reviews');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// if (app.get('env') == 'production') {
//     app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
//   } else {
//     app.use(morgan('dev'));
//   }


// append /api for our http requests
app.use('/api', router);
app.use('/api/employees/', EmployeeRouter);
app.use('/api/reviews/', ReviewRouter);

/**
 * Basic API
 */
app.get('/', (req, res) => 
    res.send('Hey, How is your day? Cool, huh?? Keep Smilling!')
);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));