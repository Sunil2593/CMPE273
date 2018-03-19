export default function (state = null, action) {
    switch (action.type) {
        case 'USER_DASHBOARD_BIDS':
            return action.payload;
        default :
            return state;
    }
}