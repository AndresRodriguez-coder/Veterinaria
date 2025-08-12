<template>
  <div class="mb-3">
    <label class="form-label">{{ label }}</label>
    <input
      :type="type"
      class="form-control"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false }
})

defineEmits(['update:modelValue'])
</script>
