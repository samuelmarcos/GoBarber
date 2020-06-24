import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentRepository';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const apointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await apointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate)
            throw new AppError('This appointment is already booked');

        const appointment = apointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await apointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
