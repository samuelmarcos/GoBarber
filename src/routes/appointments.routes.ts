import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentRepository';

const appointmentsRouter = Router();

const apointmenstRepository = new AppointmentRepository();

appointmentsRouter.get('/', (req, res) => {
    const appointments = apointmenstRepository.all();

    return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
    const { provider, date } = req.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = apointmenstRepository.findByDate(
        parsedDate,
    );

    if (findAppointmentInSameDate) {
        return res
            .status(400)
            .json({ message: 'This appointment is already booked' });
    }

    const appointment = apointmenstRepository.create({
        provider,
        date: parsedDate,
    });

    return res.json(appointment);
});

export default appointmentsRouter;
