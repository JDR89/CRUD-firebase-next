"use client"
import { useState } from "react";
import { useTodoContext } from "../../Providers/context/TodoContext";

export const AddTodoForm = () => {

    const{addTodoHandler}=useTodoContext()

    const [form, setForm] = useState({
        title:"",
        description:""
    })

    const handleOnChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=(e)=>{
        try {

            e.preventDefault()
            
            addTodoHandler(form.title,form.description)
           
            setForm({
                title:"",
                description:""
            })

        } catch (error) {
            throw new Error(error)
        }
    }

  return (
    <div>
      <form onSubmit={handleSubmit} className="container mx-auto p-1 ">
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Title:</span>
          </div>
          <input
            onChange={handleOnChange}
            name="title"
            value={form.title}
            type="text"
            placeholder="Add title..."
            className="input input-bordered w-full "
            required
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
           
          </div>
          <textarea
            onChange={handleOnChange}
            name="description"
            value={form.description}
            className="textarea textarea-bordered h-24"
            placeholder="Add description..."
          ></textarea>
         
        </label>

        <button type="submit" className="btn btn-primary mt-4">Add task</button>
      </form>
    </div>
  );
};
