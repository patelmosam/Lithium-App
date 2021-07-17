import { configureStore } from '@reduxjs/toolkit'
import contactReducer from './reducers/contactReducer';
import fieldReducer from './reducers/fieldReducer';

export default configureStore({  
	reducer: {    
		contacts: contactReducer,  
		fields: fieldReducer,
	},
})


