export const authReducer=(
    state={name:"juli",role:"seller"},
    action
)=>{
    switch(action.type){
        case "LOGGEd_IN_USER":
            return {...state, ...action.payload};
        case "LOGOUT":
            return action.payload;
        default:
            return state;
    }
}