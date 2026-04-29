import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
    <div className="container mx-auto mt-20">
      <main className="app-shell">
        <header className="glass-panel rounded-3xl p-6 md:p-10">
          <span className="eyebrow">Panel Clinico</span>
          <h1 className="mt-4 text-4xl md:text-6xl leading-tight text-slate-800">
            Seguimiento inteligente de
            <span className="block text-teal-700">pacientes veterinarios</span>
          </h1>
          <p className="mt-4 max-w-3xl text-slate-600 text-sm md:text-base">
            Administra expedientes, registra sintomas y actualiza informacion en segundos
            desde una interfaz clara, moderna y pensada para trabajo diario en clinica.
          </p>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.35fr] items-start">
          <Formulario />
          <ListadoPacientes />
        </section>
      </main>
      </div>
      <ToastContainer />
    </>
    
  )
}

export default App