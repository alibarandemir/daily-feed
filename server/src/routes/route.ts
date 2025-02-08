import express from 'express'
import {SourceRouter} from './SourceRoute'
import NewsRouter from './NewsRoute'
import { UserRouter } from './UserRoute'
import { redisCachingMiddleware } from '../middleware/redisCaching'
import CategoryRouter from './CategoryRoute'
const router= express.Router()

router.use('/',redisCachingMiddleware(),NewsRouter)
router.use('/',SourceRouter)
router.use('/',UserRouter)
router.use('/',CategoryRouter)


export default router
