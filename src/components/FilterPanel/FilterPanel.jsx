import "./FilterPanel.css";
import PropTypes from 'prop-types'

const FILTER_ITEMS = [
    {
        id: 'all',
        label: "All",
        iconPath: "./public/assets/inbox.png"
    },
    {
        id: 'important',
        label: "Important",
        iconPath: "./public/assets/flag.png"
    },
    {
        id: 'completed',
        label: "Completed",
        iconPath: "./public/assets/check.png"
    },
    {
        id: 'deleted',
        label: "Delete",
        iconPath: "./public/assets/delete.png"
    }
];

const FilterPanel = ({ selectedFilterId, setSelectedFilterId, todoList }) => {
    const coutByFilterType = todoList.reduce((acc, cur) => {
        let newAcc = { ...acc };
        if (cur.isCompleted) {
            newAcc = { ...acc, completed: newAcc.completed + 1 }
        }
        if (cur.isImportant) {
            newAcc = { ...acc, important: newAcc.important + 1 }
        }
        if (cur.isDeleted) {
            newAcc = { ...acc, deleted: newAcc.deleted + 1 }
        }
        return newAcc
    }, { all: todoList.length, important: 0, completed: 0, deleted: 0 })
    console.log(coutByFilterType)
    return (
        <div className="filter-panel">
            <input type="text" className="search-text" placeholder='Search' />
            <div className='filter-container'>
                {FILTER_ITEMS.map((item) => {
                    return (
                        <div
                            className={`filter-item ${selectedFilterId === item.id ? 'selected' : ''}`}
                            key={item.id}
                            onClick={() => { setSelectedFilterId(item.id) }}
                        >
                            <div className='filter-name'>
                                <img src={item.iconPath} alt={item.label} />
                                <p>{item.label}</p>
                            </div>
                            <p>22</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
FilterPanel.propTypes = {
    selectedFilterId: PropTypes.string,
    setSelectedFilterId: PropTypes.func,
    todoList: PropTypes.array,
    coutByFilterType: PropTypes.string,
}
export default FilterPanel;
