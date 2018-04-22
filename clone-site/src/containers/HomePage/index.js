import React, { Component } from 'react';
import Switch from "react-switch";

import './HomePage.scss';
import ChangeText from '../../components/ChangeText';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            this_text: '',
            that_text: '',
            my_api: false,
            isFetching: false,
        }
    }

    /*
    handle onclick change of api switching
     */
    handleChange = (my_api) => {
        this.setState({ my_api });
    }

    /*
    get new text pair when refresh
     */
    getText = () => {
        {/* Make sure skip double fetching when is doing fetch */}
        if (!this.state.isFetching) {
            {/* Notify fetching start */}
            this.setState({
                isFetching: true
            })

            if (this.state.my_api) {
                fetch(`http://127.0.0.1:8000/pairs`)
                    .then(res => res.text())
                    .then(text => {
                        let resdata = JSON.parse(text)
                        this.setState({
                            this_text: resdata.this_text,
                            that_text: resdata.that_text,
                            isFetching: false,
                        })

                    })
                    .catch((err) => {
                        console.log('Fetch Error' + err);
                        this.setState({
                            isFetching: false,
                        })
                    });
            } else {

                {/* Cross Origin Sharing is not enabled at server
                Therefore adding proxyurl to get response from api.
             */}
                const proxyurl = "https://cors-anywhere.herokuapp.com/";
                const url = 'http://itsthisforthat.com/api.php?json';
                fetch(proxyurl + url)
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                            this_text: json.this,
                            that_text: json.that,
                            isFetching: false,
                        })

                    })
                    .catch((err) => {
                        console.log('Fetch Error' + err);
                        this.setState({
                            isFetching: false,
                        })
                    });
            }
        }
    }

    componentDidMount() {
        this.getText();
    }

    /*
     Handles onclick of the twitter button
     */
    twitterOnClick = () => {
        window.open("https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fitsthisforthat.com%2F&ref_src=twsrc%5Etfw&text=Wait%2C%20what%20does%20your%20startup%20do%3F&tw_p=tweetbutton&url=http%3A%2F%2Fitsthisforthat.com", "_blank")
    }

    render() {
        return(
            <div className={'HomePage'}>
                <div className={'background'} />
                <div className={'twitter-button'} onClick={this.twitterOnClick}>
                    <img src={'https://static1.squarespace.com/static/5655cbf9e4b0e19716f2f024/t/5a748331419202924041b119/1517585499508/Mayville+Twitter+social+links'}
                         alt={'tweet'} />
                </div>
                <div className={'text-container'}>
                    <h1 className={'phrase'}>
                        WAIT, WHAT DOES YOUR STARTUP DO?
                    </h1>
                    <h1 className={'phrase'}>
                        SO, BASICALLY, IT'S LIKE A
                    </h1>
                </div>
                <div className={'change-text-container'}>
                    <ChangeText
                        thisText={this.state.this_text}
                        thatText={this.state.that_text}
                        onRefresh={this.getText}
                        />
                </div>
                <div className={'api-refresh-container'}>
                    <div className={'api-switch-container'}>
                        <h2>Use My API</h2>
                        <Switch
                            onColor={'#ffb6c1'}
                            onChange={this.handleChange}
                            checked={this.state.my_api}
                            id="normal-switch"
                        />
                    </div>

                    <div className={'refresh-text'} onClick={this.getText}>
                        <h2>REFRESH</h2>
                    </div>
                </div>

            </div>
        )
    }

}

export default HomePage;

