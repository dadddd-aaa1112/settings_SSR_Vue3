<template>
	<div>
		<h1>page with id = {{ $route.params.id }}</h1>
		<input />
		<input />
		<p>name {{ title }}</p>
		<button>Сохранить</button>
		<button>Удалить</button>
	</div>
</template>

<script>
import { toRefs } from 'vue'

export default {
	setup(props) {
		// turn `props` into an object of refs, then destructure
		const { title } = toRefs(props)
		// `title` is a ref that tracks `props.title`
		console.log(title)
	},
}
</script>

<style></style>
