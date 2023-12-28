import createError from "http-errors";

export default async (req, res, next) => {
    const currentUser = req.session.user || req.cookies.user;

    if (!currentUser) {
        req.session.error_401 = `Please login to access this page!</br><a class="btn btn-default mt-2" style="background-color:#cda45e" href='/login'>Login now</a>`;
        return next(createError(401, 'Access Denied: You have to login to access this page'));
    }

    next();
}