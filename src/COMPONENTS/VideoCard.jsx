import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addToHistory, deleteVideo } from '../SERVICES/allApi';
import { toast } from 'react-toastify';

function VideoCard({ displayVideo, setdeleteVideoStatus }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async() => {
    setShow(true);
    const {caption,embeddedLink} =displayVideo;
    const today = new Date();
    console.log(today);
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    console.log(year,month,day);
    const hour =String(today.getHours()).padStart(2,'0');
    const minutes = String (today.getMinutes()).padStart(2,'0');
    const timeValue = day+ '-'+month+ "-" +year+ "-" +hour+ ":" +minutes;
    console.log(timeValue);
    const history={
      caption,
      embeddedLink:embeddedLink,
      timeStamp:timeValue
    }
    console.log("history",history);
    
    
    await addToHistory(history)

    
  }

  const removeVideo = async (id) => {
    const response = await deleteVideo(id)
    console.log("Delete Response");
    console.log(response);
    if (response.status === 200) {
      setdeleteVideoStatus(response)
      toast.success(`${displayVideo.caption} Successfully Deleted`)

    }


  }
  const dragStarted = (e, id)=>{
    console.log(`Video With ${id} started dragging`);
    e.dataTransfer.setData("videoId",id)
    
  }
  return (
    <>
      <Card style={{ width: '16rem' }} draggable onDragStart={(e)=>dragStarted(e,displayVideo.id)}>
        <Card.Img variant="top" src={displayVideo.thumbnailUrl} height={"200px"} onClick={handleShow}  />
        <Card.Body>
          <div className='d-flex justify-content-between'>
            <Card.Title>{displayVideo.caption}</Card.Title>
            <Button variant="danger" onClick={() => removeVideo(displayVideo.id)}><i class="fa-solid fa-trash"></i></Button>
          </div>

        </Card.Body>
      </Card>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{displayVideo.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe width="450" height="400" src={displayVideo.embeddedLink} ></iframe>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

    </>
  )
}

export default VideoCard