import {useNavigate} from 'react-router-dom'

const Cliente = ({cliente, handleEliminar}) => {

    const navigate = useNavigate()

    const {nombre,empresa,email,telefono,notas,id} = cliente

  return (
    <tr className='border-b hover:bg-gray-50'>
      <td className='p-3 text-center'>{nombre}</td>
      <td className='p-3 text-center'>
        <p><span className='text-gray-800 uppercase font-bold'>Email: </span>{email}</p>
        <p><span className='text-gray-800 uppercase font-bold'>Tel: </span>{telefono}</p>
        
      </td>
      <td className='p-3 text-center'>{empresa}</td>
      <td className='p-3 text-center'>
        <a className='text-blue-600 hover:text-blue-700 hover:cursor-pointer w-full p-2 uppercase font-bold text-2xl text-center' onClick={() => navigate(`/clientes/${id}`)}>
            <i className="fa-solid fa-eye"></i>
            </a>
        <a className='text-green-600 hover:text-green-700 hover:cursor-pointer w-full p-2 uppercase font-bold text-2xl text-center mx-2 my-3' onClick={() => navigate(`/clientes/editar/${id}`)}>
            <i className="fa-regular fa-pen-to-square"></i>
            </a>
        <a className='text-red-600 hover:text-red-700 hover:cursor-pointer w-full p-2 uppercase font-bold text-2xl text-center' onClick={ () => handleEliminar(id)}>
            <i className="fa-solid fa-trash"></i>
            </a>
      </td>
    </tr>
  )
}

export default Cliente
