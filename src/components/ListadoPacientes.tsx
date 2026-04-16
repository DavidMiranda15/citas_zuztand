import { usePacienteStore } from '../types/store'
import Paciente from './Paciente'

const ListadoPacientes = () => {
   
    const pacientes = usePacienteStore(state => state.pacientes)

    return (
        <div className='md:w-1/2 lg:w-3/5 md:h-screen overflow-y-auto'>
            <h2 className='font-black text-3xl text-center'>Listado de Pacientes</h2>

            {pacientes.length === 0 ? (
                <p className='text-center mt-10 text-gray-600'>
                    No hay pacientes registrados todavía.
                </p>
            ) : (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    {pacientes.map(paciente => (
                        <Paciente key={paciente.id} paciente={paciente} />
                    ))}
                </div>
            )}
        </div>
    )
}



export default ListadoPacientes 