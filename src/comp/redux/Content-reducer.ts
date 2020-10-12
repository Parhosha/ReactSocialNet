import { Dispatch } from 'redux';
import { AppStateType } from '../redux/redux-store';
import { ThunkAction } from 'redux-thunk';

const TXT_UPD = 'TXT_UPD';
const TXT_ADD = 'TXT_ADD';

type textInitType = {
  key: number;
  title: string;
  text: string;
};

let initReducer = {
  text: [
    { key: 1, title: '', text: '' },
    { key: 2, title: '', text: '' },
    { key: 3, title: '', text: '' },
    { key: 4, title: '', text: '' },
    { key: 5, title: '', text: '' },
    { key: 6, title: '', text: '' },
  ] as Array<textInitType>,

  UpdateContentText: 'Content' as any,
};

export type initContentReducerType = typeof initReducer;

const ContentReducer = (state = initReducer, action: any): initContentReducerType => {
  switch (action.type) {
    case TXT_ADD: {
      let newState = {
        title: 'New Title',
        key: state.text.length + 1,
        text: action.msg,
      };
      return {
        ...state,
        text: [...state.text, newState],
      };
    }
    default:
      return state;
  }
};

type heppandTextActionCreatorType = {
  type: typeof TXT_ADD;
  msg: string;
};

type DispatchType = Dispatch<heppandTextActionCreatorType>;
//DispType<actionsType> change
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, heppandTextActionCreatorType>;
//

//  НЕ АСИНК ШО ЖЕЛАТЬ

//

export const heppandTextActionCreator = (msg: string): heppandTextActionCreatorType => ({
  type: TXT_ADD,
  msg,
});

export default ContentReducer;
