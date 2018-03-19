export default function (state = null, action) {
    switch (action.type) {
        case 'UPDATE_PROFILE':
            return action.payload;
        default :
            return state;
    }

}