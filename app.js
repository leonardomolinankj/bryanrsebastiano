/* Collection of Data */
import menu_data from './data/menu.js';
import educ_data from './data/education.js';
import achieve_data from './data/achievements.js';
import exp_data from './data/experience.js';

/* Create an app */
var portfolio = new Vue( {
  el: '#portfolio',
  data: function() {
    return {
      toggle_menu: false,
      active_section: 'skills',
      resume_link: 'https://drive.google.com/file/d/11uQv_W9xfrh65EMpEpRN27jk6VQt1h45/view?usp=sharing',
      menu: menu_data,
      education: educ_data,
      achievements : achieve_data,
      experience : exp_data
    }
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
  },
  methods: {
    changeSection: function( section, event ) {
      this.active_section = section;
      event.preventDefault();
    },
    toggleMenu: function() {
      if( window.innerWidth <= 991 ) {
        this.toggle_menu = true;
      } else {
        this.toggle_menu = false;
      }
    }
  }
} );