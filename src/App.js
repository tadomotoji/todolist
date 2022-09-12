import { useState, useRef, useEffect } from 'react'

function App() {
  const addRef = useRef();


  const [jobsList, setJobsList] = useState(() => {
    const storageJobsList = JSON.parse(localStorage.getItem('jobsList'));
    return storageJobsList ?? []
  });
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

  }

  //update local storage
  useEffect(() => {
    const jsonJobsList = JSON.stringify(jobsList);
    localStorage.setItem('jobsList', jsonJobsList)
  }, [jobsList])


  return (
    <div className="App">
      <ul>
        {jobsList.map((job, index) =>
          <li key={index}>
            {job}
            <button onClick={() => { handleEdit(index) }}>Edit</button>
            <button onClick={() => { handleDelete(index) }}>Delete</button>
          </li>)}
      </ul>
      <input ref={addRef} value={job} placeholder="add todo job" onChange=
        {e => { setJob(e.target.value) }} />
      <button onClick={handleAdd}>Add New Job</button>

    </div>
  );
}

export default App;
