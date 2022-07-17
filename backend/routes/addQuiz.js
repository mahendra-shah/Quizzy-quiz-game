const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { verifyToken } = require('../modules/jwt')
const { validQuiz } = require('../modules/validator')

// only admin/s can add quiz
router.post('/admin/addQuiz', verifyToken, validQuiz, async (req, res) => {
  try {
    const { category, question, A, B, C, D, correct } = req.body
    const gamerId = req.gamerData.id
    const role = req.gamerData.role
    const check = await prisma.questions.findMany({ where: { question } })
    // checking if question is there or not
    if (check.length === 0) {
      // checking if user is admon or not
      if (role === 'ADMIN') {
        await prisma.questions.create({
          data: { gamerId, category, question, A, B, C, D, correct }
        })
        return res.status(202).json({ msg: 'Question added to Quiz' })

      } return res.status(401).json({ msg: 'you are not admin' })
      
    } res.status(200).json({ msg: 'question already in database' })

  } catch (error) {
    res.status(500).json({ error })
  }

});

module.exports = router;