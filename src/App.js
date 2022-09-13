import { useState, useRef, useEffect } from 'react'
import Heading from './components/heading'
function App() {
  const addRef = useRef();
 
  const [jobsList, setJobsList] = useState(() => {
    const storageJobsList = JSON.parse(localStorage.getItem('jobsList'));
    return storageJobsList ?? []
  });

  const [currentIndex,setCurrentIndex] = useState(null);
  const [currentJob, setCurrentJob] = useState('');
  const [job, setJob] = useState('');


  const handleAdd = () => {
    setJobsList(prev => {
      const newJobsList = [...prev, job];
      return newJobsList;
    });
    setJob('')
    addRef.current.focus();
  }

  const handleDelete = (index) => {
    setJobsList(prev => {
      const arr = [...prev];
      arr.splice(index, 1);
      return arr
    })
  }
  const handleEdit = (index) => {
    if (currentIndex !== index)  
    {
      setCurrentIndex(index);
      setCurrentJob(jobsList[index])
    }  
    else
    {
      setCurrentIndex(null);
      setJobsList(prev => {
        const arr = [...prev];
        arr[index]=currentJob;
        return arr
      });
      setCurrentJob('');
    }
  }

  

  
  //update local storage
  useEffect(() => {
    const jsonJobsList = JSON.stringify(jobsList);
    localStorage.setItem('jobsList', jsonJobsList)
  }, [jobsList])


  return (
    <div className="App">
      <Heading/>
      <ul>
        {jobsList.map((job, index) =>
          <li key={index}>
            {index === currentIndex ? <input autoFocus placeholder={job}
            onChange = {e => { setCurrentJob(e.target.value) }}
            ></input> : <span onClick={() => { handleEdit(index) }}>{job}</span>}
            {index === currentIndex ? <button onClick={() => { handleEdit(index) }}>Update</button> :
            <button onClick={() => { handleDelete(index) }}>Delete</button>}
          </li>)}
      </ul>
      <input ref={addRef} value={job} placeholder="add todo job" onChange=
        {e => { setJob(e.target.value) }} />
      <button onClick={handleAdd}>Add New Job</button>

    </div>
  );
}

export default App;
