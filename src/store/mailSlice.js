
import { createSlice} from "@reduxjs/toolkit";

const iniState={allMails:[]}
const mailSlice=createSlice({
    name:'allmails',
    initialState:iniState,
    reducers:{
        setMailArr(state,action){
            state.allMails=action.payload
        }
    }
})

export default mailSlice.reducer
export const mailArrActions=mailSlice.actions

