import React, { useContext } from "react";
import FilterBar from "./FilterBar";
import Student from './Student'
import AppContext from '../context/AppContext'

const StudentInfo = () => {
  const { studentData, filteredStudents, tagFilter, studentFilter } = useContext(AppContext)

  
  const studentsToDisplay = (!tagFilter && !studentFilter) ? studentData : filteredStudents

  return (
    <div className="wrapper">
      <div className="filterWrapper">
        <FilterBar filter={'studentFilter'} setFilter={'setStudentFilter'} filterName={'name'}/>
        <FilterBar filter={'tagFilter'} setFilter={'setTagFilter'} filterName={'tag'}/>
      </div>
      {((studentFilter || tagFilter) && filteredStudents.length === 0) ? 
      <p className="noFilterResults">No Filter Results</p> :
      studentsToDisplay.map((student) => {
        return <Student key={Number(student.id)} student={student}/>
      })}
    </div>
  );
};

export default StudentInfo;
