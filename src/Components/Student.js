import React, {useState, useEffect, useContext} from 'react'
import uuid from 'uuid/v4' 
import AppContext from '../context/AppContext'


const Student = ({ student }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    // const [tagList, setTagList] = useState([])
    const [tagName, setTagName] = useState('')
    const [currentStudent, setCurrentStudent] = useState({})

    const { studentDataDispatch, studentData} = useContext(AppContext)


    const getStudentAverage = () => {

      if (currentStudent.grades) {
        return currentStudent.grades.reduce((acc, curr) => acc + Number(curr), 0) /
         currentStudent.grades.length;

      }

    }

    const handleShowExpandedView = () => {
        setIsExpanded(true)
    }

    const handleHideExpandedView = () => {
        setIsExpanded(false)
    }

    const handleAddTagSubmit = (e) => {
        e.preventDefault()
        
        if (tagName) {
        studentDataDispatch({type: 'ADD_TAG', id: currentStudent.id, tag: {tagName, id: uuid()}})
        
        setTagName('')
    }
  }

// Get only the current student from the global studentData array
    useEffect(() => {
      const getCurrentStudent = studentData.filter(element => {
        return Number(element.id) === Number(student.id)
      })
      
      setCurrentStudent(getCurrentStudent[0])

    }, [student.id, studentData])

  
      
    return (
      <div className="studentContainer">
          <div  className="studentProfile">
            <div className="studentImageSection">
              <img
                src={currentStudent.pic}
                alt={currentStudent.firstName + " " + currentStudent.lastName}
              />
            </div>
            <div className="studentInfoSection">
              <h2>
                {currentStudent.firstName} {currentStudent.lastName}
              </h2>
              <p>Email: {currentStudent.email}</p>
              <p>Company: {currentStudent.company}</p>
              <p>Skill: {currentStudent.skill}</p>
              <p>Average: {getStudentAverage()}%</p>
                    {isExpanded ? <span className="hide" onClick={handleHideExpandedView}>-</span> : <span className="show" onClick={handleShowExpandedView} >+</span>}
            
            </div>
            
          </div>
          {/* Only show this section when user clicks to expand. Could have added this as a property on the student itself so the it would persist across filters but was late enough submitting this as it is */}
            {isExpanded &&
            <div className="expandedSection">
                <ul>
                    {currentStudent.grades.map((grade, index) => {
                        return (
                            <li key={index}>
                                <span className="testName">Test {index + 1}:</span>
                                <span className="grade">{grade}%</span>
                            </li>
                        )
                    })}
                </ul>
                <div className="tags">
                    {'tags' in currentStudent && currentStudent.tags.map((tag) => {
                        return <span key={tag.id} className="tag">{tag.tagName}</span>
                    })}
                </div>
                <form name="addTagForm" id="addTagForm" className="addTagForm" onSubmit={handleAddTagSubmit}>
                    <input 
                    type="text" 
                    name="addTagInput" 
                    id="addTagInput" 
                    className='addTagInput' 
                    placeholder="Add tag"
                    value={tagName}
                    onChange={(e) => {setTagName(e.target.value)}}
                    />
                </form>
            </div>
            }
      
      </div>
    );
};

  export default Student