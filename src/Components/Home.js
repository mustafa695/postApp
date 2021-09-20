import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";
import {fireDb, storage} from "../firebase";
const Home = (props) => {
 
  const [fireData, setFireData] = useState({})
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  console.log(fireData, 'data')
  if(fireData == null){
    console.log('noy fpasd')
  }
  const showPage = () => {
      history.push('/post');
  }
 let {id} = useParams();

  useEffect(() => {
    
    fireDb.child("posts").on("value", (snapshot) => {
      if(snapshot.val() !== null){
        setFireData({...snapshot.val()});
        setLoading(true)
      }
      else{
       
        setFireData({});
        setLoading(true)
        
      }
    });

  }, [id]);

  const detail = (id) => {
  
    console.log(id,'from app.js')

}
const removePost = (id, url) => {
  console.log(id, 'Remove Post id');
  console.log(url, 'inlcik')
  fireDb.child(`posts/${id}`).remove((err) => {
    if(err){
      console.log(err)
    }
    else{
      let imageRef = storage.refFromURL(url);
      imageRef.delete()
      console.log('Deleted Successfully...')
    }
  })
  
}
console.log(loading, 'Loading')

  return (
    <div className="container mt-4">
        <div className="d-flex" style={{justifyContent:'space-between', alignItems:'center'}}>
            <h2 className="text-center mb-4">Post Listing</h2>
            <button onClick={showPage} type="button" className="btn btn-primary h-100">Create Post</button>
        </div>
        
        { loading ? 
          <table className="table table-bordered">
          <thead>
            <tr>
              
              <th>Post Title</th>
              <th>Post Description</th>
              <th>Date</th>
           
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
                     
             {/* <tr key={posts.id}>
                    
                 <td><a href={window.URL.createObjectURL(posts.image[0])}>{posts.image[0].name}</a></td>
                 <td>{posts.title}</td>
                 <td>{posts.desc}</td>
                 <td>{posts.date}</td>
                 <td>
                     <button onClick = {() => props.removePost(posts.id)} className="btn btn-danger" type="button">Remove</button>
                     <button className="btn btn-secondary" onClick={() => props.edit(posts.id, history.push(`/post/edit/${posts.id}`))} style={{marginLeft:'8px'}}>Edit</button>
                     <button onClick = {() => props.detail(posts.id, history.push(`/post/${posts.id}`)) } className="btn btn-dark" type="button">Show Post</button>
                 </td>
             </tr> */}


              {/* get Data from firebase     */}
         
                   {Object.keys(fireData).map((item) => {
                    return (
                      <>
                      <tr key={item}>
                          <td>{fireData[item].title}</td>
                          <td>{fireData[item].desc}</td>
                          <td>{fireData[item].date}</td>
                          
                          <td>
                            <button onClick={() => removePost(item, fireData[item].url)} className="btn btn-danger">Remove</button>
                            <Link to={`/post/${item}`}>
                            <button onClick={() => detail(item)} className="btn btn-primary">Show</button>
                            </Link>
                            <Link to={`/post/update/${item}`}>
                              <button onClick={() => console.log(item)} className="btn btn-primary">Edit</button>
                            </Link>
                          </td>
                        
                      </tr>
                      </>
                    );
                  }) }
             
          </tbody>
        </table>
          
          : <>
              <div className="text-center mt-4">
                <h3>Loading Please Wait...</h3>
                <div class="spinner-border text-dark"></div>
              </div>
             
            </>
        } 
        
      
    </div>
  );
};

export default Home;
