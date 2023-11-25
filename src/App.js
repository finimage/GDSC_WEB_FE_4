import { useState } from 'react';
import './App.css';

function TodoList() {
  //할 일 list
  const [tasks, setTasks] = useState([]);
  //할 일 입력
  const [task, setTask] = useState('');
  //전체 할 일 수
  const [total, setTotal] = useState(0);
  //한 일 인덱스
  const [delIdx, setDelIdx] = useState(0);
  //우선순위 변경 firstIdx to secondIdx 
  const [firstIdx, setFirstIdx] = useState(0);
  const [secondIdx, setSecondIdx] = useState(0);

  /* 할 일 추가하기 */
  const addTask = () => {
    if (task !== "") {
      setTasks([...tasks, task]);
      setTotal(total + 1);
      setDelIdx(total + 1);
      setTask('');
      setFirstIdx(total + 1);
      setSecondIdx(1);
    }
  }

  /* 할 일 모두 다 지우기 */
  const deleteAllTask = () => {
    setTasks([]);
    setTotal(0);
    setDelIdx(0);
    setFirstIdx(0);
    setSecondIdx(0);
  }

  /* 한 일 지우기 */
  const deleteTask = () => {
    if (delIdx > total || delIdx <= 0) {
      setDelIdx(total);
      alert("존재하지 않는 인덱스입니다!");
    }
    else {
      setTasks(tasks.slice(0, delIdx - 1).concat(tasks.slice(delIdx, total)));
      setTotal(total - 1);
      setDelIdx(total - 1);
      setFirstIdx(total - 1);
      setSecondIdx(1);
    }
  }

  /* 우선순위 변경하기 */
  const query1 = () => {
    if (firstIdx > total || firstIdx <= 0) {
      setFirstIdx(total);
      if (total === 0) setSecondIdx(0);
      else setSecondIdx(1);
      alert("존재하지 않는 인덱스입니다!");
    }
    else if (secondIdx > total || secondIdx <= 0) {
      setFirstIdx(total);
      if (total === 0) setSecondIdx(0);
      else setSecondIdx(1);
      alert("옮길 곳이 존재하지 않습니다!");
    }
    else if (firstIdx > secondIdx) {
      setTasks(tasks.slice(0, secondIdx - 1).concat([tasks[firstIdx - 1]]).concat(tasks.slice(secondIdx - 1, firstIdx - 1)).concat(tasks.slice(firstIdx, total)));
      setFirstIdx(total);
      setSecondIdx(1);
    }
    else if (firstIdx < secondIdx) {
      setTasks(tasks.slice(0, firstIdx - 1).concat(tasks.slice(firstIdx, secondIdx)).concat([tasks[firstIdx - 1]]).concat(tasks.slice(secondIdx, total)));
      setFirstIdx(total);
      setSecondIdx(1);
    }
    else {
      setFirstIdx(total);
      setSecondIdx(1);
    }
  }

  return (
    <div>
      <h1>Todo List</h1>
      <p>할 일 추가하기</p>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)}/>
      <button onClick={addTask}>add task</button>
      <button onClick={deleteAllTask}>delete all task</button>
      <p>한 일 지우기</p>
      <input type="int" value={delIdx} onChange={(e) => setDelIdx(e.target.value)}/>
      <button onClick={deleteTask}>delte task</button>
      <p>우선순위 변경하기</p>
      <input type="int" value={firstIdx} onChange={(e) => setFirstIdx(e.target.value)}/>
      <span> 번째를 </span>
      <input type="int" value={secondIdx} onChange={(e) => setSecondIdx(e.target.value)}/>
      <span> 번째로 </span>
      <button onClick={query1}>바꾸기</button>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            {index + 1}.{t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
