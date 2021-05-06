import React from 'react';

function LinkGithub() {
    return (

      <div>
      <br />
      <br />
      <br />
      <h1 className="has-text-centered">Testing</h1>
       	<div className="has-text-centered">
       		<a href="https://github.com/scbonner" style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-10px">
       		</a>

       		{/* <a href="mailto:info@nlbm.com">scbonner2015@gmail.com" style= {{ color: `black`, padding: `5px`, }} className=-"fa fa-envelope-o fa-10px"></a> */}
             {/* <i style= {{ color: `orange`, padding: `5px`, }} className="fab fa-github-square fa-10px"></i> */}
      	<div class="elementor-widget-container">
			<ul class="elementor-icon-list-items">
				<li class="elementor-icon-list-item">
					<span class="elementor-icon-list-icon">
						<i class="fa fa-phone" aria-hidden="true"></i>
					</span>
					<span class="elementor-icon-list-text">Phone: <a href="tel:8162211920">816-221-1920</a></span>
				</li>
				<li class="elementor-icon-list-item">
					<span class="elementor-icon-list-icon">
						<i class="fa fa-fax" aria-hidden="true"></i></span>
					<span class="elementor-icon-list-text">Fax: 816-221-8424</span>
				</li>
				<li class="elementor-icon-list-item">
					<span class="elementor-icon-list-icon">
						<a href="https://github.com/scbonner/devedit" style= {{ color: `black`, padding: `5px`, }} className="fab fa-github-square fa-10px">
						</a></span>
	
				</li>
				<li class="elementor-icon-list-item">
					<span class="elementor-icon-list-icon">
					<i class="fa fa-envelope-o" aria-hidden="true"></i></span>
					<a href='mailto: scbonner2015@gmail.com'> 
					{/* style= {{ color: `black`, padding: `5px`, }} className="fa fa-envelope-o-10px"> */}
						</a>
				</li>
			</ul>
		
		</div>
		</div>
		</div>
    

	)
};

export default LinkGithub;