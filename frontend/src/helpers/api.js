import {} from "react-router-dom";

export const get = url =>
  new Promise(
    (res, rej) => {
      fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      })
        .then(response => {
          // console.log(response.ok);
          if (response.ok) {
            return response.json()
          } else {
            return
          }
        })
        .then(json => res(json))
    }
  )