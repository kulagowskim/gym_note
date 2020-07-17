import React, { useState } from 'react';

function CreateUser() {
  const [username, setUsername] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // const user = {
    //   username
    // }

    // axios.post('http://localhost:9000/users/add', user)
    //   .then(res => console.log(res.data));
  
    setUsername("");
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            required
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div>
          <input type="submit" value="Create User" />
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
