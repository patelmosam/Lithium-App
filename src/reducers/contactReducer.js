import { createSlice } from '@reduxjs/toolkit'
import { InsertData, DeleteData, updateData } from '../shared/database';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { 
    contact: []
  },
  reducers: {
    contactsInit: (state, action) => {
        // console.log(action.payload)
        state.contact = []
        action.payload.map((contact) => {
            state.contact.push(contact);
        })
    },
    contactAdded: (state, action) => {
        // console.log(action.payload)
        
        InsertData(action.payload);
        let newId = 1;
        if (state.contact.length > 0){
            newId = state.contact[state.contact.length - 1].id + 1;
        }
        state.contact.push({...action.payload, id: newId});
    },
    contactDelete: (state, action) => {
        DeleteData(action.payload);

        if (state.contact.length > 0) {
            let newList = state.contact.filter(data => {
                if (data.id === action.payload)
                  return false
                else
                  return true
            })
        state.contact = newList;
        }
    },
    contactUpdate: (state, action) => {
        updateData(action.payload);

        if (state.contact.length > 0) {
            let newList = state.contact.map(data => {
              if (data.id === action.payload.id)
                return action.payload
              else
                return data
            })
        state.contact = newList;
        }
    }
}})

export const { contactAdded, contactsInit, contactDelete, contactUpdate } = contactsSlice.actions
export const selectContacts = state => state.contacts.contact;
export default contactsSlice.reducer
