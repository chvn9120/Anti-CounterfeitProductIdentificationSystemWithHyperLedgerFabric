import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { engine } from 'express-handlebars';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import apisRouter from './routes/apis.js';
import productRouter from './routes/product.js';

const app = express();

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
      usdDisplay(money) {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',

          // These options are needed to round to whole numbers if that's what you want.
          //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
          maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });

        return formatter.format(money)
      }
    },
  }),
);
app.set('views', [
  join(__dirname, 'views'),
  join(__dirname, 'views/product'),
  join(__dirname, 'views/home'),
  join(__dirname, 'views/error'),
]);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use('/product', productRouter);
app.use('/apis', apisRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
