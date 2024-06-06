import React from 'react'
const NewsItem = (props) => {
    let {title,description,imageUrl,newsUrl,author,date,source} = props;
    return (
      <div>
        <div className="card">
            <div style={{display:'flex',
              justifyContent:'flex-end',
              position:'absolute',
              right:'0'
            }}>
            <span class="badge rounded-pill bg-danger">{source}</span>
            </div>
            <img src={!imageUrl?"https://www.reuters.com/resizer/v2/G2GUF5FCK5O6PJANOWZPF5MIMY.jpg?auth=aa1791cdc0ac5f9b9e0e18f4433e0021d6d68bf3f3d28503fd330c0562142b9c&height=1005&width=1920&quality=80&smart=true":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}....</h5>
                <p className="card-text">{description}....</p>
                <small className="text-body-secondary">by {!author?"unknown":author} on {new Date(date).toGMTString()}</small><br/>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a><br/>
                
            </div>
        </div>
      </div>
    )
}
export default NewsItem