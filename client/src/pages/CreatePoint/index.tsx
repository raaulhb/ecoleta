import React from 'react'
import './CreatePoint.css'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

import { FiArrowLeft } from 'react-icons/fi'

import { TileLayer, useMap, Marker, MapContainer, Popup } from 'react-leaflet'


const CreatePoint = () => {
  return (
    <div id="page-create-point">
        <header>
            <img src={logo} alt="Ecoleta"/>

            <Link to="/">
                <FiArrowLeft />
                Voltar para home
            </Link>
        </header>
        <form>
            <h1>Cadastro do <br />Ponto de Coleta</h1>

            <fieldset>
                <legend>
                    <h2>Dados</h2>
                </legend>
                <div className='field'>
                   <label htmlFor="name">Nome da entidade</label>
                   <input 
                    type="text"
                    name="name"
                    id="name"
                   />
                </div>

                <div className='field-group'>
                <div className='field'>
                   <label htmlFor="email">E-mail</label>
                   <input 
                    type="email"
                    name="email"
                    id="email"
                   />
                </div>
                <div className='field'>
                   <label htmlFor="whatsapp">WhatsApp</label>
                   <input 
                    type="text"
                    name="whatsapp"
                    id="whatsapp"
                   />
                </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>
                    <h2>Endereço</h2>
                    <span>Selecione um endereco no mapa</span>
                </legend>

                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                    attribution='copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     />
                     <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>

                <div className="fiel-group">
                    <div className="field">
                        <label htmlFor="uf">Estado (UF)</label>
                        <select name="uf" id="uf">
                            <option value="0">Selecione uma UF</option>
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="city">Cidade</label>
                        <select name="city" id="city">
                            <option value="0">Selecione uma cidade</option>
                        </select>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>
                    <h2>Itens de coleta</h2>
                    <span>Selecione um ou mais itens abaixo</span>
                </legend>
                <ul className="items-grid">
                    <li>
                        <img src="http://localhost:3333/uploads/lampadas.svg" alt="teste" />
                        <span>Oleo de Cozinha</span>
                    </li>
                    <li className="selected">
                        <img src="http://localhost:3333/uploads/lampadas.svg" alt="teste" />
                        <span>Oleo de Cozinha</span>
                    </li>
                    <li>
                        <img src="http://localhost:3333/uploads/lampadas.svg" alt="teste" />
                        <span>Oleo de Cozinha</span>
                    </li>
                    <li>
                        <img src="http://localhost:3333/uploads/lampadas.svg" alt="teste" />
                        <span>Oleo de Cozinha</span>
                    </li>
                    <li>
                        <img src="http://localhost:3333/uploads/lampadas.svg" alt="teste" />
                        <span>Oleo de Cozinha</span>
                    </li>
                    <li>
                        <img src="http://localhost:3333/uploads/lampadas.svg" alt="teste" />
                        <span>Oleo de Cozinha</span>
                    </li>
                </ul>
            </fieldset>
            <button type="submit">
                Cadastrar ponto de Coleta
            </button>
        </form>
    </div>
  )
}

export default CreatePoint;