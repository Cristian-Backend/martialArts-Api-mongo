import express from 'express';
import {check} from 'express-validator';


const router = express.Router()


// API endpoints
router.get('tecnics', getTecnics)

router.get('tecnics/:id', getTecnicsByID)

router.post('tecnics', createTecnics)

router.put('tecnics/:id', updateTecnics)

router.delete('tecnics/:id', deleteTecnics)



export default router;