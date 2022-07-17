const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { verifyToken } = require('../modules/jwt')

// user score 
router.get('/get-score', verifyToken, async (req, res) => {
    try {
        const gamerId = req.gamerData.id
        const scores = await prisma.scoreBoard.findMany({ where: { gamerId } })
        res.send(scores)
        
    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router