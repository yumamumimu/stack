import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer'; // Import tipe untuk props
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '@react-navigation/drawer';

// Inisialisasi Drawer Navigator
const Drawer = createDrawerNavigator();

// Stack 1: HomeScreen - Menampilkan Foto Profil, Deskripsi, NIM, dan Nama
const HomeScreen = () => {
  const [task, setTask] = useState(''); // State untuk task input
  const [tasks, setTasks] = useState<string[]>([]); // State untuk daftar tugas

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask(''); // Reset input setelah menambahkan tugas
    }
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  return (
    <View style={styles.screenContainer}>
      <View style={[styles.container, styles.border]}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://avatars.githubusercontent.com/u/178651396?v=4' }} // Ganti dengan URL gambar kamu
            style={styles.profileImage}
          />
          <Text style={styles.title}>Salwa May Hanifah</Text>
        </View>
        <Text style={styles.text}>NIM: 222505014</Text>
      </View>

      {/* To-Do List */}
      <View style={styles.todoContainer}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder="Tambah tugas..."
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Tambah Tugas</Text>
        </TouchableOpacity>

        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.taskContainer}>
              <Text style={styles.taskText}>{item}</Text>
              <TouchableOpacity onPress={() => deleteTask(index)}>
                <Text style={styles.deleteButton}>Hapus</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

// Stack 2: AboutMeScreen - Menampilkan deskripsi tentang diri
const AboutMeScreen = () => (
  <View style={styles.screenContainer}>
    <View style={[styles.container, styles.border]}>
      <Text style={styles.title}>Tentang Saya</Text>
      <Text style={styles.text}>Saya adalah seorang mahasiswi yang sedang belajar react native.</Text>
    </View>
  </View>
);

// Stack 3: HobbiesScreen - Menampilkan daftar hobi
const HobbiesScreen = () => (
  <View style={styles.screenContainer}>
    <View style={[styles.container, styles.border]}>
      <Text style={styles.title}>Hobi Saya</Text>
      <Text style={styles.text}>1. Coding</Text>
      <Text style={styles.text}>2. Menulis</Text>
      <Text style={styles.text}>3. Menonton Film</Text>
    </View>
  </View>
);

// Custom Drawer Content untuk menambahkan foto profil kecil
const CustomDrawerContent = (props: DrawerContentComponentProps) => (
  <View style={{ flex: 1 }}>
    {/* Foto Profil Kecil */}
    <View style={styles.drawerProfileContainer}>
      <Image
        source={{ uri: 'https://avatars.githubusercontent.com/u/182467486?v=4' }} // Ganti dengan URL gambar kamu
        style={styles.drawerProfileImage}
      />
      <Text style={styles.drawerTitle}>Salwa May Hanifah</Text>
    </View>

    {/* Menampilkan menu drawer */}
    <DrawerContent {...props} />
  </View>
);

// Fungsi untuk Drawer Navigation
const AppDrawer = () => (
  <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="AboutMe" component={AboutMeScreen} />
    <Drawer.Screen name="Hobbies" component={HobbiesScreen} />
  </Drawer.Navigator>
);

// Aplikasi utama dengan Drawer Navigator
const App = () => (
  <NavigationContainer>
    <AppDrawer />
  </NavigationContainer>
);

// Styling menggunakan StyleSheet
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },
  border: {
    borderWidth: 2,
    borderColor: '#2196F3',
    borderRadius: 10,
    padding: 20,
    alignItems: 'stretch',
  },
  // Styling untuk Drawer Profile
  drawerProfileContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  drawerProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  // Styling untuk To-Do List
  todoContainer: {
    marginTop: 30,
    width: '100%',
    padding: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  deleteButton: {
    color: '#ff4444',
    fontWeight: 'bold',
  },
});

export default App;
