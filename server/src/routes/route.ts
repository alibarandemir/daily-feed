import express from 'express'
import {SourceRouter} from './SourceRoute'
import NewsRouter from './NewsRoute'
import { UserRouter } from './UserRoute'
import { redisCachingMiddleware } from '../middleware/redisCaching'
const router= express.Router()

router.use('/',redisCachingMiddleware(),NewsRouter)
router.use('/',SourceRouter)
router.use('/',UserRouter)


export default router
