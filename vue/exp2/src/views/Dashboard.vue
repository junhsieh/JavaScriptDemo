<template>
  <div>
    <h1>Dashboard <Icon type="md-bug" size="30" /></h1>
    <GridLayout
            :layout.sync="layout"
            :col-num="12"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
            :responsive="true"
    >

        <GridItem v-for="(item, key) in layout"
                   :key="key"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i">
            {{item.i}}
			<div :id="'gi_' + item.i"></div>
        </GridItem>
    </GridLayout>
  </div>
</template>

<script>
// @ is an alias to /src
import VueGridLayout from 'vue-grid-layout';

var testLayout = [
    {"x":0,"y":0,"w":6,"h":6,"i":"0"},
    {"x":6,"y":0,"w":3,"h":6,"i":"1"},
    {"x":6,"y":0,"w":3,"h":6,"i":"2"},
    {"x":0,"y":6,"w":3,"h":6,"i":"3"},
    {"x":3,"y":6,"w":3,"h":6,"i":"4"},
    {"x":6,"y":6,"w":3,"h":6,"i":"5"},
];

export default {
  name: 'Dashboard',
  data: function () {
	return {
      layout: testLayout,
	};
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  methods: {
    initGI_0: function(){
      // eslint-disable-next-line
      Highcharts.chart('gi_0', {
          chart: {
              type: 'spline',
              width: 600,
              height: 200,
              animation: Highcharts.svg, // don't animate in old IE
              marginRight: 0,
              events: {
                  load: function () {
      
                      // set up the updating of the chart each second
                      var series = this.series[0];
                      setInterval(function () {
                          var x = (new Date()).getTime(), // current time
                              y = Math.random();
                          series.addPoint([x, y], true, true);
                      }, 1000);
                  }
              }
          },
      
          time: {
              useUTC: false
          },
      
          title: {
              text: 'Live random data'
          },
          xAxis: {
              type: 'datetime',
              tickPixelInterval: 150
          },
          yAxis: {
              title: {
                  text: 'Value'
              },
              plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
              }]
          },
          tooltip: {
              headerFormat: '<b>{series.name}</b><br/>',
              pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
          },
          legend: {
              enabled: false
          },
          exporting: {
              enabled: false
          },
          series: [{
              name: 'Random data',
              data: (function () {
                  // generate an array of random data
                  var data = [],
                      time = (new Date()).getTime(),
                      i;
      
                  for (i = -19; i <= 0; i += 1) {
                      data.push({
                          x: time + i * 1000,
                          y: Math.random()
                      });
                  }
                  return data;
              }())
          }]
      });
    },
  },
  mounted: function () {
    this.initGI_0();
    console.log('mounted..3');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vue-grid-item {
	background: #bcde94;
}
</style>

