import jwt from 'jsonwebtoken'


export const createJwt = (details) => {
    return  jwt.sign(details, process.env.JWT_SECRET, { expiresIn: '60d'  });
}
