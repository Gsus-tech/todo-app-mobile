import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, SectionList, ActivityIndicator, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
  const [menuOpen, setMenuOpen] = useState<string | null>(null);  // Store the ID of the open menu
  const apiUrl = process.env.EXPO_PUBLIC_API_URL; 
  const colorScheme = useColorScheme();
  const menuRef = useRef<View>(null);

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

  const handleDismiss = () => {
    Keyboard.dismiss();  // Dismiss the keyboard
    setMenuOpen(null);    // Close the open menu
  };
  

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

  const onMove =  async (id: string, moveTo: string) => {
    try {
      const update = {
        status: moveTo,
      };
      await axios.put(`${apiUrl}${id}`, { status: moveTo });
      const updatedTasks = await axios.get<Task[]>(`${apiUrl}`);
      setTasks(updatedTasks.data);
      handleDismiss();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const groupTasksByStatus = () => {
    const grouped = {
      todo: [] as Task[],
      inProgress: [] as Task[],
      completed: [] as Task[],
    };

    tasks.forEach((task) => {
      const normalizedStatus = task.status.toLowerCase().replace('-', '');

      if (normalizedStatus === 'todo') {
        grouped.todo.push(task);
      } else if (normalizedStatus === 'inprogress') {
        grouped.inProgress.push(task);
      } else if (normalizedStatus === 'completed') {
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
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <>
  <TouchableWithoutFeedback onPress={handleDismiss}>
    <View style={styles.wrapper} >
      <Text style={styles.header}>To-Do App</Text>
      <SafeAreaView style={[styles.container]}>
        <TaskInput onAddTask={addTask} />
          <View style={{ flex: 1}}>
          <SectionList
            sections={groupTasksByStatus()}
            keyExtractor={(item) => item._id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <View ref={menuRef} pointerEvents="box-none">
                <TaskItem
                  task={{ _id: item._id, text: item.text, state: item.status }}
                  onDelete={() => deleteTask(item._id)}
                  onOpenMenu={() => setMenuOpen(item._id)}
                  onMove={onMove} 
                  menuOpen={menuOpen === item._id}
                />
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            ListEmptyComponent={<Text style={styles.emptyMessage}>No tasks yet</Text>}
            stickySectionHeadersEnabled={true}
            contentContainerStyle={{ 
              flexGrow: 1, 
              paddingBottom: 120
            }}
            contentInset={{ bottom: 80 }}
            contentInsetAdjustmentBehavior="automatic"
          />
          </View>
      </SafeAreaView>
    </View>
  </TouchableWithoutFeedback>
</>


  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
    paddingTop: 30,
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
  loadingText: {
    color: "#fff",
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});
