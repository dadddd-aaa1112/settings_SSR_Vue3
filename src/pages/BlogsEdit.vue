<template>
	<h1>EDIT page with id = {{ $route.params.id }}</h1>
</template>
<script>
import { useRoute } from 'vue-router'
export default {
	setup() {
		const route = useRoute()
		const id = route.params.id
		console.log('The id is: ' + id)
	},
}
</script>
<style></style>
