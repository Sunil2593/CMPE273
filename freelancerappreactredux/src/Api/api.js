const api =  process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3000'

const headers = {
    'Accept': 'application/json'
};

export const signup = (payload) =>
    fetch(`${api}/myjs/signup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const login = (payload) =>
    fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


/*export const downloadfile = (payload) =>
    axios({
        method: 'post',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        url: `${api}/downloadfile`,
        data: JSON.stringify(payload),
        responseType:'stream'
    })
        .then(function (response) {
            console.log("Payload in download file ", payload)
            return response
        })
        .catch(function (error) {
            console.log("Payload in download file ", payload)
            console.log(error);
        });*/


export const checklogin = (payload) =>
    fetch(`${api}/checklogin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const logout = (payload) =>
    fetch(`${api}/logout`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const allProjects = (userDetails) =>
    fetch(`${api}/allProjects`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const getSelectedProject = (payload) =>
    fetch(`${api}/getSelectedProject`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const getListOfAllBids = (payload) =>
    fetch(`${api}/getListOfAllBids`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getListOfAllProjectsBidOn = (payload) =>
    fetch(`${api}/getListOfAllProjectsBidOn`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getListOfAllProjectsAsEmployer = (payload) =>
    fetch(`${api}/getListOfAllProjectsAsEmployer`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const postProjects = (payload,file) =>
    fetch(`${api}/myjs/postProjects`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'path': file
        },
        body: JSON.stringify(payload),
        file: file
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const updateProfile = (data) =>

    fetch(`${api}/updateProfile`, {
        method: 'POST',
        body: data
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const makeBid = (payload) =>
    fetch(`${api}/makeBid`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const hireFreelancer = (payload) =>
    fetch(`${api}/hireFreelancer`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });




