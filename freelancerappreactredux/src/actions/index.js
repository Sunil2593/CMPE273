import * as API from "../Api/api";
import Cookies from 'universal-cookie';

export const loginUser = () => {
    return function (dispatch) {
        try {
            const cookies = new Cookies();
            var cookieArray={username:cookies.get('username'),password:cookies.get('password')}
            API.login(cookieArray)
                .then((response) => {

                    try {
                        dispatch(lodinD(response));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });

        }
        catch (error) {
            console.log(error);
        }
    }
};

export function lodinD(data) {
    return {
        type: 'LOGIN_SUCCESSFULL',
        payload: data.json()
    }
};


export const checklogin = () => {
    return function (dispatch) {
        try {
            API.checklogin()
                .then((response) => {

                    try {
                        dispatch(checkloginUser(response));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });

        }
        catch (error) {
            console.log(error);
        }
    }
};

export function checkloginUser(data) {
    return {
        type: 'CHECKLOGIN_SUCCESSFULL',
        payload: data.json()
    }
};

export const makeBid = (data) => {
    return function (dispatch) {
        try {
            API.makeBid(data)
                .then((response) => {

                    try {
                        dispatch(makeBidValue(response));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });

        }
        catch (error) {
            console.log(error);
        }
    }
};

export function makeBidValue(data) {
    return {
        type: 'BID_SUCCESS',
        payload: data
    }
};

export const logoutUser = () => {
    return function (dispatch) {
        try {
            const cookies = new Cookies();
            var cookieArray={username:cookies.get('username'),password:cookies.get('password')}
            API.logout(cookieArray)
                .then((response) => {

                    try {
                        dispatch(logoutD(response));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });

        }
        catch (error) {
            console.log(error);
        }
    }


};

export function logoutD(data) {
    return {
        type: 'LOGOUT_SUCCESSFULL',
        payload: data
    }
};


export const signupUser = (user) => {
    return function (dispatch) {
        try {
            API.login(user)
                .then((response) => {
                    console.log(response.answer);

                    try {
                        dispatch(signD(response));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });

        }
        catch (error) {
            console.log(error);
        }
    }


};

export function signD(data) {
    return {
        type: 'SIGNUP_SUCCESSFULL',
        payload: data
    }
};



export const displayProjectDetails = (projectId) => {
    return function (dispatch) {
        try {
            API.getSelectedProject(projectId)
                .then((response) => {

                    try {
                        dispatch(selectedProject(response));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });

        }
        catch (error) {
            console.log(error);
        }
    }


};

export function selectedProject(data) {
    return {
        type: 'SELECTED_PROJECT',
        payload: data.result
    }
};


export const getListOfAllBids = (projectId) => {
    return function (dispatch) {
        try {
            API.getListOfAllBids(projectId)
                .then((response) => {

                    try {
                        dispatch(listOfAllBids(response));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });

        }
        catch (error) {
            console.log(error);
        }
    }


};

export function listOfAllBids(data) {
    return {
        type: 'SELECTED_PROJECT_BIDS',
        payload: data.result
    }
};


export const getListOfAllProjectsBidOn = (user_id) => {
    return function (dispatch) {
        try {
            API.getListOfAllProjectsBidOn(user_id)
                .then((response) => {

                    try {
                        dispatch(listOfAllProjectsBidOn(response));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });

        }
        catch (error) {
            console.log(error);
        }
    }


};

export function listOfAllProjectsBidOn(data) {
    return {
        type: 'USER_DASHBOARD_BIDS',
        payload: data.result
    }
};


export const getListOfAllProjectsAsEmployer = (userId) => {
    return function (dispatch) {
        try {
            API.getListOfAllProjectsAsEmployer(userId)
                .then((response) => {

                    try {
                        dispatch(listOfAllProjectsAsEmployer(response));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });

        }
        catch (error) {
            console.log(error);
        }
    }


};

export function listOfAllProjectsAsEmployer(data) {
    return {
        type: 'PROJECTS_EMPLOYER',
        payload: data.result
    }
};


export const displayAllProjects = (userDetails) => {
    return function (dispatch) {
        try {
            API.allProjects(userDetails)
                .then((response) => {

                    try {
                        dispatch(allProjects(response));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });

        }
        catch (error) {
            console.log(error);
        }
    }


};

export function allProjects(data) {
    return {
        type: 'ALL_PROJECTS',
        payload: data.result
    }
};


export const postProjects = (state,file) => {
    return function (dispatch) {
        try {
            API.postProjects(state,file)
                .then((response) => {

                    try {
                        dispatch(postMyProject(response));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });

        }
        catch (error) {
            console.log(error);
        }
    }


};

export function postMyProject(data) {
    return {
        type: 'POST_PROJECT',
        payload: data.result
    }
};


export const updateProfile = (data) => {
    return function (dispatch) {
        try {
            API.updateProfile(data)
                .then((response) => {

                    try {
                        dispatch(updateMyProfile(response));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });

        }
        catch (error) {
            console.log(error);
        }
    }


};

export function updateMyProfile(data) {
    return {
        type: 'UPDATE_PROFILE',
        payload: data.result
    }
};

export const hireFreelancer = (data) => {
    return function (dispatch) {
        try {
            API.hireFreelancer(data)
                .then((response) => {

                    try {
                        dispatch(hireFreelancerD(response));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });

        }
        catch (error) {
            console.log(error);
        }
    }


};

export function hireFreelancerD(data) {
    return {
        type: 'FREELANCER_HIRED',
        payload: data.result
    }
};



