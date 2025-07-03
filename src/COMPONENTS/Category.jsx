import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addCategory, deletVideoCategory, getAllCategories, getDeleteVideosById, updateCategory } from '../SERVICES/allApi';

function Category() {
   const [show, setShow] = useState(false);
   const[categories,setCategories]=useState([])
    const handleClose = () => {
      setShow(false);
      setcategoryName("")
    }
      
    const handleShow = () => setShow(true);
    const [categoryName,setcategoryName] = useState("")
    const handleAddCategory = async()=>{
   if(!categoryName){
    toast.warning("!!!Please Fill the Category Name")
   }
   else{
    const body={
      categoryName:categoryName,
      allvideos:[]
    }
    const response = await addCategory(body)
  console.log("Category Responses");
  console.log(response);
  if (response.status === 201) {
    toast.success(`${categoryName} Successfully Saved`)
  }
  
  
    // modal close cheyyan use cheyyunnu
   }
    }
    const getCategories = async()=>{
    const response = await getAllCategories()
    console.log("categories");
    console.log(response);
    const {data} = response;
    setCategories(data)
    
    
    }
    useEffect(()=>{
      getCategories()
    },[])
  const deleteCategory = async(id)=>{
  await deletVideoCategory(id)
  getCategories()
  }
  const dragOver = (e)=>{
    e.preventDefault();
    console.log("Inside Drag Over");
    
  }

  const videoDropped = async(e,id)=>{
    console.log(`dropped inside category with ${id}`);
    const vId = e.dataTransfer.getData('videoId');
    console.log(`video with id is ${vId} is dropped in category with id ${id}`);
    const result = await getDeleteVideosById (vId)
    console.log(result);
    const {data} = result; 
    let selectedCategory = categories?.find((item)=>item.id==id);
    console.log("Selected Category");
    console.log(selectedCategory);
    selectedCategory.allvideos.push(data);
    console.log("final category");
    console.log(selectedCategory);
    const result_new = await updateCategory(id, selectedCategory)
    getCategories();
    
    
    
   }
  return (
  <>
    <div>
      <button className='btn btn-warning' onClick={handleShow}>ADD NEW CATEGORY</button>
    </div>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        data-bs-theme='dark'
        
      >
        <Modal.Header closeButton className='bg-dark'>
          <Modal.Title className='textStyle'><i class="fa-solid fa-list text-warning me-3"></i>ADD CATEGORY</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark'>
          <p className='textStyle fa-bolder'>PLEASE FILL THE FORM</p>
          <Form className='border border-secondary p-3 rounded '>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control className='bg-dark text-light' type="text" placeholder="CATEGORY NAME" 
              onChange={(e)=>setcategoryName(e.target.value)}/>
            </Form.Group>

          

          </Form>
        </Modal.Body>
        <Modal.Footer className='bg-dark'>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>ADD</Button>
        </Modal.Footer>
      </Modal>  
      {
                categories?.map((item) => (

                    <div className='border border-secondary rounded p-3 m-3' droppable
                    onDragOver={(e)=>dragOver(e)}
                      onDrop={(e)=>videoDropped(e,item.id)}
                      >
                        <div className='d-flex justify-content-between align-items-center'>

                            <h6>{item.categoryName}</h6>
                            <button className='btn btn-danger' onClick={( ) => deleteCategory(item.id)}><i class="fa-solid fa-trash"></i></button>
                            
                        </div>
                         {
                              item.allvideos.length>0?
                              item.allvideos.map(video=>(
                             <img src={video.thumbnailUrl} alt="" height={"100px"} width={"100%"} className='mt-2'  />
                              )):
                              <p>No data found:</p>
                            } 

                        
                    </div>
                ))
            }
 </>
  )
}

export default Category