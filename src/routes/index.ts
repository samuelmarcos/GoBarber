import { Router, request, response } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Hello Word' });
});

export default routes;
