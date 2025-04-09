import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { useUsers } from '../context/UsersContext';
import { useUsersAPI } from '../hooks/useUsersAPI';
import UserFormModal from '../components/UserFormModal';
import { User } from '../types/user';

const UsersListScreen = () => {
  const { state, dispatch } = useUsers();
  const [refreshKey, setRefreshKey] = useState(0);
  const { fetchUsers, deleteUser } = useUsersAPI();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleLoadMore = () => {
      fetchUsers(state.currentPage);
  
  };

  const handleRefresh = () => {
    dispatch({ type: 'RESET_USERS' });
    fetchUsers(1);
  };

  const handleDelete = (id: number) => {
    deleteUser(id);
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => {
            setEditingUser(item);
            setIsModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {state.loading && state.currentPage === 1 ? (
        <ActivityIndicator size="large" />
      ) : state.error ? (
        <Text style={styles.error}>{state.error}</Text>
      ) : (
        <FlatList
          data={state.users}
          renderItem={renderItem}
          keyExtractor={(item,index )=> item.id.toString()+index}
          extraData={refreshKey}
          onEndReached={() => {
            handleLoadMore();
            setRefreshKey(prev => prev + 1);
          }}
          onEndReachedThreshold={0.1}
          windowSize={10}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          refreshControl={
            <RefreshControl
              refreshing={state.loading && state.currentPage === 1}
              onRefresh={handleRefresh}
            />
          }
          ListFooterComponent={
            state.loading ? (
              <View style={styles.footer}>
                <ActivityIndicator size="small" color="#3498db" />
                <Text style={styles.loadingText}>Loading more users...</Text>
              </View>
            ) : null
          }
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setEditingUser(null);
          setIsModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>+ Add User</Text>
      </TouchableOpacity>
      <UserFormModal
        visible={isModalVisible}
        user={editingUser}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  editButton: {
    padding: 8,
    backgroundColor: '#3498db',
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#e74c3c',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
  },
  error: {
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 50,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#3498db',
  },
  endText: {
    marginTop: 8,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default UsersListScreen;
