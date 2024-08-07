import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Card, CardMedia } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addCollection, getCollectionList } from '../../utils';
import { auth } from '../Login/firebase';

const theme = createTheme({
  palette: {
    background: {
      default: '#282c34',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          color: 'white',
        },
        input: {
          color: 'white',
        },
        notchedOutline: {
          borderColor: 'white',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
  },
});

const CollectionForm = ({ onSubmit, navigate }) => {
  const [formData, setFormData] = useState({
    userId: auth.currentUser ? auth.currentUser.uid : '',
    collectionName: '',
    description: '',
    imageLink: '',
    isPublic: true,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'imageLink') {
      setImagePreview(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageLink: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, () => {
      setFormData({
        userId: auth.currentUser ? auth.currentUser.uid : '',
        collectionName: '',
        description: '',
        imageLink: '',
        isPublic: true,
      });
      setImagePreview(null);
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 2,
        pt: 10, // Add padding to the top to prevent overlap
      }}
    >
      <Typography variant="h4" gutterBottom color="white">
        Add Collection to Museum
      </Typography>
      <TextField
        sx={{ marginBottom: 2, width: '300px' }}
        label="Collection Name"
        variant="outlined"
        name="collectionName"
        value={formData.collectionName}
        onChange={handleChange}
        required
        InputLabelProps={{ style: { color: 'white' } }}
      />
      <TextField
        sx={{ marginBottom: 2, width: '300px' }}
        label="Description"
        variant="outlined"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        required
        InputLabelProps={{ style: { color: 'white' } }}
      />
      <Box sx={{ width: '300px', marginBottom: 2 }}>
        <TextField
          fullWidth
          label="Image URL"
          variant="outlined"
          name="imageLink"
          value={formData.imageLink}
          onChange={handleChange}
          InputLabelProps={{ style: { color: 'white' } }}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ marginTop: 1 }}
        >
          Upload Image
          <input
            type="file"
            name="imageLink"
            hidden
            onChange={handleFileChange}
          />
        </Button>
      </Box>
      {imagePreview && (
        <Card sx={{ maxWidth: 300, marginBottom: 2 }}>
          <CardMedia
            component="img"
            height="auto"
            image={imagePreview}
            alt="Uploaded Image Preview"
            sx={{ objectFit: 'contain' }}
          />
        </Card>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2, width: '300px' }}
      >
        Create
      </Button>
    </Box>
  );
};

const AddCollection = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [showBackButton, setShowBackButton] = useState(true);

  const fetchCollections = useCallback(async () => {
    try {
      const response = await getCollectionList(auth.currentUser ? auth.currentUser.uid : '');
      if (response && response.data) {
        setCollections(response.data);
      }
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowBackButton(false);
      } else {
        setShowBackButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCollectionSubmit = async (formData, resetForm) => {
    try {
      const response = await addCollection(formData);
      console.log('Collection added successfully:', response);
      await fetchCollections();
      resetForm();
      navigate('/');
    } catch (error) {
      console.error('Error adding collection:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {showBackButton && (
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              position: 'fixed',
              top: 16,
              left: 537,
              color: 'white',
              zIndex: 1000,
            }}
          >
            Back
          </Button>
        )}
        <CollectionForm onSubmit={handleCollectionSubmit} navigate={navigate} />
      </Box>
    </ThemeProvider>
  );
};

export default AddCollection;
