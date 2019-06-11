const studentDataReducer = (state, action) => {
    switch (action.type) {
        case 'POPULATE_DATA':
            return action.data

        case 'ADD_TAG':
            return state.map(student => {
                if (Number(student.id) === Number(action.id)) {
                    console.log(action)
                    if ('tags' in student) {
                        return {
                            ...student,
                            tags: [
                                ...student.tags,
                                {
                                    tagName: action.tag.tagName,
                                    id: action.tag.id
                                }
                            ]
                        }

                    } else {
                        return {
                            ...student,
                            tags: [{
                                tagName: action.tag.tagName,
                                id: action.tag.id
                            }]
                        }

                    }
                    

                } else {
                    return student
                }



            })

        default:
            return state
    }
}

export default studentDataReducer