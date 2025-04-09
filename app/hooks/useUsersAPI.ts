import { useCallback } from 'react';
import { User } from '../types/user';
import { useUsers } from '../context/UsersContext';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const useUsersAPI = () => {
  const { dispatch } = useUsers();

  const fetchUsers = useCallback(async (page = 1) => {
    try {
      dispatch({ type: 'FETCH_USERS_REQUEST' });
      const response = await fetch(`${API_URL}?_page=${page}&_limit=10`);
      const paginatedUsers = await response.json();
      dispatch({ 
        type: 'FETCH_USERS_SUCCESS', 
        payload: paginatedUsers
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      dispatch({ type: 'FETCH_USERS_FAILURE', payload: message });
    }
  }, [dispatch]);

  const createUser = useCallback(async (user: Omit<User, 'id'>) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      dispatch({ type: 'ADD_USER', payload: data });
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }, [dispatch]);

  const updateUser = useCallback(async (id: number, user: User) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      dispatch({ type: 'UPDATE_USER', payload: data });
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }, [dispatch]);

  const deleteUser = useCallback(async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'DELETE_USER', payload: id });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }, [dispatch]);

  return {
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};
