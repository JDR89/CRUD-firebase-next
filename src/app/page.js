import { AddTodoForm } from "@/components/AddTodoForm";
import { AllTodos } from "@/components/AllTodos";


export default function Home() {
  return (
    <div className="container mx-auto">

      <div>
        <AddTodoForm />
      </div>

      <div>
        <AllTodos />
      </div>
    </div>
  );
}
