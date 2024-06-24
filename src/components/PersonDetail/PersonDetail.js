import React from 'react';
import { useParams } from 'react-router-dom';

const PersonDetail = ({ people }) => {
  const { id } = useParams();
  const person = people.find(p => p.id === parseInt(id));

  if (!person) {
    return <div>Person not found</div>;
  }

  return (
    <div>
      <h2>{person.name}</h2>
      <img src={person.photo} alt={person.name} />
      <p>{person.description}</p>
    </div>
  );
}

export default PersonDetail;

