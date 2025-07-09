import jwt from 'jsonwebtoken';

export const verifyToken = (request, response, next) => {

    const token = request.cookies.jwt;
    if(!token) return response.status(401).send('Not authenticated'); // if token is not present, return error
    jwt.verify(token, process.env.JWT_KEY, async(err, payload) => {
        if(err) return response.status(403).send('Token is not valid');
        request.userId = payload.userId; // if token is valid, set userId in request object
        next();
    })
}