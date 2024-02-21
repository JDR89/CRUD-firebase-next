"use client"
import { useTodoContext } from "../../Providers/context/TodoContext"
import { MdOutlineDelete } from "react-icons/md";
import { LiaToggleOnSolid,LiaToggleOffSolid } from "react-icons/lia";
import { FaRegCircleCheck } from "react-icons/fa6";

export const AllTodos = () => {

    const{todos,updateHanfler,deleteDocHandler}=useTodoContext()

  return (
    <div className="container mx-auto p-1">
        <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
        <th>Delete/Done</th>
      </tr>
    </thead>
    <tbody>
     
    {
        todos.map((todo,i)=>{
            return(
                <tr key={todo.id}>
                <th>{i + 1}</th>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.status ? <FaRegCircleCheck size={23} style={{ backgroundColor: "green",borderRadius: "50%" }} />  : <FaRegCircleCheck size={23} />}</td>
                <td>
                    <button onClick={()=>deleteDocHandler(todo.id)} className="btn btn-sm btn-error">
                    <MdOutlineDelete />
                    </button>
                    <button onClick={()=>updateHanfler(todo.id)} className="btn btn-sm btn-success ml-1">
                      {
                          todo.status ?<LiaToggleOnSolid />  : <LiaToggleOffSolid />
                      }
                    </button>
                </td>
              </tr>
            )
        })
    }
    </tbody>
  </table>
</div>
    </div>
  )
}
