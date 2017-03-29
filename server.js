const koa = require('koa'),
    router = require('koa-router')(),
    render = require('koa-hbs');

const app = koa();

app.use(render.middleware({
    viewPath: `${__dirname}/views`
}));

app.use(router.routes());
app.use(router.allowedMethods());

router.get('*', function*() {
    yield this.render('index');
});

app.listen(3001, () => {
    console.log('Server started');
});