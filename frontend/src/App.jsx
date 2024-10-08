import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [updateId, setUpdateId]=useState('')

  useEffect(()=>{
    getUsers()
  },[])



  const deleteUser = (id) =>{
    fetch('https://gym-management-system-pink.vercel.app/deleteUser', {method:'delete', headers:{ 'Content-Type': 'application/json'},  body: JSON.stringify({ _id: id })})
    .then((response)=>{return response.json()})
    .then((data)=>{console.log(data)})
    .catch((err)=>{console.log(err)})
    .finally(()=>{ getUsers() })
  }
 
  const getUsers = () =>{
    fetch('https://gym-management-system-pink.vercel.app/getUsers')
    .then((response)=>{return response.json()})
    .then((data)=>{ setUsers(data)})
    .catch((err)=>{console.log(err)})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    const data = {};
  
   formData.forEach((value, key)=>{
    data[key]=value
    
   })

    let flag = true;

    Object.values(data).map((value)=>{
      if(!value)
      {
        flag=false;
      }
    })
   
if(flag){
   fetch('https://gym-management-system-pink.vercel.app/createUser', {method:'post', headers:{'Content-Type':'application/json'},  body: JSON.stringify(data)})
   .then((response)=>{return response.json()})
   .then((data)=>{console.log(data)})
   .catch((error)=>{console.log(error)})
   .finally(()=>{getUsers()})
}
else  
{
  alert('Please enter all the fields....')
}

    
  };


  const handleUpdate = (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
  
    const data = {};
  
   formData.forEach((value, key)=>{
    data[key]=value
    
   })

    let flag = true;

    Object.values(data).map((value)=>{
      if(!value)
      {
        flag=false;
      }
    })
   
if(flag){
   fetch('https://gym-management-system-pink.vercel.app/updateUser', {method:'PUT', headers:{'Content-Type':'application/json'},  body: JSON.stringify(data)})
   .then((response)=>{return response.json()})
   .then((data)=>{data.modifiedCount===1 && data.acknowledged==true ? setUpdateId(''): ''})
   .catch((error)=>{console.log(error)})
   .finally(()=>{getUsers(); setUpdateId('')})
}
else  
{
  alert('Please enter all the fields....')
}

    

  }

  return (
    <>
     <div className='m-4'>
      <form className='w-full border border-green-600 flex justify-between' action="" onSubmit={(e)=>{handleSubmit(e)}}>
        <input type="text" name='name' placeholder='Enter Name...' />
        <input type="text" name='email' placeholder='Enter Email...' />
        <input type="text" name='password' placeholder='Enter Password...' />
        <button type='submit'>Submit</button>
      </form>
     </div>

     <div className='flex flex-col gap-4 border border-black justify-center items-center'>
     {
     users && users.map((user, i)=>{
        return updateId==user._id? 
        <div key={i} className='m-4'>
        <form className='w-full border border-green-600 flex justify-between' action="" onSubmit={(e)=>{handleUpdate(e)}}>
          <input type="text" name='name' placeholder='Enter Name...' defaultValue={user.name} />
          <input type="text" name='email' placeholder='Enter Email...' defaultValue={user.email}/>
          <input type="text" name='password' placeholder='Enter Password...' defaultValue={user.password}/>
          <button type='submit'>Submit</button>
        </form>
       </div>
        : 
        <div key={i} className='border border-black w-full flex justify-between'> <h6>{user.name}</h6> <h6>{user.email}</h6> <h6 >{user._id} </h6> <button onClick={()=>{deleteUser(user._id)}}>Delete</button>  <button onClick={()=>{setUpdateId(user._id)}}>Update</button> </div>
      })
     }
     </div>
    </>
  )
}

export default App
