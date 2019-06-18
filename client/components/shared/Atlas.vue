<template >
  <div class="">
    <div id="atlas" class="atlas" :style="`height: ${height};`">
    </div>
    <Tooltip ref="usermodal" status="secondary">
      Huidige locatie
    </Tooltip>

    <Tooltip ref="lsmodal">
      Info over laadpaal: {{loadingstation.available}}
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
    },
    stations: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loadingstation: {
        available: null
      },
      loadingStations: []
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
    if (!this.map) {
      return
    }

    this.map.on('load', this.createMapDataLayer)

    if (!this.showCurrentLocation) {
      return
    }

    this.trackUserLocation()

  },
  watch: {
    stations(arr) {
      const stations = this.genGeoJSON(arr)
      const source = this.map.getSource('loadingstations')
      if (source) {
        source.setData(stations)
        this.genCustomMarkers(stations)
      }
    }
  },
  methods: {
    genGeoJSON(stations) {
      const features = stations.map(station => ({
        "type": "Feature",
        "properties": {
          "description": "some desc",
          "icon": "charging-station",
          "available": station.status.available,
          "charging": station.status.charging
        },
        "geometry": {
          "type": "Point",
          "coordinates": [Number(station.point.lng), Number(station.point.lat)]
        }
      }))
      return {
        "type": "FeatureCollection",
        "features": features
      }
    },
    showUserModal(e) {
      this.$refs.usermodal.show(e)
    },
    trackUserLocation() {
      const geolocate = new this.mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
      this.map.addControl(geolocate)

      this.map.on('load', () => {

        geolocate.on('geolocate', () => {
          const location = document.querySelector('#atlas .mapboxgl-user-location-dot')
          if (location.getAttribute('location-listener') !== 'true') {
             location.addEventListener('click', () => {
               location.setAttribute('location-listener', 'true')
               this.showUserModal()
             })
          }
        })

        geolocate.trigger()

      })

      this.map.on('move', this.$refs.usermodal.hide)
      this.map.on('zoom', this.$refs.usermodal.hide)
    },
    genCustomMarkers(geojson) {
      [...document.querySelectorAll('.marker')].forEach(marker => marker.remove())
      geojson.features.forEach(feature => {
        const marker = document.createElement('div')

        const classes = ['marker']
        const subclasses = ['--tertiary', '--secondary', '--primary']
        const available = Number(feature.properties.available)

        if (available >= 0 && available <= 2) {
          classes.push('marker' + subclasses[available])
        }

        classes.forEach(CSSclass => {
          marker.classList.add(CSSclass)
        })

        // make a marker for each feature and add to the map
        new this.mapboxgl.Marker(marker)
          .setLngLat(feature.geometry.coordinates)
          .addTo(this.map)
      })
    },
    async createMapDataLayer() {
      const geojson = this.genGeoJSON(this.stations)
      if (geojson.features.length === 0 ) {
        console.log('no stations');
        return
      }

      this.map.addSource('loadingstations', {
          "type": "geojson",
          "data": geojson
        })

      this.map.addLayer({
        "id": "loadingstations",
        "type": "circle",
        "source": "loadingstations"
      })

      this.genCustomMarkers(geojson)

      this.map.on('move', this.$refs.lsmodal.hide)
      this.map.on('zoom', this.$refs.lsmodal.hide)
      this.map.on('zoom ', () => {
        const markers = document.querySelectorAll('.marker')
        const zoom = this.map.getZoom()
        console.log('zooming');
        markers.forEach(marker => {
          const size = `${Math.round(1 * zoom)}px`
          marker.style.width = size
          marker.style.height = size
        })
      })

      this.map.on('mouseenter', 'loadingstations', e => {
        this.map.getCanvas().style.cursor = 'pointer'
        this.loadingstation.available = e.features[0].properties.available
        this.$refs.lsmodal.show(e.originalEvent)
      })
      this.map.on('mouseleave', 'loadingstations', () => {
        this.map.getCanvas().style.cursor = ''
        this.$refs.lsmodal.hide()
      })


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
    .mapboxgl-popup {
      &-close-button {
        display: none;
      }
      &-content {
        background-color: $color-secondary;
        color: white;
        font-size: .875rem;
        font-family: $font-body;
        padding: $padding-m;
      }
      &-tip {
        border-top-color: $color-secondary;
      }

    }
    .marker {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      @include linear-gradient($color-grey-dark);
      cursor: pointer;
      &--primary {
        @include linear-gradient($color-primary);
      }
      &--secondary {
        @include linear-gradient($color-secondary);
      }
      &--tertiary {
        @include linear-gradient($color-tertiary);
      }
    }

  }
</style>
