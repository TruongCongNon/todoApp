import PropTypes from "prop-types";

const TodoItems = (props) => {
  return (
    <div
      className="todo-item"
      onClick={() => props.handleTodoItemClick(props.id)}
    >
      <div className="title-checkbox">
        <input
          type="checkbox"
          className="input-checkbox"
          checked={props.isCompleted}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={() => {
            props.handleCompletedCheckboxChange(props.id);
          }}
        />
        <p className="todo-item-text">{props.name}</p>
      </div>
      {props.isImportant && <p className="icon-important">⭐</p>}
    </div>
  );
};

// Định nghĩa propTypes cho component TodoItems
TodoItems.propTypes = {
  id: PropTypes.string.isRequired,
  handleTodoItemClick: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  handleCompletedCheckboxChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  isImportant: PropTypes.bool,
};

export default TodoItems;
