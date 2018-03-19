export default function (state = null, action) {
    switch (action.type) {
        case 'PROJECTS_EMPLOYER':
            return action.payload;
        default :
            return state;
    }
}