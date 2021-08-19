import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './reducers/dataReducer';
import tableReducer from './reducers/tableReducer';

export default configureStore({  
	reducer: {    
		appData: dataReducer,  
		tables: tableReducer,
	},
})


