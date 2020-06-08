const SEND_MESSAGE = 'SEND-MESSAGE';

export type dialogType = {
    id: number
    name: string
}
export type messageType = {
    id: number
    message: string
}

let initialState = {
    dialogs: [
        { id: 1, name: 'Artem' },
        { id: 2, name: 'Nikita' },
        { id: 3, name: 'Igor' },
        { id: 4, name: 'Valera' },
        { id: 5, name: 'Vova' }
    ] as  Array<dialogType>,

    messages: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'Hi' },
        { id: 3, message: 'How is your react?' },
        { id: 4, message: 'Good morning!' },
        { id: 5, message: 'Yo' }
    ] as Array<messageType>
}

export type initialStateDialogsType = typeof initialState;

const dialogsReducer = (state = initialState, action: any): initialStateDialogsType => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: body }],
            }
        }
        default: return state;
    }
};

export type sendMessageActionCreatorType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): sendMessageActionCreatorType => ({ type: SEND_MESSAGE, newMessageBody }) ;//dialogs message
export default dialogsReducer;