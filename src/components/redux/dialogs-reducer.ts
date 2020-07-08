import { InferActionsType } from "./redux-store";

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

const dialogsReducer = (state = initialState, action: ActionsType): initialStateDialogsType => {
    switch (action.type) {
        case 'SEND-MESSAGE': {
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, { id: 6, message: body }]
            }
        }
        default: return state;
    }
};

export const actions = {
    sendMessage: (newMessageBody: string) => ({ type: 'SEND-MESSAGE', newMessageBody } as const)
};

type ActionsType = InferActionsType<typeof actions>

export default dialogsReducer;