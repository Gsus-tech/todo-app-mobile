import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SectionList, ActivityIndicator, SafeAreaView, StatusBar, Platform } from 'react-native';
import axios from 'axios';
import { useColorScheme } from 'react-native';
import TaskInput from '@/components/TaskInput';
import TaskItem from '@/components/TaskItem';

interface Task {
  _id: string;
  text: string;
  status: 'todo' | 'in-progress' | 'completed';
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL; 
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>(`${apiUrl}`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();  
    const interval = setInterval(fetchTasks, 5000);

    return () => clearInterval(interval);
  }, []);
  
  

  const addTask = async (taskText: string) => {
    if (taskText.trim()) {
      try {
        const newTask = {
          text: taskText,
          status: 'todo',
        };
        await axios.post(`${apiUrl}`, newTask);
        const updatedTasks = await axios.get<Task[]>(`${apiUrl}`);
        setTasks(updatedTasks.data);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`${apiUrl}${taskId}`);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  // Group tasks into sections (todo - in progress - completed)
  const groupTasksByStatus = () => {
    const grouped = {
      todo: [] as Task[],
      inProgress: [] as Task[],
      completed: [] as Task[],
    };

    tasks.forEach((task) => {
      if (task.status === 'todo') {
        grouped.todo.push(task);
      } else if (task.status === 'in-progress') {
        grouped.inProgress.push(task);
      } else if (task.status === 'completed') {
        grouped.completed.push(task);
      }
    });

    return [
      { title: 'To Do', data: grouped.todo },
      { title: 'In Progress', data: grouped.inProgress },
      { title: 'Completed', data: grouped.completed },
    ];
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <>
      <View
        style={[
          styles.statusBarContainer,
          { backgroundColor: colorScheme === 'dark' ? '#333' : '#ffffff' }
        ]}
      ></View>
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>To-Do App</Text>
      <TaskInput onAddTask={addTask} />
      <View style={{ flex: 1 }}>
        <SectionList
          sections={groupTasksByStatus()}
          style={styles.sectionList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TaskItem task={{ _id: item._id, text: item.text }} onDelete={() => deleteTask(item._id)} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          ListEmptyComponent={<Text style={styles.emptyMessage}>No tasks yet</Text>}
          stickySectionHeadersEnabled={true}
        />
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  statusBarContainer: {
    height: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: 10,
  },
  sectionList:{
    flex: 1,
    marginLeft:10,
    marginRight:10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});
