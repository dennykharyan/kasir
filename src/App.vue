<template>
	<div id="app">
		<transition name="fade" mode="out-in" @before-enter="beforeEnter" appear>
			<router-view/>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'App',
	data () {
		return {
			
		}
	},
	methods: {
		beforeEnter: function () { // make scroll position always on top every page transition
			this.$root.$emit('scrollBeforeEnter')
		}
	}
};

</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
</style>
