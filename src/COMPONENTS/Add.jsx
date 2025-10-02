import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { uploadVideo } from '../SERVICES/allApi';
import {  toast } from 'react-toastify';
function Add({setuploadVideoStatus}) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setVideoDetails({
      caption: '',
      thumbnailUrl: '',
      embeddedLink: ''
    })
  }

  const handleShow = () => setShow(true);

  const [videoDetails, setVideoDetails] = useState({
    caption: '',
    thumbnailUrl: '',
    embeddedLink: ''
  })

  const handleUpload = async () => {
    console.log("UPLOAD VIDEO DETAILS");
    console.log(videoDetails);
    const { caption, thumbnailUrl, embeddedLink } = videoDetails;
    if (!caption || !thumbnailUrl || !embeddedLink) {
      toast.warning("Please Fill The Form Completely")
    }
    else {
      const result = await uploadVideo(videoDetails)
      console.log("Result");
      console.log(result);
      if (result.status === 201) {
        setuploadVideoStatus(result)
       toast.success("Successfully Uploaded")
        handleClose();

      }
      else {
       toast.error("Something went Wrong")
      }

    }
  }

  const setEmbeddedLink = (data) => {
    // set embedded link
    const link = `https://www.youtube.com/embed/${data.slice(-11)}`
    console.log(link);
    setVideoDetails({ ...videoDetails, embeddedLink: link })

  }
  return (
    <>
      <div className='d-flex align-items-center '>
        <h5 className='textStyle'>UPLOAD NEW VIDEO</h5>
        <button className='btn' onClick={handleShow}><i className="fa-solid fa-cloud-arrow-up textStyle fs-5"></i></button>
      </div>
      {/* Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        data-bs-theme='dark'

      >
        <Modal.Header closeButton className='bg-dark'>
          <Modal.Title className='textStyle'><i className="fa-solid fa-film text-warning me-3"></i>UPLOAD VIDEO</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark'>
          <p className='textStyle fa-bolder'>PLEASE FILL THE FORM</p>
          <Form className='border border-secondary p-3 rounded '>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control className='bg-dark text-light' type="text" placeholder="VIDEO TITLE"
                onChange={(e) => setVideoDetails({ ...videoDetails, caption: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control className='bg-dark  text-light' type="text" placeholder="THUMBNAIL"
                onChange={(e) => setVideoDetails({ ...videoDetails, thumbnailUrl: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
              <Form.Control className='bg-dark text-light' type="text" placeholder="VIDEO LINK"
                onChange={(e) => setEmbeddedLink(e.target.value)} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer className='bg-dark'>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={handleUpload} >UPLOAD</Button>
        </Modal.Footer>
      </Modal>
     

    </>
  )
}

export default Add