import Appointment from '../models/Appointment';

import AppointmentsRepository from '../repositories/AppointmentRepository';

import { startOfHour } from 'date-fns';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private apointmentsRepository: AppointmentsRepository;

    constructor(apointmentsRepository: AppointmentsRepository) {
        this.apointmentsRepository = apointmentsRepository;
    }
    public execute({ provider, date }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.apointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate)
            throw Error('This appointment is already booked');

        const appointment = this.apointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
