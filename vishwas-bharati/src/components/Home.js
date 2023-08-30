import React from 'react';
import '../styles/style.scss'
import { Link } from 'react-router-dom';
import TypeText from './TypeText';
import Slider from "react-slick";

const Home = () => {

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    return (
        <div className='home-wrap'>
            <div className='home-innerwrap'>
                <div className='hero-banner'>
                    <Slider {...sliderSettings}>
                        <div><img src='banner.jpg' alt='couple' /></div>
                        <div><img src='banner2.jpg' alt='couple' /></div>
                        <div><img src='banner5.jpg' alt='couple' /></div>
                    </Slider>
                </div>
                <div className='support-txt'>
                    <div>
                        <img width="50" height="50" src="https://img.icons8.com/serif/64/experimental-left-up2-serif.png" alt="experimental-left-up2-serif"/>
                        <p>That's Us!</p>
                    </div>
                </div>
            </div>
            <div className='gtng-mrd' id='invite-rsvp'>
                <div className='gtng-mrd-innerwrap'>
                    <h2>And we are getting married!</h2>
                    <div className='dt-dtls'>
                        <div>
                            <h3>September</h3>
                            <h3>24, 2023</h3>
                        </div>
                        <div className='line'></div>
                        <div>
                            <h3>Mumbai</h3>
                            <h3>Maharashtra</h3>
                        </div>
                    </div>
                    <div className='dtls-wrap grid'>
                        <div>
                            <h4>Sangeet</h4>
                            <p className='time'>6:00 PM onwards</p>
                            <p className='attir'><span>Friday, Sep 22</span></p>
                        </div>
                        <div>
                            <h4>Haldi</h4>
                            <p className='time'>7:00 PM onwards</p>
                            <p className='attir'><span>Saturday, Sep 23</span></p>
                        </div>
                    </div>
                    <Link to='/rsvp' reloadDocument className='rsvp-lnk'>RSVP</Link>
                </div>
            </div>
            <div className='prtnr-wrap'>
                <div className='prtnt-innerwrap grid'>
                    <img src='jwm.png' alt='jab-we-met' className='jwm-img' />
                    <h5>We choose our partners because they represent the unfinished business from our childhood. <br/> And we choose them because they manifest the qualities we wish we had.</h5>
                    <TypeText/>
                    <img src='couple.jpg' alt='couple' className='couple-img' />
                    <div className='txt-wrap'>
                        <p className='txt'>It all began in the year <span className='lrg-txt'>2017</span> when <strong>Vishwas</strong> <img width="25" height="25" src="https://img.icons8.com/emoji/48/boy-medium-dark-skin-tone.png" alt="boy-medium-dark-skin-tone"/> and <strong>Bharati</strong> <img width="25" height="25" src="https://img.icons8.com/doodle/48/girl.png" alt="girl"/> embarked on a daring adventure, leaving behind their familiar lives to seek new beginnings in a foreign land. With hearts filled with hope and dreams <img width="25" height="25" src="https://img.icons8.com/clouds/100/like--v1.png" alt="like--v1"/>, they set foot in this unfamiliar territory, eager to carve out a place they could call home.
                        <img width="100" height="100" src="https://img.icons8.com/clouds/100/cn-tower.png" alt="cn-tower" className='ct-img'/></p>
                        <p className='txt'>As fate would have it, their paths intertwined, and they found <span className='lrg-txt'>solace</span> in each other's company. Through the challenges of settling into a new country, they discovered a sanctuary within their relationship — a home that transcended geographical boundaries. <img width="25" height="25" src="https://img.icons8.com/bubbles/100/home.png" alt="home"/></p>
                        <p className='txt'>For <span className='lrg-txt'>five years</span>, they stood side by side, navigating the ebbs and flows of life as a united front. Together, they weathered the storms <img width="25" height="25" src="https://img.icons8.com/doodle/48/cloud-lighting.png" alt="cloud-lighting"/> that tested their commitment, persevering through the <span className='lrg-txt'>trials</span> that life threw their way. Through thick and thin, their love only grew stronger, <img width="25" height="25" src="https://img.icons8.com/emoji/48/face-holding-back-tears-emoji.png" alt="face-holding-back-tears-emoji"/> fortified by the shared experiences and unwavering support they offered one another.</p>
                        <p className='txt supp'> <span className='lrg-txt'>And now...</span></p> 
                        <p className='txt'>after what felt like an eternity, the moment had arrived—the crossroad where they stood, ready to embark on the <span className='lrg-txt'></span>next chapter of their lives together. The question hung in the air <img width="25" height="25" src="https://img.icons8.com/emoji/48/question-mark-emoji.png" alt="question-mark-emoji"/>, pulsating with anticipation: were they prepared to take the leap of faith and intertwine their destinies <span className='lrg-txt'>forever?</span> The resounding answer within their hearts was a resolute "yes." <img width="64" height="64" src="https://img.icons8.com/external-bearicons-gradient-bearicons/64/external-Yes-yes-or-no-bearicons-gradient-bearicons-2.png" alt="external-Yes-yes-or-no-bearicons-gradient-bearicons-2" className='ct-img'/></p>
                        <p className='txt'>With their hearts brimming with excitement and their souls aligned in harmony, they invite you to join in the joyous celebration of their future — a future they envision together, hand in hand. As they take their <span className='lrg-txt'>first steps</span> into this new chapter, they welcome friends and loved ones to witness and partake in the magical moments that lie ahead.</p>
                        <p className='txt'>In this tale of love, resilience, and unwavering devotion, <strong>Vishwas</strong> <img width="25" height="25" src="https://img.icons8.com/emoji/48/boy-medium-dark-skin-tone.png" alt="boy-medium-dark-skin-tone"/> and <strong>Bharati</strong> <img width="25" height="25" src="https://img.icons8.com/doodle/48/girl.png" alt="girl"/> invite you to be a part of their extraordinary journey — a journey that started in <span className='lrg-txt'>2017</span> and continues to unfold, painting a beautiful portrait of a love that knows no bounds. Together, they embark on a future filled with endless possibilities, forging ahead with hearts entwined, ready to create their own happily ever after.
                        <img width="64" height="64" src="https://img.icons8.com/external-two-tone-chattapat-/64/external-marriage-wedding-two-tone-chattapat--2.png" alt="external-marriage-wedding-two-tone-chattapat--2" className='ct-img'/></p>
                    </div>
                </div>
            </div>
            <div className='story-wrap grid'>
                <h6>Us so far!</h6>
                <div className='gallery-wrap'>
                    <div className='gallery'>
                        <div className='txt prev-line prev-dot'>
                            <p className='dt'>DECEMBER 28, 2017</p>
                            <p className='occ'>From starting this wonderful journey together.</p>
                        </div>
                        <img src='gal8.jpg' alt='gallery' />
                    </div>
                    <div className='gallery'>
                        <img src='gal3.jpg' alt='gallery' />
                        <div className='txt aftr-line aftr-dot'>
                            <p className='dt'>OCTOBER 09, 2018</p>
                            <p className='occ'>To celebrating birthdays closer to harbour-front!</p>
                        </div>
                    </div>
                    <div className='gallery'>
                        <div className='txt prev-line prev-dot'>
                            <p className='dt'>APRIL 17, 2019</p>
                            <p className='occ'>To graduating the same program together.</p>
                        </div>
                        <img src='gal7.jpg' alt='gallery' />
                    </div>
                    <div className='gallery'>
                        <img src='gal5.jpg' alt='gallery' />
                        <div className='txt aftr-line aftr-dot'>
                            <p className='dt'>JUNE 06, 2020</p>
                            <p className='occ'>To exploring Toronto islands while we're new to the city.</p>
                        </div>
                    </div>
                    <div className='gallery'>
                        <div className='txt prev-line prev-dot'>
                            <p className='dt'>JULY 01, 2020</p>
                            <p className='occ'>To spending Summer weekends with this cutie!</p>
                        </div>
                        <img src='gal2.jpg' alt='gallery' />
                    </div>
                    <div className='gallery'>
                        <img src='gal1.jpg' alt='gallery' />
                        <div className='txt aftr-line aftr-dot'>
                            <p className='dt'>OCTOBER 09, 2021</p>
                            <p className='occ'>To being goofy together.</p>
                        </div>
                    </div>
                    <div className='gallery'>
                        <div className='txt prev-line prev-dot'>
                            <p className='dt'>DECEMBER 25, 2021</p>
                            <p className='occ'>To looking absolute bangers at Christmas parties!</p>
                        </div>
                        <img src='gal9.jpg' alt='gallery' />
                    </div>
                    <div className='gallery'>
                        <img src='gal6.jpg' alt='gallery' />
                        <div className='txt aftr-line aftr-dot'>
                            <p className='dt'>JULY 04, 2022</p>
                            <p className='occ'>To the city of dreams!</p>
                        </div>
                    </div>
                    <div className='gallery'>
                        <div className='txt prev-line prev-dot'>
                            <p className='dt'>MAY 27, 2023</p>
                            <p className='occ'>Until he finally put a ring on it and they decided to start their happily ever after!</p>
                        </div>
                        <img src='gal4.jpg' alt='gallery' />
                    </div>

                </div>
            </div>
            <div className='sign-wrap'>
                <div className='grid'>
                    <h6 className='prop'>That's how the proposal went</h6>
                    <iframe width="600 " height="487" src="https://www.youtube.com/embed/uYi-AQCnfiY" title="BharatimadeaVish - Proposal Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    <h6>V & B</h6>
                    <p>9.24.2023</p>
                </div>
            </div>
        </div>
    )
}

export default Home