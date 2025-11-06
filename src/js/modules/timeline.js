(function(){
    // Vertical Timeline - by CodyHouse.co
      function VerticalTimeline( element ) {
          this.element = element;
          this.blocks = this.element.getElementsByClassName("c-timeline__block");
          this.images = this.element.getElementsByClassName("c-timeline__img");
          this.contents = this.element.getElementsByClassName("c-timeline__content");
          this.offset = 0.8;
          this.hideBlocks();
      };
  
      VerticalTimeline.prototype.hideBlocks = function() {
          if ( !"classList" in document.documentElement ) {
              return; // no animation on older browsers
          }
          //hide timeline blocks which are outside the viewport
          var self = this;
          for( var i = 0; i < this.blocks.length; i++) {
              (function(i){
                  if( self.blocks[i].getBoundingClientRect().top > window.innerHeight*self.offset ) {
                      self.images[i].classList.add("c-timeline__img--hidden"); 
                      self.contents[i].classList.add("c-timeline__content--hidden"); 
                  }
              })(i);
          }
      };
  
      VerticalTimeline.prototype.showBlocks = function() {
          if ( ! "classList" in document.documentElement ) {
              return;
          }
          var self = this;
          for( var i = 0; i < this.blocks.length; i++) {
              (function(i){
                  if( self.contents[i].classList.contains("c-timeline__content--hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight*self.offset ) {
                      // add bounce-in animation
                      self.images[i].classList.add("c-timeline__img--bounce-in");
                      self.contents[i].classList.add("c-timeline__content--bounce-in");
                      self.images[i].classList.remove("c-timeline__img--hidden");
                      self.contents[i].classList.remove("c-timeline__content--hidden");
                  }
              })(i);
          }
      };
  
      var verticalTimelines = document.getElementsByClassName("js-c-timeline"),
          verticalTimelinesArray = [],
          scrolling = false;
      if( verticalTimelines.length > 0 ) {
          for( var i = 0; i < verticalTimelines.length; i++) {
              (function(i){
                  verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
              })(i);
          }
  
          //show timeline blocks on scrolling
          window.addEventListener("scroll", function(event) {
              if( !scrolling ) {
                  scrolling = true;
                  (!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
              }
          });
      }
  
      function checkTimelineScroll() {
          verticalTimelinesArray.forEach(function(timeline){
              timeline.showBlocks();
          });
          scrolling = false;
      };
  })();

