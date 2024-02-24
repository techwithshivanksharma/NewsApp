import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import PropTypes from 'prop-types'



export class News extends Component {

    static defaultProps={
        country:"in",
        pageSize:12,
        category:'general'
    }

    static propTypes={
        country:PropTypes.string,
        category:PropTypes.string
    }

    constructor(props) {
        super(props);
        //console.log("Hello I am A Constructor from News Componenent")
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }

        document.title= `${this.capitalizeFirstLetter(this.props.category)} - NewsHub`  
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }
      
    async componentDidMount() {
        this.props.setProgress(40)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.ReactApiKey}&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false })
        this.props.setProgress(100)
    }

    handlePrevClick = async () => {
        //console.log("Previous")
        this.props.setProgress(40)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.ReactApiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading:false
        })
        this.props.setProgress(100)
    }

    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
            //console.log("Next")
            this.props.setProgress(40)
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.ReactApiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            this.setState({loading:true})
            let data = await fetch(url)
            let parsedData = await data.json()
            this.setState({loading:false})
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
            this.props.setProgress(100)
        }
        else {
           
        }

    }

    render() {
        return (
            <div className='container'>
            <div className='my-3'>
                <h2 className='text-center' style={{margin:'30px 0px'}}>NewsHub - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h2>
                {this.state.loading && <Loading/>}   
                <div className='row'>
                    {!this.state.loading && this.state.articles.map((element,index) => {
                        return <div className='col-sm-6 col-md-4 col-lg-4 col-xl-3' key={index}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 87) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://www.investors.com/wp-content/uploads/2023/02/Stock-robinhood-ApFeather-shutter.jpg"} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt}/>
                        </div>
                    })}
                </div>
                <div className='container d-flex justify-content-between my-3'>
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-success" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-success" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
            </div>
        )
    }
}

export default News
