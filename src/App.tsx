import React, { useMemo, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type PreparedTodo = Todo & { user: User };

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [showErrors, setShowErrors] = useState(false);

  const users = usersFromServer as User[];

  const preparedTodos = useMemo<PreparedTodo[]>(() => {
    return todos.map(todo => ({
      ...todo,
      user: users.find(u => u.id === todo.userId) as User,
    }));
  }, [todos, users]);

  const maxId = useMemo(
    () => todos.reduce((acc, t) => Math.max(acc, t.id), 0),
    [todos],
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    setShowErrors(true);

    const isTitleValid = title.trim().length > 0;
    const isUserValid = userId !== '';

    if (!isTitleValid || !isUserValid) {
      return;
    }

    // Allow ua/en letters, digits and spaces only
    const sanitizedTitle = title.replace(
      /[^A-Za-z0-9А-ЩЬЮЯЇІЄҐа-щьюяїієґ ]+/g,
      '',
    );

    const newTodo: Todo = {
      id: maxId + 1,
      title: sanitizedTitle,
      userId: Number(userId),
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId('');
    setShowErrors(false);
  };

  const titleError =
    showErrors && title.trim().length === 0 ? 'Please enter a title' : '';
  const userError = showErrors && userId === '' ? 'Please choose a user' : '';

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a todo title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              if (showErrors) {
                // hide errors on change
                if (titleError) {
                  setShowErrors(false);
                }
              }
            }}
          />
          {titleError && <div className="error">{titleError}</div>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(e.target.value);
              if (showErrors) {
                if (userError) {
                  setShowErrors(false);
                }
              }
            }}
          >
            <option value="">Choose a user</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          {userError && <div className="error">{userError}</div>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
