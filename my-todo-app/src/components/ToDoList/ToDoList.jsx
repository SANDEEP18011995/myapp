import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

const ToDoList = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todoLists'), (snapshot) => {
      setLists(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe;
  }, []);

  const createList = async () => {
    if (newListName.trim()) {
      await addDoc(collection(db, 'todoLists'), { name: newListName });
      setNewListName('');
    }
  };

  return (
    <div>
      <h2>To-Do Lists</h2>
      <input
        type="text"
        placeholder="New List Name"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
      />
      <button onClick={createList}>Create List</button>
      <div>
        {lists.map((list) => (
          <div key={list.id}>
            <h3>{list.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
