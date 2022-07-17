const router = require('express').Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { createToken } = require('../modules/jwt')
const { validUser } = require('../modules/validator')


// register user
router.post('/register', validUser, async (req, res) => {
  try {
    const { name, email, age, password } = req.body
    const gamer = await prisma.gamers.findUnique({ where: { email } })

    if (gamer === null) {
      await prisma.gamers.create({
        data: { name, email, age, password }
      })
      return res.status(201).json({ msg: 'Gamer added to Quizzer' })
    }
    res.status(400).json({ notError: 'you already a Gamer at Quizzer' })

  } catch (error) {
    res.status(500).json({ error })
  }

})

// login here
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const gamer = await prisma.gamers.findMany({ where: { email, password } })
    if (gamer.length === 1) {
      const token = createToken(gamer[0])
      res.cookie('Cookie', token)
      return res.status(202).json({ msg: 'logged in......' })

    } res.status(404).json({ error: 'check your details again or try again' })
  } catch (error) {
    res.status(500).json({ error })
  }

})

module.exports = router;
