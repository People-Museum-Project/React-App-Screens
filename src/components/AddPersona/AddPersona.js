import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Card, CardMedia, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addPerson } from '../../utils';
import { auth } from "../Login/firebase";

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

const PersonForm = ({ onSubmit, navigate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    description: '',
    pic: null,
    picURL: '',
    userId: auth.currentUser.uid,
    collectionId: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, pic: file, picURL: '' });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleURLChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, picURL: value, pic: null });
    setImagePreview(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, () => {
      setFormData({
        firstName: '',
        lastName: '',
        gender: '',
        description: '',
        pic: null,
        picURL: '',
        userId: auth.currentUser.uid,
        collectionId: '',
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
        Add Person to Museum
      </Typography>
      <TextField
        sx={{ marginBottom: 2, width: '300px' }}
        label="First Name"
        variant="outlined"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
        InputLabelProps={{ style: { color: 'white' } }}
      />
      <TextField
        sx={{ marginBottom: 2, width: '300px' }}
        label="Last Name"
        variant="outlined"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
        InputLabelProps={{ style: { color: 'white' } }}
      />
      <FormControl sx={{ marginBottom: 2, width: '300px' }}>
        <InputLabel style={{ color: 'white' }}>Gender</InputLabel>
        <Select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          label="Gender"
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& .MuiSvgIcon-root': {
              color: 'white',
            },
            color: 'white',
          }}
        >
          <MenuItem value={1}>Male</MenuItem>
          <MenuItem value={0}>Female</MenuItem>
        </Select>
      </FormControl>
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
          name="picURL"
          value={formData.picURL}
          onChange={handleURLChange}
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
            name="pic"
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

const AddPersona = () => {
  const navigate = useNavigate();
  const [showBackButton, setShowBackButton] = useState(true);

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

  const handlePersonSubmit = async (formData, resetForm) => {
    const formDataToSend = {
      name: `${formData.firstName} ${formData.lastName}`,
      gender: formData.gender,
      imageLink: formData.picURL,
      description: formData.description,
      context: "Example context",
      googleUserId: formData.userId,
      collectionId: formData.collectionId,
      public: true,
    };

    try {
      const responseData = await addPerson(formDataToSend);
      console.log('Person added successfully:', responseData);
      resetForm();
      navigate('/');
    } catch (error) {
      console.error('Error adding person:', error);
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
              left: 557,
              color: 'white',
              zIndex: 1000,
            }}
          >
            Back
          </Button>
        )}
        <PersonForm onSubmit={handlePersonSubmit} navigate={navigate} />
      </Box>
    </ThemeProvider>
  );
};

export default AddPersona;