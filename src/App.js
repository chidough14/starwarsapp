import './App.css';
import { useEffect, useState } from 'react';
import { List, Button, Modal, PageHeader, Input, Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
const { Search } = Input;
const antIcon = <LoadingOutlined style={{ fontSize: 36}} spin />;


function App() {

  const [records, setRecords] = useState([])
  const [next, setNext] = useState(null)
  const [previous, setPrevious] = useState(null)
  const [visible, setVisible] = useState(false)
  const [details, setDetails] = useState()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [modalSpinner, setModalSpinner] = useState(false)
  const [itemNo, setItemNo] = useState(0)

  const setPaginationAndRecords = (json) => {
    setRecords(json.results)
    setNext(json.next)
    setPrevious(json.previous)
    setSpinner(false)
  }
 
  const fetchRecords = async (url, type) => {
    
    if (type === 4) {
      setModalSpinner(true)
    } else {
      setSpinner(true)
    }

    await fetch(url, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
      })
      .then(response => response.json()) 
      .then(json => {
        if (type === 1) {
          setPaginationAndRecords(json)
          setItemNo(0)

        }

        if (type === 2 || type === 3) {
          setPaginationAndRecords(json)

          let newPage
          newPage = type === 2 ? page + 1 : page - 1
          setPage(newPage)

          let newItemNo
          newItemNo = type === 2 ? itemNo + 10 : itemNo - 10
          setItemNo(newItemNo)
        }

        if (type === 4) {
          setDetails(json)
          setModalSpinner(false)
        }

        if (type === 5) {
          setPaginationAndRecords(json)
          setPage(1)
          setItemNo(0)

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

      {
        spinner ? <div className="spinner"><Spin style={{display: "block", marginTop: "30px", marginBottom: "30px"}} indicator={antIcon} /></div> :

        <List
          itemLayout="horizontal"
          dataSource={records}
          renderItem={(item, index) => (
            <List.Item
            >
              <List.Item.Meta
                title={
                  <div>
                    <p style={{ cursor: "pointer"}} onClick={() => showDetails(item.url)}>{index + 1 + itemNo} : {item.name} </p>
                  </div>
                }
                description=""
              />
            </List.Item>
          )}
        />
      }
      

      <div style={{ display: "flex", justifyContent: "space-evenly"}}>
        <Button type='danger' onClick={() => goToPrevious(previous)} disabled={previous === null ? true : false}>Previous</Button>

        <p>Page {page}</p>

        <Button type="primary" onClick={() => goToNext(next)} disabled={next === null ? true : false}>Next</Button>
        
      </div>


      <Modal title="Details" visible={visible} onOk={() => setVisible(false)} cancelButtonProps={{ hidden: true}}>
        {
          modalSpinner ? <Spin style={{display: "block", marginTop: "80px"}} indicator={antIcon} /> :
          <div>
            <p>Name: {details && details.name}</p>
            <p>Date of birth: {details && details.birth_year}</p>
            <p>Mass: {details && details.mass}</p>
            <p>Gender: {details && details.gender}</p>
            <p>Height: {details && details.height}</p>
            <p>Eye Color: {details && details.eye_color}</p>
            <p>Skin Color: {details && details.skin_color}</p>
            <p>Hair Color: {details && details.hair_color}</p>
          </div>
        }
      </Modal>
    </div>
  );
}

export default App;
