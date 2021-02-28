/* Collection of Data */
import menu_data from './data/menu.js';
import educ_data from './data/education.js';
import achieve_data from './data/achievements.js';
import exp_data from './data/experience.js';
import skills_data from './data/skills.js';
import masterpiece_data from './data/masterpiece.js';

/* Remove loader after loading the page */
window.addEventListener( 'load', function() {
  document.querySelector( 'body' ).classList.remove( 'b-loading' )
} );

/* Create an app */
var portfolio = new Vue( {
  el: '#portfolio',
  data: function() {
    return {
      toggle_menu: false,
      active_section: 'about',
      resume_link: 'https://drive.google.com/file/d/11uQv_W9xfrh65EMpEpRN27jk6VQt1h45/view?usp=sharing',
      menu: menu_data,
      education: educ_data,
      achievements : achieve_data,
      experience : exp_data,
      skills : skills_data,
      masterpiece : masterpiece_data,
      loaded_skills : false
    }
  },
  beforeMount: function() {

  },
  mounted: function() {
    this.toggleMenu();

    /* Debouncing */
    let timeout = false;
    let _this = this;
    window.addEventListener( 'resize', function() {
      clearTimeout( timeout ); // clear the timeout
      timeout = setTimeout( function() { // start timing for event "completion"
        _this.toggleMenu();
      }, 250 );
    } );

    /* Show the go to top buttom */
    let go_to_top = this.$refs['go_top'];
    window.addEventListener( 'scroll', function() {
      if( document.documentElement.scrollTop > 50 ) {
        /* Animate showing */
        go_to_top.classList.add( 'show' );
        setTimeout( function () {
          go_to_top.classList.add( 'visually-show' );
        }, 0 );
      } else {
        /* Animate hiding */
        go_to_top.classList.remove( 'visually-show' );
        setTimeout( function () {
          go_to_top.classList.remove( 'show' );
        }, 0 );
      }
    } );
  },
  methods: {
    goToTop: function() {
      window.scrollTo( {
        top: 0,
        behavior: 'smooth',
      } )
    },
    changeSection: function( section, event ) {
      event.preventDefault();
      this.active_section = section;

      setTimeout( function() {
        window.scrollTo(0,0);
      }, 500 );

      /* Load the animation once */
      if( this.loaded_skills == false && section == 'skills' ) {
        let _this = this;

        /* Loop the Skills */
        for( const key_name in skills_data.tools ) {
          setTimeout( function() {
            _this.setProgress( key_name, skills_data.tools[ key_name ].percent, skills_data.tools[ key_name ].color ); // Animation on circle

            /* Animation on text */
            let percent = 0;
            let label = document.getElementById( key_name );
            let id = setInterval( function() {
              if( percent >= skills_data.tools[ key_name ].percent ) {
                clearInterval( id );
              } else {
                percent++;
                label.innerHTML = percent + '%';
              }
            }, 23 );
          }, 1000 );
        }

        /* Change the status to avoid reloading of the animation */
        this.loaded_skills = true;
      }
    },
    toggleMenu: function() {
      if( window.innerWidth <= 991 ) {
        this.toggle_menu = true;
      } else {
        this.toggle_menu = false;
      }
    },
    setProgress: function( skills, percent, color ) {
      let circle;
      if( skills == '-1' ) { // All circle
        circle = document.querySelector( '.b-skill--circle' );
      } else { // Specific circle
        circle = this.$refs[skills][0];
      }

      let radius = circle.r.baseVal.value;
      let circumference = radius * 2 * Math.PI;

      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;

      const offset = circumference - percent / 100 * circumference;
      circle.style.stroke = color;
      circle.style.strokeDashoffset = offset;
    }
  }
} );