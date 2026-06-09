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
	<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
		<div class="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
			<h1 class="text-2xl font-bold text-gray-900 mb-1">Sample Status</h1>
			<p class="text-gray-500 mb-6">
				Enter your credentials to view your status
			</p>

			<CredentialInput
				v-if="step === 'credential'"
				@found="onCredentialsFound"
			/>

			<StatusResult
				v-if="step === 'result'"
				:samples="currentSamples"
				@reset="reset"
			/>
		</div>
	</div>
</template>
