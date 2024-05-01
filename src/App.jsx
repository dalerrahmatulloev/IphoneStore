import { useState } from "react";
import "./App.css";

function App() {
  let [data, setData] = useState([
    {
      id: 1,
      name: "Daler",
      surname: "Rahmatulloev",
      age:14,
      status:false
    },
    {
      id: 2,
      name: "Jasur",
      age:10,
      surname: "Rahmatulloev",
      status:false
    },
  ])
  let [stat, setStat] = useState(false)
  let [idx, setIdx] = useState(null)
  let [name, setName] = useState('')
  let [surname, setSurname] = useState('')
  let [search, setSearch] = useState('')
  let [filter, setFilter] = useState('')
  function delFun(id){
    let newData = data.filter(el => el.id!== id)
    setData(newData)
  }
  function editFun(){
    data = data.map(el => {
      if(el.id == idx){
        el.name = name
        el.surname = surname
      }
      return el
    })
    setData(data)
    setStat(false)
  }
  function capFun(id){
    data = data.map(el => {
      if(el.id == id){
        if(el.status == true){
          el.status = false
        } else{
          el.status = true
        }
      }
      return el
    })
    setData(data)
  }
  return (
    <>
    <input onChange={e=> setSearch(e.target.value)} type="search" placeholder=" Search" name="" id="" />
    <select onChange={e=> setFilter(e.target.value)} name="" id="">
      <option value="0">All ages</option>
      <option value="9">9+</option>
      <option value="12">12+</option>
      <option value="16">16+</option>
      <option value="18">18+</option>
    </select>
    <button>Delete</button>
      <table>
        <thead>
          <th>name</th>
          <th>surname</th>
          <th>age</th>
          <th>button</th> 
        </thead>
          {data
          .filter(el=>{
            return el.name.toLowerCase().includes(search.toLowerCase())
          })
          .filter(el=>{
            return el.age >= filter
          })
          .map(el=>{
            return(
              <tr key={el.id}>
                <td>{el.name}</td>
                <td>{el.surname}</td>
                <td>{el.age}</td>
                <td>
                  <button onClick={()=> delFun(el.id)}>Delete</button>
                  <button onClick={()=> {setStat(true), setIdx(el.id), setName(el.name), setSurname(el.surname)}}>Edit</button>
                  <button onClick={()=> capFun(el.id)}>Cap</button>
                </td>
              </tr>
            )
          })}
      </table>
      {stat ? <div>
        <input value={name} onChange={e=> setName(e.target.value)} className="bg-red-500" type="text" name="" id="" />
        <input value={surname} onChange={e=> setSurname(e.target.value)} className="bg-blue-500" type="text" name="" id="" />
        <button onClick={()=>editFun()}>Edit</button>
      </div>:null }
    </>
  )
}

export default App;
