import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../API/Token'
import './Home.css'
import { API_POSTS, API_POST_IMAGE, API_USERS,  } from '../API/ApiResources'
import  arbitre from '../Image/arbitre.jpg'

const Home = () => {

   const { user, token } = isAuthenticated()

   const [ posts, setPosts ] = useState([])

   const [ query, setQuery ] = useState("")
 
   const [ profiles, setProfiles ] = useState([])
  
   const getFollowingPosts = () => {
       fetch(`${API_POSTS}/following/all/${user._id}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
       }).then(res => res.json())
         .then(res => {
          setPosts(res.posts)
         
       }).catch(err => console.error(err))
   }

   const likePost = (postId) => {
      fetch(`${API_POSTS}/like/${postId}`,{
         method: "PATCH",
         headers: {
            "Accept": "appliation/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         }
      }).then(res => res.json())
        .then(res => {
         setPosts(posts,res.postLike)   
      }).catch(err => console.error(err))
   }

   const removeLike = (postId) => {
       fetch(`${API_POSTS}/like/remove/${postId}`, {
        method: "PATCH",
        headers: {
          "Accept": "appliation/json",
          "Content-Type": "aplication/json",
          "Authorization": `Bearer ${token}`
        }
       }).then(res => res.json())
         .then(res => {
          setPosts(posts,res.result)
       
       }).catch(err => console.error(err))
   }

   const dislikePost = (postId) => {
      fetch(`${API_POSTS}/dislike/${postId}`, {
        method: "PATCH",
        headers: {
          "Accept": "appliation/json",
          "Content-Type": "aplication/json",
          "Authorization": `Bearer ${token}`
        }
      }).then(res => res.json())
        .then(res => {
        
          setPosts(posts,res.PostDislike)
         
      }).catch(err => console.error(err))
   }

   const removeDislike = (postId) => {
       fetch(`${API_POSTS}/dislike/remove/${postId}`, {
        method: "PATCH",
        headers: {
          "Accept": "appliation/json",
          "Content-Type": "aplication/json",
          "Authorization": `Bearer ${token}`
        }
       }).then(res => res.json()) 
         .then(res => {
          setPosts(posts,res.result)
         })
   }

   const getAllUsers = () => {
       fetch(`${API_USERS}/all`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "aplication/json",
          "Authorization": `Bearer ${token}`
        }
       }).then(res => res.json())
         .then(res => {
            setProfiles(res.users)
       }).catch(err => console.error(err))
   }

   const followUser = (userId) => {
      fetch(`${API_USERS}/follow/${userId}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }).then(res => res.json())
        .then(res => {
          setProfiles(profiles,res.result)
      }).catch(err => console.error(err))
   }

   const unfollowUser = (userId) => {
      fetch(`${API_USERS}/unfollow/${userId}`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }).then(res => res.json())
        .then(res => {
          setProfiles(profiles,res.result)
      }).catch(err => console.error(err))
   }
  
   useEffect(() => {
     getFollowingPosts()
   },[posts])

   useEffect(() => {
     getAllUsers()
   },[profiles])


  return (
    <div className='container-fluid'>
     <div className="row">
       <div className="col-sm-4">
            <div className=" d-flex">
               <input 
                    type="" 
                    className='form-control'
                    name='search' 
                    id='search'
                    placeholder='search  ...' 
                    onChange={(e) => setQuery(e.target.value)} 
                    />
                 <i 
                    className="fa fa-search" 
                    aria-hidden="true" 
                    id='icon-search' 
                    ></i>
            </div>
          
       </div>
          <div className="col-sm-5" style={{marginTop:20}}>
          {posts && posts.filter((post) => post.author.name.toLowerCase().includes(query.toLowerCase())).map((post, i) => (
           <div className='card' id='card-posts' key={i}>
              <div>
              <i className="fa fa-ellipsis-v" aria-hidden="true" style={{float:'right', }} id="icon-posts"></i>
              </div>
              <div className="card-haut">
                 <i className="fa fa-user-circle" aria-hidden="true" id='icon-user-haut'></i>
                  <h5 className='h5-card-haut'>{post.author && post.author.name }</h5>
              </div>
              <div className="card-moy">
                 <p className='p-card-moy'>{post.text}</p>
                 <img src={`${API_POST_IMAGE}/${post._id}`} alt="" id='img-card-moy'/>
              </div>
              <div className="card-bas">
                    <div>
                        
                            {!post.likes.find(obj => obj._id === user._id) && (
                               <i 
                                 onClick={() => likePost(post._id)} 
                                 className="fa fa-thumbs-o-up" 
                                 aria-hidden="true"
                                 id='icon-card-bas'
                               ></i>
                            )}

                            {post.likes.find(obj => obj._id === user._id) && (
                              <i 
                                onClick={() => removeLike(post._id)}
                                style={{color:'blue'}} 
                                className="fa fa-thumbs-o-up" 
                                aria-hidden="true" 
                                id='icon-card-bas'
                                ></i>
                            )}
                      <br />
                        <span>{post.likes.length}</span>
                    </div>
                    <div>
                           
                           {!post.dislikes.find(obj => obj._id === user._id) && (
                                  <i 
                                  onClick={() => dislikePost(post._id)} 
                                  className="fa fa-thumbs-o-down" 
                                  aria-hidden="true" 
                                  id='icon-card-bas'
                                  ></i>
                           )}
                         
                           {post.dislikes.find(obj => obj._id === user._id) && (
                                 <i 
                                 onClick={() => removeDislike(post._id)} 
                                 style={{color:'red'}}
                                 className="fa fa-thumbs-o-down" 
                                 aria-hidden="true" 
                                 id='icon-card-bas'
                                 ></i>
                           )} 
                    <br />             
                        <span>{post.dislikes.length}</span>  
                    </div>
                   <div>
                    <i className="fa fa-commenting-o" aria-hidden="true" id='icon-card-bas'> </i>
                    <br />
                    <span>0</span>
                    </div>                  
              </div>
          </div>
            ))}
       </div>
      
      <div className="col-sm-3" id='col-sm-friends'>
           <h4 className='text-center'> Most engaged users </h4>
          {profiles && profiles.map((profile, i) => (
             <div key={i}>
                {profile._id === user._id && (
                  <i className="fa fa-wifi" style={{float:'right', color:'green'}}></i>
                )}

                {(profile._id !== user._id) && (
                  <i className="fa fa-wifi" style={{float:'right', color:'red'}}></i>
                )}
               <ul className='ul-friends' >
               <li>
                  <img src={arbitre} alt=""  id='img-friends'/>
               </li>
                 <li>
                    <h5 className='h5-friends'>{profile.name}</h5>
                    {!profile.followers.find(obj => obj._id === user._id) && (
                       <button 
                       onClick={() => followUser(profile._id)}
                       className='btn btn-danger' 
                       id='btn-friends'
                       >Follow
                       </button>
                    )}
                    {profile.followers.find(obj => obj._id === user._id) && (
                       <button 
                       onClick={() => unfollowUser(profile._id)}
                       className='btn btn-danger' 
                       id='btn-friends'
                       >Unfollow
                       </button>
                    )}
                    
                   <button 
                           
                           className='btn btn-light' 
                           id='btn-friends'
                           >Delete
                   </button>
                 </li>
             </ul>
              <hr />
             </div>
          ))}
      </div> 
     </div> 
    </div>
  )
}

export default Home