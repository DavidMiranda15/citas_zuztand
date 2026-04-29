import { useState } from "react";
import type { Patient } from "../types";
import { usePacienteStore } from "../types/store";
import DialogModal from "./DialogModal";
import { toast } from 'react-toastify'

type PacienteProps = {
    paciente: Patient;
};



type PacienteDetalleProps = {
    label: string;
    data: string;
};

const PacienteDetalle = ({ label, data }: PacienteDetalleProps) => (
    <div className="rounded-lg border border-slate-200 bg-white/90 p-3">
        <p className="text-[11px] uppercase tracking-wider text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-semibold text-slate-700 break-words">{data}</p>
    </div>
);

const Paciente = ({ paciente }: PacienteProps) => {
    const [isOpened, setIsOpened] = useState(false);
    const eliminarPaciente = usePacienteStore((state) => state.eliminarPaciente);

    const handleEliminar = () => {
        eliminarPaciente(paciente.id)
        toast.error('Paciente Eliminado Correctamente')
    }

    const establecerPacienteActivo =
        usePacienteStore((state) => state.establecerPacienteActivo)
    const handleClickEditar = () => {
        establecerPacienteActivo(paciente)
        document.getElementById('formulario-paciente')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }



    return (
        <article className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm h-full">
            <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">Paciente</p>
                    <h3 className="text-xl text-slate-800 leading-tight">{paciente.name}</h3>
                </div>
                <div className="size-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                    {paciente.name.slice(0, 1).toUpperCase()}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <PacienteDetalle label="ID" data={paciente.id} />
                <PacienteDetalle label="Propietario" data={paciente.caretaker} />
                <PacienteDetalle label="Email" data={paciente.email} />
                <PacienteDetalle label="Fecha" data={paciente.date} />
                <PacienteDetalle label="Sintomas" data={paciente.symptoms} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                    type="button"
                    className="btn-primary rounded-lg py-2 px-4 text-sm font-bold tracking-wide transition-colors"
                    onClick={handleClickEditar}
                >
                    Editar
                </button>

                <button
                    type="button"
                    className="btn-danger rounded-lg py-2 px-4 text-sm font-bold tracking-wide transition-colors"
                    onClick={() => setIsOpened(true)}
                >
                    Eliminar
                </button>
            </div>

            <DialogModal
                title={`Eliminar paciente: ${paciente.name}`}
                isOpened={isOpened}
                onProceed={handleEliminar}
                onClose={() => setIsOpened(false)}
            >
                <p className="mb-2">
                    Estas por eliminar al paciente <strong>{paciente.name}</strong>.
                </p>
                <p className="mb-4 text-sm text-gray-600">
                    Propietario: <strong>{paciente.caretaker}</strong>
                </p>
                <p>Esta accion no se puede deshacer. ¿Deseas continuar?</p>
            </DialogModal>
        </article>
    )
};

export default Paciente;