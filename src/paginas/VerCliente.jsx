import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const VerCliente = () => {

  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    // setCargando(!cargando)
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setCliente(resultado)
      } catch (error) {
        console.log(error)
      }
      setTimeout(() => {
        setCargando(!cargando)
      }, 1000);
    }
    obtenerClienteAPI()
  }, [])


  return (
    cargando ? <Spinner /> :
      Object.keys(cliente).length === 0 ?
        <p className='text-4xl'>No hay Resultados.</p> : (

          <div>
            {cargando ? 'Cargando...' :
              (
                <>
                  <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
                  <p className='mt-3'>Información del Cliente</p>

                  {cliente.nombre && (<p className='text-4xl text-gray-600'><span className='uppercase font-bold text-gray-800'>Cliente: </span>{cliente.nombre}</p>)}
                  {cliente.email && (<p className='text-2xl mt-4 text-gray-600'><span className='uppercase font-bold text-gray-800'>E-mail: </span>{cliente.email}</p>)}
                  {cliente.telefono && (<p className='text-2xl mt-4 text-gray-600'><span className='uppercase font-bold text-gray-800'>Telefono: </span>{cliente.telefono}</p>)}
                  {cliente.empresa && (<p className='text-2xl mt-4 text-gray-600'><span className='uppercase font-bold text-gray-800'>Empresa: </span>{cliente.empresa}</p>)}
                  {cliente.notas && (<p className='text-2xl mt-4 text-gray-600'><span className='uppercase font-bold text-gray-800'>Notas: </span>{cliente.notas}</p>)}

                </>
              )
            }
          </div>
        )
  )
}

export default VerCliente
