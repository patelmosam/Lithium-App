import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './reducers/dataReducer';
import fieldReducer from './reducers/fieldReducer';

export default configureStore({  
	reducer: {    
		appData: dataReducer,  
		fields: fieldReducer,
	},
})


