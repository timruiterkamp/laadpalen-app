<template >
  <div class="">
    <div id="atlas" class="atlas" :style="`height: ${height};`">
    </div>
    <Tooltip ref="usermodal" status="secondary">
      Huidige locatie
    </Tooltip>

    <Tooltip ref="lsmodal" class="station-details">
      <template v-slot="content">
        {{loadingstation.address}}
        <div class="station-details__issues" v-if="issues.length > 0">
          <h3 class="station-details__issues__title">Huidige problemen:</h3>
          <div class="station-details__issue" v-for="issue in issues" :key="issue._id">
            <p class="station-details__issue__title">{{issue.title}}</p>
            <p>status: <span class="bold">{{issue.status}}</span></p>
          </div>
        </div>

      </template>
    </Tooltip>
  </div>

</template>

<script>
import config from '~/modules/config.js'
import DB from '~/helpers/db.js'
import Tooltip from '~/components/shared/Tooltip.vue'

export default {
  components: {
    Tooltip
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
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
        address: '',
        provider: '',
        issues: '[{}]'
      },
      loadingStations: [],
      listeners: false
    }
  },
  computed: {
    issues() {
      return JSON.parse(this.loadingstation.issues)
    }
  },
  mounted() {
    this.mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
    this.mapboxgl.accessToken = config.MAPBOX_API_KEY
    this.map = new this.mapboxgl.Map({
      container: 'atlas',
      style: 'mapbox://styles/fjvdpol/cjwru7qm50as41co1ccx2xpaj',
      center: [4.895168, 52.370216],
      zoom: 12
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
      const source = this.map.getSource('loadingstations')
      if (source) {
        const stations = this.genGeoJSON(arr)
        source.setData(stations)
        this.genCustomMarkers(stations)
      } else {
        this.createMapDataLayer()
      }
    }
  },
  methods: {
    genGeoJSON(stations) {
      const features = stations.map(station => ({
        "type": "Feature",
        "properties": {
          "address": `${station.address} ${station.postalcode} ${station.city}`,
          "sockets": station.sockets,
          "usedsockets": station.usedsockets,
          "provider": station.provider,
          "issues": station.issues,
          "status": station.status,
          "id": station._id
        },
        "geometry": {
          "type": "Point",
          "coordinates": [Number(station.longitude), Number(station.latitude)]
        }
      }))
      return {
        "type": "FeatureCollection",
        "features": features
      }
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
          if (location && (!location.dataset.click || location.dataset.click !== 'set')) {
            location.dataset.click = 'set'

             location.addEventListener('mouseover', e => {
               this.$refs.usermodal.show(e)
             })
             location.addEventListener('mouseout', () => {
               this.$refs.usermodal.hide()
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
        marker.classList.add('marker')



        const issues = feature.properties.issues
        if (issues.length > 0) {
          const open = issues.filter(issue => issue.status === 'open').length > 0
          const working = issues.filter(issue => issue.status === 'working').length > 0
          const classes = []

          if (open) {
            classes.push('marker--open')
          } else if (working) {
            classes.push('marker--working')
          }
          classes.forEach(CSSclass => {
            marker.classList.add(CSSclass)
          })
        }




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

      const source = this.map.getSource('loadingstations')
      if (!source) {
        this.map.addSource('loadingstations', {
            "type": "geojson",
            "data": geojson
          })
      }

      const layer = this.map.getLayer('loadingstations')
      if (!layer) {
        this.map.addLayer({
          "id": "loadingstations",
          "type": "circle",
          "source": "loadingstations"
        })
      }
      this.genCustomMarkers(geojson)

      if (!this.listeners) {
        this.listeners = true

        this.map.on('move', this.$refs.lsmodal.hide)
        this.map.on('zoom', this.$refs.lsmodal.hide)

        this.map.on('mouseenter', 'loadingstations', e => {
          this.loadingstation = e.features[0].properties
          console.log(this.loadingstation);
          this.$refs.lsmodal.show(e.originalEvent)
          this.$emit('input', this.loadingstation)
        })

        this.map.on('mouseleave', 'loadingstations', () => {
          this.$refs.lsmodal.hide()
        })
      }


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
      cursor: pointer;
    }
    .marker {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      cursor: pointer;
      @include linear-gradient($color-grey-dark);
      &--open {
        @include linear-gradient($color-tertiary);
      }
      &--working {
        @include linear-gradient($color-secondary);
      }
      &--closed {
        @include linear-gradient($color-primary);
      }
    }


  }
  .station-details {
    &__issues {
      &__title {
        margin-top: $margin-s;
        margin-bottom: $margin-s;
        color: inherit;
        font-size: 1rem;
      }

      p {
        margin: 0;
      }
    }
    &__issue {
      padding: $padding-s;
      background-color: $color-grey-low;
      color: $color-grey-dark;
      margin-bottom: $margin-xs;
      border-radius: $rounding-s;
      &__title {
        font-size: 1rem;
      }
    }
  }
</style>
