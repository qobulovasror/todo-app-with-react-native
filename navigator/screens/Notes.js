import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { noteStyle, viewAndEditStyle } from "../styles/noteStyle";
import { defaultStyle } from "../styles/mainStyle";
import {
  createNoteItem,
  getNote,
  updateNote,
  deleteNote,
} from "../../services/noteService";

const Notes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      name: "dasturlash vazifa haqida",
      main: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting ",
    },
  ]);
  const [updateWin, setUpdateWin] = useState(false);
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('title');
  
  const filterHandler = () => {
    setFilterType((filterType==='title')? 'text': 'title')
  }
  const fetchNote = async () => {
    getNote()
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    fetchNote();
  }, []);
  const filteredNote = []
  notes.forEach(item=>{
    const searchTxt = (filterType==='title')? item.name: item.main;
    if(searchTxt.toLowerCase().indexOf(filter.toLowerCase())===-1){
      return;
    }
    filteredNote.push(item)
  })
  return (
    <SafeAreaView style={noteStyle.container}>
      {updateWin && (
        <ViewAndEditItem
          updateWin={updateWin}
          setUpdateWin={setUpdateWin}
          fetchNote={fetchNote}
        />
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          margin: 12,
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity style={[noteStyle.searchBtn, defaultStyle.row]} onPress={filterHandler}>
          <Text style={{fontSize: 17, color: '#fff'}}>{filterType}</Text>
          <Ionicons name="swap-horizontal" style={{marginTop: 2, marginStart: 2}} size={20} color={'#fff'}/>
        </TouchableOpacity>
        <TextInput 
          style={noteStyle.input} 
          placeholder="&#128269; Search..." 
          value={filter}
          onChangeText={setFilter}
        />
        
      </View>
      <FlatList
        data={filteredNote}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={noteStyle.item}
            key={item.id}
            onPress={() => setUpdateWin(item)}
          >
            <Text style={noteStyle.name}>{item.name}</Text>
            <Text style={noteStyle.title}>
              {item.main.slice(0, 50) + "..."}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={noteStyle.addBtn}
        onPress={() => setUpdateWin("new")}
      >
        <Ionicons name="add" size={30} color={"#fff"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const ViewAndEditItem = (props) => {
  const { setUpdateWin, updateWin, fetchNote } = props;

  const [isEnabled, setIsEnabled] = useState(false);
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [modal, setModal] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const createData = () => {
    if (title.length < 4) {
      return alert("title must be more than 3 characters");
    }
    if (text.text < 4) {
      return alert("text must be more than 3 characters");
    }
    createNoteItem(title, text);
    updateState();
  };

  const UpdateData = () => {
    if (title.length < 4) {
      return alert("title must be more than 3 characters");
    }
    if (text.text < 4) {
      return alert("text must be more than 3 characters");
    }
    updateNote(updateWin.id, title, text);
    updateState();
  };
  const updateState = () => {
    fetchNote();
    setTitle("");
    setText("");
    setUpdateWin(false);
  };
  const deleteItemHandler = () => {
    if(updateWin.id){
      deleteNote(updateWin.id);
      updateState()
    }
  };
  useEffect(() => {
    if (updateWin && updateWin != "new") {
      setTitle(updateWin.name);
      setText(updateWin.main);
    }
  }, [updateWin]);
  return (
    <View style={viewAndEditStyle.container}>
      <View style={[defaultStyle.row, { justifyContent: "flex-end" }]}>
        <TouchableOpacity
          style={viewAndEditStyle.closeBtn}
          onPress={() => {
            setUpdateWin(false);
          }}
        >
          <Ionicons name="close" size={25} color={"#000"} />
        </TouchableOpacity>
      </View>
      {modal && (
        <View style={viewAndEditStyle.modalView}>
          <Text style={{ fontSize: 25, textAlign: "center" }}>
            O'chirmoqchimisiz ?
          </Text>
          <View style={[{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}]}>
            <TouchableOpacity
              style={[viewAndEditStyle.modalBtn, { backgroundColor: "#00f" }]}
              onPress={() => setModal(false)}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>Qaytish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[viewAndEditStyle.modalBtn, { backgroundColor: "#f00" }]}
              onPress={deleteItemHandler}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>O'chirish</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {updateWin != "new" ? (
        <Text style={viewAndEditStyle.title}>View and Update note</Text>
      ) : (
        <Text style={viewAndEditStyle.title}>Add new note</Text>
      )}
      <View style={viewAndEditStyle.actions}>
        {updateWin != "new" ? (
          <View style={viewAndEditStyle.actions}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontSize: 20, marginTop: 8 }}>Edit on</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#5159F5" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <TouchableOpacity
              style={[viewAndEditStyle.actionBtn, { backgroundColor: "#00f" }]}
              onPress={UpdateData}
            >
              <Ionicons name="checkmark-sharp" size={25} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[viewAndEditStyle.actionBtn, { backgroundColor: "#f00" }]}
              onPress={() => setModal(true)}
            >
              <MaterialCommunityIcons name="delete" size={25} color={"#fff"} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[viewAndEditStyle.actionBtn, { backgroundColor: "#00f" }]}
            onPress={createData}
          >
            <Ionicons name="save" size={25} color={"#fff"} />
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        style={viewAndEditStyle.inputTitle}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        editable={updateWin != "new" ? isEnabled : true}
      />
      <TextInput
        style={viewAndEditStyle.inputText}
        multiline={true}
        value={text}
        editable={updateWin != "new" ? isEnabled : true}
        onChangeText={setText}
        placeholder="Text"
      />
    </View>
  );
};

export default Notes;
