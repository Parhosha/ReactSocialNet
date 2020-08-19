const TXT_UPD = 'TXT_UPD';
const TXT_ADD = 'TXT_ADD';

let initReducer = {
  text: [
    { key: 1, title: '', text: '' },
    { key: 2, title: '', text: '' },
    { key: 3, title: '', text: '' },
    { key: 4, title: '', text: '' },
    { key: 5, title: '', text: '' },
    { key: 6, title: '', text: '' },
  ],

  UpdateContentText: 'Content',
};
const ContentReducer = (state = initReducer, action) => {
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
export const heppandTextActionCreator = (msg) => ({ type: TXT_ADD, msg });

export default ContentReducer;
