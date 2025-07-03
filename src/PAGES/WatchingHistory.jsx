import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { deletewatchHistory, getHistory } from '../SERVICES/allApi'

function WatchingHistory() {
  const [allhistory, setallhistory] = useState([])
  const getAllhistory = async () => {
    const resp = await getHistory()
    console.log("History");
    console.log(resp);
    const { data } = resp;
    setallhistory(data)


  }


useEffect(() => {
  getAllhistory()
}, [])

const deleteHistory = async (id) => {
  await deletewatchHistory(id)
  getAllhistory()

}
return (
  <>
    <div className='container mt-5 d-flex justify-content-between'>
      <h3 className='textStyle'>
        WATCH HISTORY
      </h3>
      <Link to={'/home'} style={{ textDecoration: 'none', color: 'white' }}><i className="fa-solid fa-arrow-left me-3"></i>BACK TO HOME</Link>
    </div>
    <table className='textStyle table mt-5 mb-5 container bg-dark'>
      <thead>
        <tr>
          <th>#</th>
          <th>CAPTION</th>
          <th>URL</th>
          <th>TIME</th>
          <th>ACTION</th>
        </tr>
      </thead>

      <tbody>
        {
          allhistory.length > 0 ?
            allhistory.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.caption}</td>
                <td>{item.embeddedLink}</td>
                <td>{item.timeStamp}5</td>
                <td><Button variant='danger' onClick={() => deleteHistory(item.id)}><i class="fa-solid fa-trash"></i></Button></td>

              </tr>
            )) :
            <p>No History Found</p>
        }

      </tbody>
    </table>
  </>
)
}

export default WatchingHistory