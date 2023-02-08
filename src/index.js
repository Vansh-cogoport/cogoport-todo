
import React, { useEffect, useState } from "react";
import ReactDOM  from "react-dom";
import {v4 as uuid} from "uuid";


const App=()=>{
  
  const [todo,setTodo]=useState("");
  const [todos,setTodos]=useState([]);
  const [searchtext,setSearchtext]=useState("");
  const [date, SetDate]=useState("");
  const [category, SetCategory]=useState("");
  const [searchByCat, setSearchCat]=useState("");
  const [searchBydate1,setSearchDate1]=useState("");
  const [searchBydate2,setSearchDate2]=useState("");

  useEffect(()=>{
    const item=JSON.parse(localStorage.getItem('todos'))
    if(item)
    {
      setTodos(item);
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  const addTodo=()=>{
    
    const id = uuid();
    setTodos([...todos, {id:id,text:todo,date:date,category:category,status:false} ]);   // adding todo to list todos
    console.log(todos);
  };
   
  const deleteTodo = (id)=>{
    setTodos(todos.filter((t)=>t.id!==id));
  }

  const markDone = (id) => 
  {  
    setTodos(
      todos.map((t)=>{
      if(id===t.id) 
      t.status=!t.status;
      console.log(t);
        return t;
    }))
  }

  // const search=(e)=>{
  //   // setSearchtext(e.target.value);
  //   // console.log(searchtext);
  //   // return e;
  //   if(e==="")
  //   {

  //   }
  // }
  return (
    <div style={{display:'flex', flexDirection:"column", alignItems:'center'}}>
       
      <h1 style={{
        marginLeft:'2%%',marginTop: '2%', marginBottom: '1%'
      }}>To Do List</h1>
      <div style={{display:'flex', flexDirection:"column", gap:'4%',marginBottom:'1%', marginTop: '2%',backgroundColor:'#f8faf873'}} className="p-4 border border-dark text-dark rounded-3">
        <div>
           <h5>Enter Your tasks</h5>
        </div>
        
        <div style={{display:'flex', gap:'4%',marginBottom:'4%', marginTop: '4%'}} >
        <input value={todo} onChange={(e)=>setTodo(e.target.value)} type = "text" className="rounded-pill p-2" placeholder="Enter tasks"/>
         <input value={date} onChange={(e)=>{SetDate(e.target.value)}} type= "date" className="rounded"/>
         <select onChange={(e)=>SetCategory(e.target.value)} className="rounded">
             <option value="home">Home</option>
             <option value="office">Office</option>
             <option value="Work">Work</option>
             <option value="Car">Car</option>
             </select>
        </div>

    </div>
    <br/>
      <button type="submit" onClick={addTodo} className="btn btn-primary rounded" style={{backgroundColor:'#f8faf873'}}>Click To Add</button>
      <br/>
      <input value={searchtext} onChange={(e)=>{setSearchtext(e.target.value)}} type = "text" placeholder="Search" className="p-2 rounded-pill"/>
        <br/>
        <input value={searchByCat} onChange={(e)=>(setSearchCat(e.target.value))} type="text" placeholder="Search by Category" className="p-2 rounded-pill"/>
        <br/>
        <div style={{color:'#04223f'}}>
            <input value={searchBydate1} onChange={(e)=>(setSearchDate1(e.target.value))} type="date" className="rounded"/>
            Between
            <input value={searchBydate2} onChange={(e)=>(setSearchDate2(e.target.value))} type="date" className="rounded"/>
        </div>
        
        <br/>
      <div className="todos">
         <ol style={{listStyleType:'none',width:'90vw',color:"white"}}>
          <li className="rounded-pill p-2 my-1 d-flex justify-content-between bg-dark">
            <div>Status</div>
            <div>Task</div>
            <div>Date</div>
            <div>Category</div>
            <div>Delete</div>
          </li>
           {
            todos.filter(post=>{//search by text
              if(searchtext==="")
              {
                return post;
              }
              else if(post.text.toLowerCase().includes(searchtext)){
                return post;
              }
            }).filter(//search by category
              post=>{
                if(searchByCat==="")
              {
                return post;
              }
              else if(post.category.toLowerCase().includes(searchByCat)){
                return post;
              }
              }
            )
            .filter(
              post=>{
                if(searchBydate1!=="" && searchBydate2!=="")
                {
                   return (post.date>=searchBydate1 && post.date<=searchBydate2);
                }
                else {
                  return post;
                }
              }
            )
            .map((todo)=>{
              return(
              <li key={todo.id} className="rounded-pill p-2 my-1 d-flex justify-content-between bg-dark">
                <div><input type="checkbox" onChange={()=>{markDone(todo.id)}}/> &nbsp;&nbsp;</div>
                  <div>{todo.status===true?<s>{todo.text}</s>: todo.text}</div>
                    <div>{todo.date}</div>
                    <div>{todo.category}</div>
                    <div><button onClick={()=>deleteTodo(todo.id)} className="rounded-pill ">del</button></div>
              </li>)
            })
          } 
          </ol>
      </div>
    </div>);
}

ReactDOM.render(<App/>, document.getElementById("root"));     // ReactDom.render injecting first argument into second argument