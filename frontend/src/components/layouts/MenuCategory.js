import React from 'react'

const MenuCategory = () => {
    const categories = [
        'Electronic',
        'Camera',
        'Laptop',
        'MobilePhone',
        'Food',
        'Book'
    ]
    return (   
        <section id="menu">
          <div className="container">
            <div className="menu-area">
              
              <div className="navbar navbar-default" role="navigation">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>          
                </div>
                <div className="navbar-collapse collapse">
                  
                  <ul className="nav navbar-nav">
                  {categories.map(category => (
                        <li><a href="index.html">{category}</a></li>
                    ))}
            
                  </ul>
                </div>
              </div>
            </div>       
          </div>
        </section>      
    )
}

export default MenuCategory
