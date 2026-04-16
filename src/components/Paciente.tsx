import { useState } from "react";
import type { Patient } from "../types";
import { usePacienteStore } from "../types/store";
import DialogModal from "./DialogModal";

type PacienteProps = {
    paciente: Patient;
};

type PacienteDetalleProps = {
    label: string;
    data: string;
};

const PacienteDetalle = ({ label, data }: PacienteDetalleProps) => (
    <p className="font-normal mb-3 text-gray-700 normal-case">
        <span className="font-bold uppercase">{label}: </span>
        {data}
    </p>
);

const Paciente = ({ paciente }: PacienteProps) => {
    const [isOpened, setIsOpened] = useState(false);
    const eliminarPaciente = usePacienteStore((state) => state.eliminarPaciente);

    const onProceed = () => {
        eliminarPaciente(paciente.id);
    };

    return (
        <div className="bg-white shadow-md px-5 py-8 rounded-xl h-full">
            <PacienteDetalle label="ID" data={paciente.id} />
            <PacienteDetalle label="Nombre" data={paciente.name} />
            <PacienteDetalle label="Propietario" data={paciente.caretaker} />
            <PacienteDetalle label="Email" data={paciente.email} />
            <PacienteDetalle label="Fecha" data={paciente.date} />
            <PacienteDetalle label="Sintomas" data={paciente.symptoms} />

            <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => setIsOpened(true)}
            >
                Eliminar
            </button>

            <DialogModal
                title={`Eliminar paciente: ${paciente.name}`}
                isOpened={isOpened}
                onProceed={onProceed}
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
        </div>
    );
};

export default Paciente;