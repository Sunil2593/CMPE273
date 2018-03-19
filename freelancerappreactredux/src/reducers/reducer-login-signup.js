

const initialState = {
    data:'',
    userData:{
        username : '',
        password : '',
        message:'',
        status:'',
        loggedIn : false
    }

};




export default function (state = initialState, action) {


    switch (action.type) {

        case 'LOGIN_SUCCESSFULL':
            localStorage.setItem('user_id',action.payload.result.user_id);
            localStorage.setItem('profile_image',action.payload.result.profile_image);
            localStorage.setItem('name',action.payload.result.name);
            localStorage.setItem('phone_no',action.payload.result.phone_no);
            localStorage.setItem('about_me',action.payload.result.about_me);
            localStorage.setItem('skills',action.payload.result.skills);
            return {
                ...state,
                ...state.userData,
                data:action.payload.result,
                userData:{
                    username:action.payload.username,
                    message:action.payload.answer,
                    status:"loggedIn",
                    loggedIn:true
                }
            };

        case 'SIGNUP_SUCCESSFULL':
            return {
                ...state,
                ...state.userData,
                userData:{
                    message:action.payload.answer,
                    loggedIn:false
                }
            };

        case 'LOGOUT_SUCCESSFULL':
            //localStorage.setItem('loginStatus',action.payload.answer);
            return {
                ...state,
                ...state.userData,
                userData:{
                    message:action.payload.answer,
                    status:action.payload.answer,
                    loggedIn:false
                }
            };
        case 'CHECKLOGIN_SUCCESSFULL':
            return {
                ...state,
                ...state.userData,
                userData:{
                    message:action.payload.answer,
                    loggedIn:false
                }
            };

        default :
            return state;

    }
}