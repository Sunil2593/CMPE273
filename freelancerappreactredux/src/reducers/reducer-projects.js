/*
 * The users reducer will always return an array of users no matter what
 * You need to return something, so if there are no users then just return an empty array
 * */

export default function (state = null, action) {
    switch (action.type) {
        case 'ALL_PROJECTS':
            return action.payload;
        default :
            return state;
    }

}
