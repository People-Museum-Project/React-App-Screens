import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardMedia } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const CollectionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    userId: '1', // Example user ID
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
        userId: '1', // Example user ID
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
  const handleCollectionSubmit = async (formData, resetForm) => {
    try {
      const response = await fetch('http://127.0.0.1:8080/addCollection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', 
        },
        body: JSON.stringify({
          userId: formData.userId,
          name: formData.collectionName,
          imageLink: formData.imageLink,
          description: formData.description,
          isPublic: formData.isPublic,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Collection added successfully:', responseData);

      resetForm();
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
        }}
      >
        <CollectionForm onSubmit={handleCollectionSubmit} />
      </Box>
    </ThemeProvider>
  );
};

export default AddCollection;
