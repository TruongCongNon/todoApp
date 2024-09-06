import { useState } from "react";
import "./Sidebar.css";
import PropTypes from 'prop-types';
const Sidebar = (props) => {
    const data = props.todoItem;
    const [name, setName] = useState(data.name);
    const [isImportant, setIsImportant] = useState(data.isImportant);
    const [isCompleted, setIsCompleted] = useState(data.isCompleted);

    const handleSave = () => {
        const newTodo = { ...data, name, isImportant, isCompleted };
        props.handleTodoItemChange(newTodo);
        props.setShowSidebar(false);
    }
    return (
        <div className="sidebar">
            <form className="sb-form" action="">
                <div className="sb-form-field">
                    <label htmlFor="sb-name">Todo Name</label>
                    <input
                        type="text"
                        name="name"
                        id="sb-name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            console.log({ value: e.target.value })
                            // props.handleTodoNameChange(data.id, e.target.value);
                        }}
                    />
                </div>
                <div className="sb-form-field">
                    <label htmlFor="sb-important">Is Important ?</label>
                    <input
                        type="checkbox"
                        name="name"
                        id="sb-important"
                        checked={isImportant}
                        onChange={() => {
                            setIsImportant(!isImportant);
                        }}
                    />
                </div>
                <div className="sb-form-field">
                    <label htmlFor="sb-completed">Is Completed</label>
                    <input
                        type="checkbox"
                        name="name"
                        id="sb-completed"
                        checked={isCompleted}
                        onChange={() => {
                            setIsCompleted(!isCompleted);
                        }}
                    />
                </div>
            </form>
            <div className="sb-footer">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => { props.setShowSidebar(false) }}>Cancel</button>
            </div>
        </div>
    );
};
Sidebar.propTypes = {
    setShowSidebar: PropTypes.func.isRequired,
    todoItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        isImportant: PropTypes.bool.isRequired,
    }).isRequired,
    handleTodoItemChange: PropTypes.func.isRequired,
};
export default Sidebar;
