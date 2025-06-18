// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     searchQuery: "",
//     selectedCategories: [],
//     sortByPrice: "",
// };

// const courseSlice = createSlice({
//     name: "course",
//     initialState,
//     reducers: {
//         setSearchQuery: (state, action) => {
//             state.searchQuery = action.payload;
//         },
//         addCategory: (state, action) => {
//             if (!state.selectedCategories.includes(action.payload)) {
//                 state.selectedCategories.push(action.payload);
//             }
//         },
//         removeCategory: (state, action) => {
//             state.selectedCategories = state.selectedCategories.filter(
//                 (category) => category !== action.payload
//             );
//         },
//         setSortByPrice: (state, action) => {
//             state.sortByPrice = action.payload;
//         },
//         clearFilters: (state) => {
//             state.searchQuery = "";
//             state.selectedCategories = [];
//             state.sortByPrice = "";
//         },
//     },
// });

// export const {
//     setSearchQuery,
//     addCategory,
//     removeCategory,
//     setSortByPrice,
//     clearFilters,
// } = courseSlice.actions;

// export default courseSlice.reducer;