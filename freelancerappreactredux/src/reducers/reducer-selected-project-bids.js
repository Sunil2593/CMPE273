export default function (state = null, action) {
    switch (action.type) {
        case 'SELECTED_PROJECT_BIDS':
            return action.payload;
        default :
            return state;
    }
}