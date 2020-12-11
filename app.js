const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();

// == 可通过地址访问: http://localhost:4000/index.html
app.use(static(path.join(__dirname,  './_book')));

app.listen(4000, () => {
  console.log('server started on port 4000');
});
