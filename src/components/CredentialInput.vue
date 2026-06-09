<script setup lang="ts">
	import { ref } from 'vue'

	interface Sample {
		barcode: string
		name: string
		birthday: string
		status: string
	}

	const emit = defineEmits<{
		found: [samples: Sample[]]
	}>()

	const name = ref('')
	const birthday = ref('')
	const loading = ref(false)
	const error = ref('')

	const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
	const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

	async function lookup() {
		if (!name.value || !birthday.value) return

		loading.value = true
		error.value = ''

		try {
			// Exact case‑insensitive name match and exact date match
			const url = `${SUPABASE_URL}/rest/v1/samples?name=ilike.${encodeURIComponent(name.value)}&birthday=eq.${encodeURIComponent(birthday.value)}`
			const res = await fetch(url, {
				headers: {
					apikey: SUPABASE_ANON_KEY,
					Authorization: `Bearer ${SUPABASE_ANON_KEY}`
				}
			})

			if (!res.ok) throw new Error(`Server error (${res.status})`)

			const data: Sample[] = await res.json()
			if (data.length > 0) {
				emit('found', data)
			} else {
				error.value = 'No record found for that name and birthday.'
			}
		} catch (e: any) {
			error.value = e.message || 'Something went wrong.'
		} finally {
			loading.value = false
		}
	}
</script>

<template>
	<div class="text-left">
		<p class="text-gray-600 mb-4 text-sm">Enter your name and birthday.</p>

		<label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
		<input
			v-model.trim="name"
			type="text"
			placeholder="Full name"
			class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
			@keyup.enter="lookup"
		/>

		<label class="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
		<input
			v-model="birthday"
			type="date"
			class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
			@keyup.enter="lookup"
		/>

		<button
			@click="lookup"
			:disabled="!name || !birthday || loading"
			class="w-full py-2.5 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{{ loading ? 'Searching...' : 'Look up' }}
		</button>

		<div
			v-if="error"
			class="mt-3 bg-red-100 text-red-700 p-3 rounded-lg text-sm"
		>
			{{ error }}
		</div>
	</div>
</template>
