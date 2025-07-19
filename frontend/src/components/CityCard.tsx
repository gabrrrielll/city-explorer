import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box,
  Rating,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit.js';
import DeleteIcon from '@mui/icons-material/Delete.js';
import PeopleIcon from '@mui/icons-material/People.js';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth.js';
import ThermostatIcon from '@mui/icons-material/Thermostat.js';
import PublicIcon from '@mui/icons-material/Public.js';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney.js';
import { City } from '../../types';

interface CityCardProps {
  city: City;
  onEdit: () => void;
  onDelete: () => void;
}

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({
  icon,
  label,
  value,
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
    <Box sx={{ mr: 1.5, color: 'primary.main' }}>{icon}</Box>
    <Typography variant="body2">
      <strong>{label}:</strong> {value}
    </Typography>
  </Box>
);

const CityCard: React.FC<CityCardProps> = ({ city, onEdit, onDelete }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={
          <Typography variant="h5" component="h2">
            {city.name}
          </Typography>
        }
        subheader={`${city.state}, ${city.country}`}
        action={
          <>
            <IconButton onClick={onEdit} aria-label={`Edit ${city.name}`}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={onDelete} aria-label={`Delete ${city.name}`}>
              <DeleteIcon />
            </IconButton>
          </>
        }
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Rating name="read-only" value={city.touristRating} readOnly />
        </Box>
        <InfoItem
          icon={<PeopleIcon />}
          label="Population"
          value={city.estimatedPopulation.toLocaleString()}
        />
        <InfoItem icon={<CalendarMonthIcon />} label="Established" value={city.dateEstablished} />
      </CardContent>
      <CardActions
        sx={{ borderTop: '1px solid', borderColor: 'divider', px: 2, py: 1, display: 'block' }}
      >
        <List dense>
          {city.weather && (
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <ThermostatIcon fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={`${city.weather.temp.toFixed(1)}°C, ${city.weather.description}`}
              />
            </ListItem>
          )}
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <PublicIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary={`Codes: ${city.countryCode2} / ${city.countryCode3}`} />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <AttachMoneyIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary={`Currency: ${city.currency}`} />
          </ListItem>
        </List>
      </CardActions>
    </Card>
  );
};

export default CityCard;
