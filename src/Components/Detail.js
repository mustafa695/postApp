import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {fireDb} from '../firebase'
// import { useHistory } from 'react-router';

const Detail = (props) => {

    // console.log(props);
    // let data = useParams();
    // let history = useHistory();

    const [post, setPost] = useState({})
    
    const {id} = useParams();

   
    useEffect(() => {
       fireDb.child(`posts/${id}`)
       .get().then((snapshot) => {
           if(snapshot.exists()){
               setPost({...snapshot.val()})
           }
           else{
               setPost({})
           }
       })
    }, [id])

    console.log("post", post)
    return (
        <div className="container mt-4">
            <h1 className="text-center">Show Post Details</h1>
            <hr/>
            {/* {
                props.posts.filter(post => post.id == data.id).map(item=> (
                    <>
                        <div className="card">
                            <button onClick={() => history.push('/')} className="btn btn-dark my-4" style={{width:'5%'}}>Back</button>
                            <div className="card-body">
                                <h4>Post ID</h4>
                                <p>{item.id}</p>
                                <h4>Post Title</h4>
                                <p>{item.title}</p>
                                <h4>Post Description</h4>
                                <p>{item.desc}</p>
                                <h4>Post Image</h4>
                                <img src={window.URL.createObjectURL(item.image[0])}/>
                            </div>
                        </div>
                    </>
                    )
                )
            } */}
            <div className="card p-4">
                <h2>Post Title :</h2>
                <h3 className="detail_main">{post.title}</h3>
                <h2>Post Description :</h2>
                <h5 className="detail_desc">{post.desc}</h5>
                <img className="view_img" src={post.url}/>
            </div>
           

        </div>
    )

}
export default Detail
