const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        { id: '1', name: 'Artem' },
        { id: '2', name: 'Nikita' },
        { id: '3', name: 'Igor' },
        { id: '4', name: 'Valera' },
        { id: '5', name: 'Vova' }
    ],

    messages: [
        { id: '1', message: 'Hello' },
        { id: '2', message: 'Hi' },
        { id: '3', message: 'How is your react?' },
        { id: '4', message: 'Good morning!' },
        { id: '5', message: 'Yo' }
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: body }]
            }
        }
        default: return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody }) //dialogs message

export default dialogsReducer;