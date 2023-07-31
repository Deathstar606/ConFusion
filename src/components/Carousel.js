import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  CardImg
} from 'reactstrap';
import { Link } from "react-router-dom";

class Caro extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0,
      items: [
        { src: '/assets/images/eldenring.png',
          head: 'Elden Ring',
          caption: 'An action role-playing game played in a third person perspective, with gameplay focusing on combat and exploration. Click For Detalis',
          links: 'content/game/1'
        },
        {
          src: "/assets/images/ppboots.png",
          head: 'Puss In Boots II',
          caption: 'Puss in Boots discovers that his passion for adventure has taken its toll when he learns that he has burnt through eight of his nine lives. Click For Details',
          links: "content/movie/2"
        },
        {
          src: '/assets/images/hridge.png',
          head: 'Hacksaw Ridge',
          caption: 'Focuses on the World War II experiences of Desmond Doss, an American pacifist combat medic who, as a Seventh-day Adventist Christian, refused to carry or use a weapon or firearm of any kind. Click For Details',
          links: "content/movie/0"
        }
      ]};
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = this.state.items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <Link to={item.links}>
          <CardImg src={item.src} />
          </Link>
          <CarouselCaption className='mr-auto opacity-50' captionText={item.caption} captionHeader={item.head} /> 
        </CarouselItem>
      );
    });

    return (
      <Carousel className='carousel'
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={this.state.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default Caro;