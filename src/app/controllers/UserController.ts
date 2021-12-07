import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import User from '../models/User'

class UserControler{
  async store(req: Request, res: Response){
    const repository = getRepository(User)
    const { email, password } = req.body

    const userExists = await repository.findOne({ where: {email} })

    if(userExists) return res.sendStatus(409)

    const user = repository.create({ email, password })
    await repository.save(user)

    return res.json(user)
  }
  async list(req: Request, res: Response){
    const repository = getRepository(User)
    const allUsers = await repository.findAndCount()

    return res.json({
      data: allUsers[0],
      total: allUsers[1]
    })
  }
}

export default new UserControler();