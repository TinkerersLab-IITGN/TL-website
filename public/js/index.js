$('#recipeCarousel').carousel({
  interval: 10000
})

$('.carousel .carousel-item').each(function(){
    if (this.id === "testimonial-1" || this.id === "testimonial-2" || this.id === "testimonial-3" || this.id === "testimonial-4") {
      var minPerSlide = 3;
      var next = $(this).next();
      if (!next.length) {
      next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));

      for (var i=0;i<minPerSlide;i++) {
          next=next.next();
          if (!next.length) {
            next = $(this).siblings(':first');
          }

          next.children(':first-child').clone().appendTo($(this));
        }
    }
});
