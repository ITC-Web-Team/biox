import React from 'react';
import './Blog.css';

function Blog() {
    return (
        <div className="blog-page">
            <div className="blog-hero">
                <h1 className="blog-title">BioX Blog</h1>
                <p className="blog-subtitle">Insights, Updates, and Stories from the BioX Community</p>
            </div>
            
            <div className="blog-container">
                <div className="blog-content">
                    <div className="coming-soon">
                        <h2>Coming Soon!</h2>
                        <p>We're working on bringing you exciting blog content about biotechnology, innovation, and our community activities.</p>
                        <p>Stay tuned for:</p>
                        <ul>
                            <li>Latest research insights</li>
                            <li>Event highlights and recaps</li>
                            <li>Member spotlights and interviews</li>
                            <li>Industry trends and analysis</li>
                            <li>Project showcases</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;