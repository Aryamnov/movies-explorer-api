const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');

const { PORT, DATA_BASE } = require('./configs');

const app = express();

mongoose.connect(DATA_BASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use('/', express.json());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
