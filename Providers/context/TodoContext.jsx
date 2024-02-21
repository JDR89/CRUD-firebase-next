"use client"
import { createContext, useContext, useEffect, useState }  from "react"
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import {v4 as uuid} from "uuid"

const TodoContext = createContext()


export const useTodoContext = () => useContext(TodoContext)


export const TodoProvider =({children})=>{

    const [todos, setTodos] = useState([])
    


    const getAllTodosHandler =async()=>{
        const Data = await getDocs(collection(db,"todos"))
        
        const todosArray = Data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setTodos(todosArray);
        
    }

    const addTodoHandler =async(title,description)=>{
        await setDoc(doc(db,"todos",uuid()),{
              title,
              description,
              status:false
          })
  
          await getAllTodosHandler()
      }


    const updateHanfler = async(id)=>{
        try {
            // Get the current todo document
            const todoDoc = doc(db, "todos", id);
            const todoSnap = await getDoc(todoDoc);
        
            // Check the current status and update it accordingly
            const currentStatus = todoSnap.data().status;
            const newStatus = !currentStatus;
        
            // Update the todo document with the new status
            await updateDoc(todoDoc, {
              status: newStatus,
            });
        
            // Wait for the getAllTodosHandler to complete before moving on
            await getAllTodosHandler();

          } catch (error) {
            console.error("Error updating todo:", error);
          }
    }  

    const deleteDocHandler = async(id)=>{
        await deleteDoc(doc(db,"todos",id))
        getAllTodosHandler()
    }

    useEffect(() => {
      getAllTodosHandler()
    }, [])
    


    return(
        <TodoContext.Provider value={{addTodoHandler,todos,updateHanfler,deleteDocHandler}}>
            {children}
        </TodoContext.Provider>
    )
}
