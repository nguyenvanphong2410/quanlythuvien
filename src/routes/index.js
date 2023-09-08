const EmployeeRouter = require('./EmployeeRouter');
const BookRouter = require('./BookRouter');
const CategoryRouter =  require('./CategoryRouter');
const AuthorRouter =  require('./AuthorRouter');
const AuthRouter = require('./AuthRouter');

const routes = (app) => {
    app.use('/api/auth', AuthRouter);
    app.use('/api/employee', EmployeeRouter);
    app.use('/api/category', CategoryRouter);
    app.use('/api/author', AuthorRouter);
    app.use('/api/book', BookRouter);
}

module.exports = routes;