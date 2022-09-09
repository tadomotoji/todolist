import { useState } from 'react'

function App() {


  
  const [jobsList, setJobsList] = useState(() => {
    const storageJobsList = JSON.parse(localStorage.getItem('jobsList'));
    return storageJobsList ?? []
  });
  const [job, setJob] = useState('');


  const handleAdd = () => {
    setJobsList(prev => {
      const newJobsList = [...prev, job];
      const jsonJobsList = JSON.stringify(newJobsList);
      localStorage.setItem('jobsList',jsonJobsList)
      return newJobsList;
    });
    setJob('')
  }

  const handleDelete = (index) => {
    setJobsList(prev => {
      prev.splice(index,1);
      //console.log(prev);
      localStorage.setItem('jobsList',JSON.stringify(prev));
      return prev
    })
  }

  return (
    <div className="App">
      <ul>
        {jobsList.map((job, index) => <li key={index}>
          {job}
           <button onClick={() => {handleDelete(index)}}>Delete</button>
        </li>)}
      </ul>
      <input value={job} onChange={e => { setJob(e.target.value) }} />
      <button onClick={handleAdd}>Add New Job</button>

    </div>
  );
}

export default App;
