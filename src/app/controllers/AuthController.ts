import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User'

class UserControler{
  async authenticate(req: Request, res: Response){
    const repository = getRepository(User)
    const { email, password } = req.body

    const user = await repository.findOne({ where: {email} })

    if(!user) return res.sendStatus(401)

    const isValidPass = await bcrypt.compare(password, user.password)    

    if(!isValidPass) return res.sendStatus(401)

    const token = jwt.sign({id: user.id}, 'secret', { expiresIn: '1d'})

    const userToReturn = {...user, password: undefined, token: token}

    return res.json({
      data: userToReturn,
    })
  }
}

export default new UserControler();