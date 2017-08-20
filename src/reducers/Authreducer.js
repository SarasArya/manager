import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER,
} from '../actions/types';

const INITIAL_STATE = {
  email: 'test@test.com',
  password: 'password',
  user: {},
  loading: null,
  error: '',
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAILURE:
      return { ...state,
        error: 'Authentication Failed',
        loading: false,
        password: '',
      };
    default:
      return state;
  }
};

export default AuthReducer;
