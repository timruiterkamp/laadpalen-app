<template >
  <div class="">
    <div id="atlas" class="atlas" :style="`height: ${height};`">
    </div>
    <Tooltip ref="usermodal" status="secondary">
      Huidige locatie
    </Tooltip>
  </div>

</template>

<script>
import config from '~/modules/config.js'
import Tooltip from '~/components/shared/Tooltip.vue'

export default {
  components: {
    Tooltip
  },
  props: {
    height: {
      type: String,
      default: '10rem'
    },
    showCurrentLocation: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
    this.mapboxgl.accessToken = config.MAPBOX_API_KEY
    this.map = new this.mapboxgl.Map({
      container: 'atlas',
      style: 'mapbox://styles/fjvdpol/cjwru7qm50as41co1ccx2xpaj',
      center: [4.895168, 52.370216],
      zoom: 8
    })

    if (!this.map || !this.showCurrentLocation) {
      return
    }

    this.trackUserLocation()

  },
  methods: {
    fire(el, etype){
      if (el.fireEvent) {
        el.fireEvent('on' + etype);
      } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    },
    showUserModal(e) {
      this.$refs.usermodal.show(e)
      setTimeout(this.$refs.usermodal.hide, 5000)
    },
    trackUserLocation() {
      console.log('trying to track user location');
      this.map.addControl(new this.mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }))

      setTimeout(()=> {
        const geoLocate = document.querySelector('#atlas .mapboxgl-ctrl-geolocate')
        console.log(geoLocate);
        this.fire(geoLocate, 'click')
      },0)

      this.map.on('idle', () => {
        const userLocationDot = document.querySelector('#atlas .mapboxgl-user-location-dot')
        if (!userLocationDot) return
        userLocationDot.removeEventListener('click', this.showUserModal)
        userLocationDot.addEventListener('click', this.showUserModal)
      })

      this.map.on('move', this.$refs.usermodal.hide)
      this.map.on('zoom', this.$refs.usermodal.hide)
    }
  }

}

</script>

<style lang="scss">
  @import '~/assets/css/config/main.scss';
  .atlas {
    width: 100%;
    .mapboxgl-ctrl.mapboxgl-ctrl-group {
      // opacity: 0;
      // pointer-events: none;
    }
    .mapboxgl-user-location-dot::before {
      @include linear-gradient($color-secondary);
    }
    .mapboxgl-user-location-dot {
      @include linear-gradient($color-secondary);
    }
  }
</style>
