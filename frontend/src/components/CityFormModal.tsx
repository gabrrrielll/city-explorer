import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close.js';
import { City } from '../../types';

interface CityFormModalProps {
  city: Partial<City> | null;
  open: boolean;
  onClose: () => void;
  onSave: (city: Omit<City, 'id'> & { id?: number }) => void;
}

const CityFormModal: React.FC<CityFormModalProps> = ({ city, open, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<City>>({});

  useEffect(() => {
    if (open) {
      setFormData(city || { touristRating: 3 });
    }
  }, [city, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) || '' : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.country) {
      alert('City Name and Country are required.');
      return;
    }

    const cityToSave: Omit<City, 'id'> & { id?: number } = {
      name: formData.name ?? '',
      state: formData.state ?? '',
      country: formData.country ?? '',
      touristRating: Number(formData.touristRating) || 1,
      dateEstablished: formData.dateEstablished ?? '',
      estimatedPopulation: Number(formData.estimatedPopulation) || 0,
      countryCode2: formData.countryCode2 ?? '',
      countryCode3: formData.countryCode3 ?? '',
      currency: formData.currency ?? '',
      weather: formData.weather ?? null,
      id: formData.id,
    };

    if (formData.id) {
      onSave({ id: formData.id, ...cityToSave });
    } else {
      onSave(cityToSave);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ component: 'form', onSubmit: handleSubmit }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {city?.id ? 'Edit City' : 'Add New City'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          margin="dense"
          id="name"
          name="name"
          label="City Name"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.name || ''}
          onChange={handleChange}
          required
          disabled={!!formData.id}
        />
        <TextField
          margin="dense"
          id="state"
          name="state"
          label="State / Region"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.state || ''}
          onChange={handleChange}
          disabled={!!formData.id}
        />
        <TextField
          margin="dense"
          id="country"
          name="country"
          label="Country"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.country || ''}
          onChange={handleChange}
          required
          disabled={!!formData.id}
        />
        <TextField
          margin="dense"
          id="touristRating"
          name="touristRating"
          label="Tourist Rating (1-5)"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.touristRating || ''}
          onChange={handleChange}
          inputProps={{ min: 1, max: 5 }}
        />
        <TextField
          margin="dense"
          id="dateEstablished"
          name="dateEstablished"
          label="Date Established"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.dateEstablished || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="estimatedPopulation"
          name="estimatedPopulation"
          label="Estimated Population"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.estimatedPopulation || ''}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CityFormModal;
