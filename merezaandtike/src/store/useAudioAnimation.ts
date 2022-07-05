import create, { SetState } from 'zustand';
import produce from 'immer';

type State = {
  duration: number;
  isPaused: boolean;
  setDuration: (d: number) => void;
  setIsPaused: (p: boolean) => void;
};

const useAudioAnimation = create<State>(
  produce((set: SetState<State>) => ({
    duration: null,
    isPaused: false,
    setDuration: (d: number) =>
      set(
        produce((state: State) => {
          state.duration = d;
        })
      ),
    setIsPaused: (p: boolean) =>
      set(
        produce((state: State) => {
          state.isPaused = p;
        })
      ),
  }))
);

export default useAudioAnimation;
