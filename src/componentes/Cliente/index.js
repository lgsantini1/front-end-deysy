import React, { useState, useEffect } from 'react';
import {
  TextField,
  FormControl,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Avatar,
  Rating,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import clienteImagem from '../../imagens/maquina-lavar.png';
import styled from 'styled-components';
import pessoaGenerica from '../../imagens/pessoa-generica.png';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Configura o ícone do Leaflet
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const roxoRosado = '#b356a6';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;

  @media (min-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const FieldWrapper = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 16px;
`;

const ProfessionalListContainer = styled.div`
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-right: 20px;

  @media (max-width: 768px) {
    max-height: none;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const MapWrapper = styled.div`
  height: 70vh;
  width: 50%;
  position: relative;

  @media (max-width: 1200px) {
    width: 100%;
    height: 50vh;
  }

  @media (max-width: 768px) {
    height: 40vh;
  }
`;

const ProfessionalCard = styled.div`
  width: 100%;
  max-width: 250px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px auto;
  padding: 20px;
  text-align: center;
  position: relative;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const AvailabilityCircle = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.available ? 'green' : 'red'};
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url(${clienteImagem});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 100%;
  max-width: 1200px;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  padding: 20px;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const Footer = styled.footer`
  padding: 20px;
  background: #333;
  color: #fff;
  text-align: center;
  width: 100%;
`;

const Cliente = ({ professionals, handleSearch, searchQuery, setSearchQuery, filterValues, setFilterValues, searchBarTop }) => {

  const handleDayChange = (event) => {
    setFilterValues({
      ...filterValues,
      availableDays: {
        ...filterValues.availableDays,
        [event.target.name]: event.target.checked
      }
    });
  };

  const handleLoyaltyChange = (event) => {
    setFilterValues({
      ...filterValues,
      loyaltyProgram: event.target.checked
    });
  };

  const handleDistanceChange = (event, newValue) => {
    setFilterValues({
      ...filterValues,
      maxDistance: newValue
    });
  };

  return (
    <SearchContainer style={{ top: searchBarTop }}>
      <h2 style={{ fontSize: 20, fontFamily: 'Arial, sans-serif', color: '#333', marginBottom: 16, textAlign: 'center' }}>
        Contrate um profissional de limpeza com apenas alguns cliques.
      </h2>
      <FieldGroup>
        <FieldWrapper>
          <TextField
            label="Pesquisar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: roxoRosado }} />
                </InputAdornment>
              )
            }}
          />
        </FieldWrapper>
        <FieldWrapper>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="category-filter-label">Categoria</InputLabel>
            <Select
              labelId="category-filter-label"
              value={filterValues.category}
              onChange={(e) => setFilterValues({ ...filterValues, category: e.target.value })}
              label="Categoria"
              style={{ color: roxoRosado }}
            >
              <MenuItem value="">Todas</MenuItem>
              <MenuItem value="Interna">Limpeza Interna</MenuItem>
              <MenuItem value="Externa">Limpeza Externa</MenuItem>
              <MenuItem value="Comércio">Limpeza Comércio</MenuItem>
              <MenuItem value="Indústria">Limpeza Indústria</MenuItem>
            </Select>
          </FormControl>
        </FieldWrapper>
      </FieldGroup>

      <FieldGroup>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={filterValues.availableDays.monday} onChange={handleDayChange} name="monday" />}
            label="Segunda"
            style={{ color: roxoRosado }}
          />
          <FormControlLabel
            control={<Checkbox checked={filterValues.availableDays.tuesday} onChange={handleDayChange} name="tuesday" />}
            label="Terça"
            style={{ color: roxoRosado }}
          />
          <FormControlLabel
            control={<Checkbox checked={filterValues.availableDays.wednesday} onChange={handleDayChange} name="wednesday" />}
            label="Quarta"
            style={{ color: roxoRosado }}
          />
          <FormControlLabel
            control={<Checkbox checked={filterValues.availableDays.thursday} onChange={handleDayChange} name="thursday" />}
            label="Quinta"
            style={{ color: roxoRosado }}
          />
          <FormControlLabel
            control={<Checkbox checked={filterValues.availableDays.friday} onChange={handleDayChange} name="friday" />}
            label="Sexta"
            style={{ color: roxoRosado }}
          />
        </FormGroup>
        <FormControlLabel
          control={<Checkbox checked={filterValues.loyaltyProgram} onChange={handleLoyaltyChange} />}
          label="Programa de Fidelidade"
          style={{ color: roxoRosado }}
        />
      </FieldGroup>

      <FieldGroup>
        <FieldWrapper>
          <InputLabel htmlFor="distance-slider" style={{ color: roxoRosado }}>Distância Máxima (km): {filterValues.maxDistance}</InputLabel>
          <Slider
            value={filterValues.maxDistance}
            onChange={handleDistanceChange}
            aria-labelledby="distance-slider"
            min={0}
            max={100}
            fullWidth
            style={{ color: roxoRosado }}
          />
        </FieldWrapper>
        <Button variant="contained" style={{ backgroundColor: roxoRosado, color: '#fff' }} onClick={handleSearch} fullWidth>
          Buscar
        </Button>
      </FieldGroup>

      {professionals.length > 0 && <p>{professionals.length} profissionais encontrados.</p>}
    </SearchContainer>
  );
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState({
    value: '',
    pricePerDay: '',
    availability: '',
    maxDistance: 50,
    category: '',
    availableDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false
    },
    loyaltyProgram: false
  });
  const [searchBarTop, setSearchBarTop] = useState('50%');
  const [professionals, setProfessionals] = useState([]);
  const [showMap, setShowMap] = useState(false); // Estado para controlar a exibição do mapa
  const [loading, setLoading] = useState(false); // Estado para o indicador de carregamento

  const handleSearch = () => {
    setLoading(true);
    console.log("Pesquisando por:", searchQuery);
    console.log("Filtros:", filterValues);

    // Simulação de uma requisição de busca com um pequeno atraso
    setTimeout(() => {
      const found = Math.floor(Math.random() * 10);

      const professionals = Array.from({ length: found }, (_, i) => ({
        id: i + 1,
        name: `Profissional ${i + 1}`,
        photoUrl: i % 2 === 0 ? `https://i.pravatar.cc/150?img=${i + 1}` : null,
        rating: Math.floor(Math.random() * 6),
        phone: '555-1234',
        available: i % 2 === 0,
        position: {
          lat: -22.5629 + Math.random() * 0.01,
          lng: -47.4009 + Math.random() * 0.01
        }
      }));

      setProfessionals(professionals);
      setSearchBarTop('20%');
      setShowMap(true); // Exibir o mapa após a busca
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (showMap) {
      // Simular atualização dos profissionais com base na distância do filtro
      const updatedProfessionals = professionals.filter(professional => {
        // Calcular a distância entre a posição do profissional e o centro do mapa
        const distance = Math.sqrt(
          Math.pow(professional.position.lat - (-22.5629), 2) +
          Math.pow(professional.position.lng - (-47.4009), 2)
        );
        return distance <= (filterValues.maxDistance / 111); // Aproximadamente 111 km por grau
      });
      setProfessionals(updatedProfessionals);
    }
  }, [filterValues.maxDistance, showMap]);

  return (
    <AppContainer>
      <ContentContainer>
        <Sidebar>
          <Cliente
            professionals={professionals}
            handleSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterValues={filterValues}
            setFilterValues={setFilterValues}
            searchBarTop={searchBarTop}
          />
          <ProfessionalListContainer>
            {professionals.map(professional => (
              <ProfessionalCard key={professional.id}>
                <AvailabilityCircle available={professional.available} />
                <Avatar src={professional.photoUrl || pessoaGenerica} alt={professional.name} sx={{ width: 100, height: 100, mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                  <Rating value={professional.rating} readOnly precision={0.5} />
                </Box>
                <h3>{professional.name}</h3>
                <p>{professional.phone}</p>
                <Button variant="outlined" style={{ color: roxoRosado, borderColor: roxoRosado }}>Contatar</Button>
              </ProfessionalCard>
            ))}
          </ProfessionalListContainer>
        </Sidebar>
        {showMap && ( // Exibir o mapa apenas após a busca
          <MapWrapper>
            <MapContainer center={[-22.5629, -47.4009]} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Circle
                center={[-22.5629, -47.4009]}
                radius={filterValues.maxDistance * 1000} // Convertendo km para metros
                fillColor={roxoRosado}
                color={roxoRosado}
                fillOpacity={0.2}
              />
              {professionals.map(professional => (
                <Marker key={professional.id} position={professional.position}>
                  <Popup>
                    <div>
                      <h3>{professional.name}</h3>
                      <p>{professional.phone}</p>
                      <Rating value={professional.rating} readOnly precision={0.5} />
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </MapWrapper>
        )}
      </ContentContainer>
      <Footer>
        &copy; 2024 Sua Empresa. Todos os direitos reservados.
      </Footer>
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <CircularProgress style={{ color: roxoRosado }} />
        </div>
      )}
    </AppContainer>
  );
};

export default App;
