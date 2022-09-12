import { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'
const Formulario = ({ cliente, cargando }) => {

  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, 'El nombre es muy corto')
      .max(20, 'El nombre es muy largo')
      .required('El nombre del cliente es obligatorio'),
    empresa: Yup.string()
      .required('El nombre de la empresa es obligatorio'),
    email: Yup.string()
      .email('E-mail no válido')
      .required('El E-mail es obligatorio'),
    telefono: Yup.number()
      .integer('Debe ser un número entero')
      .positive('Debe ser un número positivo')
      .typeError('El número no es válido'),
  })

  const handleSubmit = async (valores) => {
    let respuesta
    try {
      
      if (cliente.id) {
        // console.log(valores)
        const url = `http://localhost:4000/clientes/${cliente.id}`
        respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(valores),
          header: {
            'Content-Type': 'application/json'
          }
        })

      } else {
        const url = "http://localhost:4000/clientes"

        respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(valores),  
          headers: {
            'Content-Type': 'application/json'
          }
        })

      }
      respuesta.json()
      navigate('/clientes')

    } catch (error) {
      console.log(error)
    }
  }
  return (
    cargando ? <Spinner /> : (
      <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
        <Formik
          initialValues={{
            nombre: cliente?.nombre ?? "",
            empresa: cliente?.empresa ?? "",
            email: cliente?.email ?? "",
            telefono: cliente?.telefono ?? "",
            notas: cliente?.notas ?? "",
          }}
          enableReinitialize={true}

          onSubmit={async (values, {resetForm}) => {
            await handleSubmit(values)
            resetForm()
          }}
          validationSchema={nuevoClienteSchema}>
          {({ errors, touched }) => {
            return (

              <Form className='mt-10'>
                <div className='mb-4 '>
                  <label className="text-gray-800" htmlFor="nombre">Nombre</label>
                  <Field className="mt-2 block w-full p-3 bg-gray-50" type="text" id="nombre" name="nombre" placeholder="Nombre del Cliente" />
                  {errors.nombre && touched.nombre ? (
                    <Alerta>
                      {errors.nombre}
                    </Alerta>
                  ) : null}
                </div>
                <div className='mb-4 '>
                  <label className="text-gray-800" htmlFor="empresa">Empresa</label>
                  <Field className="mt-2 block w-full p-3 bg-gray-50" type="text" id="empresa" name="empresa" placeholder="Empresa del Cliente" />
                  {errors.empresa && touched.empresa ? (
                    <Alerta>
                      {errors.empresa}
                    </Alerta>
                  ) : null}
                </div>
                <div className='mb-4 '>
                  <label className="text-gray-800" htmlFor="email">E-mail</label>
                  <Field className="mt-2 block w-full p-3 bg-gray-50" type="email" id="email" name="email" placeholder="Email del Cliente" />
                  {errors.email && touched.email ? (
                    <Alerta>
                      {errors.email}
                    </Alerta>
                  ) : null}
                </div>

                <div className='mb-4 '>
                  <label className="text-gray-800" htmlFor="telefono">Teléfono <span className='text-sm text-gray-400'>(opcional)</span></label>
                  <Field className="mt-2 block w-full p-3 bg-gray-50" type="tel" id="telefono" name="telefono" placeholder="Telefono del Cliente" />
                  {errors.telefono && touched.telefono ? (
                    <Alerta>
                      {errors.telefono}
                    </Alerta>
                  ) : null}
                </div>
                <div className='mb-4 '>
                  <label className="text-gray-800" htmlFor="notas">Notas <span className='text-sm text-gray-400'>(opcional)</span></label>
                  <Field as="textarea" className="mt-2 block w-full p-3 bg-gray-50 h-40" type="text" id="notas" name="notas" placeholder="Notas del Cliente" />
                </div>

                <input className='mt-5 w-full bg-blue-800 p-3 uppercase text-white font-bold text-lg hover:bg-blue-900 hover:cursor-pointer' type="submit" value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} />
              </Form>
            )
          }}
        </Formik>
      </div>
    )
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario
