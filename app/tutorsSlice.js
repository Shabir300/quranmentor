import { createSlice } from '@reduxjs/toolkit';

const tutorsSlice = createSlice({
    name: 'tutors',
    initialState: [],
    reducers: {
        updateVisibleUsersSet: (state, action) => {
            state = action.payload
        }
    }
})

export const {updateVisibleUsersSet} = tutorsSlice.actions
export default tutorsSlice.reducer