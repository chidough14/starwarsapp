import './App.css';
import { useEffect, useState } from 'react';
import { List, Button } from "antd"
import 'antd/dist/antd.css';



function App() {
  const [records, setRecords] = useState([])
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)

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
          console.log(json)
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
          console.log(json)
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
          console.log(json)
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
                  <p>Name : {item.name} </p>
                  <p>Height : {item.height} </p>
                  <p> Mass: {item.mass}</p>
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
    </div>
  );
}

export default App;
