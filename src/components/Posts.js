import React, { Component } from 'react';
import { MyContext } from './Provider';

import NationalPark from './NationalPark';
import Park from './Park';

class Posts extends Component {
  static contextType = MyContext;

  constructor() {
    super()
    this.state = {
      parkType: 'national'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(type) {
    if (type === 'national' || type === 'city') this.setState({parkType: type})
    else {
      let updateData = this.context.update
      let newParkId = this.context.newParkId
      let defaultImg = 'https://www.nationalgeographic.com/content/dam/travel/2019-digital/central-park-new-york-city/belvedere-castle.adapt.1900.1.jpg'
      updateData([newParkId+1, defaultImg], 'addPark')
    }
  }

  render() {
    let { parkType } = this.state
    let { nationalParks, nycParks } = this.context
    let natParks, cityParks;

    if (parkType === 'national') {
      natParks = (
        <div>
          {nationalParks.map((p,i) => <NationalPark key={i} park={p} />)}
        </div>
      )
    }
    else {
      let nycParkIdKeys = Object.keys(nycParks)
      cityParks = (
        <div>
          {nycParkIdKeys.map((id,i) => <Park key={i} park={nycParks[id]}/>)}
        </div>
      )
    }

    return (
      <div>
        <div id="search">
          <div id="search-content">
            {parkType === 'city' ? <input/> : ''}
            <span className='parkB' onClick={() => this.handleClick('national')}>National Parks</span>
            <span className='parkB' onClick={() => this.handleClick('city')}>NYC Parks</span>
            {parkType === 'city' ? <span className='parkB' onClick={() => this.handleClick('add')}>Add Park</span> : ''}
          </div>
        </div>
        {parkType === 'national' ? natParks : cityParks}
      </div>
    )
  }
}

export default Posts;
