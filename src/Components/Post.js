import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import {fireDb} from '../firebase'
import {storage} from '../firebase'


function Post(props) {
  const history = useHistory();
  const [data, setData] = useState({})
  const goBack = () => {
    history.push("/");
  };
  let {id} = useParams();



  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [image , setImage] = useState(null);
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  
  
  useEffect(() => {
    fireDb.child(`posts/${id}`)
    .get().then((snapshot) => {
        if(snapshot.exists()){
            setData({...snapshot.val()})
        }
        else{
            setData({})
        }
    })
    return () => {
      setData({})
    }
 }, [id])

 useEffect(() => {

    if(id){
   
      setTitle(data.title)
      setDesc(data.desc)
      setDate(data.date)
    }
    else{
      
      setTitle("")
      setDesc("")
      setDate("")
    }
    return () => {
   
      setTitle("")
      setDesc("")
      setDate("")
    }
 }, [id, data])
      

  

  

  const savePost = async () => {
    
   
    if(!id){
      
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on("state_changed", console.log("IMage has uplodade"), err => {
        if(err){
          console.log(err, 'Image error')
        }
      },()=>{
        storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(url => {
         
          let input = {title, desc, date, url}
          fireDb.child("posts").push(input, (err) => {
        
            if(err){
                console.log(err)
              }
              else{
                setLoading(true)
                history.push('/')

                console.log('Successfully Submitted')
              }
            })
        });
      })    
     
    }//end id condition
    else{
      let input = {title, desc, date}
      fireDb.child(`posts/${id}`).set(input , (err) => {
        if(err){
          console.log(err)
        }
        else{
          setLoading(true)
          history.push('/')
          console.log('Successfully Updated')
         
        }
      })

    }

    //reset values after submited
   
    
  };
  const add = (e) => {
   e.preventDefault();
   savePost()
   if(loading == false){
      document.getElementById('loader').innerHTML = 'Loading Please Wait...'
   }
  }
  console.log(loading)
  
  
  return (
    <div className="container mt-4">
      <button type="button" onClick={goBack} className="btn btn-dark">
        Go Back
      </button>
      <h3 id="loader" className="text-center"></h3>
      <h2 className="text-center mt-4">Create New One</h2>
      <Form onSubmit={add} className="post-form">
        <FormGroup>
          <Label>Post Title</Label>
          <Input
            className="mb-3 mt-2"
            type="text"
            name="title"
            required
            placeholder="Enter Post Title..."
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Post Description</Label>
          <Input
            className="mb-3 mt-2"
            type="textarea"
            name="desc"
            required
            placeholder="Enter Post Description..."
            value={desc || ""} 
            onChange={(e) => setDesc(e.target.value)}
          />
          <Label>Date</Label>
          <Input
            className="mb-3 mt-2"
            type="date"
            name="date"
            placeholder="Pick date"
            value={date || ""}
            onChange={(e) => setDate(e.target.value)}
          />
           <input className="mb-4" type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>

          
        </FormGroup>
      
          <Button color="success" type="submit">
            {id ? 'Update Post':'Create Post'}
          </Button>
       
        
      </Form>

      {/* <div className="row mt-4">
                <div className="col-12">
                    {props.posts.map((post) => (
                        <h3>{post.id}</h3>
                    ))
                    }
                </div>
            </div> */}
    </div>
  );
}

export default Post;
