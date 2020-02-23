import { connect } from 'react-redux';
import News from './News';
import {updateCurrentNewsSearchCreator, searchNewsCreator} from '../redux/news-reducer';

const mapStateToProps = (state) => {
    return {
        topics: state.newsPage.topics,
        currentNewsSearch: state.newsPage.currentNewsSearch
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNews: (body) => {dispatch(updateCurrentNewsSearchCreator(body))},
        searchNews: () => {dispatch(searchNewsCreator())}
    }
}

const newsContainer = connect(mapStateToProps, mapDispatchToProps)(News);

export default newsContainer;