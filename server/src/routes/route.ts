import express from 'express'
import {SourceRouter} from './SourceRoute'
import NewsRouter from './NewsRoute'
import { UserRouter } from './UserRoute'
const router= express.Router()

router.use('/',NewsRouter)
router.use('/',SourceRouter)
router.use('/',UserRouter)


export default router
