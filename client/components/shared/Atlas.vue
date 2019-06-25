<template >
  <section>
    <div id="atlas" class="atlas" :style="`height: ${height};`"></div>
    <Tooltip ref="usermodal" status="secondary">Huidige locatie</Tooltip>

    <Tooltip ref="lsmodal" class="station-details">
      <template v-slot="content">
        {{loadingstation.address}}
        <div class="station-details__issues" v-if="issues.length > 0">
          <h3 class="station-details__issues__title">Huidige problemen:</h3>
          <div class="station-details__issue" v-for="issue in issues" :key="issue._id">
            <nuxt-link
              v-if="issue._id"
              :to="`/dashboard/meldingen/?id=${issue._id}`"
              class="station-details__issue__link"
            >
              <p v-if="issue.title" class="station-details__issue__title">{{issue.title}}</p>
              <p v-if="issue.status">
                status:
                <span class="bold">{{translate(issue.status)}}</span>
              </p>
            </nuxt-link>
          </div>
        </div>
      </template>
    </Tooltip>
    <div id="cursor"></div>
  </section>
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
      zoom: 13,
      minZoom: 10
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
        this.$refs.usermodal.hide()
        this.$refs.lsmodal.hide()
        // this.genCustomMarkers(stations)
      } else {
        this.createMapDataLayer()
      }
    }
  },
  methods: {
    translate(status) {
      status = status.toLowerCase()
      if (status === 'open') return 'gemeld'
      if (status === 'working') return 'in behandeling'
      if (status === 'closed') return 'afgehandeld'
      return 'geen status'
    },
    genGeoJSON(stations) {
      const features = stations.map(station => ({
        type: 'Feature',
        properties: {
          address: `${station.address} ${station.postalcode} ${station.city}`,
          sockets: station.sockets,
          usedsockets: station.usedsockets,
          provider: station.provider,
          issues: station.issues,
          status: station.status,
          id: station._id
        },
        geometry: {
          type: 'Point',
          coordinates: [Number(station.longitude), Number(station.latitude)]
        }
      }))
      return {
        type: 'FeatureCollection',
        features: features
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
          const location = document.querySelector(
            '#atlas .mapboxgl-user-location-dot'
          )
          if (
            location &&
            (!location.dataset.click || location.dataset.click !== 'set')
          ) {
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
    // genCustomMarkers(geojson) {
    //   [...document.querySelectorAll('.marker')].forEach(marker => marker.remove())
    //   geojson.features.forEach(feature => {
    //     const marker = document.createElement('div')
    //     marker.classList.add('marker')
    //
    //     const classes = []
    //     const status = feature.properties.status
    //     if (status) {
    //       marker.classList.add('marker--' + status)
    //     }
    //
    //     // make a marker for each feature and add to the map
    //     new this.mapboxgl.Marker(marker)
    //       .setLngLat(feature.geometry.coordinates)
    //       .addTo(this.map)
    //   })
    // },
    async createMapDataLayer() {
      const geojson = this.genGeoJSON(this.stations)
      if (geojson.features.length === 0) {
        console.log('no stations')
        return
      }

      const source = this.map.getSource('loadingstations')
      if (!source) {
        // const open = ["==", ["get", "status"], "open"]
        // const working = ["==", ["get", "status"], "working"]
        // const closed = ["==", ["get", "status"], "closed"]
        // const other = ["!", ["has", "status"]]
        this.map.addSource('loadingstations', {
          type: 'geojson',
          data: geojson,
          cluster: true,
          clusterMaxZoom: 12
          // "clusterProperties": {
          //   "open": ["+", ["case", open, 1, 0]],
          //   "working": ["+", ["case", working, 1, 0]],
          //   "closed": ["+", ["case", closed, 1, 0]],
          //   "other": ["+", ["case", other, 1, 0]],
          // }
        })
      }

      const layer = this.map.getLayer('loadingstations')
      if (!layer) {
        this.map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'loadingstations',
          filter: ['has', 'point_count'],
          paint: {
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ],
            'circle-color': '#505050'
          }
        })
        this.map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'loadingstations',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-size': 12
          },
          paint: {
            'text-color': '#fff'
          }
        })
        this.map.addLayer({
          id: 'loadingstations',
          type: 'circle',
          source: 'loadingstations',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': [
              'match',
              ['get', 'status'],
              'open',
              '#ef4c5b',
              'working',
              '#684be2',
              'closed',
              '#27b5a2',
              '#505050'
            ],
            'circle-radius': [
              'match',
              ['get', 'status'],
              'open',
              7,
              'working',
              7,
              'closed',
              7,
              5
            ]
          }
        })
      }
      // this.genCustomMarkers(geojson)

      if (!this.listeners) {
        this.listeners = true

        this.map.on('click', 'clusters', e => {
          const features = this.map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
          })
          const clusterId = features[0].properties.cluster_id
          this.map
            .getSource('loadingstations')
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return

              this.map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
              })
            })
        })
        this.map.on('mouseenter', 'clusters', () => {
          this.map.getCanvas().style.cursor = 'pointer'
        })
        this.map.on('mouseleave', 'clusters', () => {
          this.map.getCanvas().style.cursor = ''
        })
        this.map.on('mouseenter', 'loadingstations', () => {
          this.map.getCanvas().style.cursor = 'pointer'
        })
        this.map.on('mouseleave', 'loadingstations', () => {
          this.map.getCanvas().style.cursor = ''
        })

        this.map.on('move', this.$refs.lsmodal.hide)
        this.map.on('zoom', this.$refs.lsmodal.hide)

        this.map.on('click', 'loadingstations', e => {
          this.$refs.lsmodal.hide()
          if (this.loadingstation.id !== e.features[0].properties.id) {
            const cursor = document.querySelector('#cursor')
            cursor.style = `top: ${e.originalEvent.clientY}px; left: ${
              e.originalEvent.clientX
            }px;`
            this.loadingstation = e.features[0].properties
            this.$refs.lsmodal.show({ target: cursor })
            this.$emit('input', this.loadingstation)
          }
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
    transform-origin: center;
    width: 10px;
    height: 10px;
    transition: width 0.3s, height 0.3s;
    &--open {
      width: 15px;
      height: 15px;
      @include linear-gradient($color-tertiary);
    }
    &--working {
      width: 15px;
      height: 15px;
      @include linear-gradient($color-secondary);
    }
    &--closed {
      width: 15px;
      height: 15px;
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
    &__link {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
#cursor {
  width: 5px;
  height: 5px;
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
</style>
