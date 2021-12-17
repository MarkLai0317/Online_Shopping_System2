const express = require('express');
const app = express();
const port = 9000 || process.env.PORT;
//const quotesRouter = require('./routes/quotes');
const markRouter = require('./routes/mark');
const nnRouter = require('./routes/nn');
const niRouter = require('./routes/ni');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

//app.use('/quotes', quotesRouter);
app.use('/mark', markRouter);
app.use('/nn', nnRouter);
app.use('/ni', niRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
