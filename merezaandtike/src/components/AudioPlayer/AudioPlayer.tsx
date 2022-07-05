import { memo, useEffect, useState } from 'react';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import RoundButton from '../RoundButton';
import useAudioAnimation from '../../store/useAudioAnimation';
import useNews from '../../store/useNews';

type PropTypes = {
  url: string;
};

const AudioPlayer = ({ url }: PropTypes) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const setFocusedNews = useNews((s) => s.setFocusedNews);
  const [setDuration, setIsPaused] = useAudioAnimation((state) => [
    state.setDuration,
    state.setIsPaused,
  ]);

  useEffect(() => {
    audio?.pause();

    const newAudio = new Audio(url);
    newAudio.play();

    setAudio(newAudio);
  }, [url]);

  if (!audio) {
    return null;
  }

  audio.onloadedmetadata = () => {
    setDuration(audio?.duration);
  };

  audio.onended = () => {
    setTimeout(() => {
      setFocusedNews();
    }, 3000);
  };

  const toggleSound = () => {
    if (audio.paused) {
      audio.play();
      setIsPaused(false);
    } else {
      setIsPaused(true);
      audio.pause();
    }
  };

  return (
    <RoundButton
      id="soundButton"
      label="Sound button"
      iconName={audio.paused ? faPlay : faPause}
      onClick={toggleSound}
    />
  );
};

export default memo(AudioPlayer);
