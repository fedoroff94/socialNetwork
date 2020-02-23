import profileReducer from "./profile-reducer";
import dialogsReducer from './dialogs-reducer';
import newsReducer from './news-reducer';
import sidebarReducer from './sidebar-reducer';

let store = {
    _state: {

        profilePage: {
            posts: [
                { id: '1', message: 'Hi, how are you?', likesCount: '12', dislikesCount: '3' },
                { id: '2', message: 'It is my first post', likesCount: '11', dislikesCount: '4' },
            ],
            newPostText: 'it-kamasutra'
        },

        dialogsPage: {

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
            ],

            newMessageBody: ''
        },

        newsPage: {
            topics: [
                { id: '1', topic: 'Sport' },
                { id: '2', topic: 'Travel' },
                { id: '3', topic: 'Money' },
                { id: '4', topic: 'Cars' },
                { id: '5', topic: 'People' },
                { id: '6', topic: 'Lifestyle' }
            ],
            
            currentNewsSearch: ''
        },

        sidebar: {

        }


    },
    
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    getState() {
        return this._state;
    },

    dispatch(action) { 

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    this._state.newsReducer = newsReducer(this._state.newsReducer, action);

    this._callSubscriber(this._state);

    }

}

window.store = store;
export default store;