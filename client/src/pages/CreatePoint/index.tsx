import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './CreatePoint.css';
import logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import { TileLayer, Marker, MapContainer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import axios from 'axios';
import api from '../../services/api';
import GetClickedPosition from '../CreatePoint/GetClickedPosition'
import Dropzone from '../../Components/Dropzone';


interface Item {
    id: number;
    image_url: string;
    title: string;
}
interface IBGEUFResponse {
    sigla: string;
}
interface IBGECityResponse {
    nome: string;
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState <string[]>([]);
    const [cities, setCities] = useState <string[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    })

    const [selectedUf, setSelectedUf] = useState ('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [initialPosition, SetInitialPosition] = useState<[number,number]>([0, 0]);
    const [selectedPosition, setSelectedPosition] = useState<LatLngTuple>([0, 0]);
    
    const navigate = useNavigate(); 

    //SETTING THE INITIAL POSITION GETS TO SLOW
    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(position => {
    //         const { latitude, longitude } = position.coords;
    //         SetInitialPosition([latitude, longitude])
    //     })
    // },[])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            SetInitialPosition([latitude, longitude])
        })
    },[])

    useEffect(() => {
        api.get('items')
        .then(response => {
           setItems(response.data)
        })
    }, []);

    useEffect(() => {
        axios
        .get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        })
    }, []);

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }
        axios
        .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        })
        
    }, [selectedUf]);

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement> ) {
        const uf = event.target.value;
        setSelectedUf(uf);
     }
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement> ) {
         const city = event.target.value;
         setSelectedCity(city);
     }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setFormData({ ...formData, [name]:value })
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);

            setSelectedItems(filteredItems);

        } else {
            setSelectedItems([ ...selectedItems, id ]);
        }
    }

    async function handleSubmit (event: FormEvent) {
       event.preventDefault();

        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const items = selectedItems;
        const [latitude, longitude] = selectedPosition;    

       const data = {
        name,
        email,
        whatsapp,
        uf,
        city,
        items,
        latitude,
        longitude
       }
       console.log(data)
       await api.post('points', data)

       alert('Ponto de coleta criado!')
       
       navigate('/')
    }

  return (
    <div id="page-create-point">
        <header>
            <img src={logo} alt="Ecoleta"/>

            <Link to="/">
                <FiArrowLeft />
                Voltar para home
            </Link>
        </header>
        <form onSubmit={handleSubmit}>  
            <h1>Cadastro do <br />Ponto de Coleta</h1>

        <Dropzone/>



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
                    onChange={handleInputChange}
                   />
                </div>

                <div className='field-group'>
                <div className='field'>
                   <label htmlFor="email">E-mail</label>
                   <input 
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                   />
                </div>
                <div className='field'>
                   <label htmlFor="whatsapp">WhatsApp</label>
                   <input 
                    type="text"
                    name="whatsapp"
                    id="whatsapp"
                    onChange={handleInputChange}
                   />
                </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>
                    <h2>Endereço</h2>
                    <span>Selecione um endereco no mapa</span>
                </legend>

                <MapContainer center={[51.505, -0.09]} zoom={15}>
                    <TileLayer
                        attribution='copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                <GetClickedPosition setSelectedPosition={setSelectedPosition}/>

                     <Marker 
                        position={selectedPosition}>
                     </Marker>

                </MapContainer>

                <div className="fiel-group">
                    <div className="field">
                        <label htmlFor="uf">Estado (UF)</label>
                        <select
                            name="uf"
                            id="uf"
                            onChange={handleSelectUf}
                            value={selectedUf}
                            >
                            <option value="0">Selecione uma UF</option>
                            {ufs.map(uf => (
                                 <option key={uf} value={uf}>{uf}</option>
                            ))}

                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="city">Cidade</label>
                        <select
                            name="city"
                            id="city"
                            onChange={handleSelectCity}
                            value={selectedCity}
                            >
                            <option value="0">Selecione uma cidade</option>
                            {cities.map(city => (
                                 <option key={city} value={city}>{city}</option>
                            ))}
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
                    {items.map(item => (
                        <li 
                          key={item.id}
                          onClick={()=> handleSelectItem(item.id)}
                          className={selectedItems.includes(item.id) ? 'selected' : ''}>
                        <img src={item.image_url} alt={item.title} />
                        <span>{item.title}</span>
                    </li>
                    ))}
               
                    
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