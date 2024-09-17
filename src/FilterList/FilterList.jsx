import PropTypes from 'prop-types'
import "./FilterList.css"
const FilterList = ({ selectedFilterId, setSelectedFilterId, countByFilterType = {} }) => {
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
    return (
        <div>
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
                            <p>{countByFilterType[item.id]}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
FilterList.propTypes = {
    selectedFilterId: PropTypes.string.isRequired,
    setSelectedFilterId: PropTypes.func.isRequired,
    countByFilterType: PropTypes.objectOf(PropTypes.number).isRequired,
}
export default FilterList