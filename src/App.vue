<template>
	<div class="container mx-auto px-2">
		<Navigation />

		<router-view></router-view>
	</div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
	name: 'App',
	components: {
		Navigation,
	},
	setup() {},
}
</script>

<style></style>
