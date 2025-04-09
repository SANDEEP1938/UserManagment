import React, { createContext, useContext, useReducer } from 'react';
import { User } from '../types/user';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
}

type Action =
  | { type: 'FETCH_USERS_REQUEST' }
  | { type: 'FETCH_USERS_SUCCESS'; payload: User[] }
  | { type: 'FETCH_USERS_FAILURE'; payload: string }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: number }
  | { type: 'RESET_USERS' };

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1
};

const usersReducer = (state: UsersState, action: Action): UsersState => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return { 
        ...state, 
        loading: true, 
        error: null,
        users: state.currentPage === 1 ? [] : state.users
      };
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        loading: false,
        users: [...state.users, ...action.payload],
        currentPage: state.currentPage + 1
      };
    case 'FETCH_USERS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_USER':
      return { ...state, users: [action.payload, ...state.users] };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        )
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    case 'RESET_USERS':
      return { ...initialState };
    default:
      return state;
  }
};

const UsersContext = createContext<{
  state: UsersState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null
});

export const UsersProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
