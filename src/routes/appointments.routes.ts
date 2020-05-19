import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

import ensureAthenticated from '../middlewares/ensureAuthenticated';

appointmentsRouter.use(ensureAthenticated);

appointmentsRouter.get('/', async (req, res) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointments = await appointmentRepository.find();

    return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
    try {
        const { provider_id, date } = req.body;

        const parsedDate = parseISO(date);

        const createdAppointment = new CreateAppointmentService();

        const appointment = await createdAppointment.execute({
            provider_id,
            date: parsedDate,
        });

        return res.json(appointment);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
