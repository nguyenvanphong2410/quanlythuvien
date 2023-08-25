const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

//Tao token
const genneralAccessToken = async (payload) => {
    console.log('>> payload: ', payload)
    const access_token = jwt.sign({
        payload
    }, 'access_token', { expiresIn: '24h' })
    return access_token;
}

//Refresh token
const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        payload
    }, 'refresh_token', { expiresIn: '365d' })
    return refresh_token;
}

//Refresh token
const refreshTokenJwtService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('token', token);
            jwt.verify(token, 'refresh_token', async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERR',
                        message: 'The authentication'
                    })
                }
                const { payload } = user;
                const access_token = await genneralAccessToken({
                    id: payload?.id,
                    name: payload?.name
                    // isAdmin: payload?.isAdmin
                })
                console.log('access_token:', access_token)
                resolve({
                    status: 'OK',
                    message: 'RefreshTokenService đã được SUCCESS',
                    access_token
                })
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}
