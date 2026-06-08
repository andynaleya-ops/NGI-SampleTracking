<script setup lang="ts">
	import type { Sample } from '../types/barcodeStatus.type'

	defineProps<{ sample: Sample }>()
	defineEmits<{ reset: [] }>()

	function formatDate(iso: string): string {
		if (!iso) return ''
		return new Date(iso).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	function statusClass(status: string): string {
		switch (status?.toLowerCase()) {
			case 'complete':
				return 'text-green-600 font-semibold'
			case 'pending':
				return 'text-yellow-600 font-semibold'
			case 'shipped':
				return 'text-blue-600 font-semibold'
			default:
				return 'text-gray-600'
		}
	}
</script>

<template>
	<div class="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
		<p class="text-lg font-semibold text-gray-900">{{ sample.name }}</p>
		<p class="text-gray-700 mt-1">
			<span class="font-medium">Birthday:</span>
			{{ formatDate(sample.birthday) }}
		</p>
		<p class="text-gray-700 mt-1">
			<span class="font-medium">Status:</span>
			<span :class="statusClass(sample.status)">{{ sample.status }}</span>
		</p>
		<p class="text-xs text-gray-400 mt-2">Barcode: {{ sample.barcode }}</p>
	</div>
	<button
		@click="$emit('reset')"
		class="mt-4 w-full py-2.5 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
	>
		Look up another
	</button>
</template>
