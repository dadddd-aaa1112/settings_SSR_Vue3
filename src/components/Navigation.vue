<template>
	<div>
		<button class="btns" @click="$router.push('/')">Blogs</button>
		<button class="btns" @click="$router.push('/add')">Add blogs</button>
	</div>
</template>

<script>
export default {}
</script>

<style>
.btns {
	margin-right: 10px;
}
</style>
