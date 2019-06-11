import React, {useContext} from 'react';
import AppContext from '../context/AppContext'

const FilterBar = ({ filter, setFilter, filterName }) => {
    
    const { [filter]: userFilter, [setFilter]: setUserFilter } = useContext(AppContext)

    const onUserFilterChange = e => {
        setUserFilter(e.target.value)
        
    }


    return (
        <div className="filterBar">
            <form action="" name='filterBarForm' id='filterBarForm' className="filterBarForm">
                <label htmlFor="filterInput" className="visuallyHidden">Filter by {filterName}</label>
                <input 
                type="text" 
                name="filterInput" 
                id="filterInput"
                className="filterInput" 
                placeholder={'Filter by ' + filterName}
                value={userFilter}
                onChange={onUserFilterChange}
                />
            </form>
        </div>
    );
};

export default FilterBar;