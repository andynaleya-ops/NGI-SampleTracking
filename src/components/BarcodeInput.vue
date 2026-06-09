<script setup lang="ts">
	import { ref } from 'vue'

	interface Sample {
		barcode: string
		name: string
		birthday: string
		status: string
	}

	const emit = defineEmits<{
		found: [sample: Sample]
	}>()

	const barcode = ref('')
	const loading = ref(false)
	const error = ref('')

	const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
	const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

	async function lookup() {
		if (!barcode.value) return

		loading.value = true
		error.value = ''

		try {
			const url = `${SUPABASE_URL}/rest/v1/samples?barcode=eq.${encodeURIComponent(barcode.value)}`
			const res = await fetch(url, {
				headers: {
					apikey: SUPABASE_ANON_KEY,
					Authorization: `Bearer ${SUPABASE_ANON_KEY}`
				}
			})
			if (!res.ok) throw new Error(`Server error (${res.status})`)

			const data: Sample[] = await res.json()

			if (data.length > 0) {
				emit('found', data[0])
			} else {
				error.value = 'Barcode not found.'
			}
		} catch (e: any) {
			error.value = e.message || 'Something went wrong.'
		} finally {
			loading.value = false
		}
	}
</script>

<template>
	<div>
		<input
			v-model.trim="barcode"
			type="text"
			placeholder="Barcode"
			class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
			autofocus
			@keyup.enter="lookup"
			:disabled="loading"
		/>
		<button
			@click="lookup"
			:disabled="loading || !barcode"
			class="mt-3 w-full py-2.5 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{{ loading ? 'Checking...' : 'Check' }}
		</button>
		<div
			v-if="error"
			class="mt-3 bg-red-100 text-red-700 p-3 rounded-lg text-sm"
		>
			{{ error }}
		</div>
	</div>
</template>
