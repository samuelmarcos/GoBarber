import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAthenticated);

appointmentsRouter.get('/', async (req, res) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointments = await appointmentRepository.find();

    return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createdAppointment = new CreateAppointmentService();

    const appointment = await createdAppointment.execute({
        provider_id,
        date: parsedDate,
    });

    return res.json(appointment);
});

export default appointmentsRouter;
