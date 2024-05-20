import React, { useState } from 'react';
import styled from 'styled-components';
import pessoaGenerica from '../../imagens/pessoa-generica.png';
import ChatContainer from '../ChatContainer/index.js';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { enUS } from 'date-fns/locale';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar, Grid, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu.js';
import NotificationsIcon from '@mui/icons-material/Notifications.js';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble.js';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday.js';
import Rating from '@mui/material/Rating/index.js';
import HouseIcon from '@mui/icons-material/House.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configuração de cor roxo rosado
const roxoRosado = '#b356a6';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar = () => {
  const [events, setEvents] = useState([]); // Inicializa o estado dos eventos

  const handleSelectSlot = (slotInfo) => {
    const dateStr = format(slotInfo.start, 'yyyy-MM-dd'); // Formata a data como uma string
    const existingEventIndex = events.findIndex(event => format(event.start, 'yyyy-MM-dd') === dateStr);

    if (existingEventIndex > -1) {
      // Se o evento existir, remove-o
      setEvents(prevEvents => prevEvents.filter((_, index) => index !== existingEventIndex));
    } else {
      // Se não houver evento, adiciona um novo
      const newEvent = {
        title: 'Reserved',
        start: slotInfo.start,
        end: slotInfo.end,
        isReserved: true
      };
      setEvents(prevEvents => [...prevEvents, newEvent]);
    }
  };

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.isReserved ? roxoRosado : '#3174ad',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return { style };
  };

  const CustomEvent = ({ event }) => (
    <span>
      {event.title}
      {event.isReserved && <HouseIcon style={{ marginLeft: '10px' }} />}
    </span>
  );

  return (
    <div style={{ height: 500 }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
        components={{ event: CustomEvent }}
      />
    </div>
  );
};

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

const ProfessionalCard = ({ professional }) => (
  <ProfessionalCardContainer>
    <AvailabilityCircle available={professional.available} />
    <Avatar src={professional.photoUrl || pessoaGenerica} alt={professional.name} sx={{ width: 100, height: 100, mb: 2 }} />
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
      <Rating value={professional.rating} readOnly precision={0.5} />
    </Box>
    <h3>{professional.name}</h3>
    <p>{professional.phone}</p>
  </ProfessionalCardContainer>
);

const Fornecedor = () => {
  const [selectedView, setSelectedView] = useState('chat');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button onClick={() => setSelectedView('chat')}>
          <ListItemIcon><ChatBubbleIcon style={{ color: roxoRosado }} /></ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItem>
        <ListItem button onClick={() => setSelectedView('agenda')}>
          <ListItemIcon><CalendarTodayIcon style={{ color: roxoRosado }} /></ListItemIcon>
          <ListItemText primary="Agenda" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div style={{ display: 'flex' }}>
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>

      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: roxoRosado }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Dashboard do Fornecedor</Typography>
            <IconButton color="inherit" onClick={() => console.log('Notification clicked')}>
              <NotificationsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            {selectedView === 'chat' ? <ChatContainer /> : <Calendar />}
          </Grid>
          <Grid item xs={6}>
            <ProfessionalCard professional={{ name: 'Nome do Cliente', phone: '123456789', rating: 4.5, available: true }} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Fornecedor;
