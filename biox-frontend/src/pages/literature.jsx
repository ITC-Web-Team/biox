import React, { useState } from 'react';
import './literature.css';

const data = [
    {
      id: 1,
      title: 'Modern Fiction',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0kr5b5sxYqLRQuDCVEoJM4yJhAsNSWK2xVg&s',
      meetLink: 'https://meet.google.com/example1',
      recording: 'https://recordings.com/example1',
      ppt: 'https://slides.com/example1',
    }
    ,
    {
    id: 2,
    title: 'Classic Poetry',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpLn5reWRgbF_8Et4qBAtE60bLmFcvwAElMw&s',
    meetLink: 'https://meet.google.com/example2',
    recording: 'https://recordings.com/example2',
    ppt: 'https://slides.com/example2',
    }
];

const Literature = () => {
  const [clickStates, setClickStates] = useState({});

  const handleClick = (id) => {
    setClickStates((prev) => ({...prev,
      [id]: (prev[id] ?? 0) + 1
    }));
  };

  const getContent = (item, step) => {
    const modStep = step % 3;

    if(modStep === 0) return <div>Click for <a href={item.meetLink} target='_blank' rel='noreferrer'>Meet Link</a></div>;
    if(modStep === 1) return <div>Click for <a href={item.recording} target='_blank' rel='noreferrer'>Recording</a></div>;
    if(modStep === 2) return <div>Click for <a href={item.ppt} target='_blank' rel='noreferrer'>PPT</a></div>;

    return null;
  };

  return (
    <div className='literature-container'>
      <h2>Literature Resourses</h2>
      <div className='card-grid'>
        {data.map((item) =>(
          <div className='lit-card' key={item.id} onClick={() => handleClick(item.id)}>
            <img src={item.thumbnail} alt={item.title} className='thumbnail' />
            <h3>{item.title}</h3>
            <div className='card-content'>
              {getContent(item, clickStates[item.id] ?? 0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Literature;