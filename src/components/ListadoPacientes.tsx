import { usePacienteStore } from '../types/store'
import Paciente from './Paciente'

const ListadoPacientes = () => {
   
    const pacientes = usePacienteStore(state => state.pacientes)

    return (
        <div className='glass-panel rounded-3xl p-6 md:p-7 md:h-[78vh] overflow-y-auto'>
            <div className='flex items-center justify-between gap-3 mb-5'>
                <h2 className='text-3xl text-slate-800'>Pacientes</h2>
                <span className='eyebrow'>{pacientes.length} registros</span>
            </div>

            {pacientes.length === 0 ? (
                <div className='rounded-2xl border border-dashed border-slate-300 p-8 text-center bg-white/70'>
                    <p className='text-slate-700 font-semibold'>No hay pacientes registrados todavia.</p>
                    <p className='text-sm text-slate-500 mt-2'>Completa el formulario para crear el primer expediente.</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
                    {pacientes.map(paciente => (
                        <Paciente key={paciente.id} paciente={paciente} />
                    ))}
                </div>
            )}
        </div>
    )
}



export default ListadoPacientes 