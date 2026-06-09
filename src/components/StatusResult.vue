<script setup lang="ts">
	import type { SampleType } from '../types/sample.type'
	import { censorName } from '../utilities/functions'

	defineProps<{ samples: SampleType[] }>()
	defineEmits<{ reset: [] }>()

	const formatDate = (iso: string) => {
		return new Date(iso).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	const statusClass = (s: string) => {
		switch (s?.toLowerCase()) {
			case 'sample_received':
				return 'bg-slate-100 text-slate-700'
			case 'in_process':
			case 'in_processing':
				return 'bg-blue-100 text-blue-700'
			case 'resampling':
				return 'bg-amber-100 text-amber-700'
			case 'report_released':
				return 'bg-green-100 text-green-700'
			case 'rejected':
				return 'bg-red-100 text-red-700'
			default:
				return 'bg-slate-100 text-slate-700'
		}
	}

	const statusLabel = (s: string) => {
		const labels: Record<string, string> = {
			sample_received: 'Sample received',
			in_process: 'In process',
			in_processing: 'In process',
			resampling: 'Resampling needed',
			report_released: 'Report released',
			rejected: 'Rejected'
		}

		return labels[s?.toLowerCase()] || s
	}
</script>

<template>
	<div class="flex flex-col gap-3">
		<div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
			<div>
				<p class="text-xs font-semibold uppercase tracking-wide text-teal-700">Matched profile</p>
				<h2 class="text-lg font-bold text-slate-900">
					{{ censorName(samples[0].name) }}
				</h2>
				<p class="text-sm text-slate-500">
					Birthday: {{ formatDate(samples[0].birthday) }}
				</p>
			</div>
		</div>

		<div
			v-for="sample in samples"
			:key="sample.barcode"
			class="rounded-xl border border-slate-200 bg-white p-4"
		>
			<div class="flex items-start justify-between gap-3">
				<div>
					<p class="text-xs font-semibold uppercase tracking-wide text-teal-700">Product</p>
					<h3 class="font-bold text-slate-900">
						{{ sample.product }}
					</h3>
				</div>
				<div
					:class="[
						'shrink-0 rounded-full px-3 py-1 text-xs font-bold',
						statusClass(sample.status)
					]"
				>
					{{ statusLabel(sample.status) }}
				</div>
			</div>
			<p class="mt-2 text-sm text-slate-500">Barcode: {{ sample.barcode }}</p>
		</div>
		<button
			@click="$emit('reset')"
			class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
		>
			Look up another
		</button>
	</div>
</template>
