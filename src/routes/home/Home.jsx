import "./home.css";

const Home =  () =>{
    return <>
    <div className="mt-7 row3">
  <section className="hoc container clear"> 
      
    <div className="sectiontitle">
      <p className="nospace font-xs">Id erat duis nibh diam at</p>
      <h6 className="heading">Vulputate quis lacus nullam</h6>
    </div>
    <ul id="stats" className="nospace group">
      <li><i className="fas fa-id-badge"></i>
        <p className="success">123</p>
        <p>Augue dui convallis</p>
      </li>
      <li><i className="fas fa-skull"></i>
        <p className="success">1234</p>
        <p>Id ullamcorper</p>
      </li>
      <li><i className="fas fa-umbrella"></i>
        <p className="success">12345</p>
        <p>Malesuada interdum</p>
      </li>
      <li><i className="fas fa-store-alt"></i>
        <p className="success">16789</p>
        <p>Tristique viverra</p>
      </li>
    </ul>
    

  </section>
</div>



<div className="bg-ccc row3 mt-7">
  <section className="hoc container clear"> 
    <div className="sectiontitle">
      <p className="nospace font-xs">Nisl sed blandit iaculis lectus</p>
      <h6 className="heading">Nam et erat nec eros elementum</h6>
    </div>
    <ul className="nospace group latest">
      <li className="one_half first">
        <article>
          <div className="excerpt">
            <ul className="nospace meta">
              <li><i className="fas fa-user"></i> Admin</li>
              <li><i className="fas fa-tag"></i> Category Name</li>
            </ul>
            <h6 className="heading">Gravida integer tristique</h6>
            <p>Dui vel odio proin magna ligula pellentesque eu tincidunt sed ornare tempor nisl in id dui vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec [&hellip;]</p>
            <footer>Read More</footer>
          </div>
          <time  datetime="2045-04-06T08:15+00:00"><strong>06</strong> <em>Apr</em></time>
        </article>
      </li>
      <li className="one_half">
        <article>
          <div className="excerpt">
            <ul className="nospace meta">
              <li><i className="fas fa-user"></i> Admin</li>
              <li><i className="fas fa-tag"></i> Category Name</li>
            </ul>
            <h6 className="heading">Eleifend semper nisl sed</h6>
            <p>Eget lorem in in felis in metus mollis blandit ut eu justo suspendisse semper sem sit amet ligula quisque eget felis eu tortor tristique pharetra praesent turpis pede varius sed [&hellip;]</p>
            <footer>Read More</footer>
          </div>
          <time datetime="2045-04-05T08:15+00:00"><strong>05</strong> <em>Apr</em></time>
        </article>
      </li>
    </ul>
  </section>
</div>
    
    </>
}

export default Home;