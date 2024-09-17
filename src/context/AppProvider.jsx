import { createContext, useState } from 'react';
import PropTypes from 'prop-types'
export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedFilterId, setSelectedFilterId] = useState("all");
    const [searchText, setSearchText] = useState("");
    const [todoList, setTodoList] = useState([
        {
            id: '1',
            name: "Đi học bài",
            isImportant: true,
            isCompleted: true,
            isDeleted: false,
            category: 'company'
        },

        {
            id: '2',
            name: "Đi tập thể dục",
            isImportant: true,
            isCompleted: false,
            isDeleted: false,
            category: 'travel'
        },
        {
            id: '3',
            name: "Đi chơi với người yêu ",
            isImportant: false,
            isCompleted: true,
            isDeleted: false,
            category: 'personal'
        },
        {
            id: ' 4',
            name: "Đi xem phim  ",
            isImportant: false,
            isCompleted: true,
            isDeleted: false,
            category: 'idea'
        },
    ]);

    return (
        <AppContext.Provider value={{ selectedCategoryId, setSelectedCategoryId, todoList, setTodoList, searchText, selectedFilterId, setSearchText, setSelectedFilterId }}>
            {children}
        </AppContext.Provider>
    );
};
AppProvider.propTypes = {
    children: PropTypes.element.isRequired,
}
export default AppProvider;