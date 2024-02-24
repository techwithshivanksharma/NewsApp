import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,description,imageUrl,newsUrl,author,publishedAt}= this.props;
        return (
            <div>
                <div className="card  my-3">
                    <img src={imageUrl} height="200px" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} On {new Date(publishedAt).toGMTString()}</small></p>
                            <a href={newsUrl} className="btn btn-sm btn-primary">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
