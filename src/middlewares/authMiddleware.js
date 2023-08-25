// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//     console.log('checkout', req.headers.token);
//     const token = req.headers.token.split(' ')[1];

//     jwt.verify(token, 'access_token', function (err, user) {
//         if (err) {
//             return res.status(404).json({
//                 status: 'ERROR',
//                 message: 'The authentication( kh có quyên ad)'
//             })
//         }
//         const { payload } = user;
//         if (payload?.isAdmin) {
//             //Nếu là admin thì cho đi tiếp
//             next();
//         } else {
//             //Nếu khoong là admin thì stop
//             return res.status(404).json({
//                 status: 'ERROR',
//                 message: 'The authentication( kh có quyên ad)'
//             })
//         }
//     });

// }

// const authUserMiddleware = (req, res, next) => {
//     const token = req.headers.token.split(' ')[1];
//     const userId = req.params.id;

//     jwt.verify(token, 'access_token', function (err, user) {
//         if (err) {
//             return res.status(404).json({
//                 status: 'ERROR',
//                 message: 'The authentication( kh có quyên ad)'
//             })
//         }
//         const { payload } = user;
//         if (payload?.isAdmin || payload?.id === userId) {
//             //Nếu là admin thì cho đi tiếp
//             next();
//         } else {
//             //Nếu khoong là admin thì stop
//             return res.status(404).json({
//                 status: 'ERROR',
//                 message: 'The authentication( kh có quyên ad)'
//             })
//         }
//     });

// }


// module.exports = {
//     authMiddleware,
//     authUserMiddleware
// }