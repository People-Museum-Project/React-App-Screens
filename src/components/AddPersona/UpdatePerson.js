
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Card, CardMedia } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getPerson, updatePerson, uploadImage, deletePerson } from '../../utils';

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

const UpdatePerson = () => {
  const { personId } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState({
    name: '',
    description: '',
  });
  const [formData, setFormData] = useState({
    pic: null,
    picURL: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonData = async () => {
      setLoading(true);
      try {
        const response = await getPerson(personId);
        if (response && response.person) {
          const fetchedPerson = response.person;
          setPerson({
            name: fetchedPerson.name,
            description: fetchedPerson.description,
          });
          setImagePreview(fetchedPerson.imageLink);
          setFormData((prevFormData) => ({
            ...prevFormData,
            picURL: fetchedPerson.imageLink,
          }));
        } else {
          setError('Person not found');
        }
      } catch (error) {
        setError('Error fetching person');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonData();
  }, [personId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      pic: file,
      picURL: '',
    }));
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      picURL: value,
      pic: null,
    }));
    setImagePreview(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let imageUrl = formData.picURL;

    if (formData.pic) {
      try {
        imageUrl = await uploadImage(formData.pic);
      } catch (error) {
        setError('Error uploading image');
        setLoading(false);
        return;
      }
    }

    try {
      const response = await updatePerson(
        personId,
        person.name,
        imageUrl,
        person.description,
        '',
        true
      );

      if (response) {
        navigate(`/conversation/${personId}`);
      } else {
        setError('Update failed');
      }
    } catch (error) {
      setError('Error updating person');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await deletePerson(personId);
      if (response && response.message === 'Person deleted successfully') {
        navigate('/');
      } else {
        setError('Delete failed');
      }
    } catch (error) {
      setError('Error deleting person');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          Update Person
        </Typography>
        {error && (
          <Typography variant="body1" color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <TextField
          sx={{ marginBottom: 2, width: '300px' }}
          label="Name"
          variant="outlined"
          name="name"
          value={person.name}
          onChange={handleChange}
          required
          InputLabelProps={{ style: { color: 'white' } }}
        />
        <TextField
          sx={{ marginBottom: 2, width: '300px' }}
          label="Description"
          variant="outlined"
          name="description"
          value={person.description}
          onChange={handleChange}
          multiline
          rows={4}
          required
          InputLabelProps={{ style: { color: 'white' } }}
        />
        <Box sx={{ marginBottom: 2, width: '300px' }}>
          <TextField
            fullWidth
            label="Image URL"
            variant="outlined"
            name="imageLink"
            value={formData.picURL}
            onChange={handleURLChange}
            InputLabelProps={{ style: { color: 'white' } }}
          />
          <Button variant="contained" component="label" sx={{ marginTop: 1 }}>
            Upload Image
            <input type="file" name="pic" hidden onChange={handleFileChange} />
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
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          sx={{ marginTop: 2, width: '300px' }}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default UpdatePerson;
