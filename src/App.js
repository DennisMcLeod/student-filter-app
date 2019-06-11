import React, {useState, useEffect, useReducer} from 'react';
import './App.css';
import StudentList from './Components/StudentList'
import AppContext from './context/AppContext'
import studentDataReducer from './reducers/studentDataReducer'


function App() {
  const [filteredStudents, setFilteredStudents] = useState([])
  const [studentData, studentDataDispatch] = useReducer(studentDataReducer, [])
  const [studentFilter, setStudentFilter] = useState('')
  const [tagFilter, setTagFilter] = useState('')


  // Filter students by both first/last name and tags
  useEffect(() => {

    // Set up regular expressions to use to filter the studentData. Error handling for input that end in a \
    const studentFilterRegEx = studentFilter[studentFilter.length - 1] !== '\\' ? new RegExp(studentFilter, 'i') : ''
    const tagFilterRegEx = tagFilter[tagFilter.length - 1] !== '\\' ? new RegExp(tagFilter, 'i') : ''

    // Filter students based on user inputs
    const filteredStudents = 
    studentData
      .filter(student => {
        return student.firstName.match(studentFilterRegEx) || student.lastName.match(studentFilterRegEx) 
      })
      .filter(student => {
        if (!tagFilter) return true
        
        if (!('tags' in student)) return false

        return student.tags.find(tag => {
          return tag.tagName.match(tagFilterRegEx)
        })



      })
      
    setFilteredStudents(filteredStudents)


  }, [tagFilter, studentFilter, studentData])

 
  // Get student data from API request and populate state
  useEffect(() => {
    // Data has been saved locally in order to preserve anonymity of the API provider
    
    // const getStudentData = async () => {
    //   const response = await fetch(
    //     "API_URL_HERE"
    //   ).then(response => response.json());

    //   const data = await response.students

      
    //   studentDataDispatch({type: 'POPULATE_DATA', data})
    // };

    // getStudentData();

    const getData = require('./data/students.json')

    const data = getData.students

    studentDataDispatch({type: 'POPULATE_DATA', data})
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={ {filteredStudents, studentData, studentFilter, setStudentFilter, tagFilter, setTagFilter, studentDataDispatch }}>
        <StudentList />
      </AppContext.Provider>
    </div>
  );
}

export default App;
