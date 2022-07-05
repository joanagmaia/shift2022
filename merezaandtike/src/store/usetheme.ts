import create, { SetState } from 'zustand';
import themeAngry from '../themes/angry';
import themeFear from '../themes/fear';
import themeHappy from '../themes/happy';
import themeSad from '../themes/sad';
import themeSurprise from '../themes/surprise';

type Theme = {
  backgroundColor: string;
  textColor: string;
  linkColor: string;
  roundButtonBgColor: string;
  roundButtonTextColor: string;
};

type State = {
  theme: Theme;
  changeTheme: (input: string) => void;
};

const useTheme = create<State>((set: SetState<State>) => ({
  theme: themeHappy,
  changeTheme: (input: string) =>
    set((state: State) => {
      switch (input) {
        case 'Sad':
          state.theme = themeSad;
          break;
        case 'Surprise':
          state.theme = themeSurprise;
          break;
        case 'Fear':
          state.theme = themeFear;
          break;
        case 'Angry':
          state.theme = themeAngry;
          break;
        default:
          state.theme = themeHappy;
          break;
      }
    }),
}));

export default useTheme;
