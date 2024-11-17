import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const Input: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!todo.trim()) return;

        setIsSubmitting(true);
        try {
            await handleAdd(e);
            setTodo("");
        } finally {
            setIsSubmitting(false);
        }
        inputRef.current?.blur();
    };

    return (
        <motion.div
            initial={{ opacity: 1, y: 1 }}
            animate={{ opacity: 1, y: 1 }}
            transition={{ duration: 0 }}
            className="w-full max-w-2xl mx-auto p-4"
        >
            <form 
                className="flex items-center gap-2 relative group"
                onSubmit={handleSubmit}
            >
                <motion.input
                    ref={inputRef}
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                   transition={{ type: "spring", stiffness: 400 }}
                    className="
                        w-full
                        h-12
                        px-4
                        text-lg
                        bg-white
                        rounded-lg
                        shadow-sm
                        border
                        border-gray-200
                        outline-none
                        transition-all
                        duration-200
                        placeholder:text-gray-400
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-200
                        group-hover:shadow-md
                    "
                    type="input"
                    placeholder="✨ Enter a new task..."
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting || !todo.trim()}
                    className={`
                        flex
                        items-center
                        justify-center
                        w-12
                        h-12
                        rounded-full
                        text-white
                        transition-colors
                        duration-200
                        ${todo.trim() 
                            ? 'bg-blue-500 hover:bg-blue-600' 
                            : 'bg-gray-300 cursor-not-allowed'
                        }
                        shadow-sm
                        hover:shadow-md
                    `}
                >
                    {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Send className="w-5 h-5" />
                    )}
                </motion.button>

                {/* Input focus ring animation */}
                <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    initial={false}
                    animate={{
                        boxShadow: todo.trim() 
                            ? "0 0 0 2px rgba(59, 130, 246, 0.1)" 
                            : "none"
                    }}
                    transition={{ duration: 0.2 }}
                />
            </form>

            {/* Character count */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: todo.length > 0 ? 1 : 0 }}
                className="mt-2 text-sm text-gray-500 text-right"
            >
                {todo.length > 0 && (
                    <span>{todo.length} characters</span>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Input;