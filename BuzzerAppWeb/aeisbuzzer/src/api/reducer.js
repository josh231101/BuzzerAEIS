export const initialState = {
    user : null,
    gameID : null,
}

const reducer = (state, action) => {
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user : action.user,
            }
        case 'SET_GAMEID':
            return {
                ...state,
                gameID : action.gameID,
            }
        default : 
            return state;
    }
}

export default reducer;