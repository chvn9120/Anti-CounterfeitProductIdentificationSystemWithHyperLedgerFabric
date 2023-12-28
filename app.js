import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { engine } from 'express-handlebars';
import session from 'express-session';
import 'dotenv/config'
import connect2db from './database/connect2db.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import apisRouter from './routes/apis.js';
import productRouter from './routes/product.js';

const app = express();
connect2db();

// view engine setup
app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    layoutsDir: join(__dirname, 'views'),
    partialsDir: [join(__dirname, 'views/partials')],
    defaultLayout: 'layout',
    helpers: {
      // Helper example
      // <func_name>(args) {
      // 	..code
      // },
      vndDisplay(money) {
        return money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
      },
      displayReturnHomeBtn(errorCode) {
        return errorCode === 404 ? true : false
      },
      usdDisplay(money) {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',

          // These options are needed to round to whole numbers if that's what you want.
          //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
          maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });

        return formatter.format(money)
      },
      utc2dmy(d) {
          let date = new Date(d);
          var dd = date.getDate();
          var mm = date.getMonth() + 1;
          var yyyy = date.getFullYear();
          var hh = date.getHours();
          var min = date.getMinutes();
      
          if (dd < 10) { dd = '0' + dd }
          if (mm < 10) { mm = '0' + mm }
          if (hh < 10) { hh = '0' + hh }
          if (min < 10) { min = '0' + min }
      
          return d = hh + ':' + min + ' - ' +dd + '/' + mm + '/' + yyyy
      }
    },
  }),
);
app.set('views', [
  join(__dirname, 'views'),
  join(__dirname, 'views/product'),
  join(__dirname, 'views/home'),
  join(__dirname, 'views/error'),
  join(__dirname, 'views/checkout'),
  join(__dirname, 'views/order'),
]);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SECRET_SS,
    resave: true,
    saveUninitialized: true,
  }),
);

app.use('/apis', apisRouter);
app.use('/user', usersRouter);
app.use('/product', productRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  req.session.message = err.message;
  req.session.error = err;
  req.session.errorStatus = err.status || 404;

  res.redirect('/error');
});

export default app;
