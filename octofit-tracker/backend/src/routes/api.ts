import { Router } from 'express'
import { Activity, Leaderboard, Team, User, Workout } from '../models.js'

const apiRouter = Router()

apiRouter.get('/users', async (_request, response, next) => {
  try { response.json(await User.find().sort({ createdAt: -1 })) } catch (error) { next(error) }
})

apiRouter.post('/users', async (request, response, next) => {
  try { response.status(201).json(await User.create(request.body)) } catch (error) { next(error) }
})

apiRouter.get('/teams', async (_request, response, next) => {
  try { response.json(await Team.find().populate('members', 'name email')) } catch (error) { next(error) }
})

apiRouter.post('/teams', async (request, response, next) => {
  try { response.status(201).json(await Team.create(request.body)) } catch (error) { next(error) }
})

apiRouter.get('/activities', async (_request, response, next) => {
  try { response.json(await Activity.find().populate('user', 'name email').sort({ completedAt: -1 })) } catch (error) { next(error) }
})

apiRouter.post('/activities', async (request, response, next) => {
  try { response.status(201).json(await Activity.create(request.body)) } catch (error) { next(error) }
})

apiRouter.get('/leaderboard', async (_request, response, next) => {
  try { response.json(await Leaderboard.find().populate('user', 'name email').sort({ rank: 1 })) } catch (error) { next(error) }
})

apiRouter.get('/workouts', async (_request, response, next) => {
  try { response.json(await Workout.find().sort({ createdAt: -1 })) } catch (error) { next(error) }
})

apiRouter.post('/workouts', async (request, response, next) => {
  try { response.status(201).json(await Workout.create(request.body)) } catch (error) { next(error) }
})

export default apiRouter