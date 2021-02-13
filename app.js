/* Collection of Data */
import menu_data from './data/menu.js';
import educ_data from './data/education.js';
import achieve_data from './data/achievements.js';
import exp_data from './data/experience.js';
import skills_data from './data/skills.js';

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
      skills : skills_data
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

    this.setProgress( '-1', 0 ); // Initialize circle

    /////////////////////// TEMP FOR TESTING
    /**
     * DYNAMIC VALUE
     * skill.name = html
     * skill.percent = 20
     * skill.percent_interval = 23
     */

    /* Before the animation start */
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
  },
  methods: {
    changeSection: function( section, event ) {
      event.preventDefault();
      this.active_section = section;

      // if( section == 'skills' ) {
      //   /* Before the animation start */
      //   let _this = this;
      //   setTimeout( function() {
      //     _this.setProgress( 'html', 20 ); // Animation on circle

      //     /* Animation on text */
      //     let percent = 0;
      //     let label = document.getElementById( 'html' );
      //     let id = setInterval( function() {
      //       if( percent >= 20 ) {
      //         clearInterval( id );
      //       } else {
      //         percent++;
      //         label.innerHTML = percent + '%';
      //       }
      //     }, 23 );
      //   }, 1000 );
      // } else {
      //   this.setProgress( '-1', 0 ); // Reset all skill circle
      //   document.querySelector( '.b-skill--label' ).innerHTML = '0%'; // Reset all skill label
      // }
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