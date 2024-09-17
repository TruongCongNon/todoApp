import { useContext, useMemo } from "react";
import "./FilterPanel.css";
import PropTypes from 'prop-types'
import CategoryList from "../Category/CategoryList";
import FilterList from "../../FilterList/FilterList";
import { AppContext } from "../../context/AppProvider";

const FilterPanel = () => {
    const { todoList, selectedFilterId, setSelectedFilterId, searchText, setSearchText, } = useAppContext();
    const countByFilterType = useMemo(() => {
        return todoList.reduce((acc, cur) => {
            let newAcc = { ...acc };

            if (cur.isCompleted) {
                newAcc.completed = newAcc.completed + 1;
            }
            if (cur.isImportant) {
                newAcc.important = newAcc.important + 1;
            }
            if (cur.isDeleted) {
                newAcc.deleted = newAcc.deleted + 1;
            }
            newAcc.all = todoList.length;
            return newAcc;
        }, { all: 0, important: 0, completed: 0, deleted: 0 });
    }, [todoList]);
    console.log(countByFilterType)

    return (
        <div className="filter-panel">
            <input type="text" className="search-text" placeholder='Search' value={searchText} onChange={(e) => {
                setSearchText(e.target.value);
            }} />
            <FilterList
                selectedFilterId={selectedFilterId}
                setSelectedFilterId={setSelectedFilterId}
                countByFilterType={countByFilterType}
            />
            <CategoryList />
        </div>
    );
}
FilterPanel.propTypes = {
    selectedFilterId: PropTypes.string,
    setSelectedFilterId: PropTypes.func,
    todoList: PropTypes.array,
    searchText: PropTypes.string,
    setSearchText: PropTypes.func,
}
export default FilterPanel;
export const useAppContext = () => {
    return useContext(AppContext)
}