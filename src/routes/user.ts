import { Router } from 'express'

const router = Router()

router.get("/info", async (_req, res) => {
res.status(200).send('hola');
});

export default router