import {combineReducers} from 'redux';
import UserReducer from './reducer-projects';
import ActiveUserReducer from './reducer-active-user';
import LoginSignup from './reducer-login-signup';
import SelectedProjectBids from './reducer-selected-project-bids';
import DashboardProjects from './reducer-dashboard-projects-employer';
import DashboardBids from './reducer-user-dashboard-bids';
import UpdateProfile from './reducer-update-profile';


/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    projects: UserReducer,
    selectedproject: ActiveUserReducer,
    loginsigup: LoginSignup,
    selectedprojectbids: SelectedProjectBids,
    dashboardProjects: DashboardProjects,
    dashboardBids: DashboardBids,
    updateProfile: UpdateProfile,
});

export default allReducers


/*
 * All reducers get two parameters passed in, state and action that occurred
 *       > state isn't entire apps state, only the part of state that this reducer is responsible for
 * */

// "state = null" is set so that we don't throw an error when app first boots up




