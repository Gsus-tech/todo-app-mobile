import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TaskItemProps {
  task: { _id: string; text: string };
  onDelete: ( _id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  return (
    <View style={styles.taskContainer}>
        <Text style={styles.taskText}>{task.text}</Text>
        <TouchableOpacity onPress={() => onDelete(task._id)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>    
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    
  },
  taskText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    alignContent: 'center',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40, 
  },
  deleteButtonText: {
    marginHorizontal: 'auto',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  }
});

export default TaskItem;
