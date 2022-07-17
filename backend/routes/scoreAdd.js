const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { verifyToken } = require('../modules/jwt');
const prisma = new PrismaClient()

router.post('/update-score', verifyToken, async (req, res) => {
    try {
        const availableCategories = ['JAVASCRIPT', 'REACT', 'NODE']
        const { category, score } = req.body
        const gamerId = req.gamerData.id
        const userScores = await prisma.scoreBoard.findMany({
            where: {
                gamerId
            },
            select: {
                category: true,
                score: true,
                id: true
            }
        })
        let isUpdate = false          // update indicator
        let updateId = null          // update at this id
        let seeScore = null         // last high score
        let updateCate = null      // update category 
        for (let scoreData of userScores) {
            if (scoreData.category === category) {
                isUpdate = true;
                updateId = scoreData.id
                seeScore = parseInt(scoreData.score)
                updateCate = scoreData.category
                break
            }
        }
        // checking category is available or not
        if (availableCategories.includes(updateCate)) {
            // checking score already available or not
            if (userScores.length === 0 || !isUpdate) {
                await prisma.scoreBoard.create({
                    data: {
                        category,
                        score,
                        gamerId
                    }
                })
                return res.status().json({ msg: "score added" })
            }
            // checking score is greater than previous high score or not
            if (seeScore < Number(score)) {
                await prisma.scoreBoard.update({
                    where: {
                        id: updateId
                    },
                    data: {
                        score
                    }
                })
                return res.status(200).json({ msg: 'score updated' })
            }
            return res.status(200).json({ msg: 'You already have a better score' })

        } res.status(404).json({ msg: 'category not available to add score' })

    } catch (error) {
        res.status(500).json({ Error: error })
    }

})


module.exports = router