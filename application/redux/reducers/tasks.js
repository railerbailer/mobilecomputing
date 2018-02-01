const defaultState = [
    { id: '1', text: 'Present in mobile computing class', completed: false, date: 'NewDate', deadline: 9999999999999, position: {latitude: 48.3351, longitude: 14.324}, mapVisible: false  },
    { id: '2', text: 'Eat a snack', completed: false, date: 'NewDates', deadline: 9999999999999, position: {latitude: 48.33511, longitude: 14.3241}, mapVisible: true  },
    { id: '3', text: 'Prepare mobile computing presentation ', completed: true, date: 'NewDate', deadline: 9999999999999, position: {latitude: 48.3351, longitude: 14.329}, mapVisible: true  },
    { id: '4', text: 'Book train ticket', completed: false, date: 'NewDate', deadline: 9999999999999, position: {latitude: 48.3358, longitude: 14.321}, mapVisible: true }
];

export default function tasksReducer (state = defaultState, action) {
    switch (action.type) {
        case 'tasks-save-item':
            let idx = state.findIndex(t => t.id === action.item.id);
            if (idx < 0) {
                return [ ...state, action.item ];
            }
            return state.map((t, i) => i === idx ? action.item : t);
        case 'tasks-delete-item':
            return state.filter(t => t.id !== action.id);
        case 'tasks-complete-item':
            return state.map(item => {
                if (item.id === action.id) {
                    item.completed = action.flag;
                }
                return item;
            });
        default:
            return state;
    }
}
