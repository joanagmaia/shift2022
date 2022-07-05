import desertFoxHappy from '../assets/desert-fox-happy.png';
import desertFoxSad from '../assets/desert-fox-sad.png';
import desertFoxSurprised from '../assets/desert-fox-surprised.png';
import desertFoxFear from '../assets/desert-fox-fear.png';
import desertFoxAngry from '../assets/desert-fox-angry.png';

export const parseTime = (seconds: number) => {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
};

export const getImageSource = (emotion: string) => {
  if (emotion === 'Sad') {
    return desertFoxSad;
  }

  if (emotion === 'Surprise') {
    return desertFoxSurprised;
  }

  if (emotion === 'Fear') {
    return desertFoxFear;
  }

  if (emotion === 'Angry') {
    return desertFoxAngry;
  }

  return desertFoxHappy;
};

export const getBiggerId = (array: string[]) => {
  const idAsNumbers = array.map((id) => Number(id));

  const max = Math.max(...idAsNumbers);

  return idAsNumbers.find((id) => id === max) || 0;
};
