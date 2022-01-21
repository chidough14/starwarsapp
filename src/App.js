import './App.css';
import { useEffect, useState } from 'react';
import { List, Button, Modal } from "antd"
import 'antd/dist/antd.css';



function App() {
  const [records, setRecords] = useState([])
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [visible, setVisible] = useState(false)
  const [details, setDetails] = useState()

  useEffect(() => {
    const fetchRecords = async () => {
      await fetch('https://swapi.dev/api/people/', {
        method: "GET",
        headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json()) 
        .then(json => {
          setRecords(json.results)
          setNext(json.next)
          setPrevious(json.previous)
        })
        .catch(err => console.log(err));
    }

    fetchRecords()
  }, [])


  const goToNext = async (url) => {
    await fetch(url, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json()) 
        .then(json => {
          setRecords(json.results)
          setNext(json.next)
          setPrevious(json.previous)
        })
        .catch(err => console.log(err));
  }

  const goToPrevious = async (url) => {
    await fetch(url, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json()) 
        .then(json => {
          setRecords(json.results)
          setNext(json.next)
          setPrevious(json.previous)
        })
        .catch(err => console.log(err));
  }

  const showDetails = async (url) => {
    setVisible(true)

    await fetch(url, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json()) 
      .then(json => {
        setDetails(json)
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="">
      <List
        itemLayout="horizontal"
        dataSource={records}
        renderItem={(item) => (
          <List.Item
          >
            <List.Item.Meta
              title={
                <div>
                  <p style={{ cursor: "pointer"}} onClick={() => showDetails(item.url)}>Name : {item.name} </p>
                </div>
              }
              description=""
            />
          </List.Item>
        )}
      />

      <div style={{ display: "flex", justifyContent: "space-evenly"}}>
        <Button type='danger' onClick={() => goToPrevious(previous)} disabled={previous === null ? true : false}>Previous</Button>
        <Button type="primary" onClick={() => goToNext(next)} disabled={next === null ? true : false}>Next</Button>
        
      </div>


      <Modal title="Details" visible={visible} onOk={() => setVisible(false)} cancelButtonProps={{ hidden: true}}>
        <p>Name: {details && details.name}</p>
        <p>Date of birth: {details && details.birth_year}</p>
        <p>Mass: {details && details.mass}</p>
        <p>Gender: {details && details.gender}</p>
        <p>Height: {details && details.height}</p>
        <p>Eye Color: {details && details.eye_color}</p>
        <p>Skin Color: {details && details.skin_color}</p>
        <p>Hair Color: {details && details.hair_color}</p>
      </Modal>
    </div>
  );
}

export default App;
