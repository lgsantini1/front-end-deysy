import React, { useState } from 'react';
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
  Slider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search.js';
import clienteImagem from '../../imagens/maquina-lavar.png';
import styled, { keyframes } from 'styled-components';
import pessoaGenerica from '../../imagens/pessoa-generica.png'; // Importe a imagem genérica

// Define a animação para as bolhas de sabão
const bubbleAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-100vh);
    opacity: 1;
  }
  100% {
    transform: translateY(-200vh);
    opacity: 0;
  }
`;

// Componente estilizado para a bolha de sabão
const Bubble = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: ${bubbleAnimation} 6s linear forwards;
  animation-delay: ${props => props.delay}s;
  filter: brightness(150%);
`;

const SearchContainer = styled.div`
  position: absolute;
  top: ${props => props.searchBarTop}px;
  left: 50%;
  transform: translateX(-50%);
  transition: top 0.5s ease-in-out; /* Adiciona uma transição suave */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  z-index: 1;
`;

const ProfessionalContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProfessionalCard = styled.div`
  width: 250px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 20px;
  text-align: center; // Centraliza o conteúdo do card
  position: relative; // Para posicionar o círculo de disponibilidade
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3); // Efeito de sombra 3D
  transition: transform 0.2s ease-in-out; // Adiciona uma transição suave

  &:hover {
    transform: translateY(-5px); // Efeito de elevação ao passar o mouse
  }
`;

// Círculo de disponibilidade
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
  position: relative;
  overflow: hidden;
`;

const Cliente = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState({
    value: '',
    pricePerDay: '',
    availability: '',
    maxDistance: 50, // Valor padrão para a distância máxima
    category: '', // Categoria selecionada
    availableDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false
    },
    loyaltyProgram: false  // Adiciona um filtro para o programa de fidelidade
  });
  const [searchBarTop, setSearchBarTop] = useState('50%');
  const [professionalsFound, setProfessionalsFound] = useState(0);

  const handleSearch = () => {
    console.log("Pesquisando por:", searchQuery);
    console.log("Filtros:", filterValues);

    // Simulando busca de profissionais no banco
    const found = Math.floor(Math.random() * 10); // Simulação de quantidade de profissionais encontrados
    setProfessionalsFound(found);

    // Animar a barra de pesquisa para cima
    setSearchBarTop('20%');
  };

  const professionals = Array.from({ length: professionalsFound }, (_, i) => ({
    id: i + 1,
    name: `Profissional ${i + 1}`,
    photoUrl: i % 2 === 0 ? `https://i.pravatar.cc/150?img=${i + 1}` : null, // Exemplo de URL de foto (alterar fonte de imagens)
    rating: Math.floor(Math.random() * 6), // Geração aleatória da avaliação (0 a 5)
    phone: '555-1234', // Exemplo de telefone
    available: i % 2 === 0 // Exemplo de disponibilidade (alterar )
  }));

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
    <SearchContainer searchBarTop={searchBarTop}>
      <h2 style={{ fontSize: 19, fontFamily: 'Arial, sans-serif', color: '#333', marginBottom: 16 }}>Contrate um profissional de limpeza com apenas alguns cliques.</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label="Pesquisar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
          style={{ width: 540 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <FormControl variant="outlined" style={{ marginLeft: 8, width: 150 }}>
          <InputLabel id="category-filter-label">Categoria</InputLabel>
          <Select
            labelId="category-filter-label"
            value={filterValues.category}
            onChange={(e) => setFilterValues({ ...filterValues, category: e.target.value })}
            label="Categoria"
          >
            <MenuItem value="">Todas</MenuItem>
            <MenuItem value="Interna">Limpeza Interna</MenuItem>
            <MenuItem value="Externa">Limpeza Externa</MenuItem>
            <MenuItem value="Comércio">Limpeza Comércio</MenuItem>
            <MenuItem value="Indústria">Limpeza Industria</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: 8 }}>
          Buscar
        </Button>
      </div>

      {/* Filtros */}
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={filterValues.availableDays.monday} onChange={handleDayChange} name="monday" />}
            label="Segunda"
          />
          <FormControlLabel
            control={<Checkbox checked={filterValues.availableDays.tuesday} onChange={handleDayChange} name="tuesday" />}
            label="Terça"
          />
          <FormControlLabel
            control={<Checkbox checked={filterValues.availableDays.wednesday} onChange={handleDayChange} name="wednesday" />}
            label="Quarta"
          />
          <FormControlLabel
            control={<Checkbox checked={filterValues.availableDays.thursday} onChange={handleDayChange} name="thursday" />}
            label="Quinta"
          />
          <FormControlLabel
            control={<Checkbox checked={filterValues.availableDays.friday} onChange={handleDayChange} name="friday" />}
            label="Sexta"
          />
        </FormGroup>
        <FormControlLabel
          control={<Checkbox checked={filterValues.loyaltyProgram} onChange={handleLoyaltyChange} />}
          label="Programa de Fidelidade"
        />
        <div style={{ marginTop: 8 }}>
          <InputLabel htmlFor="distance-slider">Distância Máxima (km): {filterValues.maxDistance}</InputLabel>
          <Slider
            value={filterValues.maxDistance}
            onChange={handleDistanceChange}
            aria-labelledby="distance-slider"
            min={0}
            max={100}
          />
        </div>
      </div>

      {professionalsFound > 0 && <p>{professionalsFound} profissionais encontrados.</p>}
      <ProfessionalContainer>
        {professionals.map(professional => (
          <ProfessionalCard key={professional.id}>
            <AvailabilityCircle available={professional.available} /> {/* Círculo de disponibilidade */}
            <Avatar src={professional.photoUrl || pessoaGenerica} alt={professional.name} sx={{ width: 100, height: 100, mb: 2 }} /> 
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}> {/* Caixa para centralizar a avaliação */}
              <Rating value={professional.rating} readOnly precision={0.5} /> 
            </Box>
            <h3>{professional.name}</h3>
            <p>{professional.phone}</p>
          </ProfessionalCard>
        ))}
      </ProfessionalContainer>
    </SearchContainer>
  );
};

const App = () => {
  const [bubbles, setBubbles] = useState([]);

  return (
    <AppContainer>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: '100px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, backgroundImage: `url(${clienteImagem})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Cliente />
          {/* Renderizar bolhas de sabão */}
          {bubbles}
        </div>
        <footer>
          {/* Conteúdo do rodapé aqui */}
        </footer>
      </div>
    </AppContainer>
  );
};

export default App;