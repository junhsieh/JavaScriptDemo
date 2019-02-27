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
					:id="'gi_' + item.i"
                   :key="key"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i">
            {{item.i}}
			<div>test</div>
        </GridItem>
    </GridLayout>
  </div>
</template>

<script>
// @ is an alias to /src
import VueGridLayout from 'vue-grid-layout';

var testLayout = [
    {"x":0,"y":0,"w":3,"h":6,"i":"0"},
    {"x":3,"y":0,"w":3,"h":6,"i":"1"},
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
          title: {
              text: 'Solar Employment Growth by Sector, 2010-2016'
          },
          subtitle: {
              text: 'Source: thesolarfoundation.com'
          },
          yAxis: {
              title: {
                  text: 'Number of Employees'
              }
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
          },
          plotOptions: {
              series: {
                  label: {
                      connectorAllowed: false
                  },
                  pointStart: 2010
              }
          },
          series: [{
              name: 'Installation',
              data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
          }, {
              name: 'Manufacturing',
              data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
          }, {
              name: 'Sales & Distribution',
              data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
          }, {
              name: 'Project Development',
              data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
          }, {
              name: 'Other',
              data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
          }],
      
          responsive: {
              rules: [{
                  condition: {
                      maxWidth: 200
                  },
                  chartOptions: {
                      legend: {
                          layout: 'horizontal',
                          align: 'center',
                          verticalAlign: 'bottom'
                      }
                  }
              }]
          }
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

