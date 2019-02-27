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
    >

        <GridItem v-for="item in layout"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i">
            {{item.i}}
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
	  }
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vue-grid-item {
	background: #bcde94;
}
</style>

