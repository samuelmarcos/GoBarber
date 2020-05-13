import Appointment from '../models/Appointment';

import AppointmentsRepository from '../repositories/AppointmentRepository';

import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider, date }: Request): Promise<Appointment> {
        const apointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await apointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate)
            throw Error('This appointment is already booked');

        const appointment = apointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        await apointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
