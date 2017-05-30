// import _ from 'lodash';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state'); // get whole state of app and put into localStorage

    if (!serializedState) throw new Error();

    return JSON.parse(serializedState);
  } catch (err) {
    // return undefined;
  }

  return null;
};

export const saveState = (state) => {
  const newState = { user: state.user, auth: state.auth };
  const serializedState = JSON.stringify(newState);

  localStorage.setItem('state', serializedState);
};
