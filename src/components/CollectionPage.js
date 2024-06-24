import React from 'react';
import { useParams } from 'react-router-dom';

const CollectionPage = () => {
  const { id } = useParams();

  // 假设你有一个函数来根据 id 获取 collection 数据
  const getCollectionById = (id) => {
    const collections = [
      {
        id: 1,
        title: 'Collection 1',
        description: 'Description of Collection 1',
        images: [
          { url: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=faces&fit=crop&w=200&h=200', description: 'Image 1' },
          { url: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=faces&fit=crop&w=200&h=200', description: 'Image 2' }
        ]
      },
      {
        id: 2,
        title: 'Collection 2',
        description: 'Description of Collection 2',
        images: [
          { url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=faces&fit=crop&w=200&h=200', description: 'Image 3' },
          { url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=faces&fit=crop&w=200&h=200', description: 'Image 4' }
        ]
      },
      {
        id: 3,
        title: 'Collection 3',
        description: 'Description of Collection 3',
        images: [
          { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=200&h=200', description: 'Image 5' },
          { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=200&h=200', description: 'Image 6' }
        ]
      }
    ];
    return collections.find(collection => collection.id === parseInt(id));
  };

  const collection = getCollectionById(id);

  if (!collection) {
    return <div>Collection not found</div>;
  }

  return (
    <div>
      <h1>{collection.title}</h1>
      <p>{collection.description}</p>
      <div>
        {collection.images.map((image, index) => (
          <div key={index}>
            <img src={image.url} alt={image.description} />
            <p>{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CollectionPage;
