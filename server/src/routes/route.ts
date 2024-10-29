import express from 'express'
import {SourceRouter} from './SourceRoute'
import NewsRouter from './NewsRoute'
const router= express.Router()

router.use('/',NewsRouter)
router.use('/',SourceRouter)


export default router
