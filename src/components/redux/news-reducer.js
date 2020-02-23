const SEARCH_NEWS = 'SEARCH-NEWS';
const UPDATE_CURRENT_NEWS_SEARCH = 'UPDATE-CURRENT-NEWS-SEARCH';

let initialState = {
    topics: [
        { id: '1', topic: 'Sport' },
        { id: '2', topic: 'Travel' },
        { id: '3', topic: 'Money' },
        { id: '4', topic: 'Cars' },
        { id: '5', topic: 'People' },
        { id: '6', topic: 'Lifestyle' }
    ],

    currentNewsSearch: ''
}

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_NEWS_SEARCH: {
            return {
                ...state,
                currentNewsSearch: action.news
            };
        }
        case SEARCH_NEWS: {
            let news = state.currentNewsSearch;
            return {
                ...state,
                currentNewsSearch: '',
                topics: [...state.topics, { id: 7, topic: news }]
            };
        }
        default:
            return state;
    }
}

export const updateCurrentNewsSearchCreator = (news) => ({ type: UPDATE_CURRENT_NEWS_SEARCH, news }) //current news
export const searchNewsCreator = () => ({ type: SEARCH_NEWS }) //current news

export default newsReducer;