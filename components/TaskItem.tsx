import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';

interface TaskItemProps {
  task: { _id: string; text: string, state: string };
  onDelete: (id: string) => void;
  onOpenMenu: (id: string) => void;
  onMove: (id: string, movTo: string) => void;
  menuOpen: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onOpenMenu, onMove, menuOpen }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  
  // Toggle menu visibility with animation
  React.useEffect(() => {
    if (menuOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      setShowMoveOptions(false);
    }
  }, [menuOpen]);

  const showMoveMenu = () => {
    setShowMoveOptions(true);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    
    let truncated = text.substring(0, maxLength);
    let lastSpace = truncated.lastIndexOf(' ');
  
    if (lastSpace !== -1) {
      truncated = truncated.substring(0, lastSpace);
    }
  
    return truncated + '...';
  };

  return (
    <View style={styles.taskContainer}>
      {/* Task Text */}
      <Text style={styles.taskText}> {truncateText(task.text, 100)}</Text>

      {/* Options Button */}
      <TouchableOpacity onPress={() => onOpenMenu(task._id)} style={styles.optionsMenu}>
        <Icon name="ellipsis-h" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Floating Menu */}
      {menuOpen && (
        <Animated.View style={[styles.menu, { opacity: fadeAnim }]}>
          {showMoveOptions ? (
            <>
              {/* To Do */}
              {task.state !== 'todo' && (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    onMove(task._id, 'todo')
                  }}
                >
                  <Icon name="tasks" size={16} color="#f49609" />
                  <Text style={styles.menuText}>To Do</Text>
                </TouchableOpacity>
              )}
              {/* In Progress */}
              {task.state !== 'in-progress' && (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    onMove(task._id, 'in-progress')
                  }}
                >
                  <Icon name="cogs" size={16} color="#a209ef" />
                  <Text style={styles.menuText}>In Progress</Text>
                </TouchableOpacity>
              )}
              {/* Completed */}
              {task.state !== 'completed' && (
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    onMove(task._id, 'completed')
                  }}
                >
                <Icon name="check" size={16} color="#23d600" />
                <Text style={styles.menuText}>Completed</Text>
                </TouchableOpacity>
              )}
            </>
            ) : (
            <>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  showMoveMenu();
                }}
              >
              <Icon name="arrows-alt" size={16} color="#06BCEE" />
              <Text style={styles.menuText}>Move</Text>
              </TouchableOpacity>
              {/* Delete */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onDelete(task._id);
                }}
              >
                <Icon name="trash" size={16} color="#ff6347" />
                <Text style={styles.menuText}>Delete</Text>
              </TouchableOpacity>
            </>
            )}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    position: 'relative',
    marginLeft: 20,
    marginRight: 20,
  },
  taskText: {
    fontSize: 16,
    width: '80%',
  },
  optionsMenu: {
    backgroundColor: '#183153',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  menu: {
    position: 'absolute',
    right: 10,
    top: 60,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default TaskItem;
