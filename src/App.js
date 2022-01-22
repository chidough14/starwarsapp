import './App.css';
import { useEffect, useState } from 'react';
import { List, Button, Modal, PageHeader, Input } from "antd"
import 'antd/dist/antd.css';
const { Search } = Input;


function App() {

  const [records, setRecords] = useState([])
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [visible, setVisible] = useState(false)
  const [details, setDetails] = useState()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const setPaginationAndRecords = (json) => {
    setRecords(json.results)
    setNext(json.next)
    setPrevious(json.previous)
  }
 
  const fetchRecords = async (url, type) => {
    await fetch(url, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json()) 
      .then(json => {
        if (type === 1) {
          setPaginationAndRecords(json)
        }

        if (type === 2 || type === 3) {
          setPaginationAndRecords(json)

          let newPage
          newPage = type === 2 ? page + 1 : page - 1
          setPage(newPage)
        }

        if (type === 4) {
          setDetails(json)
        }

        if (type === 5) {
          setPaginationAndRecords(json)
          setPage(1)

          setLoading(false)
        }

      })
      .catch(err => console.log(err));
  }

  useEffect(() => {

    fetchRecords("https://swapi.dev/api/people/", 1)

  }, [])


  const goToNext = async (url) => {

    fetchRecords(url, 2)

  }

  const goToPrevious = async (url) => {

    fetchRecords(url, 3)

  }

  const showDetails = async (url) => {

    setVisible(true)
    fetchRecords(url, 4)

  }


  const searchApi = async (value) => {

    let url = `https://swapi.dev/api/people/?search=${value}`
    setLoading(true)
    fetchRecords(url, 5)

  }

  return (
    <div className="app">
      <PageHeader
        className="site-page-header"
        title="Starwars Characters"
      />

      <div className="searchBox" >
        <Search 
          placeholder="Enter search item" 
          size="large" 
          enterButton
          loading={loading} 
          onSearch={searchApi}
        />
      </div>

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

        <p>Page {page}</p>

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
