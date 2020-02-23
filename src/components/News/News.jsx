import React from 'react';
import classes from './News.module.css';
import Topic from './Topic';

const News = (props) => {
    let newsBlock = props.topics.map(t =>
        <Topic key={t.id} topic={t.topic} id={t.id} />);

    let currentNewsSearch = props.currentNewsSearch;

    let onCurrentNewsChange = (e) => {
        let body = e.target.value;
        props.updateNews(body);
    }

    let onSearchNewsClick = () => {
        props.searchNews();
    }

    return (
        <div>
            <div className={classes.searchBlock}>
                <div>
                    <textarea placeholder='What news do you want to read?'
                    value={currentNewsSearch}
                    onChange={onCurrentNewsChange}></textarea>
                </div>
                <div>
                    <button onClick={onSearchNewsClick}>Search</button>
                </div>
            </div>
            <div>
                {newsBlock}
            </div>
        </div>
    )
}

export default News;