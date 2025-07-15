import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    transaction: {
        transactionDate: '',
        type: '',
        categoryId: '',
        comment: '',
        amount: 0,
    },
    isEditModalOpen: false,
    isAddModalOpen: false,
    editId: '',
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        takeTransactionData: (state, { payload }) => {
            state.transaction = payload;
        },
        openEditModal: state => {
            state.isEditModalOpen = true;
        },
        closeEditModal: state => {
            state.isEditModalOpen = false;
        },
        openAddModal: state => {
            state.isAddModalOpen = true;
        },
        closeAddModal: state => {
            state.isAddModalOpen = false;
        },
        setEditID: (state, { payload }) => {
            state.editId = payload;
        },
        addEditId: (state, { payload }) => {
            state.isEditId = payload;
        },
    },
});

export const {
    takeTransactionData,
    openEditModal,
    closeEditModal,
    openAddModal,
    closeAddModal,
    setEditID,
    addEditId,
} = modalsSlice.actions;

export const selectTransaction = state => state.modals.transaction;
export const selectIsEditModalOpen = state => state.modals.isEditModalOpen;
export const selectIsAddModalOpen = state => state.modals.isAddModalOpen;
export const selectIsEditID = state => state.modals.editId;

export const modalsReducer = modalsSlice.reducer;
