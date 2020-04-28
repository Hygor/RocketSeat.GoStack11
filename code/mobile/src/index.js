import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import api from './services/api';

const App = () => {
  const [projects, setProjects] = useState([]);

  const handleAddProject = async () => {
    const response = await api.post('projects', {
      title: `novo projeto ${Date.now()}`,
      owner: 'Eu mesmo',
    });

    const newProject = response.data;

    setProjects([...projects, newProject]);
  };

  useEffect(() => {
    api.get('projects').then((response) => {
      setProjects(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({item}) => (
            <Text style={styles.project} key={item.id}>
              {item.title}
            </Text>
          )}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={handleAddProject}>
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  project: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 48,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'pink',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
