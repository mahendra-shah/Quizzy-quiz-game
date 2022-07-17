const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient
const jwt = require("jsonwebtoken");

const createToken = ({ id }) => {
    return jwt.sign(id, "ncfyR^%Q2nx278n(*NCu876BC48xnc");
};

const verifyToken = async (req, res, next) => {
    if (req.headers.cookie) {
        const token = req.headers.cookie.split("=")[1];
        const id = jwt.verify(token, "ncfyR^%Q2nx278n(*NCu876BC48xnc");
        const user = await prisma.gamers.findUnique({
            where:{ id: Number(id) }
        })
        req.gamerData = user;
        next();
    } else {
        res.send("token expired");
    }
};

module.exports = { createToken, verifyToken };