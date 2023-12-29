const DisplayErrors = (req, res, next) => {
    const errorStatus = req.session.errorStatus;
    res.locals.message = req.session.message || `Some error occurring!`;
    
    if (req.session.orderRoute) delete req.session.orderRoute
    if (req.session.cartRoute) delete req.session.cartRoute

    switch (errorStatus) {
        case 401:
            res.locals.error = req.session.error_401 || `Please login to access this page!</br><a class="btn btn-default mt-2" style="background-color:#cda45e" href='/login'>Login now</a>`;
            res.locals.status = errorStatus || 401;
            /**
             * Xóa sau khi gán cho error để không
             * tự động gán lại lỗi cũ này cho lần tiếp theo
             */
            delete req.session.error_401;
            break;
        case 404:
            res.locals.error = req.session.error_404 || `Oops! Something went wrong!`;
            res.locals.status = errorStatus || 404;
            delete req.session.error_404;
            break;
        case 422:
            res.locals.error = req.session.error_422 || `Please check your username or password again!</br><a class="btn btn-default mt-2" style="background-color:#cda45e" href='/login'>Login again here</a>`;
            res.locals.status = errorStatus || 422;
            delete req.session.error_422;
            break;
        default:
            res.locals.error = `Oops! Something went wrong!`;
            res.locals.status = errorStatus || 404;
            break;
    }

    res.render('error');
};

const errorController = {
    DisplayErrors
}

export default errorController
