const defaultState = [
    { id: '1', text: 'First Item', completed: false, date: 'NewDate', deadline: new Date() },
    { id: '2', text: 'Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item Second item ', completed: false, date: 'NewDate', deadline: 5 },
    { id: '3', text: 'Third Item', completed: true, date: 'NewDate', deadline: 1 }
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
