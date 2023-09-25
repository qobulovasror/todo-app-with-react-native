import { StyleSheet } from "react-native";

const noteStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
  },
  name: {
    fontSize: 25,
    fontWeight: '500'
  },
  title: {
    fontSize: 18,
  },
  input: {
    padding: 10,
    paddingHorizontal: 15,
    fontSize: 17,
    borderRadius: 15,
    backgroundColor: "#fff",
    width: "80%",
    borderWidth: 1,
    borderColor: "#000",
  },
  searchBtn: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#00f",
  },
  addBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#00f",
    margin: 10,
    padding: 10,
    borderRadius: 10
  },
});

const viewAndEditStyle = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#fff",
    padding: 10,
    zIndex: 2,
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    fontSize : 25,
    textAlign: 'center'
  },
  inputTitle: {
    padding: 10,
    fontSize: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 0.5
  },
  inputText: {
    padding: 10,
    fontSize: 17,
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 5,
    borderWidth: 0.5
  },
  actions: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    marginVertical: 3
  },
  actionBtn: {
    padding: 8, 
    borderRadius: 10, 
    marginHorizontal: 5
  },
  closeBtn: {
    borderColor: '#f00', 
    borderWidth: 2, 
    borderRadius: 10, 
    padding: 8
  },
  modalView: {
    position: 'absolute', 
    top: '30%',
    backgroundColor: '#fff',
    zIndex: 20,
    padding: 15,
    marginHorizontal: '15%',
    borderRadius: 10,
    borderWidth: 0.3,
  },
  modalBtn: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10
  }
})

export { noteStyle, viewAndEditStyle };
