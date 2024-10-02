import express from 'express'
import {SourceRouter} from './SourceRoute'

const router= express.Router()


router.use('/',SourceRouter)


export default router
