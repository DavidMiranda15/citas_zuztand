"use no memo";

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Error from './Error'
import { usePacienteStore } from '../types/store'
import type { DraftPatient } from '../types'


const Formulario = () => {
    const pacienteActivo = usePacienteStore((state) => state.pacienteActivo)
    const agregarPaciente = usePacienteStore((state) => state.agregarPaciente)
    const actualizarPaciente = usePacienteStore((state) => state.actualizarPaciente)
    const limpiarPacienteActivo = usePacienteStore((state) => state.limpiarPacienteActivo)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<DraftPatient>()

    useEffect(() => {
        if (pacienteActivo) {
            reset(pacienteActivo)
        } else {
            reset({
                name: '',
                caretaker: '',
                email: '',
                date: '',
                symptoms: ''
            })
        }
    }, [pacienteActivo, reset])

    const registrarPaciente = (data: DraftPatient) => {
        if (pacienteActivo) {
            actualizarPaciente(pacienteActivo.id, data)
        } else {
            agregarPaciente(data)
        }

        reset()
        limpiarPacienteActivo()
    }

    const handleCancelar = () => {
        reset()
        limpiarPacienteActivo()
    }

    return (
        <div id="formulario-paciente" className="glass-panel rounded-3xl p-6 md:p-7">
            <div className="flex items-center justify-between gap-3 mb-4">
                <span className="eyebrow">Registro</span>
                {pacienteActivo && (
                    <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
                        Modo edicion
                    </span>
                )}
            </div>

            <h2 className="text-3xl text-slate-800">
                {pacienteActivo ? 'Editar Paciente' : 'Seguimiento Pacientes'}
            </h2>

            <p className="mt-3 mb-8 text-slate-600">
                {pacienteActivo ? 'Edita el Paciente y ' : 'Añade Pacientes y '}
                <span className="font-bold text-teal-700">manten tu agenda clinica al dia</span>
            </p>

            <form
                className="space-y-5"
                noValidate
                onSubmit={handleSubmit(registrarPaciente)}
            >
                <div>
                    <label htmlFor="name" className="text-xs uppercase tracking-wider font-semibold text-slate-600">
                        Paciente
                    </label>
                    <input
                        id="name"
                        className="field-input mt-2"
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register('name', {
                            required: 'El nombre del paciente es obligatorio',
                            maxLength: { value: 50, message: 'El nombre no puede exceder los 50 caracteres' }
                        })}
                    />
                    {errors.name &&
                        <Error>{errors.name?.message?.toString()}</Error>
                    }
                </div>

                <div>
                    <label htmlFor="caretaker" className="text-xs uppercase tracking-wider font-semibold text-slate-600">
                        Propietario
                    </label>
                    <input
                        id="caretaker"
                        className="field-input mt-2"
                        type="text"
                        placeholder="Nombre del Propietario"
                        {...register('caretaker', {
                            required: 'El nombre del propietario es obligatorio'
                        })}
                    />
                    {errors.caretaker && <p className="text-red-500 text-sm mt-1">{errors.caretaker?.message?.toString()}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="text-xs uppercase tracking-wider font-semibold text-slate-600">
                        Email
                    </label>
                    <input
                        id="email"
                        className="field-input mt-2"
                        type="email"
                        placeholder="Email de Registro"
                        {...register('email', {
                            required: 'El email es obligatorio',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email no válido'
                            }
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email?.message?.toString()}</p>}
                </div>

                <div>
                    <label htmlFor="date" className="text-xs uppercase tracking-wider font-semibold text-slate-600">
                        Fecha Alta
                    </label>
                    <input
                        id="date"
                        className="field-input mt-2"
                        type="date"
                        {...register('date', {
                            required: 'La fecha de alta es obligatoria'
                        })}
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date?.message?.toString()}</p>}
                </div>

                <div>
                    <label htmlFor="symptoms" className="text-xs uppercase tracking-wider font-semibold text-slate-600">
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className="field-input mt-2 min-h-28"
                        placeholder="Síntomas del paciente"
                        {...register('symptoms', {
                            required: 'Los síntomas son obligatorios'
                        })}
                    ></textarea>
                    {errors.symptoms && <p className="text-red-500 text-sm mt-1">{errors.symptoms?.message?.toString()}</p>}
                </div>

                <input
                    type="submit"
                    className="btn-primary w-full rounded-xl p-3 uppercase tracking-wide text-sm font-bold cursor-pointer transition-colors"
                    value={pacienteActivo ? 'Actualizar Paciente' : 'Guardar Paciente'}
                />
                {pacienteActivo && (
                    <button
                        type="button"
                        className="btn-neutral w-full rounded-xl p-3 uppercase tracking-wide text-sm font-bold cursor-pointer transition-colors"
                        onClick={handleCancelar}
                    >
                        Cancelar
                    </button>
                )}
            </form>
        </div>
    )

}

export default Formulario