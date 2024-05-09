import React, { useState } from 'react';
import styled from 'styled-components'; // Importe styled-components
import pessoaGenerica from '../../imagens/pessoa-generica.png'; // Importe a imagem genérica
// Replace with your actual components and data
import ChatContainer from '../ChatContainer'; // Assuming this component exists

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

// Defina os estilos usando styled-components
const ProfessionalCardContainer = styled.div`
  width: 250px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 20px;
  text-align: center;
  position: relative;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in-out;

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
  background-color: ${(props) => (props.available ? 'green' : 'red')};
`;


const Calendar = () => <h1>Componente de Calendário</h1>;

// Example chat messages (replace with your actual data)
const chatMessages = [
  { id: 1, text: 'Olá!', sender: 'user', image: 'user.png' },
  { id: 2, text: 'Oi! Como posso ajudar?', sender: 'support', image: 'support.png' },
  // ... more messages
];

const ProfessionalCard = ({ professional }) => {
  return (
    <ProfessionalCardContainer>
      <AvailabilityCircle available={professional.available} /> {/* Círculo de disponibilidade */}
      <Avatar src={professional.photoUrl || pessoaGenerica} alt={professional.name} sx={{ width: 100, height: 100, mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}> {/* Caixa para centralizar a avaliação */}
        <Rating value={professional.rating} readOnly precision={0.5} />
      </Box>
      <h3>{professional.name}</h3>
      <p>{professional.phone}</p>
    </ProfessionalCardContainer>
  );
};

const Fornecedor = () => {
  const [selectedView, setSelectedView] = useState('chat');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNotificationClick = () => {
    // Lógica para lidar com o clique no sino de notificações
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => setSelectedView('chat')}>
          <ListItemIcon>
            <ChatBubbleIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItem>
        <ListItem button onClick={() => setSelectedView('agenda')}>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Agenda" />
        </ListItem>
      </List>
      <Divider />
      {/* Opções adicionais na barra lateral */}
    </div>
  );

  // Aqui você precisa substituir professionalData com os dados reais do profissional
  const professionalData = {
    name: 'Nome do Profissional',
    phone: '123456789',
    rating: 4.5,
    available: true,
    // Outros dados do profissional, se necessário
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Drawer (Sidebar) */}
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>

      {/* Main Content */}
      <div style={{ flexGrow: 1 }}>
        {/* AppBar */}
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon /> {/* Menu Icon to open the drawer */}
            </IconButton>
            <Typography variant="h6">Dashboard do Fornecedor</Typography>
            <IconButton color="inherit" onClick={handleNotificationClick}>
              <NotificationsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <Grid container spacing={2}>
          {/* ChatContainer */}
          <Grid item xs={6}>
            {selectedView === 'chat' && (
              <ChatContainer messages={chatMessages}>
                {/* Customize message rendering */}
                {(message) => (
                  <Grid container wrap="nowrap" style={{ marginBottom: 10 }}>
                    <Grid item>
                      <Avatar src={message.image} alt={message.sender} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      {message.sender === 'support' && (
                        <Typography variant="caption" style={{ marginBottom: 5 }}>
                          {message.sender}
                        </Typography>
                      )}
                      <div
                        style={{
                          backgroundColor: message.sender === 'user' ? '#efefef' : '#007bff',
                          color: message.sender === 'user' ? '#333' : '#fff',
                          padding: '10px',
                          borderRadius: '10px',
                        }}
                      >
                        {message.text}
                      </div>
                    </Grid>
                  </Grid>
                )}
              </ChatContainer>
            )}
            {selectedView === 'agenda' && <Calendar />}
          </Grid>

          {/* Cards com fotos para selecionar */}
          <Grid item xs={6}>
            <ProfessionalCard professional={professionalData} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Fornecedor;
