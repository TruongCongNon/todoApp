import { useContext, useMemo } from "react";
import "../../constants/constant.js";
import { CATEGORY_ITEMS } from "../../constants/constant.js";
import { AppContext } from "../../context/AppProvider.jsx";
import "./CategoryList.css";
import PropTypes from 'prop-types'

const CategoryList = ({ todoList }) => {
  const { selectedCategoryId, setSelectedCategoryId } = useContext(AppContext);

  const countByCategory = useMemo(() => {
    return todoList.reduce((acc, cur) => {
      return {
        ...acc,
        [cur.category]: (acc[cur.category] || 0) + 1
      };
    }, {
      personal: 0,
      company: 0,
      idea: 0,
      travel: 0
    });
  }, [todoList]);

  console.log(countByCategory);

  return (
    <div>
      <p>Categories</p>
      <div className="categories-container">
        {CATEGORY_ITEMS.map((category) => (
          <div
            className={`categories-items ${category.id === selectedCategoryId ? "selected" : ''}`}
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            <p className="categories-name">{category.label}</p>
            <p>{countByCategory[category.id] || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

CategoryList.propTypes = {
  todoList: PropTypes.array.isRequired,
};

export default CategoryList;
