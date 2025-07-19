import React, { useState, useEffect, useCallback } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add.js';
import CityCard from './components/CityCard';
import CityFormModal from './components/CityFormModal';
import { City } from '../types';
import theme from './theme';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const App: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<Partial<City> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCities = useCallback(async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/cities?name=${encodeURIComponent(name)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cities');
      }
      const data = await response.json();
      setCities(data);
    } catch (e: any) {
      setError(e.message);
      setCities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCities(searchTerm);
    }, 500); // Debounce search
    return () => clearTimeout(timer);
  }, [searchTerm, fetchCities]);

  useEffect(() => {
    fetchCities(''); // Initial fetch
  }, [fetchCities]);

  const handleSaveCity = async (cityToSave: Omit<City, 'id'> & { id?: number }) => {
    try {
      const isUpdating = 'id' in cityToSave && cityToSave.id;
      const url = isUpdating ? `${API_BASE_URL}/cities/${cityToSave.id}` : `${API_BASE_URL}/cities`;
      const method = isUpdating ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cityToSave),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save city');
      }

      closeModal();
      fetchCities(searchTerm); // Refresh list
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    }
  };

  const handleEdit = (city: City) => {
    setEditingCity(city);
    setIsModalOpen(true);
  };

  const handleDelete = async (cityId: number) => {
    if (window.confirm('Are you sure you want to delete this city?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/cities/${cityId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete city');
        }
        fetchCities(searchTerm); // Refresh list
      } catch (e: any) {
        alert(`Error: ${e.message}`);
      }
    }
  };

  const openAddModal = () => {
    setEditingCity(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCity(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h2"
            component="h2"
            fontWeight="700"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}
          >
            <img src="logo512.png" alt="Logo" style={{ width: '70px', height: '70px' }} />
            City Explorer
          </Typography>
        </Box>

        <main>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              mb: 4,
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search for a city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search for a city"
              sx={{ flexGrow: 1, minWidth: '250px' }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={openAddModal}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Add New City
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <Grid container spacing={3}>
                {cities.map((city) => (
                  <Grid item xs={12} sm={6} md={4} key={city.id}>
                    <CityCard
                      city={city}
                      onEdit={() => handleEdit(city)}
                      onDelete={() => handleDelete(city.id)}
                    />
                  </Grid>
                ))}
              </Grid>
              {cities.length === 0 && (
                <Typography sx={{ textAlign: 'center', mt: 4 }}>No cities found.</Typography>
              )}
            </>
          )}
        </main>

        {isModalOpen && (
          <CityFormModal
            city={editingCity}
            open={isModalOpen}
            onClose={closeModal}
            onSave={handleSaveCity}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
