const loginService = async (user) => {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "userName": user.userName,
    "password": user.password
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  let res;

  await fetch("http://localhost:7002/api/auth/login", requestOptions)
    .then(response => response.text())
    .then(result => res = result)
    .catch(error => alert('error', error));
  var a = JSON.parse(res).message
  return new Promise((resolve, reject) => {
    resolve({
      loginStatus: a !== 'Unauthorized' ? "ok" : "unknown",
      data: { id: user.password, name: user.userName, userToken: a }
    })
  });
};

const registerService = (user) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(user),
    redirect: 'follow'
  };
  fetch("http://localhost:7002/api/auth/register", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  return new Promise((resolve, reject) => {

    resolve({
      loginStatus: "ok",
      data: { id: "1234", name: "David", userToken: "ABCDEFG1234" },
    });
  });

};
const DeleteFromCart = (id) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "id": id
  }
  )
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://localhost:7002/api/cart", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

const addToCart = (prod) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "productId": prod._id
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:7002/api/cart", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

const getAllCartApi = async () => {
  var myHeaders = new Headers();
  var res;
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: "follow"
  };

  await fetch("http://localhost:7002/api/cart", requestOptions)

    .then(response => response.text())
    .then(result => {
      let d = JSON.parse(result)
      res = d
    })
    .catch(error => console.log('error', error));
  return res
}

const getAllProductApi = async () => {
  var myHeaders = new Headers();
  var res;
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: "follow"
  };

  await fetch("http://localhost:7002/api/prod", requestOptions)

    .then(response => response.text())
    .then(result => {
      let d = JSON.parse(result)
      res = d
    })
    .catch(error => console.log('error', error));
  return res
}


const deleteProdApi = (_id) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "_id": _id
  });

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:7002/api/prod", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}

const updateApi = (p, name, price, description, image) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "id": p._id,
    "name": name,
    "price": price,
    "description": description,
    "image": image
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:7002/api/prod", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  //navigate(`/maneger`)
}

function AddApi(name, price, description, image) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  fetch('http://localhost:7002/api/prod',
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({ name: name, price: price, description: description, image: image })
    })
    .then(result => {
      //alert("המוצר נוסף בהצלחה")
      //navigate(`/maneger`)
    }
    )
    .catch(err => {
      console.log(err);
    })
}

const addProdCartApi = (id) => {
  debugger
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "id": id
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:7002/api/cart/add", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

const downProdCartApi = (id) => {
  debugger
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("userToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "id": id
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:7002/api/cart/down", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
module.exports = { loginService, registerService, DeleteFromCart, addToCart, getAllCartApi, deleteProdApi, updateApi, AddApi, addProdCartApi, downProdCartApi,getAllProductApi };
