import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

interface TaskInputProps {
  onAddTask: (taskText: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false); 

  const handleAdd = () => {
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText('');
    }
  };

  return (
    <View style={styles.inputContainer}>
        <TextInput
            placeholder="Add a new task..."
            value={taskText}
            placeholderTextColor={isFocused ? '#333' : '#fff'}
            onChangeText={setTaskText}
            style={[
            styles.input,
            isFocused ? styles.inputFocused : styles.inputBlurred,  // <-- Apply focus styles
            ]}        onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)} 
        />
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>    
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#333',
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
    padding: 8,
    fontSize: 16,
  },
  inputBlurred: {
    backgroundColor: '#BFBFBF',
    borderColor: '#ccc',
  },
  inputFocused: {
    backgroundColor: '#FFFACD',
    borderColor: '#007AFF',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginRight: 10,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
      }
    })
  },  
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TaskInput;
