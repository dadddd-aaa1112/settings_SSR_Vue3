<template>
	<Suspense>
		<BlogsList />
	</Suspense>
</template>

<script>
import BlogsList from './components/BlogsList.vue'

export default {
	name: 'App',
	components: {
		BlogsList,
	},
}
</script>

<style></style>
