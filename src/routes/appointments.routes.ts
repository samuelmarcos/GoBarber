import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const apointmentsRepository = new AppointmentRepository();

appointmentsRouter.get('/', (req, res) => {
    const appointments = apointmentsRepository.all();

    return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
    try {
        const { provider, date } = req.body;

        const parsedDate = parseISO(date);

        const createdAppointment = new CreateAppointmentService(
            apointmentsRepository,
        );

        const appointment = createdAppointment.execute({
            provider,
            date: parsedDate,
        });

        return res.json(appointment);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
