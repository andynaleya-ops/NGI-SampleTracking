<script setup lang="ts">
	import { ref } from 'vue'
	import type { SampleType } from '../types/sample.type.ts'
	import CredentialInput from '../components/CredentialInput.vue'
	import StatusResult from '../components/StatusResult.vue'

	const step = ref<'credential' | 'result'>('credential')
	const currentSamples = ref<SampleType[]>([])

	function onCredentialsFound(samples: SampleType[]) {
		currentSamples.value = samples
		step.value = 'result'
	}

	function reset() {
		step.value = 'credential'
		currentSamples.value = []
	}
</script>

<template>
	<main class="min-h-screen bg-slate-100 flex items-center justify-center p-4">
		<section class="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8">
			<header class="flex items-center gap-4 border-b border-slate-200 pb-6 mb-6">
				<div class="w-16 h-16 shrink-0 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-400 text-sm font-semibold flex items-center justify-center">
					<span>Logo</span>
				</div>
				<div>
					<p class="text-xs font-semibold uppercase tracking-wide text-teal-700">Sample tracking</p>
					<h1 class="text-2xl font-bold text-slate-900">Sample Status</h1>
					<p class="text-sm text-slate-500">
						Enter your credentials to view your sample result.
					</p>
				</div>
			</header>

			<CredentialInput
				v-if="step === 'credential'"
				@found="onCredentialsFound"
			/>

			<StatusResult
				v-if="step === 'result'"
				:samples="currentSamples"
				@reset="reset"
			/>
		</section>
	</main>
</template>
