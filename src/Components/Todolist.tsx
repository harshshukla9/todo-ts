import React, { useState } from 'react';
import { Check, Trash2, Edit2, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Todo } from '../model';

interface Props {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Toast = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
  >
    <Smile className="text-white" size={20} />
    {message}
  </motion.div>
);

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  const [showToast, setShowToast] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const activeTodos = todos.filter(todo => !todo.isDone);
  const completedTodos = todos.filter(todo => todo.isDone);

  const handleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isDone: true } : todo
    ));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleEdit = (id: string, text: string) => {
    if (editingId === id) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, todo: editText } : todo
      ));
      setEditingId(null);
    } else {
      setEditingId(id);
      setEditText(text);
    }
  };

  const TodoItem = ({ todo, isCompleted = false }) => (
    <motion.li
      layout
      //initial={{ opacity: 0, y: 0 }}
     // animate={{ opacity: 1, y: 1 }}
      //exit={{ opacity: 0, y: 0 }}
      className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      {editingId === todo.id ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 p-1 mr-2 border rounded outline-none focus:border-blue-500"
          autoFocus
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleEdit((todo.id), editText);
            }
          }}
        />
      ) : (
        <span className={`flex-1 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
          {todo.todo}
        </span>
      )}
      
      <div className="flex gap-2">
        {!isCompleted && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleEdit(todo.id, todo.todo)}
              className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-50"
            >
              <Edit2 size={18} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleComplete(Number(todo.id))}
              className="p-1 text-green-500 hover:text-green-700 rounded-full hover:bg-green-50"
            >
              <Check size={18} />
            </motion.button>
          </>
        )}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTodos(todos.filter(t => t.id !== todo.id))}
          className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
        >
          <Trash2 size={18} />
        </motion.button>
      </div>
    </motion.li>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <AnimatePresence>
        {showToast && (
          <Toast message="Congratulations! Task completed! 🎉" />
        )}
      </AnimatePresence>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Active Tasks</h2>
        <div>
          <ul>
            {activeTodos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      </div>

      {completedTodos.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Completed Tasks</h2>
          <div>
            <ul>
              {completedTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} isCompleted={true} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;